import { Toaster } from 'react-hot-toast';
import FriendsSearch from './FriendsSearch';
import { useDispatch, useSelector } from 'react-redux';
import { addSelectUSer, chatID } from '../../redux/userSlice';
import { auth, GetUserProfile } from '../../firebase';

function FriendsList({ friends }) {

    const dispatch = useDispatch()

    const data = GetUserProfile()

    function hidevisible_chat(item) {
        document.getElementById("landing2").style.display = "block";
        document.getElementById("landing1").style.display = "none";

        const filter = data?.find(items => items.uid === item.uid)
        dispatch(addSelectUSer(filter))

        const cid = auth.currentUser.uid > filter.uid
            ? auth.currentUser.uid + filter.uid
            : filter.uid + auth.currentUser.uid;
        dispatch(chatID(cid))
    }

    return (
        <div className='w-full h-full flex flex-col items-center justify-start rounded-bl-xl'>

            {
                !friends.length > 0 && <div className='w-full h-full flex flex-col items-center justify-center'>
                    <img className='w-48 h-48 object-cover rounded-full bg-bgLight1 dark:bg-gray-400 dark:shadow-2xl dark:shadow-neutral-900' src="https://cdn-icons-png.flaticon.com/512/4821/4821645.png" alt="user" />
                    <h1 className='text-xl text-gray-700 dark:text-gray-400 my-6 '>You don't have any friends yet.</h1>
                    <p className='text-base text-gray-600 dark:text-gray-500'>Your friends appear on this page.</p>
                </div>
            }

            {
                friends.length > 0 &&
                <div className='w-full h-full justify-center items-center overflow-y-auto'>
                    <FriendsSearch friends={friends}></FriendsSearch>
                    {
                        friends.sort((a, b) => a.user.username > b.user.username ? 1 : -1).map((item, key) => (

                            <div key={key} onClick={() => hidevisible_chat(item.user)} className='w-full overflow-hidden h-20 flex items-center justify-between hoverMessage px-6 border-b-2 border-bgLight2 dark:border-messageListBorder hover:bg-messageHoverLight dark:hover:bg-messageHover hover:cursor-pointer'>
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
                </div>
            }
            <Toaster position='top-right'></Toaster>
        </div>

    )
}

export default FriendsList