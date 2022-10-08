import { TextInput } from 'flowbite-react'
import { useState } from 'react';
import { HiOutlineSearch } from "react-icons/hi";
import { GetUserProfile } from '../../firebase';

function Search() {

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

    function hidevisible_chat() {
        document.getElementById("landing2").style.display = "block";
        document.getElementById("landing1").style.display = "none";
    }

    return (
        <div className='w-full flex flex-col items-center justify-center my-2'>
            <div style={{ backgroundColor: "#323237" }} className='w-5/6 h-12 p-1 rounded-lg'>
                <TextInput
                    style={{ backgroundColor: "#323237", border: "none", color: "white", fontSize: "14px", letterSpacing: "0.3px", paddingLeft: "45px", }}
                    id="small"
                    type="text"
                    sizing="md"
                    placeholder="Call or start a new chat"
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
                            <div onClick={hidevisible_chat} className='w-full overflow-hidden my-2 h-20 flex items-center justify-between hoverMessage px-6 border-b-2 border-neutral-800 hover:bg-zinc-700 hover:cursor-pointer'>
                                <img className='w-14 rounded-full shadow-2xl shadow-neutral-900' src="https://pbs.twimg.com/profile_images/1476294398782672898/eBuhTSsJ_400x400.jpg" alt="landing" />
                                <div className='w-full flex flex-col justify-center ml-4'>
                                    <h1 className='text-base tracking-wider mb-1'>{item.name} <span className='text-xs'> </span></h1>
                                    <p className='text-sm tracking-wider text-neutral-400'>@{item.username}</p>
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