import { TextInput } from 'flowbite-react'
import { useState } from 'react';
import { HiOutlineSearch } from "react-icons/hi";
import { GetUserProfile } from '../../firebase';
import { useDispatch } from 'react-redux';
import { addSelectUSer } from '../../redux/userSlice';

function Search() {

    const dispatch = useDispatch()
    const [user, setUser] = useState("")
    const data = GetUserProfile()

    const getUser = (e) => {
        const filtered = data.filter((item) => item.username.toLowerCase().includes(e.toLowerCase()))
        if (e.length > 0) {
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
        setUser("")
    }

    const theme = localStorage.getItem("theme")

    return (
        <div className='w-full flex flex-col items-center justify-center my-2'>
            <div className='flex flex-row justify-start items-center w-5/6 h-12 p-1 rounded-lg bg-bgLight2 dark:bg-bgDark2'>
                <input
                    className='relative w-full rounded-md bg-bgLight2 text-bgDark1 dark:text-bgLight2 dark:bg-bgDark2 focus:ring-2 focus:ring-white dark:focus:ring-bgDark1'
                    style={{ border: "none", fontSize: "14px", letterSpacing: "0.3px", paddingLeft: "45px" }}
                    type="text"
                    placeholder="Call or start a new chat"
                    icon={HiOutlineSearch}
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

                    {
                        user.map((item, key) => (
                            <div key={key} onClick={() => hidevisible_chat(item)} className='w-full overflow-hidden my-2 h-20 flex items-center justify-between hoverMessage px-6 border-b-2 border-bgLight2 dark:border-messageListBorder hover:bg-messageHoverLight dark:hover:bg-messageHover hover:cursor-pointer'>
                                <img className='w-14 h-14 object-cover rounded-full shadow-2xl shadow-neutral-900' src={item.photoURL ? item.photoURL : "https://cdn-icons-png.flaticon.com/512/149/149071.png"} alt="user" />
                                <div className='w-full flex flex-col justify-center ml-4'>
                                    <h1 className='text-base tracking-wider mb-1'>{item.name} <span className='text-xs'> </span></h1>
                                    <p className='text-sm tracking-wider text-phoneNumber'>@{item.username}</p>
                                </div>
                            </div>
                        ))
                    }

                </div>
            }

        </div>
    )
}

export default Search