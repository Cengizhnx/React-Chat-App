import React from 'react'
import { BiSun, BiMoon } from "react-icons/bi";
import DarkMode from './DarkMode';

function Theme() {
    const [colorTheme, setTheme] = DarkMode();
    return (
        <div className='w-full' onClick={()=> setTheme(colorTheme)}>
            {
                colorTheme === "light" ?
                    (
                        <div className='w-full flex flex-row sun'>
                            <BiSun className="h-6 w-6 mr-2 hover:bg-white hover:text-black hover:rounded-2xl hover:cursor-pointer" /> Light Mode
                        </div>
                    )
                    :
                    (
                        <div className='w-full flex flex-row moon'>
                            <BiMoon className="h-6 w-6 mr-2 hover:bg-white hover:text-black hover:rounded-2xl hover:cursor-pointer" /> Dark Mode
                        </div>
                    )
            }

        </div>
    )
}

export default Theme

