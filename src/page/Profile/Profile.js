import React, { useState } from 'react'
import { TextInput, Label, Button } from 'flowbite-react'
import { GrUpdate } from "react-icons/gr";
import { SiAboutdotme } from "react-icons/si";
import Loading from '../../components/Loading';
import { auth, storage, userUpdate } from '../../firebase';
import { useSelector } from 'react-redux';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import toast, { Toaster } from 'react-hot-toast';
import { HiPhone, HiUser, HiChevronDoubleLeft } from "react-icons/hi";
import { updateProfile } from 'firebase/auth';

function Profile({ data }) {

    function hidevisible_home() {
        document.getElementById("div_left").style.display = "block";
        document.getElementById("div_right").style.display = "none";
    }

    const status = useSelector(state => state.users.status)

    const user = data.find(item => item.uid === auth.currentUser.uid)

    const [image, setImage] = useState(null)
    const [name, setName] = useState(user?.name)
    const [phone, setPhone] = useState(user?.phone_number)
    const [desc, setDesc] = useState(user?.description)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            updatePhoto()
        } catch (error) {
            toast.error(error.message)
        }
    }

    const updatePhoto = async () => {
        const file = image;
        const storageRef = ref(storage, `images/users/${auth.currentUser.uid}`);

        if (file === null || file === undefined) {
            await userUpdate(name, phone, desc, user.photoURL)
        }
        else {
            await uploadBytesResumable(storageRef, file).then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                    try {
                        await updateProfile(auth.currentUser, {
                            photoURL: downloadURL,
                        });
                        await userUpdate(name, phone, desc, downloadURL)
                    } catch (err) {
                        console.log(err);
                    }
                });
            });
        }

    }

    // useEffect(() => {
    //     if (!status) {
    //         getUserPhoto()
    //     }
    // }, [status])

    const handleConvert = (e) => {

        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);

        reader.onload = () => {
            const img = document.getElementById('myimg');
            img.setAttribute('src', reader.result);
            setImage(e.target.files[0])
        };
        reader.onerror = error => {
            toast.error("Error: ", error);
        };
    }

    return (
        <div className='h-full w-full justify-center'>

            {
                status && <div className='w-full h-screen flex items-center justify-center' ><Loading></Loading></div>
            }

            {
                user && !status && <div className='flex flex-col items-center h-full justify-center '>
                    <button onClick={hidevisible_home}>
                        <HiChevronDoubleLeft className="absolute m-4 h-5 w-5 top-5 left-5 text-black hover:bg-messageHover hover:text-white dark:text-white dark:hover:bg-bgLight2 dark:hover:text-black hover:rounded-2xl hover:cursor-pointer" />
                    </button>

                    <form onSubmit={handleSubmit} className="flex flex-col w-3/4">
                        <div className='flex flex-col items-center justify-center my-8'>
                            <img className='w-44 h-44 object-cover rounded-full shadow-xl shadow-gray-400 dark:shadow-bgDark1' src={user?.photoURL ? user?.photoURL : "https://cdn-icons-png.flaticon.com/512/149/149071.png"} id='myimg' alt="" />
                            <label className="mt-5 block">
                                <input type="file" onChange={(e) => { handleConvert(e) }} className="block w-full text-xs text-zinc-400 dark:text-loginInfo rounded-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-white file:text-white hover:file:bg-violet-100" />
                            </label>
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="name1"
                                    value="Your Name"
                                />
                            </div>
                            <TextInput
                                id="name1"
                                type="text"
                                placeholder="Your Name"
                                value={name}
                                icon={HiUser}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className='mt-5'>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="phone1"
                                    value="Your Phone Number"
                                />
                            </div>
                            <TextInput
                                id="phone1"
                                type="text"
                                required={true}
                                placeholder="Your Number"
                                value={phone}
                                disabled={true}
                                icon={HiPhone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>

                        <div className='mt-5'>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="phone1"
                                    value="About Me"
                                />
                            </div>
                            <TextInput
                                id="description1"
                                type="text"
                                placeholder="Hi! I'm usign Chat App !"
                                value={desc}
                                icon={SiAboutdotme}
                                onChange={(e) => setDesc(e.target.value)}
                            />
                        </div>

                        <div className='flex justify-center items-center my-8'>
                            <Button color="light" type="submit">
                                <GrUpdate className="mr-2 h-5 w-5" />
                                Update
                            </Button>
                        </div>

                    </form>
                </div>
            }
            <Toaster position='top-right'></Toaster>

        </div>
    )
}

export default Profile