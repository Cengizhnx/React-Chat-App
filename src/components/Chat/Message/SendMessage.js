import { useSelector } from 'react-redux';
import { auth } from '../../../firebase';
import "./styles.css"
import moment from 'moment'
import { useEffect, useRef } from 'react';

function SendMessage({ message }) {

    const selectUser = useSelector(state => state.users.selectUser)

    const ref = useRef();

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);

    return (
        <div ref={ref} className={`message flex items-center ${message.senderId === auth.currentUser.uid && "owner"}`}>
            {
                message[auth.currentUser.uid] === false &&
                <>
                    <div className="messageInfo flex items-center">
                        <img className='w-12 h-12 object-cover rounded-full shadow-2xl shadow-neutral-900' src={message.senderId === auth.currentUser.uid ? auth.currentUser.photoURL : selectUser.photoURL} alt="landing" />
                        <h5 className='text-xs mt-1 tracking-wider text-bgDark0 dark:text-bgLight2'>{moment(message.date?.toDate()).format("H:mm")}</h5>
                    </div>
                    <div className="messageContent">
                        <p className={`flex flex-col w-96 text-sm tracking-wide ${message.senderId === auth.currentUser.uid ? "dark:text-bgLight2 dark:bg-bgDark1" : "dark:text-white dark:bg-bgDarkInput"}`}> {message.text}
                            {
                                message.img &&

                                <img className='w-80 m-auto py-2 object-cover shadow-2xl shadow-neutral-900' src={message.img} alt="img" />
                            }
                        </p>


                    </div>
                </>
            }

        </div >
    )
}

export default SendMessage