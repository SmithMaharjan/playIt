import React, { useContext, useEffect, useState } from 'react'
import { AlbumContext } from '../context/AlbumState'
import { getAlbums } from '../apis/album'
import { Navigate, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserState'
import useToggle from '../hooks/useToggle'
import PopUp from './PopUp'
import UpdateAlbumForm from './UpdateAlbumForm'

const AlbumCards = () => {
    const { albums, setAlbums, currentAlbum, SetCurrentAlbum } = useContext(AlbumContext)
    const { userData, setUserData } = useContext(UserContext)
    const { open, close, toggle, isOpen } = useToggle()

    const navigate = useNavigate()
    useEffect(() => {
        console.log(userData, "album ko user data")

    }, [userData])
    useEffect(() => {
        console.log(albums, "album ko mysuc data")

    }, [albums])


    useEffect(() => {
        console.log(albums, "albumAAyo")
    }, [albums])
    useEffect(() => {
        const getAllAlbums = async () => {
            try {
                const repsonse = await getAlbums()


                setAlbums(() => [...repsonse.data.albums])


            }
            catch (error) {
                console.log(error)

            }
        }
        getAllAlbums()



    }, [])
    const updateAlbum = (albumName, artistId) => {
        SetCurrentAlbum((prev) => ({
            ...prev,
            name: albumName,
            artistId: artistId
        }))
        open()



    }
    useEffect(() => {
        console.log(currentAlbum, "the current album")

    }, [currentAlbum])
    return (
        <div>{albums.map((album, index) => (
            <div>
                <p onClick={() => navigate(`/singleAlbum`, { state: album })} key={index}>{album.name}</p>
                {userData.user.id === album.user ? <button onClick={() => updateAlbum(album.name, album.user)} className=' p-3 bg-blue-600 rounded-md w-32 m-2 text-white'>update album</button> : ""}
            </div>
        )
        )}
            <div className=' relative'>
                <PopUp isOpen={isOpen} close={close}>
                    <UpdateAlbumForm />
                </PopUp>
            </div></div>
    )
}

export default AlbumCards