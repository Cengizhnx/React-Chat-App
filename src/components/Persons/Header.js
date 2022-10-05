import React from 'react'
import { AiOutlineLogin } from "react-icons/ai";
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { auth, userLogout } from '../../firebase';
import { logout } from '../../redux/userSlice';

function Header() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogout = async () => {
        await userLogout()

        dispatch(logout())

        navigate('/login', {
            replace: true
        })
    }

    return (
        <div style={{ backgroundColor: "#323237" }} className='w-full h-16 mb-1 rounded-tl-xl flex items-center'>
            <div className='w-full px-5 flex flex-row items-center justify-between '>
                <img className='w-10 rounded-full shadow-2xl shadow-neutral-900' src="https://pbs.twimg.com/profile_images/1476294398782672898/eBuhTSsJ_400x400.jpg" alt="landing" />
                <h1 className='text-base tracking-wider'>{auth.currentUser.phoneNumber}</h1>
                <Link onClick={handleLogout} >
                    <AiOutlineLogin className="h-6 w-6 hover:bg-white hover:text-black hover:rounded-2xl hover:cursor-pointer" />
                </Link>
            </div>
        </div>
    )
}

export default Header