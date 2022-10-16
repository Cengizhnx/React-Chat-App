import { TextInput } from 'flowbite-react'
import { useState } from 'react';
import { HiOutlineSearch } from "react-icons/hi";
import { useDispatch } from 'react-redux';
import { addSelectUSer } from '../../redux/userSlice';

function FriendsSearch({ friends }) {

    const dispatch = useDispatch()
    const [user, setUser] = useState("")

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
        setUser("")
    }

    return (
        <div className='w-full flex flex-col items-center justify-center my-2'>
            <div style={{ backgroundColor: "#323237" }} className='w-5/6 h-10 p-1 rounded-lg'>
                <TextInput
                    style={{ backgroundColor: "#323237", border: "none", color: "white", fontSize: "14px", letterSpacing: "0.3px", paddingLeft: "45px", }}
                    id="small"
                    type="text"
                    sizing="sm"
                    placeholder="Call friends or start a new chat"
                    icon={HiOutlineSearch}
                    onChange={(e) => getUser(e.target.value)}
                />
            </div>
            {
                user &&
                <div className='w-full'>
                    {
                        user.length > 0 &&
                        <div className='text-center mt-2'>
                            <h1 className='tracking-wider text-gray-400'>SEARCH ({user.length})</h1>
                        </div>
                    }

                    {
                        user.map((item, key) => (
                            <div key={key} onClick={() => hidevisible_chat(item)} className='w-full overflow-hidden my-2 h-20 flex items-center justify-between hoverMessage px-6 border-b-2 border-neutral-800 hover:bg-zinc-700 hover:cursor-pointer'>
                                <img className='w-14 h-14 object-cover rounded-full shadow-2xl shadow-neutral-900' src={item.user.photoURL} alt="user" />
                                <div className='w-full flex flex-col justify-center ml-4'>
                                    <h1 className='text-base tracking-wider mb-1'>{item.user.name} <span className='text-xs'> </span></h1>
                                    <p className='text-sm tracking-wider text-neutral-400'>@{item.user.username}</p>
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