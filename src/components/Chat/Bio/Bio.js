import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BiBlock } from "react-icons/bi";
import { MdGroupOff } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { BiEditAlt } from "react-icons/bi";
import { MdOutlineAddReaction, MdOutlineMoodBad } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import { auth, db, userAddFriends, storage, userBlock, userDeblock, userDeleteFriends } from '../../../firebase';
import { toast, Toaster } from 'react-hot-toast';
import { deleteDoc, deleteField, doc, onSnapshot, setDoc, Timestamp, updateDoc } from 'firebase/firestore';
import { useEffect } from 'react';
import { useState } from 'react';
import "./styles.css"
import { HiUser, HiChevronDoubleLeft } from "react-icons/hi";
import { SiAboutdotme } from "react-icons/si";
import GroupMenu from '../../Group/GroupMenu';
import GroupAddUser from '../../Group/Modal/GroupAddUser';
import { Badge, Button, Label, TextInput } from 'flowbite-react';
import GroupManage from '../../Group/GroupManage';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { addSelectUSer, groupState } from '../../../redux/userSlice';

function Bio({ blocks, friends }) {

    const [block, setBlock] = useState(false)
    const [keyId, setKeyıd] = useState(false)
    const [managers, setManagers] = useState(false)
    const [section, setSection] = useState(false)

    const chatId = useSelector(state => state.users.chatId)

    const dispatch = useDispatch()

    const selectUser = useSelector(state => state.users.selectUser)
    const groupUsers = useSelector(state => state.users.groupUsers)
    const groupStates = useSelector(state => state.users.groupState)
    const userState = useSelector(state => state.users.userState)

    const [image, setImage] = useState(null)

    const [name, setName] = useState(selectUser.name)
    const [desc, setDesc] = useState(selectUser.description)

    let result = selectUser?.phone_number?.substr(0, 3) + " " + selectUser?.phone_number?.substr(3, 3) + " " + selectUser?.phone_number?.substr(6, 3) + " " + selectUser?.phone_number?.substr(9, 2) + " " + selectUser?.phone_number?.substr(11, 2);

    const filtered = blocks?.filter((item) => item.user.username === selectUser.username)

    const friend = friends?.filter((item) => item.user.username === selectUser.username)

    const handleBlock = async () => {
        await userBlock(selectUser)
        // await updateDoc(doc(db, "blocks", chatId), {
        //     [auth.currentUser.uid]: true,
        //     [selectUser.uid]: true,
        //     [auth.currentUser.uid + "blockedDate"]: Timestamp.now()
        // })
    }

    const handleDeblock = async (item) => {
        await userDeblock(item)
        // await updateDoc(doc(db, "blocks", chatId), {
        //     [auth.currentUser.uid]: false,
        //     [auth.currentUser.uid + "blockedDate"]: Timestamp.now()
        // })
    }

    const handleAddFriends = async () => {
        await userAddFriends(selectUser)
    }

    const handleDeleteFriends = async (item) => {
        await userDeleteFriends(item)
    }

    function hidevisible_chat() {
        document.getElementById("landing2").style.display = "none";
        document.getElementById("landing1").style.display = "block";
    }

    useEffect(() => {
        const getMessages = () => {

            const response = onSnapshot(doc(db, "chats", chatId), (docx) => {
                docx.exists()

                dispatch(groupState(docx.data().state))

                if (docx.data()[auth.currentUser.uid] === true && docx.data()[selectUser.uid] === true) {
                    deleteDoc(doc(db, "chats", chatId))
                }

            })
            return () => {
                response()
            }
        }

        const getManagers = () => {

            const response = onSnapshot(doc(db, "groups", chatId), (doc) => {
                doc.exists() && setManagers(doc.data())
            })
            return () => {
                response()
            }
        }

        const getBlocks = () => {

            const response = onSnapshot(doc(db, "blocks", chatId), (doc) => {
                doc.exists() && setBlock(doc.data()[auth.currentUser.uid])
            })
            return () => {
                response()
            }
        }

        chatId && getMessages() && getBlocks() && getManagers()

    }, [chatId, block])

    const deleteChat = async () => {

        if (window.confirm("Are you sure you want to delete the chat ?")) {

            const chatRef0 = doc(db, "chats", chatId);

            await updateDoc(chatRef0, {
                [auth.currentUser.uid]: true,
                [auth.currentUser.uid + "deletedDate"]: Timestamp.now()
            });

            hidevisible_chat()

            const chatRef1 = doc(db, "userChats", auth.currentUser.uid);

            if (selectUser.type !== "group") {
                await updateDoc(chatRef1, {
                    [chatId]: deleteField()
                });
            }


        }

    }

    const handleConvert = (e) => {

        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);

        reader.onload = () => {
            const img = document.getElementById('groupImg');
            img.setAttribute('src', reader.result);
            setImage(e.target.files[0])
        };
        reader.onerror = error => {
            toast.error("Error: ", error);
        };
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await updatePhoto()
            toast.success("Group Update")
            setSection(false)
        } catch (error) {
            toast.error(error.message)
        }
    }

    const groupUpdate = async (downloadURL) => {
        for (let index = 0; index < groupUsers.length; index++) {
            await updateDoc(doc(db, "userChats", groupUsers[index].uid), {
                [chatId + ".userInfo"]: {
                    user: {
                        description: desc,
                        name: name,
                        photoURL: downloadURL ? downloadURL : selectUser.photoURL,
                        id: selectUser.id,
                        type: "group",
                    }
                },
            });
        }
        dispatch(addSelectUSer(
            {
                description: desc,
                name: name,
                photoURL: downloadURL ? downloadURL : selectUser.photoURL,
                id: selectUser.id,
                type: "group",
            }
        ))
    }

    const updatePhoto = async () => {
        const file = image;
        const storageRef = ref(storage, `images/groups/${chatId}`);

        if (file === null || file === undefined) {
            await groupUpdate()
        }
        else {
            await uploadBytesResumable(storageRef, file).then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                    try {
                        setImage(downloadURL)
                        await groupUpdate(downloadURL)
                    } catch (err) {
                        console.log(err);
                    }
                });
            });
        }

    }

    const deleteGroup = async () => {
        if (window.confirm("are you sure you want to delete the group?")) {
            await updateDoc(doc(db, "chats", chatId), {
                state: false
            });
        }
    }


    return (
        <>
            <div className='dark:text-white bg-bgLight1 dark:bg-bgDark1 w-full h-5/6 flex flex-col overflow-y-hidden items-center' style={{ display: !section ? "block" : "none" }}>
                <div className='scrollbarLight dark:hidden w-full h-full overflow-y-auto flex flex-col items-center' >
                    <div className='flex flex-col items-center justify-center my-6'>
                        <img className='w-44 h-44 object-cover rounded-full shadow-2xl shadow-neutral-900' src={(userState && selectUser.photoURL) ? selectUser.photoURL : "https://cdn-icons-png.flaticon.com/512/149/149071.png"} id='myimg' alt="" />
                        <h1 className='flex flex-row text-2xl text-black dark:text-white tracking-wide mt-5'>
                            {selectUser.name ? selectUser.name : selectUser.username}
                            {
                                selectUser.type === "group" && groupStates && [managers].map((user) => (
                                    user[auth.currentUser.uid] === auth.currentUser.uid &&
                                    <BiEditAlt className="h-6 w-6 ml-2" onClick={() => {
                                        setSection(true)
                                    }} cursor="pointer" />))
                            }
                        </h1>
                        {
                            selectUser.type !== "group"
                                ? <p className='text-sm tracking-wider text-loginTextBg dark:text-phoneNumber mt-2'>{userState && result}</p>
                                : <p className='text-sm tracking-wider text-loginTextBg dark:text-phoneNumber mt-2'>{groupUsers.length} participant</p>
                        }
                    </div>
                    <div className='w-5/6 h-20 flex flex-col justify-center py-5 px-8 border-y-2 rounded-2xl border-bgLight2 dark:border-bioBorder'>
                        {
                            selectUser.type === "group"
                                ? <h1 className='text-base text-black dark:text-white tracking-wide'>About the Group</h1>
                                : <h1 className='text-base text-black dark:text-white tracking-wide'>About Me</h1>
                        }

                        <p className='text-sm tracking-wider text-loginTextBg dark:text-phoneNumber mt-1'>{selectUser.description ? selectUser.description : selectUser.username}</p>
                    </div>

                    {/* {
                    selectUser.type === "group" &&
                    <div className='w-5/6 h-20 flex flex-col justify-center mt-4 py-5 px-8 border-y-2 rounded-2xl border-bgLight2 dark:border-bioBorder'>

                        <div className='w-full h-8 flex flex-row justify-center items-center text-green-500 dark:text-green-400 rounded-lg hover:bg-messageHoverLight dark:hover:bg-messageHover hover:cursor-pointer'>
                            <GroupAddUser></GroupAddUser>
                        </div>
                    </div>
                } */}

                    {
                        selectUser.type === "group" && groupStates &&
                        <>
                            {
                                groupUsers.map((item, key) => (
                                    <div className='w-full flex flex-col items-center justify-center text-center'>
                                        {
                                            [managers].map((user) => (
                                                user[item.uid] === auth.currentUser.uid &&
                                                <div className='w-5/6 h-20 flex flex-col justify-center mt-4 py-5 px-8 border-y-2 rounded-2xl border-bgLight2 dark:border-bioBorder'>

                                                    <div className='w-full h-8 flex flex-row justify-center items-center text-green-500 dark:text-green-400 rounded-lg hover:bg-messageHoverLight dark:hover:bg-messageHover hover:cursor-pointer'>
                                                        <GroupAddUser></GroupAddUser>
                                                    </div>
                                                </div>
                                            ))
                                        }

                                    </div>
                                ))
                            }
                        </>
                    }

                    {
                        selectUser.type === "group" &&
                        <div className='w-5/6 flex flex-col justify-center px-2 py-5 mt-4 border-y-2 rounded-2xl border-bgLight2 dark:border-bioBorder'>
                            {
                                groupUsers.map((item, key) => (
                                    <div key={key} onClick={() => setKeyıd(item.uid)} className='w-full overflow-hidden h-20 flex items-center justify-between hoverMessage px-4 hover:rounded-xl hover:bg-messageHoverLight dark:hover:bg-messageHover hover:cursor-pointer'>
                                        <div className='w-full h-20 flex items-center justify-between hoverMessage'>

                                            <img className='w-14 h-14 object-cover rounded-full shadow-lg shadow-neutral-900' src={item.photoURL} alt="user" />
                                            <div className='w-full flex flex-col justify-center ml-4'>
                                                <h1 className='text-base tracking-wider mb-1'>{item.name} <span className='text-xs'> </span></h1>
                                                <p className='text-sm tracking-wider text-phoneNumber'>@{item.username}</p>
                                            </div>
                                        </div>
                                        <div className='flex flex-col text-center'>
                                            {
                                                groupStates &&
                                                [managers].map((user, key) => (
                                                    user[item.uid] === item.uid &&
                                                    <Badge
                                                        key={key}
                                                        color="success"
                                                        size="xs"
                                                    >
                                                        Manager
                                                    </Badge>
                                                ))
                                            }

                                        </div>
                                        <div className='flex flex-col text-center w-10'>

                                            {
                                                groupStates &&
                                                [managers].map((user, key) => (
                                                    user[item.uid] !== item.uid
                                                        ? <GroupMenu key={key} userid={keyId}></GroupMenu>
                                                        : <GroupManage key={key} userid={keyId}></GroupManage>
                                                ))
                                            }
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    }

                    {
                        selectUser.type !== "group" && userState &&
                        <div className='w-5/6 flex flex-col justify-center items-center px-8 py-4 mt-4 border-y-2 rounded-2xl border-bgLight2 dark:border-bioBorder'>

                            {
                                friend?.length > 0 && <div onClick={() => handleDeleteFriends(friend[0])} className='w-full h-8 flex flex-row justify-center items-center text-green-500 dark:text-green-400 rounded-lg hover:bg-messageHoverLight dark:hover:bg-messageHover hover:cursor-pointer'>
                                    <div className='flex justify-center items-center mr-5'>
                                        <MdOutlineMoodBad className="h-6 w-6" />
                                    </div>
                                    <p>@{selectUser.username} delete friends</p>
                                </div>
                            }
                            {
                                friend?.length <= 0 && <div onClick={() => handleAddFriends()} className='w-full h-8 flex flex-row justify-center items-center text-green-500 dark:text-green-400 rounded-lg hover:bg-messageHoverLight dark:hover:bg-messageHover hover:cursor-pointer'>
                                    <div className='flex justify-center items-center mr-5'>
                                        <MdOutlineAddReaction className="h-6 w-6" />
                                    </div>
                                    <p>@{selectUser.username} add friends</p>
                                </div>
                            }

                        </div>
                    }


                    <div className='w-5/6 flex flex-col justify-center items-center px-8 py-4 my-4 border-y-2 rounded-2xl border-bgLight2 dark:border-bioBorder'>
                        {
                            selectUser.type !== "group" && filtered?.length > 0 && userState && <div onClick={() => handleDeblock(filtered[0])} className='w-full h-8 flex flex-row justify-evenly items-center text-red-600 dark:text-red-400 rounded-lg hover:bg-messageHoverLight dark:hover:bg-messageHover hover:cursor-pointer mb-5'>
                                <div className='flex justify-center items-center'>
                                    <BiBlock className="h-6 w-6" />
                                </div>
                                <p>@{selectUser.username} remove block</p>
                            </div>
                        }
                        {
                            selectUser.type !== "group" && filtered?.length <= 0 && userState && <div onClick={() => handleBlock()} className='w-full h-8 flex flex-row justify-evenly items-center text-red-600 dark:text-red-400 rounded-lg hover:bg-messageHoverLight dark:hover:bg-messageHover hover:cursor-pointer mb-5'>
                                <div className='flex justify-center items-center'>
                                    <BiBlock className="h-6 w-6" />
                                </div>
                                <p>@{selectUser.username} block</p>
                            </div>
                        }

                        {
                            groupStates
                                ? selectUser.type === "group" && <div onClick={() => deleteChat()} className='w-full h-8 flex flex-row justify-evenly items-center text-red-600 dark:text-red-400 rounded-lg hover:bg-messageHoverLight dark:hover:bg-messageHover hover:cursor-pointer'>

                                    <div className='flex justify-center items-center'>
                                        <FaTrash className="h-5 w-5" />
                                    </div>
                                    {
                                        groupStates
                                            ? selectUser.type === "group" && <p className='text-sm'>@{selectUser.name} with delete chat</p>
                                            : selectUser.type !== "group" && < p >@{selectUser.username} with delete chat</p>
                                    }
                                </div>
                                : selectUser.type !== "group" && <div onClick={() => deleteChat()} className='w-full h-8 flex flex-row justify-evenly items-center text-red-600 dark:text-red-400 rounded-lg hover:bg-messageHoverLight dark:hover:bg-messageHover hover:cursor-pointer'>

                                    <div className='flex justify-center items-center'>
                                        <FaTrash className="h-5 w-5" />
                                    </div>
                                    {
                                        groupStates
                                            ? selectUser.type === "group" && <p className='text-sm'>@{selectUser.name} with delete chat</p>
                                            : selectUser.type !== "group" && < p >@{selectUser.username} with delete chat</p>
                                    }
                                </div>
                        }

                        {
                            groupStates
                                ? selectUser.type === "group" &&
                                <>
                                    {
                                        groupUsers.map((item, key) => (
                                            <div className='flex flex-col text-center'>
                                                {
                                                    [managers].map((user) => (
                                                        user[item.uid] === auth.currentUser.uid &&
                                                        <div onClick={() => deleteGroup()} className='w-full h-8 mt-2 mx-4 flex flex-row justify-evenly items-center text-red-600 dark:text-red-400 rounded-lg hover:bg-messageHoverLight dark:hover:bg-messageHover hover:cursor-pointer'>
                                                            <div className='flex justify-center items-center'>
                                                                <MdGroupOff className="h-5 w-5" />
                                                            </div>
                                                            <p className='text-sm'>@{selectUser.name} remove</p>
                                                        </div>
                                                    ))
                                                }

                                            </div>
                                        ))
                                    }
                                </>
                                : selectUser.type === "group" &&
                                <div className='flex flex-col text-center'>
                                    <div className='w-full h-8 mt-2 mx-4 flex flex-row justify-evenly items-center text-red-600 dark:text-red-400 rounded-lg hover:cursor-pointer'>
                                        <div className='flex justify-center items-center'>
                                            <MdGroupOff className="h-5 w-5" />
                                        </div>
                                        <p className='text-sm'>GROUP DELETED</p>
                                    </div>
                                </div>
                        }


                    </div>
                    <Toaster position='top-right'></Toaster>
                </div>
                <div className='hidden dark:block scrollbarDark w-full h-full overflow-y-auto'>
                    <div className='flex flex-col items-center'>
                        <div className='flex flex-col items-center justify-center my-6'>
                            <img className='w-44 h-44 object-cover rounded-full shadow-2xl shadow-neutral-900' src={selectUser.photoURL ? selectUser.photoURL : "https://cdn-icons-png.flaticon.com/512/149/149071.png"} id='myimg' alt="" />
                            <h1 className='flex flex-row text-2xl text-black dark:text-white tracking-wide mt-5'>
                                {selectUser.name}
                                {
                                    selectUser.type === "group" && groupStates && [managers].map((user) => (
                                        user[auth.currentUser.uid] === auth.currentUser.uid &&
                                        <BiEditAlt className="h-6 w-6 ml-2" onClick={() => {
                                            setSection(true)
                                        }} cursor="pointer" />))
                                }
                            </h1>
                            {
                                selectUser.type !== "group"
                                    ? <p className='text-sm tracking-wider text-loginTextBg dark:text-phoneNumber mt-2'>{userState && result}</p>
                                    : <p className='text-sm tracking-wider text-loginTextBg dark:text-phoneNumber mt-2'>{groupUsers.length} participant</p>
                            }
                        </div>
                        <div className='w-5/6 h-20 flex flex-col justify-center py-5 px-8 border-y-2 rounded-2xl border-bgLight2 dark:border-bioBorder'>
                            {
                                selectUser.type === "group"
                                    ? <h1 className='text-base text-black dark:text-white tracking-wide'>About the Group</h1>
                                    : <h1 className='text-base text-black dark:text-white tracking-wide'>About Me</h1>
                            }

                            <p className='text-sm tracking-wider text-loginTextBg dark:text-phoneNumber mt-1'>{selectUser.description}</p>
                        </div>

                        {/* {
                    selectUser.type === "group" &&
                    <div className='w-5/6 h-20 flex flex-col justify-center mt-4 py-5 px-8 border-y-2 rounded-2xl border-bgLight2 dark:border-bioBorder'>

                        <div className='w-full h-8 flex flex-row justify-center items-center text-green-500 dark:text-green-400 rounded-lg hover:bg-messageHoverLight dark:hover:bg-messageHover hover:cursor-pointer'>
                            <GroupAddUser></GroupAddUser>
                        </div>
                    </div>
                } */}

                        {
                            selectUser.type === "group" && groupStates &&
                            <>
                                {
                                    groupUsers.map((item, key) => (
                                        <div className='w-full flex flex-col items-center justify-center text-center'>
                                            {
                                                [managers].map((user) => (
                                                    user[item.uid] === auth.currentUser.uid &&
                                                    <div className='w-5/6 h-20 flex flex-col justify-center mt-4 py-5 px-8 border-y-2 rounded-2xl border-bgLight2 dark:border-bioBorder'>

                                                        <div className='w-full h-8 flex flex-row justify-center items-center text-green-500 dark:text-green-400 rounded-lg hover:bg-messageHoverLight dark:hover:bg-messageHover hover:cursor-pointer'>
                                                            <GroupAddUser></GroupAddUser>
                                                        </div>
                                                    </div>
                                                ))
                                            }

                                        </div>
                                    ))
                                }
                            </>
                        }

                        {
                            selectUser.type === "group" &&
                            <div className='w-5/6 flex flex-col justify-center px-2 py-5 mt-4 border-y-2 rounded-2xl border-bgLight2 dark:border-bioBorder'>
                                {
                                    groupUsers.map((item, key) => (
                                        <div key={key} onClick={() => setKeyıd(item.uid)} className='w-full overflow-hidden h-20 flex items-center justify-between hoverMessage px-4 hover:rounded-xl hover:bg-messageHoverLight dark:hover:bg-messageHover hover:cursor-pointer'>
                                            <div className='w-full h-20 flex items-center justify-between hoverMessage'>

                                                <img className='w-14 h-14 object-cover rounded-full shadow-lg shadow-neutral-900' src={item.photoURL} alt="user" />
                                                <div className='w-full flex flex-col justify-center ml-4'>
                                                    <h1 className='text-base tracking-wider mb-1'>{item.name} <span className='text-xs'> </span></h1>
                                                    <p className='text-sm tracking-wider text-phoneNumber'>@{item.username}</p>
                                                </div>
                                            </div>
                                            <div className='flex flex-col text-center'>
                                                {
                                                    groupStates &&
                                                    [managers].map((user, key) => (
                                                        user[item.uid] === item.uid &&
                                                        <Badge
                                                            key={key}
                                                            color="success"
                                                            size="xs"
                                                        >
                                                            Manager
                                                        </Badge>
                                                    ))
                                                }

                                            </div>
                                            <div className='flex flex-col text-center w-10'>

                                                {
                                                    groupStates &&
                                                    [managers].map((user, key) => (
                                                        user[item.uid] !== item.uid
                                                            ? <GroupMenu key={key} userid={keyId}></GroupMenu>
                                                            : <GroupManage key={key} userid={keyId}></GroupManage>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        }

                        {
                            selectUser.type !== "group" &&
                            <div className='w-5/6 flex flex-col justify-center items-center px-8 py-4 mt-4 border-y-2 rounded-2xl border-bgLight2 dark:border-bioBorder'>

                                {
                                    friend?.length > 0 && <div onClick={() => handleDeleteFriends(friend[0])} className='w-full h-8 flex flex-row justify-center items-center text-green-500 dark:text-green-400 rounded-lg hover:bg-messageHoverLight dark:hover:bg-messageHover hover:cursor-pointer'>
                                        <div className='flex justify-center items-center mr-5'>
                                            <MdOutlineMoodBad className="h-6 w-6" />
                                        </div>
                                        <p>@{selectUser.username} delete friends</p>
                                    </div>
                                }
                                {
                                    friend?.length <= 0 && <div onClick={() => handleAddFriends()} className='w-full h-8 flex flex-row justify-center items-center text-green-500 dark:text-green-400 rounded-lg hover:bg-messageHoverLight dark:hover:bg-messageHover hover:cursor-pointer'>
                                        <div className='flex justify-center items-center mr-5'>
                                            <MdOutlineAddReaction className="h-6 w-6" />
                                        </div>
                                        <p>@{selectUser.username} add friends</p>
                                    </div>
                                }

                            </div>
                        }


                        <div className='w-5/6 flex flex-col justify-center items-center px-8 py-4 my-4 border-y-2 rounded-2xl border-bgLight2 dark:border-bioBorder'>
                            {
                                selectUser.type !== "group" && block === true && <div onClick={() => handleDeblock(filtered[0])} className='w-full h-8 flex flex-row justify-evenly items-center text-red-600 dark:text-red-400 rounded-lg hover:bg-messageHoverLight dark:hover:bg-messageHover hover:cursor-pointer mb-5'>
                                    <div className='flex justify-center items-center'>
                                        <BiBlock className="h-6 w-6" />
                                    </div>
                                    <p>@{selectUser.username} remove block</p>
                                </div>
                            }
                            {
                                selectUser.type !== "group" && block === false && <div onClick={() => handleBlock()} className='w-full h-8 flex flex-row justify-evenly items-center text-red-600 dark:text-red-400 rounded-lg hover:bg-messageHoverLight dark:hover:bg-messageHover hover:cursor-pointer mb-5'>
                                    <div className='flex justify-center items-center'>
                                        <BiBlock className="h-6 w-6" />
                                    </div>
                                    <p>@{selectUser.username} block</p>
                                </div>
                            }

                            {
                                groupStates
                                    ? selectUser.type === "group" && <div onClick={() => deleteChat()} className='w-full h-8 flex flex-row justify-evenly items-center text-red-600 dark:text-red-400 rounded-lg hover:bg-messageHoverLight dark:hover:bg-messageHover hover:cursor-pointer'>

                                        <div className='flex justify-center items-center'>
                                            <FaTrash className="h-5 w-5" />
                                        </div>
                                        {
                                            groupStates
                                                ? selectUser.type === "group" && <p className='text-sm'>@{selectUser.name} with delete chat</p>
                                                : selectUser.type !== "group" && < p >@{selectUser.username} with delete chat</p>
                                        }
                                    </div>
                                    : selectUser.type !== "group" && <div onClick={() => deleteChat()} className='w-full h-8 flex flex-row justify-evenly items-center text-red-600 dark:text-red-400 rounded-lg hover:bg-messageHoverLight dark:hover:bg-messageHover hover:cursor-pointer'>

                                        <div className='flex justify-center items-center'>
                                            <FaTrash className="h-5 w-5" />
                                        </div>
                                        {
                                            groupStates
                                                ? selectUser.type === "group" && <p className='text-sm'>@{selectUser.name} with delete chat</p>
                                                : selectUser.type !== "group" && < p >@{selectUser.username} with delete chat</p>
                                        }
                                    </div>
                            }

                            {
                                groupStates
                                    ? selectUser.type === "group" &&
                                    <>
                                        {
                                            groupUsers.map((item, key) => (
                                                <div className='flex flex-col text-center'>
                                                    {
                                                        [managers].map((user) => (
                                                            user[item.uid] === auth.currentUser.uid &&
                                                            <div onClick={() => deleteGroup()} className='w-full h-8 mt-2 mx-4 flex flex-row justify-evenly items-center text-red-600 dark:text-red-400 rounded-lg hover:bg-messageHoverLight dark:hover:bg-messageHover hover:cursor-pointer'>
                                                                <div className='flex justify-center items-center'>
                                                                    <MdGroupOff className="h-5 w-5" />
                                                                </div>
                                                                <p className='text-sm'>@{selectUser.name} remove</p>
                                                            </div>
                                                        ))
                                                    }

                                                </div>
                                            ))
                                        }
                                    </>
                                    : selectUser.type === "group" &&
                                    <div className='flex flex-col text-center'>
                                        <div className='w-full h-8 mt-2 mx-4 flex flex-row justify-evenly items-center text-red-600 dark:text-red-400 rounded-lg hover:cursor-pointer'>
                                            <div className='flex justify-center items-center'>
                                                <MdGroupOff className="h-5 w-5" />
                                            </div>
                                            <p className='text-sm'>GROUP DELETED</p>
                                        </div>
                                    </div>
                            }


                        </div>
                        <Toaster position='top-right'></Toaster>
                    </div>
                </div>

            </div>
            {
                [managers].map((user) => (
                    user[auth.currentUser.uid] === auth.currentUser.uid &&
                    <div className='dark:text-white bg-bgLight1 dark:bg-bgDark1 w-full h-5/6 flex flex-col overflow-y-hidden items-center' style={{ display: section ? "block" : "none" }}>
                        <div className='scrollbarLight relative dark:hidden w-full h-full overflow-y-auto flex flex-col items-center' >
                            <HiChevronDoubleLeft onClick={() => {
                                setSection(false)
                            }} className="absolute m-4 h-4 w-4 left-2 text-black hover:bg-messageHover hover:text-white dark:text-white dark:hover:bg-bgLight2 dark:hover:text-black hover:rounded-2xl hover:cursor-pointer" />

                            <form onSubmit={handleSubmit} className="flex flex-col w-3/4">
                                <div className='flex flex-col items-center justify-center my-8'>
                                    <img className='w-44 h-44 object-cover rounded-full shadow-xl shadow-gray-400 dark:shadow-bgDark1' src={selectUser?.photoURL ? selectUser?.photoURL : "https://cdn-icons-png.flaticon.com/512/149/149071.png"} id='groupImg' alt="" />
                                    <label className="mt-5 block">
                                        <input type="file" onChange={(e) => { handleConvert(e) }} className="block w-full text-xs text-zinc-400 dark:text-loginInfo rounded-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-white file:text-white hover:file:bg-violet-100" />
                                    </label>
                                </div>

                                <div>
                                    <div className="mb-2 block">
                                        <Label
                                            htmlFor="nameGroup"
                                            value="Group Name"
                                        />
                                    </div>
                                    <TextInput
                                        id="nameGroup"
                                        type="text"
                                        placeholder="Your Name"
                                        value={name}
                                        required={true}
                                        icon={HiUser}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className='mt-5'>
                                    <div className="mb-2 block">
                                        <Label
                                            htmlFor="groupDesc"
                                            value="Group About"
                                        />
                                    </div>
                                    <TextInput
                                        id="groupDesc"
                                        type="text"
                                        placeholder="Hi! I'm usign Chat App !"
                                        value={desc}
                                        required={true}
                                        icon={SiAboutdotme}
                                        onChange={(e) => setDesc(e.target.value)}
                                    />
                                </div>

                                <div className='flex justify-center items-center my-8'>
                                    <Button color="light" type="submit">
                                        <GrUpdate className="mr-2 h-5 w-5" />
                                        Update
                                    </Button>
                                </div>

                            </form>
                        </div>
                        <div className='hidden dark:block scrollbarDark w-full h-full overflow-y-auto'>
                            <div className='relative flex flex-col items-center'>
                                <HiChevronDoubleLeft onClick={() => {
                                    setSection(false)
                                }} className="absolute m-4 h-4 w-4 left-2 text-black hover:bg-messageHover hover:text-white dark:text-white dark:hover:bg-bgLight2 dark:hover:text-black hover:rounded-2xl hover:cursor-pointer" />

                                <form onSubmit={handleSubmit} className="flex flex-col w-3/4">
                                    <div className='flex flex-col items-center justify-center my-8'>
                                        <img className='w-44 h-44 object-cover rounded-full shadow-xl shadow-gray-400 dark:shadow-bgDark1' src={selectUser?.photoURL ? selectUser?.photoURL : "https://cdn-icons-png.flaticon.com/512/149/149071.png"} id='groupImg' alt="" />
                                        <label className="mt-5 block">
                                            <input type="file" onChange={(e) => { handleConvert(e) }} className="block w-full text-xs text-zinc-400 dark:text-loginInfo rounded-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-white file:text-white hover:file:bg-violet-100" />
                                        </label>
                                    </div>

                                    <div>
                                        <div className="mb-2 block">
                                            <Label
                                                htmlFor="nameGroup"
                                                value="Group Name"
                                            />
                                        </div>
                                        <TextInput
                                            id="nameGroup"
                                            type="text"
                                            placeholder="Your Name"
                                            value={name}
                                            icon={HiUser}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                    <div className='mt-5'>
                                        <div className="mb-2 block">
                                            <Label
                                                htmlFor="groupDesc"
                                                value="Group About"
                                            />
                                        </div>
                                        <TextInput
                                            id="groupDesc"
                                            type="text"
                                            placeholder="Hi! I'm usign Chat App !"
                                            value={desc}
                                            icon={SiAboutdotme}
                                            onChange={(e) => setDesc(e.target.value)}
                                        />
                                    </div>

                                    <div className='flex justify-center items-center my-8'>
                                        <Button color="light" type="submit">
                                            <GrUpdate className="mr-2 h-5 w-5" />
                                            Update
                                        </Button>
                                    </div>

                                </form>
                            </div>
                        </div>
                        <Toaster position='top-right'></Toaster>
                    </div>
                ))
            }

        </>
    )
}

export default Bio