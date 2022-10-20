import React from 'react'
import Landing from "../../assets/Landing.gif";
import bgLight from "../../assets/landingBgLight.jpg";
import bgDark from "../../assets/landingBg.jpg";

function LandingPage() {
    const theme = localStorage.getItem("theme")
    return (
        <div className='w-full h-full z-0 relative flex items-center justify-center text-white border-l-2 border-gray-300 dark:border-bioBorder xs:rounded-r-none md:rounded-r-2xl'>
            <img className='w-full h-full object-cover -z-10 absolute xs:rounded-r-none md:rounded-r-2xl dark:hidden' src={bgLight} alt="landing" />
            <img className='w-full h-full object-cover -z-10 absolute xs:rounded-r-none md:rounded-r-2xl hidden dark:block' src={bgDark} alt="landing" />

            <div className='w-full flex flex-col items-center justify-center'>
                <img className='w-2/6 rounded-full shadow-2xl shadow-neutral-900' src={Landing} alt="landing" />
                <h1 className='text-3xl my-8 tracking-wide text-black dark:text-white loadingText'>ChatApp Web</h1>
                <p className='w-1/2 text-sm text-center tracking-wider text-black dark:text-gray-300 landingText'>Lorem ipsum dolor sit amet consectetur adipisicing elit. <br /> Unde quo accusamus placeat a?</p>
            </div>

        </div>
    )
}

export default LandingPage