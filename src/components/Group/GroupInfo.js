import React, { useState } from 'react'
import { TextInput, Label, Button } from 'flowbite-react'
import { GoCheck } from "react-icons/go";
import { MdSubject } from "react-icons/md";
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { auth, db, storage } from '../../firebase';
import { uuidv4 } from '@firebase/util';
import { doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { resetGroupPrew } from '../../redux/userSlice';
import { SiAboutdotme } from "react-icons/si";

function GroupInfo() {

    const [subject, setSubject] = useState("")
    const [description, setDescription] = useState("")
    const [img, setImg] = useState("")

    const dispatch = useDispatch()

    const groupPrew = useSelector(state => state.users.groupPrew)

    const handleCreateGroup = async (e) => {
        e.preventDefault()

        const temp = subject.split(" ").join("");
        const id = temp + uuidv4()

        if (subject || img) {
            const storageRef = ref(storage, `images/groups/${id}`);
            const uploadTask = uploadBytesResumable(storageRef, img);

            uploadTask.on(
                (error) => {
                    //TODO:Handle Error
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await setDoc(doc(db, "groups", id), {
                            [auth.currentUser.uid]: `${auth.currentUser.uid}`,
                        });
                        for (let index = 0; index < groupPrew.length; index++) {
                            await updateDoc(doc(db, "userChats", groupPrew[index].uid), {
                                [id]: {
                                    id: id,
                                    date: serverTimestamp(),
                                    groupPrew,
                                },
                                [id + ".userInfo"]: {
                                    user: {
                                        description: description,
                                        name: subject,
                                        photoURL: downloadURL,
                                        id: id,
                                        type: "group",
                                    }
                                },
                                [id + ".lastMessage"]: {
                                    text: `Created ${subject}`,
                                },
                            });
                            await setDoc(doc(db, "chats", id), {
                                messages: [],
                            });
                        }
                        for (let index = 0; index < groupPrew.length + 1; index++) {
                            await updateDoc(doc(db, "chats", id), {
                                messages: [],
                                state: true,
                                [groupPrew[index].uid + "deletedDate"]: true,
                                [groupPrew[index].uid + "createdDate"]: serverTimestamp(),
                                [groupPrew[index].uid]: false,
                            });
                        }
                    });
                }
            );
            dispatch(resetGroupPrew())
            setSubject("");
            setDescription("");
            handleChangeImage()
            hidevisible_home()
        }

    }

    function hidevisible_home() {
        document.getElementById("div_left").style.display = "block";
        document.getElementById("div_group").style.display = "none";
    }

    const handleConvert = (e) => {

        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);

        reader.onload = () => {
            const img = document.getElementById('myimgG');
            img.setAttribute('src', reader.result);
            setImg(e.target.files[0])
        };
        reader.onerror = error => {
            console.log(error);
        };
    }

    const handleChangeImage = () => {
        const img = document.getElementById('myimgG');
        img.setAttribute('src', "https://cdn-icons-png.flaticon.com/512/149/149071.png");
    }

    return (
        <div className='h-full flex items-center justify-center'>
            <form onSubmit={(e) => handleCreateGroup(e)} className="flex flex-col w-3/4">
                <div className='flex flex-col items-center justify-center my-12'>
                    <img className='w-44 h-44 object-cover rounded-full shadow-xl shadow-gray-400 dark:shadow-bgDark1' src="https://cdn-icons-png.flaticon.com/512/149/149071.png" id='myimgG' alt="" />
                    <label className="mt-7 block">
                        <input type="file" onChange={(e) => { handleConvert(e) }} className="block w-full text-xs text-zinc-400 dark:text-loginInfo rounded-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-white file:text-white hover:file:bg-violet-100" />
                    </label>
                </div>

                <div>
                    <div className="mb-3 block">
                        <Label
                            htmlFor="subject1"
                            value="Group Subject"
                        />
                    </div>
                    <TextInput
                        id="subject1"
                        type="text"
                        placeholder="Enter subject"
                        value={subject}
                        icon={MdSubject}
                        required={true}
                        onChange={(e) => setSubject(e.target.value)}
                    />
                </div>
                <div className='mt-5'>
                    <div className="mb-3 block">
                        <Label
                            htmlFor="description1"
                            value="Group Description"
                        />
                    </div>
                    <TextInput
                        id="description1"
                        type="text"
                        placeholder="Enter description"
                        value={description}
                        icon={SiAboutdotme}
                        required={true}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className='flex justify-center items-center my-12'>
                    <Button color="light" type="submit">
                        <GoCheck className="mr-2 h-6 w-6" />
                        Create Group
                    </Button>
                </div>

            </form>
        </div>
    )
}

export default GroupInfo