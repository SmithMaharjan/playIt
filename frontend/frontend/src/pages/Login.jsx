import React, { useContext, useState } from 'react'
import musical_cat from "../assets/img/musical_cat.jpg"
import { login } from '../apis/auth.js'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { UserContext } from '../context/UserState.jsx'

const Login = () => {
    const { logInUser } = useContext(UserContext)
    const [formState, setFormState] = useState({
        email: "",
        password: ""
    })
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            console.log(formState, "form state")
            const isLoggedIn = await login(formState)
            console.log(isLoggedIn, "logged in??")
            if (isLoggedIn) {
                console.log(isLoggedIn, "checking the response value")
                const userData = {
                    accessToken: isLoggedIn.data.accessToken,
                    refreshToken: isLoggedIn.data.refrshToken,
                    user: isLoggedIn.data.user
                }
                logInUser(userData)
                // toast.success("login successfull")
                // console.log(isLoggedIn)
                // localStorage.setItem("userData", JSON.stringify(userData))
                navigate("/home")




            }
        }
        catch (error) {
            toast.error("something went wrong")
        }
    }
    return (
        <div className=' flex flex-col md:flex-row h-screen '>
            <div className='md:w-1/2 relative'>
                <div className="hidden md:block md:absolute md:w-1/3 text-[38px] font-Rubik text-[#82e9ec] p-6  -right-10 top-[40%] transform -translate-y-1/2 z-50">
                    Join Now!
                </div>

                <img className='hidden md:block md:absolute  top-0 object-cover h-full w-full' src={musical_cat} />
            </div>
            <div className='w-1/2 flex justify-center items-center'>

                <form onSubmit={handleSubmit}>
                    <h1 className=' text-3xl font-bold mb-4'>Log<span className='text-blue-500'>in</span></h1>
                    <div className=' flex flex-col gap-5'>
                        <label className='relative cursor-auto'>
                            <input onChange={(e) => setFormState({ ...formState, email: e.target.value })} value={formState.email} className=' rounded-lg border-black transition-all duration-200 h-11  px-3 border-2 outline-none opacity-55 focus:border-blue-500 focus:opacity-100' type='email' />
                            <span className={`absolute left-3 top-2 transition-all duration-200 pointer-events-none`}>
                                {formState.email === "" ? "Email" : ""}
                            </span>
                        </label>
                        <label className='relative '>
                            <input onChange={(e) => setFormState({ ...formState, password: e.target.value })} value={formState.password} className='rounded-lg border-black transition-all duration-200 h-11  px-3 border-2 outline-none opacity-55 focus:border-blue-500 focus:opacity-100' type='password' />
                            <span className={`absolute left-3 top-2 transition-all duration-200 pointer-events-none`}>
                                {formState.password === "" ? "password" : ""}
                            </span>
                        </label>
                        <button type='submit' className=' block px-2 py-4 bg-blue-500 text-white rounded-3xl'>Submit</button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default Login