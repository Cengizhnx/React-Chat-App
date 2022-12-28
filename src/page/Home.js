import React, { useEffect } from 'react'
import MessageList from '../components/Persons/MessageList'
import Header from '../components/Persons/Header'
import Search from '../components/Persons/Search'
import LandingPage from '../components/Chat/LandingPage'
import { useSelector } from 'react-redux'
import Loading from '../components/Loading'
import { useNavigate } from 'react-router-dom'
import { GetUserBlocks, GetUserFriends, GetUserProfile } from '../firebase'
import Profile from './Profile/Profile'
import Index from '../components/Chat/Message/Index'
import Block from './Block'
import Friends from './Friends'
import DarkMode from '../components/DarkMode'
import Group from '../components/Group/Group'
import Stories from '../components/Stories/Stories'

function Home() {

    DarkMode();
    const { user } = useSelector(state => state.users)

    const data = GetUserProfile()
    const blocks = GetUserBlocks()
    const friends = GetUserFriends()
    const status = useSelector(state => state.users.status)
    const navigate = useNavigate()

    useEffect(() => {
        if (!user && !status) {
            navigate('/login', {
                replace: true
            })
        }
    }, [user, status, navigate])


    return (
        <div>
            {
                !data && <div className="bg-bgLight1 dark:bg-bgDark0 w-full h-screen flex justify-center items-center"> <Loading></Loading> </div>
            }
            {
                user && data && blocks && friends && <div className="bg-bgLight1 dark:bg-bgDark0 w-full flex flex-row items-center p-4 justify-center h-screen">
                    <div id='div_left' className="dark:text-white bg-bgLight1 dark:bg-bgDark1 sm:w-2/4 h-full flex flex-col justify-start items-center rounded-l-2xl shadow-2xl">
                        <Header data={data} blocks={blocks} friends={friends}></Header>
                        <Search></Search>
                        <MessageList blocks={blocks}></MessageList>

                    </div>
                    <div style={{ display: "none" }} id='div_right' className=" dark:text-white bg-bgLight2 dark:bg-bgDark1 xs:w-full sm:w-2/4 h-full flex flex-col justify-center items-center rounded-l-2xl shadow-2xl">
                        <Profile data={data}></Profile>
                    </div>
                    <div style={{ display: "none" }} id='div_block' className="dark:text-white bg-bgLight1 dark:bg-bgDark1 text-white xs:w-full sm:w-2/4 h-full flex flex-col justify-center items-center rounded-l-2xl shadow-2xl">
                        <Block blocks={blocks}></Block>
                    </div>
                    <div style={{ display: "none" }} id='div_friends' className="dark:text-white bg-bgLight1 dark:bg-bgDark1 xs:w-full sm:w-2/4 h-full flex flex-col justify-center items-center rounded-l-2xl shadow-2xl">
                        <Friends friends={friends}></Friends>
                    </div>
                    <div style={{ display: "none" }} id='div_stories' className="dark:text-white bg-bgLight1 dark:bg-bgDark1 xs:w-full sm:w-2/4 h-full flex flex-col justify-center items-center rounded-l-2xl shadow-2xl">
                        <Stories friends={friends}></Stories>
                    </div>
                    <div style={{ display: "none" }} id='div_group' className="dark:text-white bg-bgLight1 dark:bg-bgDark1 xs:w-full sm:w-2/4 h-full flex flex-col justify-center items-center rounded-l-2xl shadow-2xl">
                        <Group></Group>
                    </div>
                    <div id='landing1' className="divHidden w-full h-full flex justify-center xs:rounded-r-none md:rounded-r-2xl dark:shadow-2xl">
                        <LandingPage></LandingPage>
                    </div>
                    <div style={{ display: "none" }} id="landing2" className="dark:text-white bg-bgLight1 dark:bg-bgDark1 divHidden w-full h-full flex justify-center xs:rounded-r-none md:rounded-r-2xl dark:shadow-2xl">
                        <Index></Index>
                    </div>
                </div>
            }

        </div >


    )
}

export default Home