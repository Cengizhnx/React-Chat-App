import React from 'react'
import { Button, Modal } from "flowbite-react";
import { useState } from 'react';
import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import toast, { Toaster } from 'react-hot-toast';
import { HiPhone, HiUser, HiChevronDoubleLeft } from "react-icons/hi";
import { TextInput, Label } from 'flowbite-react'
import { GrUpdate } from "react-icons/gr";
import { auth, db, storage } from '../../firebase';
import { arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { uuidv4 } from '@firebase/util';

function AddStory() {

    const [visible, setVisible] = useState(false)
    const [image, setImage] = useState(null)
    const [caption, setCaption] = useState()

    const handleConvert = (e) => {

        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);

        reader.onload = () => {
            const img = document.getElementById('storyImg');
            img.setAttribute('src', reader.result);
            setImage(e.target.files[0])
        };
        reader.onerror = error => {
            toast.error("Error: ", error);
        };
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const file = image;
        const storageRef = ref(storage, `images/stories/${auth.currentUser.uid}/${Date.now()}`);

        try {
            if (caption) {
                await uploadBytesResumable(storageRef, file).then(() => {
                    getDownloadURL(storageRef).then(async (downloadURL) => {
                        try {
                            await updateDoc(doc(db, "stories", auth.currentUser.uid), {
                                stories: arrayUnion({
                                    caption,
                                    photoURL: downloadURL,
                                    date: Date.now(),
                                    publishPhoto: auth.currentUser.photoURL,
                                }),

                            });
                            toast.success("Completed")
                            setVisible(false)
                        } catch (err) {
                            console.log(err);
                        }
                    });
                });
                setCaption()
                setImage(null)
            }

        } catch (error) {
            toast.error(error.message)
        }
        setCaption()
        setImage()
    }

    return (
        <div>
            <React.Fragment>
                <button onClick={() => setVisible(true)}>
                    <AiOutlineVideoCameraAdd className="h-6 w-6 text-black hover:bg-messageHover hover:text-white dark:text-white dark:hover:bg-bgLight2 dark:hover:text-black hover:rounded-sm hover:cursor-pointer" />
                </button>
                <Modal
                    show={visible}
                    onClose={() => setVisible(false)}
                    size="2xl"
                >
                    <Modal.Header>
                        Add Story
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center w-full">
                            <div className='flex flex-col items-center justify-center my-4'>
                                <img className='w-44 h-44 object-cover rounded-full shadow-xl shadow-gray-400 dark:shadow-bgDark1' src={"https://cdn-icons-png.flaticon.com/512/149/149071.png"} id='storyImg' alt="" />
                                <label className="mt-5 block">
                                    <input type="file" onChange={(e) => { handleConvert(e) }} className="block w-full text-xs text-zinc-400 dark:text-loginInfo rounded-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-white file:text-white hover:file:bg-violet-100" />
                                </label>
                            </div>

                            <div>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="caption"
                                        value="Caption"
                                    />
                                </div>
                                <TextInput
                                    id="caption"
                                    type="text"
                                    placeholder="Caption"
                                    value={caption}
                                    icon={HiUser}
                                    required={true}
                                    onChange={(e) => setCaption(e.target.value)}
                                />
                            </div>

                            <div className='flex justify-center items-center my-8'>
                                <Button color="light" type="submit">
                                    <GrUpdate className="mr-2 h-5 w-5" />
                                    Share
                                </Button>
                            </div>

                        </form>
                    </Modal.Body>

                </Modal>
                <Toaster position='top-right'></Toaster>
            </React.Fragment>
        </div>)
}

export default AddStory