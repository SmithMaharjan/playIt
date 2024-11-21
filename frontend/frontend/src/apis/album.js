import axios from "axios"
import { baseUrl } from "../config/config"
export const getAlbums = async () => {
    const response = await axios.get(`${baseUrl}/allAlbums`)
    return response
}
export const addAlbum = async (data) => {
    const token = localStorage.getItem("token")
    const response = await axios({
        url: `${baseUrl}/addMusicInAlbum`,
        method: "POST",
        data: data,
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    return response
}

export const updateAlbum = async (data) => {
    const token = localStorage.getItem("token")
    console.log(data, "the albym dataa")
    try {

        const album = await axios({
            url: `${baseUrl}/updateAlbum`,
            method: "PATCH",
            data: data,
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        console.log(album, 'the response album')
        return album
    }
    catch (error) {
        console.log(error)
    }

}