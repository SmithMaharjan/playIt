import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { music, userMusic } from '../apis/music'
import { logout } from '../apis/auth'
import AddMusicForm from '../component/AddMusicForm'
import { MusicContext } from '../context/MusicState'
import { UserContext } from '../context/UserState'
import useToggle from '../hooks/useToggle'
import PopUp from '../component/PopUp'
import UpdateMusicForm from '../component/UpdateMusicForm'

const Home = () => {

    const { userData, setUserData } = useContext(UserContext)
    const navigate = useNavigate()
    const { musicData, setMusicData, currentMusic,
        setCurrentMusic } = useContext(MusicContext)
    // console.log(musicData, "musicdata")

    const { open, close, toggle, isOpen } = useToggle()
    const [loggedInUser, setLoggedInUser] = useState("")
    const [userRole, setUserRole] = useState("")
    const handleUpdateMusic = (name, artistId) => {
        console.log(name, artistId)
        setCurrentMusic((prev) => ({
            ...prev,
            name: name,
            artistId: artistId
        }))

        open()
    }
    useEffect(() => {
        console.log(currentMusic, "selected mmmusssiccc")
    }, [currentMusic])

    useEffect(() => {
        console.log(musicData, "added huncha");
    }, [musicData]);

    useEffect(() => {

        setUserRole(localStorage.getItem("role"))
        try {
            const getMusics = async () => {

                const response = await music();
                console.log(response.data.musics, "musicss");
                setMusicData(() => response.data.musics.map((music) => ({ musicName: music?.name, artistId: music?.artist.id })))

            }
            getMusics()

        }
        catch (error) {
            console.log(error)
        }
    }, [])


    const userLogout = async () => {

        console.log("hello")
        const response = await logout(userData.user.id)
        if (response) {
            setUserData(null)
            localStorage.removeItem("token")
            console.log(localStorage.getItem("token"))
            navigate("/login")
        }

        else {
            console.log("something went wrong")
        }
    }


    return (
        <div>
            <h1>profile pic</h1>
            <img src={userData.user.profileImage} height="200" width="200" />
            <AddMusicForm />

            <h1>hi {userRole}</h1>
            <button className=' bg-blue-500 px-4 py-2 rounded-2xl mb-2 text-white' onClick={userLogout}>Logout</button>
            <div className='w-full grid grid-cols-auto gap-6 gap-y-4 px-4 mb-5 '>{musicData?.map((music, index) => (
                <div key={index} className='h-60 rounded-2xl border-blue-500 border-2 flex items-end justify-center'>

                    <p>{music?.musicName}</p>
                    {music.artistId === userData.user.id ? <button onClick={() => handleUpdateMusic(music.musicName, music.artistId)} className=' bg-blue-600 p-3 mx-3 text-white rounded-lg text-md font-medium'>update music</button> : ""}

                </div>
            ))}</div>
            <div className=' relative'>
                <PopUp isOpen={isOpen} open={open} close={close} toggle={toggle}>
                    <UpdateMusicForm />

                </PopUp>

            </div>
            {userRole === "artist" ? <button onClick={() => navigate("/addMusic")} className=' bg-blue-500 p-2 text-white rounded-2xl'>add music</button> : ""}
        </div>

    )
}

export default Home