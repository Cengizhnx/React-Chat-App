import React from 'react'
import { HiOutlineSearch } from "react-icons/hi";
import { useDispatch } from 'react-redux';
import { useState } from 'react'
import { addGroupPrew } from '../../../redux/userSlice';
import { GetUserProfile } from '../../../firebase';

function ModalSearch() {
    const [user, setUser] = useState("")
    const data = GetUserProfile()
    const dispatch = useDispatch()

    // User Search
    const getUser = (e) => {
        const filtered = data.filter((item) => item.username.toLowerCase().includes(e.toLowerCase()))
        if (e.length > 0) {
            setUser(filtered)
        }
        if (e === "") {
            setUser("")
        }
    }

    const addGroupPrewiew = (item) => {
        dispatch(addGroupPrew(item))
        setUser("")
    }

    return (
        <div className='w-full flex flex-col items-center justify-center'>
            <div className='flex flex-row justify-start items-center w-5/6 h-12 p-1 rounded-lg bg-bgLight2 '>
                <input
                    className='relative w-full rounded-md bg-bgLight2 text-bgDark1 dark:text-messageListBorder  focus:ring-2 focus:ring-white'
                    style={{ border: "none", fontSize: "14px", letterSpacing: "0.3px", paddingLeft: "45px" }}
                    type="text"
                    placeholder="User search"
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
                            <h1 className='tracking-wider text-gray-500 dark:text-gray-400'>SEARCH ({user.length})</h1>
                        </div>
                    }
                    <div className='w-full flex flex-nowrap overflow-y-auto'>
                        {
                            user.map((item, key) => (
                                <div key={key} onClick={() => addGroupPrewiew(item)} className='w-full overflow-hidden my-2 mx-2 h-20 rounded-lg flex items-center justify-between hoverMessage px-6 border-b-2 border-bgLight2 dark:border-loginInfo hover:bg-messageHoverLight dark:hover:bg-loginInfo hover:cursor-pointer'>
                                    <img className='w-14 h-14 object-cover rounded-full shadow-2xl shadow-neutral-900' src={item.photoURL ? item.photoURL : "https://cdn-icons-png.flaticon.com/512/149/149071.png"} alt="user" />
                                    <div className='w-full flex flex-col justify-center ml-4'>
                                        <h1 className='text-base tracking-wider mb-1 dark:text-white'>{item.name} <span className='text-xs'> </span></h1>
                                        <p className='text-sm font-medium tracking-wide text-phoneNumber dark:text-gray-300'>@{item.username}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            }

        </div>
    )
}

export default ModalSearch