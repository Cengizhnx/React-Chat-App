import React, { useEffect } from 'react'
import MessageList from '../components/Persons/MessageList'
import Header from '../components/Persons/Header'
import Search from '../components/Persons/Search'
import LandingPage from '../components/Chat/LandingPage'
import { useSelector } from 'react-redux'
import Loading from '../components/Loading'
import { useNavigate } from 'react-router-dom'
import { GetUserBlocks, GetUserProfile } from '../firebase'
import Profile from './Profile/Profile'
import Index from '../components/Chat/Message/Index'
import Block from './Block'

function Home() {

    const { user } = useSelector(state => state.users)
    console.log(user);
    const data = GetUserProfile()
    const blocks = GetUserBlocks()
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
                !data && <div style={{ backgroundColor: "#26262c" }} className="w-full h-screen flex justify-center items-center"> <Loading></Loading> </div>
            }
            {
                user && data && blocks && <div style={{ backgroundColor: "#26262c" }} className="w-full flex flex-row items-center p-4 justify-center h-screen">
                    <div style={{ backgroundColor: "#191a20" }} id='div_left' className="text-white sm:w-2/4 h-full flex flex-col justify-start items-center rounded-l-2xl shadow-2xl">
                        <Header data={data}></Header>
                        <Search></Search>
                        <MessageList></MessageList>

                    </div>
                    <div style={{ backgroundColor: "#191a20", display: "none" }} id='div_right' className="text-white xs:w-full sm:w-2/4 h-full flex flex-col justify-center items-center rounded-l-2xl shadow-2xl">
                        <Profile data={data}></Profile>
                    </div>
                    <div style={{ backgroundColor: "#191a20", display: "none" }} id='div_block' className="text-white xs:w-full sm:w-2/4 h-full flex flex-col justify-center items-center rounded-l-2xl shadow-2xl">
                        <Block blocks={blocks}></Block>
                    </div>
                    <div id='landing1' className="divHidden w-full h-full flex justify-center xs:rounded-r-none md:rounded-r-2xl shadow-2xl">
                        <LandingPage></LandingPage>
                    </div>
                    <div style={{ backgroundColor: "#191a20", display: "none" }} id="landing2" className="divHidden w-full h-full flex justify-center xs:rounded-r-none md:rounded-r-2xl shadow-2xl">
                        <Index></Index>
                    </div>
                </div>
            }

        </div>


    )
}

export default Home