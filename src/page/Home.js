import React, { useEffect } from 'react'
import MessageList from '../components/Persons/MessageList'
import Header from '../components/Persons/Header'
import Search from '../components/Persons/Search'
import LandingPage from '../components/Chat/LandingPage'
import { useSelector } from 'react-redux'
import Loading from '../components/Loading'
import { useNavigate } from 'react-router-dom'

function Home() {

    const { user } = useSelector(state => state.users)
    const status = useSelector(state => state.users.status)
    const navigate = useNavigate()

    useEffect(() => {
        if (!user && !status) {
            navigate('/login', {
                replace: true
            })
        }
    }, [user, status,navigate])


    return (
        <div>
            {
                status && <div style={{ backgroundColor: "#26262c" }} className="w-full h-screen flex justify-center items-center"> <Loading></Loading> </div>
            }
            {
                user && !status && <div style={{ backgroundColor: "#26262c" }} className="w-full flex flex-row items-center p-4 justify-center h-screen">
                    <div style={{ backgroundColor: "#191a20" }} className="divHidden text-white sm:w-2/4 h-full flex flex-col justify-start items-center rounded-l-2xl shadow-2xl">
                        <Header></Header>
                        <Search></Search>
                        <MessageList></MessageList>

                    </div>
                    <div className="w-full h-full flex justify-center xs:rounded-r-none md:rounded-r-2xl shadow-2xl">
                        <LandingPage></LandingPage>
                    </div>
                </div>
            }

        </div>


    )
}

export default Home