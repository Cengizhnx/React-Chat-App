import { TextInput, Label, Button } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { HiKey, HiSearch, HiAtSymbol } from "react-icons/hi";
import { VscCheckAll } from "react-icons/vsc";
import { AiOutlineLogin } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { auth, db, GetUserProfile, setUpRecaptcha, storage, userRegister, userUpdate } from '../../firebase';
import toast, { Toaster } from 'react-hot-toast';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { doc, getDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import DarkMode from '../../components/DarkMode';
import { useSelector } from 'react-redux';

function Register() {

    const navigate = useNavigate()

    const { user } = useSelector(state => state.users)
    const status = useSelector(state => state.users.status)

    useEffect(() => {
        if (user && !status) {
            navigate('/', {
                replace: true
            })
        }
    }, [user, navigate, status])
    DarkMode()

    const [value, setValue] = useState("")
    const [username, setUsername] = useState("")
    const [number, setNumber] = useState("")
    const [otp, setOtp] = useState("")
    const [flag, setFlag] = useState(false)
    const [visible, setVisible] = useState(false)
    const [confirmObj, setConfirmObj] = useState("")
    const [image, setImage] = useState(null)
    const data = GetUserProfile()

    const phoneNumberSearch = () => {
        const key = data.filter(item => item.phone_number === value)
        setNumber(key);
    }

    const usernameSearch = async () => {
        try {
            const docRef = doc(db, "users", username.toLowerCase());
            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) {
                setVisible(true)
            }
            else {
                return toast.error("Username already exists !")
            }
        } catch (error) {
            if (username === "" || username === undefined) {
                toast.error("Please fill out this field !")
            }
        }
    }

    const getOTP = async (e) => {
        e.preventDefault()
        if (value === "" || value === undefined) {
            toast.error("Please fill out this field !")
        }
        else {
            try {
                if (number.length > 0) {
                    toast.error("Phone Number already exists !")
                }
                else {
                    const res = await setUpRecaptcha(value);
                    setConfirmObj(res)
                    setFlag(true)
                }

            } catch (error) {
                toast.error(error.message)
            }
        }

    }

    const verifyOTP = async (e) => {
        e.preventDefault()
        if (otp === "" || otp === null) {
            toast.error("Please fill this field !")
        }
        try {
            const res = await confirmObj.confirm(otp);
            if (res) {

                await updatePhoto()

                navigate('/', {
                    replace: true
                })
                // uploadImage()

            }

        } catch (error) {
            toast.error(error.message)
        }

    }

    const updatePhoto = async () => {
        const file = image;
        const storageRef = ref(storage, `images/users/${auth.currentUser.uid}`);

        if (file === null || file === undefined) {
            await userUpdate(auth.currentUser.photoURL)
        }
        else {
            await uploadBytesResumable(storageRef, file).then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                    try {
                        await userRegister(value, username, downloadURL)

                        await updateProfile(auth.currentUser, {
                            photoURL: downloadURL,
                        });

                    } catch (err) {
                        console.log(err);
                    }
                });
            });
        }

    }

    // const uploadImage = () => {
    //     if (image == null) {
    //         const url = getUserPhoto()
    //         setImage(url)
    //     }
    //     else {
    //         const imageRef = ref(storage, `images/users/${auth.currentUser.uid}`)
    //         uploadBytes(imageRef, image).then(() => {
    //             toast.success("Image added")
    //         });
    //     }

    // }

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
        <div className="bg-bgLight2 dark:bg-bgDark1 w-full flex flex-row items-center p-4 justify-center h-screen">
            <div className='bg-bgLight1 dark:bg-bgDark2  relative xs:w-full xs:justify-center md:w-4/6 lg:w-3/4 xl:w-1/3 xs:h-full md:h-5/6 flex flex-col rounded-2xl'>
                <Link to="/login">
                    <AiOutlineLogin className="absolute m-4 h-6 w-6 top-1 left-0 text-black hover:bg-loginTextBgLight hover:text-white dark:text-white dark:hover:bg-bgLight2 dark:hover:text-black hover:rounded-2xl hover:cursor-pointer" />
                </Link>
                <div className='p-8 mt-10'>

                    <div className='w-full flex xs:flex-col items-center justify-center' >
                        <span className="text-4xl shadow-2xl shadow-stone-900 before:block before:absolute xs:before:-inset-1 sm:before:-inset-3 before:-skew-y-3 before:bg-loginTextBgLight dark:before:bg-loginTextBg relative inline-block">
                            <span className="xs:text-base sm:text-3xl md:text-4xl relative text-white tracking-wide">REGISTER</span>
                        </span>
                        <div className='w-full mt-10 flex flex-col items-center' style={{ display: !visible ? "block" : "none" }}>
                            <TextInput
                                id="name1"
                                type="text"
                                placeholder="Username"
                                required={true}
                                value={username}
                                icon={HiAtSymbol}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <div className='flex justify-center items-center my-5'>
                                <Button onClick={usernameSearch} color="light" type="submit">
                                    <HiSearch className="mr-2 h-5 w-5" />
                                    Check it
                                </Button>
                            </div>
                        </div>
                        <div className='w-6/12 mt-10 flex flex-col items-center' style={{ display: visible ? "block" : "none" }}>
                            <img className='w-28 h-28 m-auto object-cover rounded-full shadow-xl shadow-neutral-900' id='myimg' src='https://cdn-icons-png.flaticon.com/512/149/149071.png' alt="landing" />
                            <label className="mt-5 block">
                                <input type="file" onChange={(e) => { handleConvert(e) }} className="block w-full text-xs tracking-wide text-zinc-400 dark:text-loginInfo rounded-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-white file:text-white hover:file:bg-violet-100" />
                            </label>
                        </div>
                    </div>

                    <form onSubmit={getOTP} className="flex flex-col w-11/12 m-auto mt-6 gap-4" style={{ display: visible && !flag ? "block" : "none" }}>
                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="email1"
                                    value="Your Phone Number"
                                />
                            </div>
                            <div className='bg-bgLight2 dark:bg-white rounded-xl py-1 px-4'>
                                <PhoneInput
                                    international
                                    defaultCountry="TR"
                                    value={value}
                                    onChange={setValue} />
                            </div>
                        </div>
                        <div className='flex justify-center items-center mt-6'>
                            <div id='recaptcha-container'></div>
                        </div>

                        <div className='flex justify-center items-center my-5'>
                            <Button onClick={phoneNumberSearch} color="light" type="submit">
                                <VscCheckAll className="mr-2 h-5 w-5" />
                                Register
                            </Button>
                        </div>

                    </form>

                    <form onSubmit={verifyOTP} style={{ display: flag ? "block" : "none" }}>
                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="password1"
                                    value="Your OTP"
                                />
                            </div>
                            <TextInput
                                id="password1"
                                required={true}
                                icon={HiKey}
                                placeholder="Enter OTP"
                                onChange={(e) => setOtp(e.target.value)}
                            />
                        </div>

                        <div className='flex justify-center items-center my-5'>
                            <Button color="light" type="submit">
                                <VscCheckAll className="mr-2 h-5 w-5" />
                                Confirm
                            </Button>
                        </div>
                    </form>
                </div>

            </div>
            <Toaster position="top-right" />

        </div >
    )
}

export default Register