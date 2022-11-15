import { TextInput } from 'flowbite-react'
import { useState } from 'react';
import { HiOutlineSearch } from "react-icons/hi";
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../../firebase';
import { addSelectUSer, chatID } from '../../redux/userSlice';

function FriendsSearch({ friends }) {

    const dispatch = useDispatch()
    const [user, setUser] = useState("")
    const chats = useSelector(state => state.users.chats)

    const getUser = (e) => {
        const filtered = friends.filter((item) => item.user.username.toLowerCase().includes(e.toLowerCase()))
        if (e.length > 0) {
            console.log(filtered);

            setUser(filtered)
        }
        if (e === "") {
            setUser("")
        }
    }

    function hidevisible_chat(item) {
        document.getElementById("landing2").style.display = "block";
        document.getElementById("landing1").style.display = "none";
        dispatch(addSelectUSer(item))

        const cid = auth.currentUser.uid + item.uid
        dispatch(chatID(cid))

        setUser("")
    }

    return (
        <div className='w-full flex flex-col items-center justify-center my-2'>
            <div className='flex flex-row justify-start items-center w-5/6 h-10 p-1 rounded-lg bg-bgLight2 dark:bg-bgDark2'>
                <input
                    className='relative w-full h-8 rounded-md bg-bgLight2 text-bgDark1 dark:text-bgLight2 dark:bg-bgDark2 focus:ring-2 focus:ring-white dark:focus:ring-bgDark1'
                    style={{ border: "none", fontSize: "13.5px", letterSpacing: "0.3px", paddingLeft: "45px" }}
                    type="text"
                    placeholder="Call or start a new chat"
                    onChange={(e) => getUser(e.target.value)}
                />
                <HiOutlineSearch className="h-5 w-5 mx-3 absolute text-phoneNumber" />
            </div>
            {
                user &&
                <div className='w-full'>
                    {
                        user.length > 0 &&
                        <div className='text-center mt-2'>
                            <h1 className='tracking-wider text-sm text-gray-500 dark:text-gray-400'>SEARCH ({user.length})</h1>
                        </div>
                    }

                    {
                        user.map((item, key) => (
                            <div key={key} onClick={() => hidevisible_chat(item.user)} className='w-full overflow-hidden my-2 h-20 flex items-center justify-between hoverMessage px-6 border-b-2 border-bgLight2 dark:border-messageListBorder hover:bg-messageHoverLight dark:hover:bg-messageHover hover:cursor-pointer'>
                                <img className='w-14 h-14 object-cover rounded-full shadow-2xl shadow-neutral-900' src={item.user.photoURL} alt="user" />
                                <div className='w-full flex flex-col justify-center ml-4'>
                                    <h1 className='text-base tracking-wider mb-1'>{item.user.name} <span className='text-xs'> </span></h1>
                                    <p className='text-sm tracking-wider text-phoneNumber'>@{item.user.username}</p>
                                </div>
                            </div>
                        ))
                    }

                </div>
            }

        </div>
    )
}

export default FriendsSearch