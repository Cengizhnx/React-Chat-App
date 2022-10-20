import React from 'react'
import { Link } from 'react-router-dom';
import { VscChromeClose } from "react-icons/vsc";

function BioHeader() {

  function hidevisible_chat() {
    document.getElementById("bio").style.display = "none";
    document.getElementById("chat_header").style.borderTopRightRadius = "12px";
    document.getElementById("chat_footer").style.borderBottomRightRadius = "12px";

  }

  return (
    <div className='w-full h-16 bg-bgLight2 dark:bg-bgDark2 rounded-tr-xl flex p-5 items-center'>
      <Link onClick={hidevisible_chat} >
        <VscChromeClose className="h-5 w-5 text-black hover:bg-messageHover hover:text-white dark:text-white dark:hover:bg-bgLight2 dark:hover:text-black hover:rounded-2xl hover:cursor-pointer" />
      </Link>
    </div>
  )
}

export default BioHeader