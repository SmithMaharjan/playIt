import axios from "axios"
import { baseUrl } from "../config/config.js"
import { toast } from "react-toastify"

export const register = async (data) => {
    console.log(data, "register data")
    try {
        const response = await axios({
            url: `${baseUrl}/register`,
            method: "POST",
            data: data,
            headers: {
                'Content-Type': 'multipart/form-data',
            },

        })
        console.log(response)
        return response
    }
    catch (error) {
        console.log(error, "error")
    }
}

export const login = async (data) => {

    const response = await axios({
        url: `${baseUrl}/login`,
        method: 'POST',
        data: data
    })
    console.log(response, "k bhako")
    if (response.data.sucess) {
        return response
    }
    else {
        alert("error")
    }
}

export const logout = async (data) => {
    const token = localStorage.getItem("token");

    console.log(data)
    const response = await axios({
        url: `${baseUrl}/logout`,
        method: "DELETE",
        data: {
            id: data
        },
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    if (response.data.message) {
        return response
    }
    else {
        alert("error")
    }

}
