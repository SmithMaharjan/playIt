import mongoose from "mongoose"
import MusicModel from "../models/music.js"
import { UserInfoModel } from "../models/user.js"

export const addMusic = async (name, artistId) => {



    const music = new MusicModel({
        name: name,
        artist: artistId
    })
    await music.save()
    return music
}

export const getAllMusics = async () => {
    const music = await MusicModel.find().populate("artist")
    if (!music) {
        throw new Error("no music found")
    }
    return music
}
export const getMusics = async (userId) => {


    const music = await MusicModel.find({ artist: userId })
    return music
}

export const updateMusic = async (id, name, artistId) => {
    console.log(id, name, artistId, "artist id")

    const validateUser = await MusicModel.findOne({ _id: id, artist: artistId })
    console.log(validateUser, "validation")
    if (!validateUser) {
        throw new Error("permisson denied")
    }
    const music = await MusicModel.findOneAndUpdate({ _id: id }, { name: name }, { new: true })
    if (!music) {
        throw new Error("cannot find the music")
    }
    return music

}