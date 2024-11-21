import axios from "axios"
import { baseUrl } from "../config/config"


export const music = async () => {
    const music = await axios.get(`${baseUrl}/getAllMusics`)
    return music
}


export const addMusic = async (data) => {
    const token = localStorage.getItem("token")

    console.log(data, "music datas response")
    console.log(token, "is token here")
    const music = await axios({
        url: `${baseUrl}/addMusic`,
        method: "POST",
        data: data,
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    console.log(music, "a music")
    return music
}

export const userMusic = async (data) => {
    const token = localStorage.getItem("token");
    if (!token) {
        console.log("Token is missing");
        return; // Stop if token is not available
    }
    const music = await axios({
        url: `${baseUrl}/Musics`,
        method: "POST",
        data: data,
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    return music
}

export const updatedMusic = async (data) => {
    console.log(data, "the update data")
    const token = localStorage.getItem("token");
    if (!token) {
        console.log("Token is missing");
        return; // Stop if token is not available
    }
    const response = await axios({
        url: `${baseUrl}/updateMusic`,
        method: "PATCH",
        data: data,
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    return response

}