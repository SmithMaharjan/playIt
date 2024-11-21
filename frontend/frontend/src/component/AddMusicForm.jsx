import React, { useContext, useEffect, useState } from 'react'
import { addMusic } from '../apis/music'
import { MusicContext } from '../context/MusicState'
import { UserContext } from '../context/UserState'

const AddMusicForm = () => {
    const { userData } = useContext(UserContext)

    const { musicData, setMusicData } = useContext(MusicContext);
    const [musicName, setMusicName] = useState("")
    useEffect(() => {
        console.log(musicData, "music data");
        console.log(musicName, "music name");
        console.log(userData, "user dataaaaaaaaaaaaaaaaaa");
    }, [musicName, musicData, userData]);
    const handleMusicData = async (e) => {
        e.preventDefault()
        console.log(musicName, "datas music")


        try {
            const response = await addMusic({
                artistId: userData?.user.id,
                name: musicName

            })
            setMusicData((prev) => [...prev, { musicName: response?.data?.music?.name, artistId: response?.data?.music?.artist }])
            alert(response.data.message)

        }
        catch (error) {
            console.log(error)

        }

    }

    return (
        <div>
            <div className=' flex justify-center items-center h-screen'>
                <form className=' flex flex-col justify-center border-2 py-9 px-2 border-blue-500 rounded-2xl' onSubmit={handleMusicData}>
                    <label>Music name</label>
                    <input className=' block w-auto border-2 border-black rounded-lg mb-3 p-2' placeholder='Name' type='text' onChange={(e) => setMusicName(e.target.value)} value={musicData.name} />
                    <button className=' bg-blue-500 p-2 rounded-lg' type="submit">Add music</button>

                </form>
            </div>
        </div>
    )
}

export default AddMusicForm