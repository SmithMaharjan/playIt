import { response } from "express"
import MusicModel from "../models/music.js"
import * as AlbumService from "../services/album.js"
export const addAlbum = async (req, res) => {
    const { name } = req.body
    const { id } = req.user
    try {
        const response = await AlbumService.addAlbum(name, id)
        return res.status(200).json({ message: "new album created", albums: response })
    }
    catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

export const addMusicToAlbum = async (req, res) => {
    const { name, musicIds } = req.body
    const { id } = req.user
    console.log(musicIds, "musicIds")
    const musicDocuments = await MusicModel.find(
        { name: { $in: musicIds } },
        '_id' // Only retrieve the `_id` field
    );
    const musicObjectIds = musicDocuments.map((doc) => doc._id);
    console.log(musicObjectIds, "ids")

    try {
        const response = await AlbumService.addMusicToAlbum(name, musicObjectIds, id)
        return res.status(200).json({ message: "music added to album", albums: response })
    }
    catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

export const getAllAlbums = async (req, res) => {
    const response = await AlbumService.getAllAlbums()
    return res.status(200).json({ message: "all albums", albums: response })
}

export const updateAlbum = async (req, res) => {
    const { name, updatedName } = req.body
    const { id } = req.user
    try {
        const response = await AlbumService.updateAlbum(name, updatedName, id)
        return res.status(200).json({ message: response })

    }
    catch (error) {
        return res.status(404).json({ message: error.message })
    }


}