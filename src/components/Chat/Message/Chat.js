import { doc, onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { auth, db } from '../../../firebase'
import SendMessage from './SendMessage'
import chatLightBg from "../../../assets/chatBg1.jpg";
import chatBgDark from "../../../assets/chatBgDark.jpg";
import "./styles.css"

function Chat({ blocks }) {

  const [messages, setMessages] = useState([])
  const [senderState, setSenderState] = useState(false)
  const [deletedDate, setDeletedDate] = useState(false)
  const [createdDate, setCreatedDate] = useState(false)
  const [block, setBlock] = useState(false)
  const [senderBlock, setSenderBlock] = useState(false)
  const [blockedDate, setBlockedDate] = useState(false)

  const chatId = useSelector(state => state.users.chatId)
  const selectUser = useSelector(state => state.users.selectUser)
  const groupUsers = useSelector(state => state.users.groupUsers)

  const filtered = blocks?.filter((item) => item.user.username === selectUser.username)

  useEffect(() => {
    const getMessages = () => {

      const response = onSnapshot(doc(db, "chats", chatId), (doc) => {
        doc.exists() && setMessages(doc.data().messages) || setSenderState(doc.data()[auth.currentUser.uid]) || setDeletedDate(doc.data()[auth.currentUser.uid + "deletedDate"]) || setCreatedDate(doc.data()[auth.currentUser.uid + "createdDate"])
      })
      return () => {
        response()
      }
    }

    const getBlocks = () => {

      const response = onSnapshot(doc(db, "blocks", chatId), (doc) => {
        doc.exists() && setBlock(doc.data()[auth.currentUser.uid]) || setSenderBlock(doc.data()[selectUser.uid]) || setBlockedDate(doc.data()[selectUser.uid + "blockedDate"])
      })
      return () => {
        response()
      }
    }

    chatId && getMessages() && getBlocks()

  }, [chatId, block, senderBlock, selectUser.uid])

  return (
    <div className='bg-bgLight2 dark:bg-bgDark2 text-black dark:text-white relative z-0 w-full h-full flex flex-col overflow-y-hidden justify-end'>
      <div className='w-full h-full flex flex-col overflow-y-hidden justify-end dark:hidden' style={{ backgroundRepeat: "repeat", backgroundImage: `url(${chatLightBg})` }}>

        <div className='scrollbarLight dark:hidden overflow-y-auto pt-4 px-7'>
          {senderState === false && senderBlock === false &&

            <div className='bg-bgLight1 dark:bg-bgDark1 w-2/3 p-2 m-auto text-center rounded-lg mb-5'>
              <p className='text-xs tracking-wide text-bgDark2 dark:text-loginInfo'>🔒 Messages are end-to-end encrypted. No one outside of this chat including ChatApp, can read or listen to your messages.</p>
            </div>

          }

          {
            senderBlock === true &&
            <div className='flex items-center justify-center mb-72 w-1/2 m-auto rounded-2xl border-2 border-bg dark:border-bgDark1 dark:text-loginInfo'>
              <p className='text-2xl'>
                Blocked You
              </p>
            </div>
          }
          {
            selectUser.type !== "group"
              ? senderState === false && senderBlock === false && block === false && messages.map(m => (
                deletedDate !== false
                  ? deletedDate < m.date
                    ? <SendMessage message={m} key={m.id}></SendMessage>
                    : ""
                  : ""))
              : messages.map(m => (
                deletedDate !== false && senderState === false
                  ? deletedDate || createdDate < m.date
                    ? <SendMessage message={m} key={m.id}></SendMessage>
                    : ""
                  : m.date < createdDate
                    ? <SendMessage message={m} key={m.id}></SendMessage>
                    : ""
                      || deletedDate !== false && senderState === true
                      ? m.date < deletedDate && createdDate
                        ? <SendMessage message={m} key={m.id}></SendMessage>
                        : ""
                      : ""))
          }

        </div>

        <div className='hidden dark:block scrollbarDark overflow-y-auto pt-4 px-7'>
          {senderState === false && senderBlock === false &&

            <div className='bg-bgLight1 dark:bg-bgDark1 w-2/3 p-2 m-auto text-center rounded-lg mb-5'>
              <p className='text-xs tracking-wide text-bgDark2 dark:text-loginInfo'>🔒 Messages are end-to-end encrypted. No one outside of this chat including ChatApp, can read or listen to your messages.</p>
            </div>

          }

          {
            senderBlock === true &&
            <div className='flex items-center justify-center mb-72 w-1/2 m-auto rounded-2xl border-2 border-bg dark:border-bgDark1 dark:text-loginInfo'>
              <p className='text-2xl'>
                Blocked You
              </p>
            </div>
          }
          {
            selectUser.type !== "group"
              ? senderState === false && senderBlock === false && block === false && messages.map(m => (
                deletedDate !== false
                  ? deletedDate < m.date
                    ? <SendMessage message={m} key={m.id}></SendMessage>
                    : ""
                  : ""))
              : messages.map(m => (
                deletedDate !== false && senderState === false
                  ? deletedDate || createdDate < m.date
                    ? <SendMessage message={m} key={m.id}></SendMessage>
                    : ""
                  : m.date < createdDate
                    ? <SendMessage message={m} key={m.id}></SendMessage>
                    : ""
                      || deletedDate !== false && senderState === true
                      ? m.date < deletedDate && createdDate
                        ? <SendMessage message={m} key={m.id}></SendMessage>
                        : ""
                      : ""))
          }
        </div>
      </div>
      <div className='w-full h-full dark:flex flex-col overflow-y-hidden justify-end hidden' style={{ backgroundRepeat: "repeat", backgroundImage: `url(${chatBgDark})` }}>

        <div className='scrollbarLight dark:hidden overflow-y-auto pt-4 px-7'>
          {senderState === false && senderBlock === false &&

            <div className='bg-bgLight1 dark:bg-bgDark1 w-2/3 p-2 m-auto text-center rounded-lg mb-5'>
              <p className='text-xs tracking-wide text-bgDark2 dark:text-loginInfo'>🔒 Messages are end-to-end encrypted. No one outside of this chat including ChatApp, can read or listen to your messages.</p>
            </div>

          }

          {
            senderBlock === true &&
            <div className='flex items-center justify-center mb-72 w-1/2 m-auto rounded-2xl border-2 border-bg dark:border-bgDark1 dark:text-loginInfo'>
              <p className='text-2xl'>
                Blocked You
              </p>
            </div>
          }
          {
            selectUser.type !== "group"
              ? senderState === false && senderBlock === false && block === false && messages.map(m => (
                deletedDate !== false
                  ? deletedDate < m.date
                    ? <SendMessage message={m} key={m.id}></SendMessage>
                    : ""
                  : ""))
              : messages.map(m => (
                deletedDate !== false && senderState === false
                  ? deletedDate || createdDate < m.date
                    ? <SendMessage message={m} key={m.id}></SendMessage>
                    : ""
                  : m.date < createdDate
                    ? <SendMessage message={m} key={m.id}></SendMessage>
                    : ""
                      || deletedDate !== false && senderState === true
                      ? m.date < deletedDate && createdDate
                        ? <SendMessage message={m} key={m.id}></SendMessage>
                        : ""
                      : ""))
          }
        </div>

        <div className='hidden dark:block scrollbarDark overflow-y-auto pt-4 px-7'>
          {senderState === false && senderBlock === false &&

            <div className='bg-bgLight1 dark:bg-bgDark1 w-2/3 p-2 m-auto text-center rounded-lg mb-5'>
              <p className='text-xs tracking-wide text-bgDark2 dark:text-loginInfo'>🔒 Messages are end-to-end encrypted. No one outside of this chat including ChatApp, can read or listen to your messages.</p>
            </div>

          }

          {
            senderBlock === true &&
            <div className='flex items-center justify-center mb-72 w-1/2 m-auto rounded-2xl border-2 border-bg dark:border-bgDark1 dark:text-loginInfo'>
              <p className='text-2xl'>
                Blocked You
              </p>
            </div>
          }
          {
            selectUser.type !== "group"
              ? senderState === false && senderBlock === false && block === false && messages.map(m => (
                deletedDate !== false
                  ? deletedDate < m.date
                    ? <SendMessage message={m} key={m.id}></SendMessage>
                    : ""
                  : ""))
              : messages.map(m => (
                deletedDate !== false && senderState === false
                  ? deletedDate || createdDate < m.date
                    ? <SendMessage message={m} key={m.id}></SendMessage>
                    : ""
                  : m.date < createdDate
                    ? <SendMessage message={m} key={m.id}></SendMessage>
                    : ""
                      || deletedDate !== false && senderState === true
                      ? m.date < deletedDate && createdDate
                        ? <SendMessage message={m} key={m.id}></SendMessage>
                        : ""
                      : ""))
          }
        </div>
      </div>
    </div >
  )
}

export default Chat