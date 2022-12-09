import React from 'react'
import { HiChevronDoubleLeft } from "react-icons/hi";
import GroupAddList from './GroupAddList';
import GroupAddSearch from './GroupAddSearch';
import { Button } from 'flowbite-react'
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import { useState } from 'react';
import { useSelector } from 'react-redux';
import GroupInfo from './GroupInfo';

function Group() {

    const [section, setSection] = useState(false)
    const [section2, setSection2] = useState(false)
    const groupPrew = useSelector(state => state.users.groupPrew)

    function hidevisible_home() {
        document.getElementById("div_left").style.display = "block";
        document.getElementById("div_group").style.display = "none";
    }

    return (
        <div className='w-full h-full flex flex-col items-center justify-start'>
            <div className='w-full h-16 p-5 flex flex-row items-center justify-start text-black dark:text-white bg-bgLight2 dark:bg-bgDark2 rounded-tl-xl'>
                <button onClick={hidevisible_home}>
                    <HiChevronDoubleLeft className="h-5 w-5 mr-3 text-black hover:bg-messageHover hover:text-white dark:text-white dark:hover:bg-bgLight2 dark:hover:text-black hover:rounded-2xl hover:cursor-pointer" />
                </button>
                {
                    !section && <h1>Add participant to group</h1>

                }
                {
                    section2 && <h1>New group</h1>

                }
            </div>
            <div className='w-full h-full flex flex-col items-center overflow-y-auto' style={{ display: !section ? "block" : "none" }}>
                <GroupAddSearch></GroupAddSearch>
                <GroupAddList></GroupAddList>
            </div>
            <div className='w-full h-full flex flex-col items-center' style={{ display: section ? "block" : "none" }}>
                <GroupInfo></GroupInfo>
            </div>
            <div className='w-full flex flex-row items-center justify-evenly mb-10'>
                {

                    section &&

                    <Button onClick={() => {
                        setSection(false)
                        setSection2(false)
                    }} color="light" type="submit">
                        <AiOutlineArrowLeft className="h-6 w-6" />
                    </Button>

                }
                {

                    groupPrew.length > 0 && !section2 &&

                    <Button onClick={() => {
                        setSection(true)
                        setSection2(true)
                    }}
                        color="light" type="submit">
                        <AiOutlineArrowRight className="h-6 w-6" />
                    </Button>

                }
            </div>

        </div>
    )
}

export default Group