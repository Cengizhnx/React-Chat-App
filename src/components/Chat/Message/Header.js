import React from 'react'
import { useSelector } from 'react-redux'
import { GetUserProfile } from '../../../firebase'

function Header() {

  const selectUser = useSelector(state => state.users.selectUser)
  const userState = useSelector(state => state.users.userState)

  const data = GetUserProfile()

  const filter = data?.find((item) => item.uid === selectUser.uid)

  function hidevisible_chat() {
    document.getElementById("bio").style.display = "block";
    document.getElementById("chat_header").style.borderTopRightRadius = "0";
    document.getElementById("chat_footer").style.borderBottomRightRadius = "0";
  }

  return (
    <div onClick={() => hidevisible_chat()} id="chat_header" className='w-full h-20 bg-bgLight2 dark:bg-bgDark2 rounded-tr-xl flex items-center cursor-pointer border-b-2 border-gray-300 dark:border-messageHover'>
      <div className='w-full px-5 flex flex-row items-center justify-start' >
        <button>
          <img className='w-10 h-10 object-cover rounded-full shadow-2xl shadow-neutral-900' src={(userState && selectUser.photoURL) ? selectUser.photoURL : "https://cdn-icons-png.flaticon.com/512/149/149071.png"} alt="" />
        </button>
        <div className='ml-5 flex flex-col'>
          <h1 className='text-base text-black dark:text-white tracking-wider'>{selectUser.name}</h1>
          <p className='text-xs tracking-wide text-phoneNumber'>{selectUser.type === "group" ? selectUser.description : filter?.description}</p>
        </div>
      </div>

    </div>
  )
}

export default Header