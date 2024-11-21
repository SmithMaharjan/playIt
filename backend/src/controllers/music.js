import MusicModel from "../models/music.js"
import * as MusicService from "../services/music.js"
export const addMusic = async (req, res) => {
    const { name } = req.body
    const { id } = req.user
    try {

        const response = await MusicService.addMusic(name, id)
        return res.status(200).json({ message: "music added", music: response })
    }
    catch (error) {
        console.log(error)

    }
}

export const getAllMusics = async (req, res) => {
    const response = await MusicService.getAllMusics()
    try {
        return res.status(200).json({ message: "all musics", musics: response })

    }
    catch (error) {
        return res.status(400).json({ message: error.message })
    }

}

export const getMusics = async (req, res) => {
    const { id } = req.user

    try {

        const response = await MusicService.getMusics(id)
        console.log(response, "user musics")

        return res.status(200).json({ message: "my musics", musics: response })
    }
    catch (error) {
        console.log(error)
    }


}

export const updateMusic = async (req, res) => {
    const { name, updatedName } = req.body
    const { id } = req.user
    console.log(name, updatedName, id, "the values")
    try {
        const music = await MusicModel.findOne({ name: name, artist: id })
        console.log(music._id, "music id");

        const response = await MusicService.updateMusic(music._id, updatedName, id)
        console.log(response)
        return res.status(200).json({ message: "music updated", updatedMusic: response })

    }
    catch (error) {
        return res.status(400).json({ message: error.message })
    }
}