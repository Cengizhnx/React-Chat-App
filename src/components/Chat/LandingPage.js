import React from 'react'
import Landing from "../../assets/Landing.gif";
import "./styles.css";

function LandingPage() {
    return (
        <div className='bgEffect w-full h-full z-10 flex items-center justify-center text-white border-l-2 border-neutral-700 xs:rounded-r-none md:rounded-r-2xl'>
            <div className='w-full flex flex-col items-center justify-center'>
                <img className='w-2/6 rounded-full shadow-2xl shadow-neutral-900' src={Landing} alt="landing" />
                <h1 className='text-3xl my-8 tracking-wide loadingText'>ChatApp Web</h1>
                <p className='w-1/2 text-sm text-center tracking-wider text-gray-300 landingText'>Lorem ipsum dolor sit amet consectetur adipisicing elit. <br /> Unde quo accusamus placeat a?</p>
            </div>
        </div>
    )
}

export default LandingPage