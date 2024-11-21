import React, { useContext, useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { AlbumContext } from '../context/AlbumState'

const SingleAlbum = () => {
    const location = useLocation()
    const album = location.state || {}

    console.log(album, " is music available")

    return (
        <div>
            <h1>{album?.name}</h1>
            <ul>
                {album?.musics?.map((music, index) => (
                    <li key={index}>
                        {music.name}
                    </li>

                ))}
            </ul>
        </div>
    )
}

export default SingleAlbum