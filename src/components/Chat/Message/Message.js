import { TextInput } from 'flowbite-react'
import React from 'react'

function Message() {
  return (
    <div style={{ backgroundColor: "#323237" }} id="chat_footer" className='w-full h-20 rounded-br-xl flex items-center border-t-2 border-stone-700'>
      <div className='w-full px-5 flex flex-row items-center justify-between' >
        <button >
          <img className='w-8 h-8 object-cover rounded-full shadow-2xl shadow-neutral-900' id='myimg2' alt="" />
        </button>
        <button>
          <img className='w-8 h-8 object-cover rounded-full shadow-2xl shadow-neutral-900' id='myimg2' alt="" />
        </button>
        <div style={{ backgroundColor: "#323237" }} className='w-5/6 p-1 rounded-lg'>
          <TextInput
            style={{ backgroundColor: "#4c4a55", border: "none", color: "white", fontSize: "15px", letterSpacing: "0.3px", paddingLeft: "15px" }}
            id="small"
            type="text"
            sizing="md"
            placeholder="Bir mesaj yazın"
          />
        </div>
        <button>
          <img className='w-8 h-8 object-cover rounded-full shadow-2xl shadow-neutral-900' id='myimg2' alt="" />
        </button>
      </div>

    </div>
  )
}

export default Message