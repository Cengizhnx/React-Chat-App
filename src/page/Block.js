import React from 'react'
import { HiChevronDoubleLeft } from "react-icons/hi";
import { BiBlock } from "react-icons/bi";
import { userDeblock } from '../firebase';
import { Toaster } from 'react-hot-toast';

function Block({ blocks }) {

    function hidevisible_home() {
        document.getElementById("div_left").style.display = "block";
        document.getElementById("div_block").style.display = "none";
    }

    const handleDeblock = async (item) => {
        await userDeblock(item)
    }

    return (
        <div className='w-full h-full flex flex-col items-center justify-center '>
            <button onClick={hidevisible_home}>

                <HiChevronDoubleLeft className="absolute m-4 h-5 w-5 top-5 left-5 text-black hover:bg-bgDark1 hover:text-white dark:text-white dark:hover:bg-bgLight2 dark:hover:text-black hover:rounded-2xl hover:cursor-pointer" />
            </button>

            {
                !blocks.length > 0 && <div className='w-full h-full flex flex-col items-center justify-center'>
                    <img className='w-48 h-48 object-cover rounded-full bg-bgLight1 dark:bg-gray-400 dark:shadow-2xl dark:shadow-neutral-900' src="https://cdn-icons-png.flaticon.com/512/5911/5911250.png" alt="user" />
                    <h1 className='text-xl text-gray-700 dark:text-gray-400 my-6 '>There are no blocked contacts yet.</h1>
                    <p className='text-base text-gray-600 dark:text-gray-500'>Blocked contacts cannot send you messages.</p>
                </div>
            }

            {
                blocks.length > 0 &&
                <div className='w-full h-full justify-center items-center overflow-y-auto mt-16'>
                    {
                        blocks.sort((a, b) => a.user.username > b.user.username ? 1 : -1).map((item, key) => (

                            <div key={key} className='w-full overflow-hidden h-20 flex items-center mb-2 justify-between hoverMessage px-6 border-b-2 border-bgLight2 dark:border-messageListBorder'>
                                {
                                    <div className='w-full h-20 flex items-center justify-between hoverMessage'>

                                        <img className='w-14 h-14 object-cover rounded-full shadow-2xl shadow-neutral-900' src={item.user.photoURL} alt="user" />
                                        <div className='w-full flex flex-col justify-center ml-4'>
                                            <h1 className='text-base tracking-wider text-black dark:text-white mb-1'>{item.user.name} <span className='text-xs'> </span></h1>
                                            <p className='text-sm tracking-wider text-phoneNumber'>@{item.user.username}</p>
                                        </div>

                                        <div onClick={() => handleDeblock(item)} className='w-2/3 h-8 flex flex-row justify-center items-center text-red-700 dark:text-red-400 rounded-lg hover:bg-messageHoverLight dark:hover:bg-messageHover hover:cursor-pointer '>
                                            <div className='flex justify-evenly items-center pr-2'>
                                                <BiBlock className="h-6 w-6" />
                                            </div>
                                            <p className='select-none'>remove block</p>
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

export default Block