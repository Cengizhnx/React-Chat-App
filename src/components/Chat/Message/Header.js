import React from 'react'

function Header() {
  return (
    <div style={{ backgroundColor: "#323237" }} className='w-full h-20 rounded-tr-xl flex items-center border-b-2 border-stone-700'>
      <div className='w-full px-5 flex flex-row items-center justify-start' >
        <button>
          <img className='w-10 h-10 object-cover rounded-full shadow-2xl shadow-neutral-900' id='myimg2' alt="" />
        </button>
        <div className='ml-5 flex flex-col'>
          <h1 className='text-base tracking-wider'>Users</h1>
          <p className='text-xs tracking-wide text-slate-400'>Users</p>
        </div>
      </div>

    </div>
  )
}

export default Header