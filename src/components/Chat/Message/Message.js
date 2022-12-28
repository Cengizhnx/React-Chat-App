import { arrayUnion, doc, onSnapshot, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { BiMessageRounded } from "react-icons/bi";
import { IoMdImages } from "react-icons/io";
import { BsEmojiWink } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { auth, db, GetSelectUserBlocks, storage } from '../../../firebase';
import { v4 as uuid } from "uuid";
import { RiSendPlaneFill } from "react-icons/ri";
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { ImCheckboxChecked } from "react-icons/im";
import { useEffect } from 'react';
import { userState } from '../../../redux/userSlice';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

const imageMimeType = /image\/(png|jpg|jpeg)/i;

function Message({ blocks, selectBlocks }) {

  const [text, setText] = useState("")
  const [img, setImg] = useState("")
  const [block, setBlock] = useState(false)
  const [senderBlock, setSenderBlock] = useState(false)
  const [userIsThere, setUserIsThere] = useState(false)
  const [openPicker, setOpenPicker] = useState(false)

  const dispatch = useDispatch()

  const chatId = useSelector(state => state.users.chatId)
  const selectUser = useSelector(state => state.users.selectUser)
  const groupUsers = useSelector(state => state.users.groupUsers)
  const groupStates = useSelector(state => state.users.groupState)

  const filtered = blocks?.filter((item) => item.user.username === selectUser.username)

  const find = selectBlocks?.filter((item) => item.user.username === auth.currentUser.displayName)

  const isThere = selectUser.type === "group" && [groupUsers]?.findIndex(function (item) {
    for (let i = 0; i < item.length; i++) {
      const temp = item[i].uid === auth.currentUser.uid
      if (temp) {
        return temp
      }
    }
  }) >= 0;


  const handleKey = (e) => {
    e.code === "Enter" && handleSend();
  };

  useEffect(() => {
    const getBlocks = () => {

      const response = onSnapshot(doc(db, "blocks", chatId), (doc) => {
        doc.exists() && setBlock(doc.data()[auth.currentUser.uid]) || setSenderBlock(doc.data()[selectUser.uid])
      })
      return () => {
        response()
      }
    }

    const getUser = () => {
      if (selectUser.type !== "group") {
        const response = onSnapshot(doc(db, "users", selectUser.username), (doc) => {
          setUserIsThere(doc.exists())
          dispatch(userState(doc.exists()))
        })
        return () => {
          response()
        }
      }
    }

    chatId && getBlocks() && getUser()

  }, [chatId, block, senderBlock, selectUser])

  const handleSend = async () => {
    // if (text) {

    // }
    if (img || text) {
      if (img === "" || img === null) {
        await updateDoc(doc(db, "userChats", auth.currentUser.uid), {
          [chatId + ".lastMessage"]: {
            text,
          },

          [chatId + ".userInfo"]: {
            user: selectUser,
          },

          [chatId + ".date"]: serverTimestamp(),
          [chatId + ".id"]: chatId
        })

        if (selectUser.type === "group") {
          await updateDoc(doc(db, "chats", chatId), {
            messages: arrayUnion({
              id: uuid(),
              text,
              senderId: auth.currentUser.uid,
              senderPhotoUrl: auth.currentUser.photoURL,
              [auth.currentUser.uid]: false,
              date: Date.now(),
            }),
            [auth.currentUser.uid]: false,
          })

          for (let index = 0; index < groupUsers.length; index++) {
            await updateDoc(doc(db, "chats", chatId), {
              [groupUsers[index].uid]: false,
            })
          }


          for (let index = 0; index < groupUsers.length; index++) {
            await updateDoc(doc(db, "userChats", groupUsers[index].uid), {
              [chatId + ".lastMessage"]: {
                text,
              },

              [chatId + ".userInfo"]: {
                user: {
                  description: selectUser.description,
                  name: selectUser.name,
                  photoURL: selectUser.photoURL,
                  id: selectUser.id,
                  type: selectUser.type
                }
              },

              [chatId + ".date"]: serverTimestamp(),
              [chatId + ".id"]: chatId
            })
          }
        }
        else {
          await updateDoc(doc(db, "chats", chatId), {
            messages: arrayUnion({
              id: uuid(),
              text,
              senderId: auth.currentUser.uid,
              senderPhotoUrl: auth.currentUser.photoURL,
              [auth.currentUser.uid]: false,
              [selectUser.uid]: false,
              date: Date.now(),
            }),
            [auth.currentUser.uid]: false,
            [selectUser.uid]: false,
          })

          await updateDoc(doc(db, "userChats", selectUser.uid), {
            [chatId + ".lastMessage"]: {
              text,
            },

            [chatId + ".userInfo"]: {
              user: {
                description: auth.currentUser.displayName,
                name: auth.currentUser.displayName,
                photoURL: auth.currentUser.photoURL,
                phone_number: auth.currentUser.phoneNumber,
                timeStamp: serverTimestamp(),
                uid: auth.currentUser.uid,
                username: auth.currentUser.displayName,
              }
            },

            [chatId + ".date"]: serverTimestamp(),
            [chatId + ".id"]: chatId

          })
        }


      }
      setText("")

      if (img !== "" && img !== null && img.type.match(imageMimeType)) {
        const storageRef = ref(storage, uuid());

        const uploadTask = uploadBytesResumable(storageRef, img);

        await updateDoc(doc(db, "userChats", auth.currentUser.uid), {
          [chatId + ".lastMessage"]: {
            text,
            img: "true",
          },

          [chatId + ".userInfo"]: {
            user: selectUser,
          },

          [chatId + ".date"]: serverTimestamp(),
          [chatId + ".id"]: chatId
        })

        if (selectUser.type === "group") {
          uploadTask.on(
            (error) => {
              console.log(error);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                await updateDoc(doc(db, "chats", chatId), {
                  messages: arrayUnion({
                    id: uuid(),
                    text,
                    [auth.currentUser.uid]: false,
                    // [selectUser.id]: false,
                    senderPhotoUrl: auth.currentUser.photoURL,
                    senderId: auth.currentUser.uid,
                    date: Date.now(),
                    img: downloadURL,
                  }),
                  [auth.currentUser.uid]: false,
                  // [selectUser.id]: false,
                });
              });
            }
          );

          for (let index = 0; index < groupUsers.length; index++) {
            await updateDoc(doc(db, "userChats", groupUsers[index].uid), {
              [chatId + ".lastMessage"]: {
                text,
                img: "true",
              },

              [chatId + ".userInfo"]: {
                user: {
                  description: selectUser.description,
                  name: selectUser.name,
                  photoURL: selectUser.photoURL,
                  id: selectUser.id,
                  type: selectUser.type
                }
              },

              [chatId + ".date"]: serverTimestamp(),
              [chatId + ".id"]: chatId

            })
          }
        }
        else {
          uploadTask.on(
            (error) => {
              //TODO:Handle Error
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                await updateDoc(doc(db, "chats", chatId), {
                  messages: arrayUnion({
                    id: uuid(),
                    text,
                    [auth.currentUser.uid]: false,
                    [selectUser.uid]: false,
                    senderId: auth.currentUser.uid,
                    date: Date.now(),
                    img: downloadURL,
                  }),
                  [auth.currentUser.uid]: false,
                  [selectUser.uid]: false,
                });
              });
            }
          );

          await updateDoc(doc(db, "userChats", selectUser.uid), {
            [chatId + ".lastMessage"]: {
              text,
              img: "true",
            },

            [chatId + ".userInfo"]: {
              user: {
                description: auth.currentUser.displayName,
                name: auth.currentUser.displayName,
                photoURL: auth.currentUser.photoURL,
                phone_number: auth.currentUser.phoneNumber,
                timeStamp: serverTimestamp(),
                uid: auth.currentUser.uid,
                username: auth.currentUser.displayName,
              }
            },

            [chatId + ".date"]: serverTimestamp(),
            [chatId + ".id"]: chatId

          })
        }

      }
      else if (!img.type.match(imageMimeType)) {
        alert("You can send only png, jpg, jpeg images !");
        return;
      }
      setText("")

    }

    setText("")
    setImg("");
  }

  return (
    <div id="chat_footer" className='w-full h-20 rounded-br-xl flex items-center bg-bgLight2 dark:bg-bgDark2 border-t-2 border-gray-300 dark:border-messageHover'>
      <div className='w-full px-3 flex flex-row items-center justify-around' >
        <button onClick={() => setOpenPicker(prev => !prev)}>
          <BsEmojiWink className="w-7 h-7 text-bgDark2 dark:text-loginInfo" />
          <div className='dark:hidden'>
            <div style={{ display: openPicker ? "inline" : "none", bottom: 100, position: 'fixed' }}>
              {
                filtered?.length <= 0 && find?.length <= 0 &&
                <Picker data={data} theme="light" onEmojiSelect={(e) => setText(text + e.native)} />

              }
            </div>
          </div>
          <div className='hidden dark:block'>
            <div style={{ display: openPicker ? "inline" : "none", bottom: 100, position: 'fixed' }}>
              {
                filtered?.length <= 0 && find?.length <= 0 &&
                <Picker data={data} theme="light" onEmojiSelect={(e) => setText(text + e.native)} />

              }
            </div>
          </div>

        </button>
        <button>
          {/* <img src={IoMdImages} className="w-8 h-8 text-bgDark2 dark:text-loginInfo" alt="" /> */}
          <input
            type="file"
            style={{ display: "none" }}
            id="file"
            accept="image/png,image/jpeg"
            disabled={selectUser.type === "group"
              ? isThere === false || !groupStates
                ? true
                : false
              : filtered?.length <= 0 && find?.length <= 0 && userIsThere ? false : true}
            onChange={(e) => setImg(e.target.files[0])}
          />
          <label htmlFor="file">
            {
              img === "" &&
              <IoMdImages className="w-8 h-8 text-bgDark2 dark:text-loginInfo cursor-pointer" />
            }
            {
              img !== "" &&
              <ImCheckboxChecked className="w-7 h-7 text-bgDark2 dark:text-loginInfo cursor-pointer" />
            }
          </label>
          {/* <IoMdImages className="w-8 h-8 text-bgDark2 dark:text-loginInfo" /> */}
        </button>
        <div className='flex flex-row justify-start items-center w-5/6 h-12 p-1 rounded-lg bg-bgLight2 dark:bg-bgDark2'>
          <input
            value={text}
            disabled={selectUser.type === "group"
              ? isThere === false || !groupStates
                ? true
                : false
              : filtered?.length <= 0 && find?.length <= 0 && userIsThere ? false : true}
            onKeyDown={handleKey}
            onChange={(e) => setText(e.target.value)}
            className='relative w-full rounded-md bg-bgLight1 text-bgDark1 dark:text-bgLight2 dark:bg-bgDarkInput focus:ring-2 focus:ring-white dark:focus:ring-bgDark0'
            style={{ border: "none", fontSize: "14px", letterSpacing: "0.3px", paddingLeft: "45px" }}
            type="text"
            placeholder="Send Message"
          />
          <BiMessageRounded className="h-5 w-5 mx-3 absolute text-phoneNumber" />

        </div>
        <button onClick={handleSend}>
          <RiSendPlaneFill className="w-7 h-7 text-bgDark2 dark:text-loginInfo" />

          {/* <img className='w-8 h-8 object-cover rounded-full shadow-2xl shadow-neutral-900' id='myimg2' alt="" /> */}
        </button>
      </div>

    </div>
  )
}

export default Message