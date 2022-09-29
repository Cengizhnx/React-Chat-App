import React from 'react'
import MessageList from '../components/Persons/MessageList'
import Header from '../components/Persons/Header'
import Search from '../components/Persons/Search'
import LandingPage from '../components/Chat/LandingPage'


function Home() {
    return (
        <div style={{ backgroundColor: "#26262c" }} className="w-full flex flex-row items-center p-4 justify-center h-screen">
            <div style={{ backgroundColor: "#191a20" }} className="divHidden text-white sm:w-2/4 h-full flex flex-col justify-start items-center rounded-l-2xl shadow-2xl">
                <Header></Header>
                <Search></Search>
                <MessageList></MessageList>

            </div>
            <div className="w-full h-full flex justify-center xs:rounded-r-none md:rounded-r-2xl shadow-2xl">
                <LandingPage></LandingPage>
            </div>
        </div>
    )
}

export default Home