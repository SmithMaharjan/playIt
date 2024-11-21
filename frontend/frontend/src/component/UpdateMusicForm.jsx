import React, { useContext, useEffect, useState } from 'react'
import { MusicContext } from '../context/MusicState'
import { updatedMusic } from '../apis/music'

const UpdateMusicForm = () => {
    const { currentMusic, setCurrentMusic, musicData, setMusicData } = useContext(MusicContext)
    useEffect(() => {
        console.log(musicData, "helloooooooooooooooooooooo")

    }, [musicData])

    const handleUpdateMusic = async (e) => {
        e.preventDefault()
        const updated = await updatedMusic({
            name: currentMusic.name,
            updatedName: currentMusic.updatedName
        })
        // console.log(updated.data.updatedMusic.name, "update bayo hai")
        // console.log(musicData, "The music")
        setMusicData((prev) => prev.map((music) => music.musicName === currentMusic.name && music.artistId === currentMusic.artistId ? { ...music, musicName: currentMusic.updatedName } : music))
    }
    return (
        <div>
            <form onSubmit={handleUpdateMusic}>
                <label className=' mr-2'>name</label>
                <input onChange={(e) => setCurrentMusic({ ...currentMusic, updatedName: e.target.value })} value={currentMusic.updatedName} type='text' />
                <button type='submit'>submit</button>
            </form>
        </div>
    )
}
export default UpdateMusicForm