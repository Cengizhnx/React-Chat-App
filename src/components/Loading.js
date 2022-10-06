import React from 'react'
import Gif from "../../src/assets/message.gif";
import "./style.css"

function Loading() {
    return (
        <div className='flex flex-col w-full justify-center items-center'>
            <h1 className='text-4xl text-white pb-10 loadingText tracking-wide'>ChatApp Web</h1>
            <div>
                <img className='w-56 h-56 rounded-full shadow-2xl shadow-neutral-900' src={Gif} alt="" />
            </div>
        </div>
    )
}

export default Loading