import { TextInput, Label, Button } from 'flowbite-react'
import { HiOutlineArrowRight } from "react-icons/hi";
import React, { useEffect, useState } from 'react'
import { HiKey } from "react-icons/hi";
import { VscCheckAll } from "react-icons/vsc";
import { Link, useNavigate } from 'react-router-dom';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { GetUserProfile, setUpRecaptcha } from '../../firebase';
import toast, { Toaster } from 'react-hot-toast';
import DarkMode from '../../components/DarkMode';
import { useSelector } from 'react-redux';

function Login() {

  const { user } = useSelector(state => state.users)
  const status = useSelector(state => state.users.status)

  const navigate = useNavigate()

  useEffect(() => {
    if (user && !status) {
      navigate('/', {
        replace: true
      })
    }
  }, [user, navigate, status])

  DarkMode()
  const [value, setValue] = useState("")
  const [otp, setOtp] = useState("")
  const [flag, setFlag] = useState(false)
  const [confirmObj, setConfirmObj] = useState("")
  const [number, setNumber] = useState("")
  const data = GetUserProfile()

  const phoneNumberSearch = () => {
    const key = data.filter(item => item.phone_number === value)
    setNumber(key);
  }

  const getOTP = async (e) => {
    e.preventDefault()

    if (value === "" || value === undefined) {
      toast.error("Please fill out this field !")
    }
    else {
      try {
        if (number.length === 0) {
          toast.error("Phone Number not registered !")
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
      await confirmObj.confirm(otp);
      navigate('/', {
        replace: true
      })
    } catch (error) {
      toast.error(error.message)
    }

  }

  return (
    <div className="bg-bgLight2 dark:bg-bgDark1 w-full flex flex-row items-center p-4 justify-center h-screen">
      <div className='bg-bgLight1 dark:bg-bgDark2 xs:w-full md:w-2/3 lg:w-1/3 xs:h-full md:h-2/3 flex flex-col rounded-2xl justify-center'>
        <div className='p-12'>
          <div className='flex items-center justify-center mb-14'>
            <span className="text-4xl before:block before:absolute before:-inset-3 before:-skew-y-3 before:bg-loginTextBgLight dark:before:bg-loginTextBg relative inline-block">
              <span className="relative text-white tracking-wide">LOGIN</span>
            </span>
          </div>

          <form onSubmit={getOTP} className="flex flex-col w-11/12 m-auto mt-6 gap-4" style={{ display: !flag ? "block" : "none" }}>
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
            <div className='flex justify-center my-6'>
              <div id='recaptcha-container'></div>
            </div>

            <div className='flex justify-center items-center mb-8'>
              <Button onClick={phoneNumberSearch} color="light" type="submit">
                <HiOutlineArrowRight className="mr-2 h-5 w-5" />
                Login
              </Button>
            </div>

          </form>

          <form onSubmit={verifyOTP} style={{ display: flag ? "block" : "none" }}>
            <div className='my-20'>
              <div className="mb-3 block">
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

              <div className='flex justify-center items-center my-5'>
                <Button color="light" type="submit">
                  <VscCheckAll className="mr-2 h-5 w-5" />
                  Confirm
                </Button>
              </div>
            </div>

          </form>

          <div className='flex items-center justify-center'>
            <p className='text-loginInfo'>
              Don't have an account ?
              <Link to="/register">
                <span className='ml-2 text-black dark:text-white hover:underline'>Register</span>
              </Link>
            </p>
          </div>

        </div>
      </div>
      <Toaster position="top-right" />

    </div>
  )
}

export default Login