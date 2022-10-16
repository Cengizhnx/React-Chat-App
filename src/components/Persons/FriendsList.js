import React from 'react'
import { Toaster } from 'react-hot-toast';
import FriendsSearch from './FriendsSearch';

function FriendsList({ friends }) {


    return (
        <div className='w-full h-full flex flex-col items-center justify-start rounded-bl-xl'>

            {
                !friends.length > 0 && <div className='w-full h-full flex flex-col items-center justify-center'>
                    <img className='w-48 h-48 object-cover rounded-full shadow-2xl bg-gray-400 shadow-neutral-900' src="https://cdn-icons-png.flaticon.com/512/4821/4821645.png" alt="user" />
                    <h1 className='text-xl text-gray-400 my-6 '>Henüz arkadaşınız yok.</h1>
                    <p className='text-base text-gray-500'>Arkadaşlarınız bu sayfada görünür.</p>
                </div>
            }

            {
                friends.length > 0 &&
                <div className='w-full h-full justify-center items-center overflow-y-auto'>
                    <FriendsSearch friends={friends}></FriendsSearch>
                    {
                        friends.map((item, key) => (

                            <div key={key} className='w-full overflow-hidden h-20 flex items-center justify-between hoverMessage px-6 border-b-2 border-neutral-800 hover:bg-zinc-700 hover:cursor-pointer'>
                                {
                                    <div className='w-full h-20 flex items-center justify-between hoverMessage'>

                                        <img className='w-14 h-14 object-cover rounded-full shadow-2xl shadow-neutral-900' src={item.user.photoURL} alt="user" />
                                        <div className='w-full flex flex-col justify-center ml-4'>
                                            <h1 className='text-base tracking-wider mb-1'>{item.user.name} <span className='text-xs'> </span></h1>
                                            <p className='text-sm tracking-wider text-neutral-400'>@{item.user.username}</p>
                                        </div>
                                    </div>
                                }
                            </div>
                        ))
                    }
                </div>
            }
            <Toaster position='top-right'></Toaster>
        </div>

    )
}

export default FriendsList