import React from 'react'
import { useSelector } from 'react-redux'

function Header() {

  const selectUser = useSelector(state => state.users.selectUser)

  function hidevisible_chat() {
    document.getElementById("bio").style.display = "block";
    document.getElementById("chat_header").style.borderTopRightRadius = "0";
    document.getElementById("chat_footer").style.borderBottomRightRadius = "0";
  }

  return (
    <div style={{ backgroundColor: "#323237" }} onClick={() => hidevisible_chat()} id="chat_header" className='w-full h-20 rounded-tr-xl flex items-center cursor-pointer border-b-2 border-stone-700'>
      <div className='w-full px-5 flex flex-row items-center justify-start' >
        <button>
          <img className='w-10 h-10 object-cover rounded-full shadow-2xl shadow-neutral-900' src={selectUser.photoURL} alt="" />
        </button>
        <div className='ml-5 flex flex-col'>
          <h1 className='text-base tracking-wider'>{selectUser.name}</h1>
          <p className='text-xs tracking-wide text-slate-400'>{selectUser.description}</p>
        </div>
      </div>

    </div>
  )
}

export default Header