import { TextInput, Label, Button } from 'flowbite-react'
import React from 'react'
import { HiCheckCircle, HiMail, HiKey } from "react-icons/hi";

function Register() {
    return (
        <div style={{ backgroundColor: "#191a20" }} className="w-full flex flex-row items-center p-4 justify-center h-screen">
            <div style={{ backgroundColor: "#323237" }} className='w-2/6 h-4/5 flex flex-col rounded-2xl'>
                <div className='p-8'>
                    <div className='w-full flex flex-row items-center justify-center'>
                        <div className='w-6/12 flex flex-row justify-center'>
                            <span className="text-4xl shadow-2xl shadow-stone-900 before:block before:absolute before:-inset-3 before:-skew-y-3 before:bg-zinc-500 relative inline-block">
                                <span className="relative text-white tracking-wide">REGISTER</span>
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