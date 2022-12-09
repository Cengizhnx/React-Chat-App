import React, { useEffect } from 'react'
import { AiOutlineLogin, AiOutlineUserDelete } from "react-icons/ai";
import { RiChatSmile3Line } from "react-icons/ri";
import { BiBlock } from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { auth, getUserPhoto2, userDelete, userLogout } from '../../firebase';
import { logout } from '../../redux/userSlice';
import { Dropdown } from "flowbite-react";
import { deleteUser } from 'firebase/auth';
import { HiUserGroup } from "react-icons/hi";

import Theme from "../Theme";

function Header({ data }) {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const status = useSelector(state => state.users.status)
    const user = data.find(item => item.uid === auth.currentUser.uid)

    const handleDeleteUser = async () => {
        if (window.confirm("Are you sure you want to delete the account ?")) {

            await deleteUser(auth.currentUser)

            await userLogout()

            navigate('/login', {
                replace: true
            })

            await userDelete(user);

        }

    }

    const handleLogout = async () => {
        if (window.confirm("Are you sure you want to logout ?")) {
            await userLogout()

            dispatch(logout())

            navigate('/login', {
                replace: true
            })
        }

    }

    function hidevisible_menu() {
        document.getElementById("div_left").style.display = "none";
        document.getElementById("div_right").style.display = "block";
    }

    function hidevisible_block() {
        document.getElementById("div_left").style.display = "none";
        document.getElementById("div_block").style.display = "block";
    }

    function hidevisible_friends() {
        document.getElementById("div_left").style.display = "none";
        document.getElementById("div_friends").style.display = "block";
    }

    function hidevisible_group() {
        document.getElementById("div_left").style.display = "none";
        document.getElementById("div_group").style.display = "block";
    }


    // useEffect(() => {
    //     if (!status) {
    //         getUserPhoto2()
    //     }
    // }, [status, user])

    return (
        <div className='w-full h-16 mb-1 rounded-tl-xl flex items-center dark:text-white bg-bgLight2 dark:bg-bgDark2'>
            <div className='w-full px-5 flex flex-row items-center justify-between' >
                <button onClick={hidevisible_menu}>
                    <img className='w-10 h-10 object-cover rounded-full shadow-2xl shadow-neutral-900' src={user?.photoURL ? user?.photoURL : "https://cdn-icons-png.flaticon.com/512/149/149071.png"} alt="" />
                </button>
                <h1 className='text-base tracking-wider'>@{auth.currentUser.displayName}</h1>
                <div className='flex flex-row items-center z-10'>
                    <Dropdown
                        arrowIcon={true}
                        inline={true}
                    >
                        <Link onClick={hidevisible_group} className="w-full">
                            <Dropdown.Item>
                                <HiUserGroup className="h-6 w-6 mr-2 hover:bg-white hover:text-black hover:rounded-2xl hover:cursor-pointer" />
                                New Group
                            </Dropdown.Item>
                        </Link>

                        <Dropdown.Divider />
                        <Link onClick={hidevisible_friends} className="w-full">
                            <Dropdown.Item>
                                <RiChatSmile3Line className="h-6 w-6 mr-2 hover:bg-white hover:text-black hover:rounded-2xl hover:cursor-pointer" />
                                Friends
                            </Dropdown.Item>
                        </Link>

                        <Link onClick={hidevisible_block} className="w-full">
                            <Dropdown.Item>
                                <BiBlock className="h-6 w-6 mr-2 hover:bg-white hover:text-black hover:rounded-2xl hover:cursor-pointer" />
                                Block List
                            </Dropdown.Item>
                        </Link>

                        <Dropdown.Divider />

                        <Link className="w-full">
                            <Dropdown.Item>
                                <Theme></Theme>
                            </Dropdown.Item>
                        </Link>

                        <Dropdown.Divider />

                        <Link onClick={handleDeleteUser} className="w-full">
                            <Dropdown.Item>
                                <AiOutlineUserDelete className="h-6 w-6 mr-2 hover:bg-white hover:text-black hover:rounded-2xl hover:cursor-pointer" />
                                Delete Account
                            </Dropdown.Item>
                        </Link>

                        <Dropdown.Divider />

                        <Link onClick={handleLogout} className="w-full">
                            <Dropdown.Item>
                                <AiOutlineLogin className="h-6 w-6 mr-2 hover:bg-white hover:text-black hover:rounded-2xl hover:cursor-pointer" />
                                Logout
                            </Dropdown.Item>
                        </Link>
                    </Dropdown>
                </div>
            </div>

        </div>
    )
}

export default Header