import React, { useEffect, useState } from 'react'
import { baseUrl } from '../config/config.js'
import musical_cat from "../assets/img/musical_cat.jpg"
import { register } from '../apis/auth'
import axios from 'axios'

const Signup = () => {
    const [allRoles, setAllRoles] = useState([])
    const [previewImg, setPreviewImg] = useState("")


    const [formState, setFormState] = useState({
        email: "",
        password: "",
        role: "",
        profilePic: ""
    })
    const handleRoles = (e) => {
        setFormState((prevState) => ({ ...prevState, role: e.target.value }));
        console.log("Selected role:", e.target.value);  // This will show the selected role immediately.
    };
    const handleProfilePic = (e) => {
        console.log(e.target.files)
        const fileData = e.target.files[0]
        console.log(fileData, "fileDataaaaaaa")
        setFormState((prev) => ({ ...prev, profilePic: fileData }))
        setPreviewImg(URL.createObjectURL(fileData))


    }
    const handleSubmit = async (e) => {

        e.preventDefault()
        const formData = new FormData();
        formData.append("email", formState.email);
        formData.append("password", formState.password);
        formData.append("role", formState.role);

        // Append the profile pic if it exists
        if (formState.profilePic) {
            formData.append("profile", formState.profilePic);
        }
        try {
            const response = await register(formData)
            // const { profilePic } = response.data.user.profileImage
            // console.log(profilePic, "pic")
            // setFormState((prev) => ({ ...prev, profilePic: profilePic }))
        }
        catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const getRoles = await axios.get(`${baseUrl}/getAllRoles`)
                setAllRoles(getRoles.data.roles)

            }
            catch (error) {
                console.log(error)

            }

        }
        fetchRoles()


    }, [])
    return (
        <div className=' flex flex-col md:flex-row h-screen '>
            <div className='md:w-1/2 relative'>
                <div className="hidden md:block md:absolute md:w-1/3 text-[38px] font-Rubik text-[#82e9ec] p-6  -right-10 top-[40%] transform -translate-y-1/2 z-50">
                    Join Now!
                </div>

                <img className='hidden md:block md:absolute  top-0 object-cover h-full w-full' src={musical_cat} />
            </div>
            <div className='w-1/2 flex justify-center items-center'>

                <form encType='multipart/form-data' onSubmit={handleSubmit}>
                    <h1>profile pic</h1>
                    <div>
                        <img className=' rounded-[50%] h-32 w-32 ' src={previewImg} /></div>
                    <input type='file' name='profile' onChange={handleProfilePic} />
                    <h1 className=' text-3xl font-bold mb-4'>Sign<span className='text-blue-500'>Up</span></h1>
                    <div className=' flex flex-col gap-5'>
                        <label className='relative cursor-auto'>
                            <input onChange={(e) => setFormState({ ...formState, email: e.target.value })} value={formState.email} className=' rounded-lg border-black transition-all duration-200 h-11  px-3 border-2 outline-none opacity-55 focus:border-blue-500 focus:opacity-100' type='email' />
                            <span className='absolute  top-2 left-0 mx-4  input-text transition-all duration-200'>{formState.email ? "email" : ""}</span>

                        </label>
                        <label className='relative '>
                            <input onChange={(e) => setFormState({ ...formState, password: e.target.value })} value={formState.password} className='rounded-lg border-black transition-all duration-200 h-11  px-3 border-2 outline-none opacity-55 focus:border-blue-500 focus:opacity-100' type='password' />
                            <span className='  absolute  top-2 left-0 mx-4  input-text transition-all duration-200'>{formState.password ? "password" : ""}</span>

                        </label>
                        <label>Role</label>
                        <select onChange={handleRoles} value={formState.role}>
                            <option value="">select an role</option>

                            {allRoles.map((role) => (
                                <option value={role.name}>{role.name}</option>

                            ))}
                        </select>
                        <button type='submit' className=' block px-2 py-4 bg-blue-500 text-white rounded-3xl'>Submit</button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default Signup