import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteGroupPrew } from '../../redux/userSlice';
import { IoMdClose } from "react-icons/io";

function GroupAddList() {

    const groupPrew = useSelector(state => state.users.groupPrew)
    const dispatch = useDispatch()

    const deleteGroupPrewiew = (item) => {
        dispatch(deleteGroupPrew(item))
    }
    return (
        <div className='w-full flex flex-col items-center justify-start rounded-bl-xl'>
            {
                groupPrew.length > 0 &&
                <div className='w-full h-full justify-center items-center overflow-y-auto'>
                    <div className='text-center my-2'>
                        <h1 className='tracking-wider text-gray-500 dark:text-gray-400'>GROUP USERS ({groupPrew.length})</h1>
                    </div>
                    {
                        groupPrew.map((item, key) => (
                            <div key={key} className='w-full overflow-hidden h-20 flex items-center justify-between hoverMessage px-6 border-b-2 border-bgLight2 dark:border-messageListBorder hover:bg-messageHoverLight dark:hover:bg-messageHover hover:cursor-pointer'>
                                {
                                    <div className='w-full h-20 flex items-center justify-between hoverMessage'>

                                        <img className='w-14 h-14 object-cover rounded-full shadow-2xl shadow-neutral-900' src={item.photoURL} alt="user" />
                                        <div className='w-full flex flex-col justify-center ml-4'>
                                            <h1 className='text-base tracking-wider mb-1'>{item.name} <span className='text-xs'> </span></h1>
                                            <p className='text-sm tracking-wider text-phoneNumber'>@{item.username}</p>
                                        </div>
                                        <IoMdClose onClick={() => deleteGroupPrewiew(item)} className="h-6 w-6 text-black hover:bg-messageHover hover:text-white dark:text-white dark:hover:bg-bgLight2 dark:hover:text-black hover:rounded-xl hover:cursor-pointer" />
                                    </div>
                                }
                            </div>
                        ))
                    }
                </div>
            }
        </div>
    )
}

export default GroupAddList