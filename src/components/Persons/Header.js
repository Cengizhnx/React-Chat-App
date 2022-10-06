import React, { useEffect } from 'react'
import { AiOutlineLogin } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { auth, getUserPhoto2, userLogout } from '../../firebase';
import { logout } from '../../redux/userSlice';

function Header({ data }) {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const status = useSelector(state => state.users.status)
    const user = data.find(item => item.uid === auth.currentUser.uid)

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
    

    useEffect(() => {
        if (!status) {
            getUserPhoto2()
        }
    }, [status, user])

    return (
        <div style={{ backgroundColor: "#323237" }} className='w-full h-16 mb-1 rounded-tl-xl flex items-center'>
            <div className='w-full px-5 flex flex-row items-center justify-between' >
                <button onClick={hidevisible_menu}>
                    <img className='w-10 h-10 object-cover rounded-full shadow-2xl shadow-neutral-900' id='myimg2' alt="" />
                </button>
                <h1 className='text-base tracking-wider'>{user.name}</h1>
                <Link onClick={handleLogout} >
                    <AiOutlineLogin className="h-6 w-6 hover:bg-white hover:text-black hover:rounded-2xl hover:cursor-pointer" />
                </Link>
            </div>

        </div>
    )
}

export default Header