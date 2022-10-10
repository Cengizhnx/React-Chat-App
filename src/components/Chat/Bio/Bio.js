import React from 'react'
import { useSelector } from 'react-redux'
import { BiBlock } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";

function Bio() {
    const selectUser = useSelector(state => state.users.selectUser)

    let result = selectUser?.phone_number?.substr(0, 3) + " " + selectUser?.phone_number?.substr(3, 3) + " " + selectUser?.phone_number?.substr(6, 3) + " " + selectUser?.phone_number?.substr(9, 2) + " " + selectUser?.phone_number?.substr(11, 2);

    return (
        <div style={{ backgroundColor: "#191a20" }} className='w-full flex flex-col items-center justify-center'>
            <div className='flex flex-col items-center justify-center my-6'>
                <img className='w-44 h-44 object-cover rounded-full shadow-2xl shadow-neutral-900' src={selectUser.photoURL} id='myimg' alt="" />
                <h1 className='text-2xl text-white tracking-wide mt-5'>{selectUser.name}</h1>
                <p className='text-sm tracking-wider text-neutral-400 mt-2'>{result}</p>
            </div>
            <div className='w-5/6 h-20 flex flex-col justify-center px-8 border-y-2 rounded-2xl border-neutral-700'>
                <h1 className='text-base text-white tracking-wide'>About Me</h1>
                <p className='text-sm tracking-wider text-neutral-400 mt-1'>{selectUser.description}</p>
            </div>
            <div className='w-5/6 flex flex-col justify-center items-center my-6 px-8 py-4 border-y-2 rounded-2xl border-neutral-700'>
                <div className='w-full h-8 flex flex-row justify-evenly items-center text-red-400 rounded-lg hover:bg-zinc-700 hover:cursor-pointer mb-5'>
                    <div className='flex justify-center items-center'>
                        <BiBlock className="h-6 w-6" />
                    </div>
                    <p>@{selectUser.username} kişisini engelle</p>
                </div>
                <div className='w-full h-8 flex flex-row justify-evenly items-center text-red-400 rounded-lg hover:bg-zinc-700 hover:cursor-pointer'>
                    <div className='flex justify-center items-center'>
                        <FaTrash className="h-5 w-5" />
                    </div>
                    <p>@{selectUser.username} ile sohbeti sil</p>
                </div>

            </div>
        </div>
    )
}

export default Bio