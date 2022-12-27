import React, { useEffect } from 'react'
import { HiChevronDoubleLeft } from "react-icons/hi";
import { GrClose } from "react-icons/gr";
import { auth, db } from '../../firebase';
import Storiess from 'react-insta-stories';
import AddStory from './AddStory';
import { doc, onSnapshot } from 'firebase/firestore';
import { useState } from 'react';
import moment from 'moment/moment';

function Stories({ friends }) {

    const [story, setStory] = useState([])
    const [open, setOpen] = useState(false)
    const [id, setId] = useState(false)

    useEffect(() => {

        const getStories = (id) => {

            const response = onSnapshot(doc(db, "stories", id), (doc) => {
                doc.exists() && setStory(doc.data().stories)
            })
            return () => {
                response()
            }
        }
        id && getStories(id)

    }, [friends, id])

    const stories = [
        story?.map((item) => (
            {
                url: item.photoURL,
                duration: 5000,
                header: {
                    heading: item.caption,
                    subheading: moment(item.date).format("H:mm"),
                    profileImage: item.publishPhoto,
                },
            }),
        )

    ];

    function hidevisible_home() {
        document.getElementById("div_left").style.display = "block";
        document.getElementById("div_stories").style.display = "none";
    }

    return (
        <div className='w-full h-full flex flex-col items-center justify-start'>
            <div className='w-full h-16 p-5 flex flex-row items-center justify-between text-black dark:text-white bg-bgLight2 dark:bg-bgDark2 rounded-tl-xl'>
                <div className='flex flex-row'>
                    <button onClick={hidevisible_home}>
                        <HiChevronDoubleLeft className="h-5 w-5 mr-3 text-black hover:bg-messageHover hover:text-white dark:text-white dark:hover:bg-bgLight2 dark:hover:text-black hover:rounded-2xl hover:cursor-pointer" />
                    </button>
                    <h1>Stories</h1>
                </div>

                <div className='flex flex-row'>
                    <AddStory></AddStory>
                </div>
            </div>
            <div className='w-full h-full flex flex-col items-center justify-start'>
                <div onClick={() => { setOpen(true); setId(auth.currentUser.uid) }} className='w-full overflow-hidden h-20 flex items-center justify-between hoverMessage px-6 border-b-2 border-bgLight2 dark:border-messageListBorder hover:bg-messageHoverLight dark:hover:bg-messageHover hover:cursor-pointer'>
                    <div className='w-full h-20 flex items-center justify-between hoverMessage'>
                        <img className='w-14 h-14 object-cover rounded-full shadow-2xl shadow-neutral-900' src={auth.currentUser.photoURL} alt="user" />
                        <div className='w-full flex flex-col justify-center ml-4'>
                            <h1 className='text-base tracking-wider mb-1'>{auth.currentUser.displayName} </h1>
                            <p className='text-sm tracking-wider text-phoneNumber'>@{auth.currentUser.displayName}</p>
                        </div>
                    </div>
                </div>
                {
                    friends?.length > 0 && friends?.sort((a, b) => a.user.username > b.user.username ? 1 : -1).map((item, key) => (

                        <div key={key} onClick={() => { setOpen(true); setId(item.user.uid) }} className='w-full overflow-hidden h-20 flex items-center justify-between hoverMessage px-6 border-b-2 border-bgLight2 dark:border-messageListBorder hover:bg-messageHoverLight dark:hover:bg-messageHover hover:cursor-pointer'>
                            {
                                <div className='w-full h-20 flex items-center justify-between hoverMessage'>

                                    <img className='w-14 h-14 object-cover rounded-full shadow-2xl shadow-neutral-900' src={item.user.photoURL} alt="user" />
                                    <div className='w-full flex flex-col justify-center ml-4'>
                                        <h1 className='text-base tracking-wider mb-1'>{item.user.name} </h1>
                                        <p className='text-sm tracking-wider text-phoneNumber'>@{item.user.username}</p>
                                    </div>
                                </div>
                            }
                        </div>
                    ))
                }
                {
                    story && story?.length > 0 && open && <div className='w-full z-50 left-0 right-0 bottom-5 fixed flex flex-row items-start justify-center'>
                        <Storiess
                            keyboardNavigation={true}
                            stories={stories[0]}
                            defaultInterval={1500}
                            width={400}
                            height={700}
                            loop={true}
                        />
                        <GrClose onClick={() => setOpen(false)} className="h-5 w-5 ml-3 text-black hover:bg-messageHover hover:text-white dark:text-white dark:hover:bg-bgLight2 dark:hover:text-black hover:rounded-2xl hover:cursor-pointer" />

                    </div>
                }

            </div>
        </div>)
}

export default Stories