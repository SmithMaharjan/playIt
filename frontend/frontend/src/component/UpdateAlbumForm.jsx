import React, { useContext } from 'react'
import { AlbumContext } from '../context/AlbumState'
import { updateAlbum } from '../apis/album'
import { current } from '@reduxjs/toolkit'

const UpdateAlbumForm = () => {
    const { currentAlbum, SetCurrentAlbum, albums, setAlbums } = useContext(AlbumContext)
    console.log(currentAlbum, "current album")
    const handleUpdateAlbum = async (e) => {
        e.preventDefault()
        const response = await updateAlbum({
            name: currentAlbum.name, updatedName: currentAlbum.updatedAlbumName

        })
        setAlbums((prev) => prev.map((album) => album.name === currentAlbum.name && album.user === currentAlbum.artistId ? { ...album, name: currentAlbum.updatedAlbumName } : album))

    }


    return (
        <div>
            <form onSubmit={handleUpdateAlbum}>
                <label className=' mr-2'>name</label>

                <input type='text' onChange={(e) => SetCurrentAlbum({ ...currentAlbum, updatedAlbumName: e.target.value })} value={currentAlbum.updatedAlbumName} />
                <button type='submit'>submit</button>
            </form>
        </div>
    )
}

export default UpdateAlbumForm