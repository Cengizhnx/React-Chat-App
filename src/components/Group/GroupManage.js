import { Dropdown } from "flowbite-react";
import { Link } from 'react-router-dom';
import { GrUserAdmin } from "react-icons/gr";
import { useDispatch, useSelector } from 'react-redux';
import { deleteDoc, deleteField, doc, onSnapshot, serverTimestamp, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { useState } from "react";
import { useEffect } from "react";
import { AiOutlineUserDelete } from "react-icons/ai";
import { groupUsers } from "../../redux/userSlice";

function GroupManage({ userid }) {

    const chatId = useSelector(state => state.users.chatId)

    const dispatch = useDispatch()
    const [users, setUsers] = useState([])
    const [managers, setManagers] = useState(false)

    const isManager = [managers].find((item) => item[auth.currentUser.uid] === auth.currentUser.uid);

    const selectUser = useSelector(state => state.users.selectUser)
    const tempArray = users

    const userRef = doc(db, 'groups', chatId);

    useEffect(() => {
        const getUsers = () => {

            const response = onSnapshot(doc(db, "userChats", auth.currentUser.uid), (doc) => {
                doc.exists() && setUsers(doc.data()[chatId].groupPrew)
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
        chatId && getUsers() && getManagers()

    }, [chatId])

    const handleDeleteAdmin = async () => {
        await updateDoc(userRef, {
            [userid]: deleteField()
        });
    }

    const handleUsersDelete = async () => {

        const filter = tempArray.findIndex((item) => item.uid === userid)
        tempArray.splice(filter, 1);

        for (let index = 0; index < users.length; index++) {
            await updateDoc(doc(db, "userChats", users[index].uid), {
                [chatId]: {
                    id: chatId,
                    date: serverTimestamp(),
                    groupPrew: tempArray,
                },
                [chatId + ".userInfo"]: {
                    user: {
                        description: selectUser.description,
                        name: selectUser.name,
                        photoURL: selectUser.photoURL,
                        id: selectUser.id,
                        type: "group",
                    }
                },
                [chatId + ".lastMessage"]: {
                    text: "Grup Changes",
                },
            });
        }
        dispatch(groupUsers(tempArray))
    }

    return (
        <div>
            <Dropdown
                arrowIcon={true}
                inline={true}
            >
                {
                    isManager && Object.keys(managers).length > 1 && <Link onClick={() => handleDeleteAdmin()} className="w-full">
                        <Dropdown.Item>
                            <GrUserAdmin className="h-5 w-5 mr-2 hover:bg-white hover:text-black hover:rounded-2xl hover:cursor-pointer" />
                            Remove Admin
                        </Dropdown.Item>
                    </Link>
                }

                {/* {
                    isManager && <Link onClick={() => handleUsersDelete()} className="w-full">
                        <Dropdown.Item>
                            <AiOutlineUserDelete className="h-5 w-5 mr-2 hover:bg-white hover:text-black hover:rounded-2xl hover:cursor-pointer" />
                            Remove from Groups
                        </Dropdown.Item>
                    </Link>
                } */}



            </Dropdown >
        </div>
    )
}

export default GroupManage