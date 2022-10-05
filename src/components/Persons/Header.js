import React from 'react'
import { AiOutlineLogin } from "react-icons/ai";
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { userLogout } from '../../firebase';
import { logout } from '../../redux/userSlice';

function Header({ data }) {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogout = async () => {
        await userLogout()

        dispatch(logout())

        navigate('/login', {
            replace: true
        })
    }

    function hidevisible_menu() {
        document.getElementById("div_left").style.display = "none";
        document.getElementById("div_right").style.display = "block";
    }

    return (
        <div style={{ backgroundColor: "#323237" }} className='w-full h-16 mb-1 rounded-tl-xl flex items-center'>
            <div className='w-full px-5 flex flex-row items-center justify-between' >
                <button onClick={hidevisible_menu}>
                    <img className='w-10 rounded-full shadow-2xl shadow-neutral-900' src="https://pbs.twimg.com/profile_images/1476294398782672898/eBuhTSsJ_400x400.jpg" alt="landing" />
                </button>
                <h1 className='text-base tracking-wider'>Username</h1>
                <Link onClick={handleLogout} >
                    <AiOutlineLogin className="h-6 w-6 hover:bg-white hover:text-black hover:rounded-2xl hover:cursor-pointer" />
                </Link>
            </div>

        </div>
    )
}

export default Header