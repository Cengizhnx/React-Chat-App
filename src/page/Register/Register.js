import { TextInput, Label, Button } from 'flowbite-react'
import React from 'react'
import { HiCheckCircle, HiMail, HiKey } from "react-icons/hi";
import { AiOutlineLogin } from "react-icons/ai";
import { Link } from 'react-router-dom';

function Register() {
    return (
        <div style={{ backgroundColor: "#191a20" }} className="w-full flex flex-row items-center p-4 justify-center h-screen">
            <div style={{ backgroundColor: "#323237" }} className='relative xs:w-full xs:justify-center md:w-4/6 lg:w-3/4 xl:w-1/3 xs:h-full md:h-4/5 flex flex-col rounded-2xl'>
                <Link to="/login">
                    <AiOutlineLogin className="absolute m-4 h-6 w-6 text-white hover:bg-white hover:text-black hover:rounded-2xl hover:cursor-pointer" />
                </Link>
                <div className='p-8'>
                    <div className='w-full flex xs:flex-col md:flex-row items-center justify-center'>
                        <div className='w-6/12 flex flex-row justify-center xs:mb-10 md:mb-0'>
                            <span className="text-4xl shadow-2xl shadow-stone-900 before:block before:absolute xs:before:-inset-1 sm:before:-inset-3 before:-skew-y-3 before:bg-zinc-500 relative inline-block">
                                <span className="xs:text-base sm:text-3xl md:text-4xl relative text-white tracking-wide">REGISTER</span>
                            </span>
                        </div>
                        <div className='w-6/12 flex flex-col items-center'>
                            <img className='w-2/4 rounded-full shadow-xl shadow-neutral-900' src="https://pbs.twimg.com/profile_images/1476294398782672898/eBuhTSsJ_400x400.jpg" alt="landing" />
                            <label className="mt-5 block">
                                <input type="file" className="block w-full text-xs text-zinc-400 rounded-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-white file:text-white hover:file:bg-violet-100" />
                            </label>
                        </div>
                    </div>
                    <form className="flex flex-col w-11/12 m-auto gap-4">
                        <div>
                            <div className="mb-2 block">
                                <Label
                                    style={{ color: "white" }}
                                    htmlFor="email1"
                                    value="Your email"
                                />
                            </div>
                            <TextInput
                                id="email1"
                                type="email"
                                placeholder="user@user.com"
                                required={true}
                                icon={HiMail}
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label
                                    style={{ color: "white" }}
                                    htmlFor="password1"
                                    value="Your password"
                                />
                            </div>
                            <TextInput
                                id="password1"
                                type="password"
                                required={true}
                                icon={HiKey}

                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label
                                    style={{ color: "white" }}
                                    htmlFor="password1"
                                    value="Your password"
                                />
                            </div>
                            <TextInput
                                id="password1"
                                type="password"
                                required={true}
                                icon={HiKey}

                            />
                        </div>
                        <div className='flex justify-center items-center my-5'>
                            <Button color="light" type="submit">
                                <HiCheckCircle className="mr-2 h-5 w-5" />
                                Register
                            </Button>
                        </div>

                    </form>
                </div>

            </div>
        </div >
    )
}

export default Register