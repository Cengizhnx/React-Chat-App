import React from 'react'
import { AiOutlineLogin } from "react-icons/ai";
import { Link } from 'react-router-dom';

function Header() {
    return (
        <div style={{ backgroundColor: "#323237" }} className='w-full h-16 mb-1 rounded-tl-xl flex items-center'>
            <div className='w-full px-5 flex flex-row items-center justify-between '>
                <img className='w-10 rounded-full shadow-2xl shadow-neutral-900' src="https://pbs.twimg.com/profile_images/1476294398782672898/eBuhTSsJ_400x400.jpg" alt="landing" />
                <h1 className='text-base tracking-wider'>Cengiz Drms</h1>
                <Link to="/login">
                    <AiOutlineLogin className="h-6 w-6 hover:bg-white hover:text-black hover:rounded-2xl hover:cursor-pointer" />
                </Link>
            </div>
        </div>
    )
}

export default Header