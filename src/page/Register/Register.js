import { TextInput, Label, Button } from 'flowbite-react'
import React, { useState } from 'react'
import { HiKey, HiUser } from "react-icons/hi";
import { VscCheckAll } from "react-icons/vsc";
import { AiOutlineLogin } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { auth, db, getUserPhoto, setUpRecaptcha, storage, userRegister } from '../../firebase';
import toast, { Toaster } from 'react-hot-toast';
import { ref, uploadBytes } from 'firebase/storage';
import { doc, getDoc } from 'firebase/firestore';

function Register() {

    const navigate = useNavigate()

    console.log(auth.currentUser);

    const [value, setValue] = useState("")
    const [username, setUsername] = useState("")
    const [otp, setOtp] = useState("")
    const [flag, setFlag] = useState(false)
    const [visible, setVisible] = useState(false)
    const [confirmObj, setConfirmObj] = useState("")
    const [image, setImage] = useState(null)

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
                const res = await setUpRecaptcha(value);
                setConfirmObj(res)
                setFlag(true)
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
                await userRegister(value, username)
                uploadImage()
                navigate('/', {
                    replace: true
                })
            }

        } catch (error) {
            toast.error(error.message)
        }

    }

    const uploadImage = () => {
        if (image == null) {
            const url = getUserPhoto()
            setImage(url)
        }
        else {
            const imageRef = ref(storage, `images/users/${auth.currentUser.uid}`)
            uploadBytes(imageRef, image).then(() => {
                toast.success("Image added")
            });
        }

    }

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
        <div style={{ backgroundColor: "#191a20" }} className="w-full flex flex-row items-center p-4 justify-center h-screen">
            <div style={{ backgroundColor: "#323237" }} className='relative xs:w-full xs:justify-center md:w-4/6 lg:w-3/4 xl:w-1/3 xs:h-full md:h-5/6 flex flex-col rounded-2xl'>
                <Link to="/login">
                    <AiOutlineLogin className="absolute m-4 h-6 w-6 top-1 left-0 text-white hover:bg-white hover:text-black hover:rounded-2xl hover:cursor-pointer" />
                </Link>
                <div className='p-8 mt-10'>

                    <div className='w-full flex xs:flex-col items-center justify-center' >
                        <span className="text-4xl shadow-2xl shadow-stone-900 before:block before:absolute xs:before:-inset-1 sm:before:-inset-3 before:-skew-y-3 before:bg-zinc-600 relative inline-block">
                            <span className="xs:text-base sm:text-3xl md:text-4xl relative text-white tracking-wide">REGISTER</span>
                        </span>
                        <div className='w-full mt-10 flex flex-col items-center' style={{ display: !visible ? "block" : "none" }}>
                            <TextInput
                                id="name1"
                                type="text"
                                placeholder="Username"
                                required={true}
                                value={username}
                                icon={HiUser}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <div className='flex justify-center items-center my-5'>
                                <Button onClick={usernameSearch} color="light" type="submit">
                                    <VscCheckAll className="mr-2 h-5 w-5" />
                                    Check
                                </Button>
                            </div>
                        </div>
                        <div className='w-6/12 mt-10 flex flex-col items-center' style={{ display: visible ? "block" : "none" }}>
                            <img className='w-28 h-28 m-auto object-cover rounded-full shadow-xl shadow-neutral-900' id='myimg' src='https://cdn-icons-png.flaticon.com/512/149/149071.png' alt="landing" />
                            <label className="mt-5 block">
                                <input type="file" onChange={(e) => { handleConvert(e) }} className="block w-full text-xs text-zinc-400 rounded-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-white file:text-white hover:file:bg-violet-100" />
                            </label>
                        </div>
                    </div>

                    <form onSubmit={getOTP} className="flex flex-col w-11/12 m-auto mt-6 gap-4" style={{ display: visible && !flag ? "block" : "none" }}>
                        <div>
                            <div className="mb-2 block">
                                <Label
                                    style={{ color: "white" }}
                                    htmlFor="email1"
                                    value="Your Phone Number"
                                />
                            </div>
                            <div className='bg-white rounded-xl py-1 px-4'>
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
                            <Button color="light" type="submit">
                                <VscCheckAll className="mr-2 h-5 w-5" />
                                Register
                            </Button>
                        </div>

                    </form>

                    <form onSubmit={verifyOTP} style={{ display: flag ? "block" : "none" }}>
                        <div>
                            <div className="mb-2 block">
                                <Label
                                    style={{ color: "white" }}
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