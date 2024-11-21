import { createContext, useState } from "react";

export const MusicContext = createContext()
const MusicContextProvider = ({ children }) => {
    const [musicData, setMusicData] = useState([{
        musicName: "",
        artistId: ""
    }])
    const [currentMusic, setCurrentMusic] = useState({
        name: "",
        artistId: "",
        updatedName: ""

    })



    const value = {
        musicData, setMusicData, currentMusic, setCurrentMusic
    }


    return (
        <MusicContext.Provider value={value}>
            {children}
        </MusicContext.Provider>
    )
}
export default MusicContextProvider