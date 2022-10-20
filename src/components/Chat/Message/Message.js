import { TextInput } from 'flowbite-react'
import React from 'react'
import { BiMessageRounded } from "react-icons/bi";


function Message() {
  return (
    <div id="chat_footer" className='w-full h-20 rounded-br-xl flex items-center bg-bgLight2 dark:bg-bgDark2 border-t-2 border-gray-300 dark:border-chatBorder'>
      <div className='w-full px-5 flex flex-row items-center justify-between' >
        <button >
          <img className='w-8 h-8 object-cover rounded-full shadow-2xl shadow-neutral-900' id='myimg2' alt="" />
        </button>
        <button>
          <img className='w-8 h-8 object-cover rounded-full shadow-2xl shadow-neutral-900' id='myimg2' alt="" />
        </button>
        <div className='flex flex-row justify-start items-center w-5/6 h-12 p-1 rounded-lg bg-bgLight2 dark:bg-bgDark2'>
          <input
            className='relative w-full rounded-md bg-bgLight1 text-bgDark1 dark:text-bgLight2 dark:bg-bgDarkInput focus:ring-2 focus:ring-white dark:focus:ring-bgDark0'
            style={{ border: "none", fontSize: "14px", letterSpacing: "0.3px", paddingLeft: "45px" }}
            type="text"
            placeholder="Send Message"
          />
          <BiMessageRounded className="h-5 w-5 mx-3 absolute text-phoneNumber" />

        </div>
        <button>
          <img className='w-8 h-8 object-cover rounded-full shadow-2xl shadow-neutral-900' id='myimg2' alt="" />
        </button>
      </div>

    </div>
  )
}

export default Message