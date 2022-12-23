import { useSelector } from 'react-redux';
import { auth } from '../../../firebase';
import "./styles.css"
import moment from 'moment'
import { useEffect, useRef } from 'react';

function SendMessage({ message }) {

    const selectUser = useSelector(state => state.users.selectUser)
    const userState = useSelector(state => state.users.userState)

    const ref = useRef();

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);

    return (
        <div ref={ref} className={`message flex items-center ${message.senderId === auth.currentUser.uid && "owner"}`}>
            {

                <>
                    <div className="messageInfo flex items-center">
                        {
                            selectUser.type === "group"
                                ? <img className='w-12 h-12 object-cover rounded-full shadow-2xl shadow-neutral-900' src={message.senderId === auth.currentUser.uid ? auth.currentUser.photoURL : message.senderPhotoUrl} alt="group" />
                                : <img className='w-12 h-12 object-cover rounded-full shadow-2xl shadow-neutral-900' src={message.senderId === auth.currentUser.uid ? auth.currentUser.photoURL : (userState && selectUser.photoURL ? selectUser.photoURL : "https://cdn-icons-png.flaticon.com/512/149/149071.png")} alt="user" />
                        }
                    </div>
                    <div className="messageContent">
                        <p className={`flex flex-col w-96 text-sm tracking-wide ${message.senderId === auth.currentUser.uid ? "dark:text-bgLight2 dark:bg-bgDark1" : "dark:text-white dark:bg-bgDarkInput"}`}> {message.text}

                            {
                                message.img &&

                                <img className='w-80 m-auto py-2 object-cover shadow-2xl shadow-neutral-900' src={message.img} alt="img" />
                            }
                            <h5 className='text-xs text-right text-gray-400 mt-1 tracking-wider'>{moment(Date.now() - 86400000).format("DD H:mm") < moment(message.date).format("DD H:mm") ? moment(message.date).format("H:mm") : moment(message.date).format("DD MMM H:mm")}</h5>

                        </p>


                    </div>
                </>
            }

        </div >
    )
}

export default SendMessage