import React from 'react'
import Landing from "../../assets/Landing.gif";

function LandingPage() {
    return (
        <div style={{ backgroundColor: "#323237" }} className='w-full h-full flex items-center justify-center text-white border-l-2 border-neutral-700 xs:rounded-r-none md:rounded-r-2xl'>
            <div className='w-full flex flex-col items-center justify-center'>
                <img className='w-2/6 rounded-full shadow-2xl shadow-neutral-900' src={Landing} alt="landing" />
                <h1 className='text-3xl my-8 tracking-wide'>ChatApp Web</h1>
                <p className='w-1/2 text-sm text-center tracking-wider'>Lorem ipsum dolor sit amet consectetur adipisicing elit. <br /> Unde quo accusamus placeat a? Minima,
                    asperiores quia.</p>
            </div>

        </div>
    )
}

export default LandingPage