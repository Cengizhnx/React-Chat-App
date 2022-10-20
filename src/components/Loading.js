import React from 'react'
import Gif from "../../src/assets/gifLight.gif";
import GifDark from "../../src/assets/message.gif";
import "./style.css"

function Loading() {
    const theme = localStorage.getItem("theme")
    return (
        <div className='flex flex-col w-full justify-center items-center'>
            <h1 className='text-4xl text-black dark:text-white pb-10 loadingText italic tracking-wide'>ChatApp Web</h1>
            <div>
                {
                    theme === "light" ?
                        (
                            <img className='w-56 h-56 rounded-full border-4 border-bgDark0' src={Gif} alt="" />
                        )
                        :
                        (
                            <img className='w-56 h-56 rounded-full border-4 border-bgLight2 shadow-2xl shadow-neutral-900' src={GifDark} alt="" />
                        )
                }
            </div>
        </div>
    )
}

export default Loading