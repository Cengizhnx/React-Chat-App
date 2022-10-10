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
    <div style={{ backgroundColor: "#323237" }} className='w-full h-16 rounded-tr-xl flex p-5 items-center'>
      <Link onClick={hidevisible_chat} >
        <VscChromeClose className="h-5 w-5 text-white hover:bg-white hover:text-black hover:rounded-2xl hover:cursor-pointer" />
      </Link>
    </div>
  )
}

export default BioHeader