import { createContext, useState } from "react";
import { updatedMusic } from "../apis/music";

export const AlbumContext = createContext()
const AlbumContextProvider = ({ children }) => {
    const [albums, setAlbums] = useState([{
        name: "",
        user: "",
        musics: [{
            name: ""
        }]
    }])
    const [currentAlbum, SetCurrentAlbum] = useState({
        name: "",
        updatedAlbumName: "",
        artistId: ""
    })
    // const [musics, setMusics] = useState([])
    const value = {
        albums, setAlbums, currentAlbum, SetCurrentAlbum
    }


    return (
        <AlbumContext.Provider value={value}>
            {children}
        </AlbumContext.Provider>
    )
}
export default AlbumContextProvider