import { TextInput, Label, Button } from 'flowbite-react'
import React from 'react'
import { HiOutlineArrowRight } from "react-icons/hi";
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div style={{ backgroundColor: "#191a20" }} className="w-full flex flex-row items-center p-4 justify-center h-screen">
      <div style={{ backgroundColor: "#323237" }} className='w-1/3 h-2/3 flex flex-col rounded-2xl justify-center'>
        <div className='p-8'>
          <div className='flex items-center justify-center'>
            <span class="text-4xl before:block before:absolute before:-inset-3 before:-skew-y-3 before:bg-zinc-500 relative inline-block">
              <span class="relative text-white tracking-wide">LOGIN</span>
            </span>
          </div>
          <form className="flex flex-col gap-4 mt-5">
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
                placeholder="name@flowbite.com"
                required={true}
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
              />
            </div>

            <div className='flex justify-center items-center my-5'>
              <Button color="light" type="submit">
                <HiOutlineArrowRight className="mr-2 h-5 w-5" />
                Login
              </Button>
            </div>

            <div className='flex items-center justify-center'>
              <p className='text-zinc-400'>
                Don't have an account?
                <Link to="/register">
                  <span href='/' className='ml-2 text-white hover:underline'>Register</span>
                </Link>
              </p>
            </div>

          </form>
        </div>

      </div>
    </div>
  )
}

export default Login