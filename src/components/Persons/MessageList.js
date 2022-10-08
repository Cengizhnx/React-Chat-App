import React from 'react'

function MessageList() {

    function hidevisible_chat() {
        document.getElementById("landing2").style.display = "block";
        document.getElementById("landing1").style.display = "none";
    }

    return (
        <div className='w-full flex flex-col items-center justify-start rounded-bl-xl'>
            <div onClick={hidevisible_chat} className='w-full h-20 flex items-center justify-between hoverMessage px-6 border-b-2 border-neutral-800 hover:bg-zinc-700 hover:cursor-pointer'>
                <img className='w-14 rounded-full shadow-2xl shadow-neutral-900' src="https://pbs.twimg.com/profile_images/1476294398782672898/eBuhTSsJ_400x400.jpg" alt="landing" />
                <div className='w-full flex flex-col justify-center ml-4'>
                    <h1 className='text-base tracking-wider mb-1'>Cengiz Drms</h1>
                    <p className='text-sm tracking-wider text-neutral-400'>Lorem ipsum lorem ipsum lorem ipsum</p>
                </div>
                <p className='text-xs tracking-wider text-neutral-400'>13:30</p>
            </div>
            <div className='w-full h-20 flex items-center justify-between px-6 border-b-2 border-neutral-800 hover:bg-zinc-700 hover:cursor-pointer'>
                <img className='w-14 rounded-full shadow-2xl shadow-neutral-900' src="https://pbs.twimg.com/profile_images/917422424571957253/U04TY0fa_400x400.jpg" alt="landing" />
                <div className='w-full flex flex-col justify-center ml-4'>
                    <h1 className='text-base tracking-wider mb-1'>KOÜ'19 Bilişim Sistemleri</h1>
                    <p className='text-sm tracking-wider text-neutral-400'>Sayısal işaret işleme dersi olacak mı bilen var mı ?</p>
                </div>
                <p className='text-xs tracking-wider text-neutral-400'>15:40</p>
            </div>
            <div className='w-full h-20 flex items-center justify-between px-6 border-b-2 border-neutral-800 hover:bg-zinc-700 hover:cursor-pointer'>
                <img className='w-14 rounded-full shadow-2xl shadow-neutral-900' src="https://pbs.twimg.com/profile_images/1476294398782672898/eBuhTSsJ_400x400.jpg" alt="landing" />
                <div className='w-full flex flex-col justify-center ml-4'>
                    <h1 className='text-base tracking-wider mb-1'>Cengiz Drms</h1>
                    <p className='text-sm tracking-wider text-neutral-400'>Lorem ipsum lorem ipsum lorem ipsum</p>
                </div>
                <p className='text-xs tracking-wider text-neutral-400'>13:30</p>
            </div>
            <div className='w-full h-20 flex items-center justify-between px-6 border-b-2 border-neutral-800 hover:bg-zinc-700 hover:cursor-pointer'>
                <img className='w-14 rounded-full shadow-2xl shadow-neutral-900' src="https://pbs.twimg.com/profile_images/1476294398782672898/eBuhTSsJ_400x400.jpg" alt="landing" />
                <div className='w-full flex flex-col justify-center ml-4'>
                    <h1 className='text-base tracking-wider mb-1'>Cengiz Drms</h1>
                    <p className='text-sm tracking-wider text-neutral-400'>Lorem ipsum lorem ipsum lorem ipsum</p>
                </div>
                <p className='text-xs tracking-wider text-neutral-400'>13:30</p>
            </div>
            <div className='w-full h-20 flex items-center justify-between px-6 border-b-2 border-neutral-800 hover:bg-zinc-700 hover:cursor-pointer'>
                <img className='w-14 rounded-full shadow-2xl shadow-neutral-900' src="https://pbs.twimg.com/profile_images/1476294398782672898/eBuhTSsJ_400x400.jpg" alt="landing" />
                <div className='w-full flex flex-col justify-center ml-4'>
                    <h1 className='text-base tracking-wider mb-1'>Cengiz Drms</h1>
                    <p className='text-sm tracking-wider text-neutral-400'>Lorem ipsum lorem ipsum lorem ipsum</p>
                </div>
                <p className='text-xs tracking-wider text-neutral-400'>13:30</p>
            </div>
            <div className='w-full h-20 flex items-center justify-between px-6 border-b-2 border-neutral-800 hover:bg-zinc-700 hover:cursor-pointer'>
                <img className='w-14 rounded-full shadow-2xl shadow-neutral-900' src="https://pbs.twimg.com/profile_images/1476294398782672898/eBuhTSsJ_400x400.jpg" alt="landing" />
                <div className='w-full flex flex-col justify-center ml-4'>
                    <h1 className='text-base tracking-wider mb-1'>Cengiz Drms</h1>
                    <p className='text-sm tracking-wider text-neutral-400'>Lorem ipsum lorem ipsum lorem ipsum</p>
                </div>
                <p className='text-xs tracking-wider text-neutral-400'>13:30</p>
            </div>
            <div className='w-full h-20 flex items-center justify-between px-6 border-b-2 border-neutral-800 hover:bg-zinc-700 hover:cursor-pointer'>
                <img className='w-14 rounded-full shadow-2xl shadow-neutral-900' src="https://pbs.twimg.com/profile_images/1476294398782672898/eBuhTSsJ_400x400.jpg" alt="landing" />
                <div className='w-full flex flex-col justify-center ml-4'>
                    <h1 className='text-base tracking-wider mb-1'>Cengiz Drms</h1>
                    <p className='text-sm tracking-wider text-neutral-400'>Lorem ipsum lorem ipsum lorem ipsum</p>
                </div>
                <p className='text-xs tracking-wider text-neutral-400'>13:30</p>
            </div>
        </div>
    )
}

export default MessageList