import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux';
import { auth } from '../../../firebase';
import "./styles.css"
import moment from 'moment'


function SendMessage({ message }) {

    const selectUser = useSelector(state => state.users.selectUser)

    return (
        <div className={`message flex items-center ${message.senderId === auth.currentUser.uid && "owner"}`}>
            <div className="messageInfo flex items-center">
                <img className='w-12 h-12 object-cover rounded-full shadow-2xl shadow-neutral-900' src={message.senderId === auth.currentUser.uid ? auth.currentUser.photoURL : selectUser.photoURL} alt="landing" />
                <h5 className='text-xs mt-1 tracking-wider text-bgDark0 dark:text-bgLight2'>{moment(message.date?.toDate()).format("H:mm")}</h5>
            </div>
            <div className="messageContent">
                <p className={`text-sm tracking-wide ${message.senderId === auth.currentUser.uid ? "dark:text-bgLight2 dark:bg-bgDark1" : "dark:text-white dark:bg-bgDarkInput"}`}> {message.text}</p>
                {
                    message.img &&

                    <img className='object-cover shadow-2xl shadow-neutral-900' src="https://pbs.twimg.com/profile_images/1476294398782672898/eBuhTSsJ_400x400.jpg" alt="landing" />
                }
            </div>
        </div >
    )
}

export default SendMessage