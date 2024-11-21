import mongoose from "mongoose";
import AlbumModel from "../models/album.js";
import MusicModel from "../models/music.js";
export const addAlbum = async (name, userId) => {
    const album = new AlbumModel({
        name: name,
        user: userId
    })
    await album.save()
    return album

}

export const validateMusic = async (artistId, musicIds) => {
    const musicArray = musicIds.map((music) => new mongoose.Types.ObjectId(music))
    const count = await MusicModel.countDocuments({
        artist: artistId,
        _id: { $in: musicArray }
    })
    return count === musicArray.length

}

export const addMusicToAlbum = async (name, musicIds, artistId) => {
    console.log(musicIds, "service")


    const isMusicValidate = await validateMusic(artistId, musicIds)
    if (!isMusicValidate) {
        throw new Error("cannot add music");
    }
    const album = new AlbumModel({
        name: name,
        musics: musicIds,
        user: artistId

    })
    await album.save()
    console.log(album)
    return album



}

export const getAllAlbums = async () => {
    const album = await AlbumModel.find().populate("musics")

    return album
}


export const updateAlbum = async (name, updatedName, userId) => {
    const album = await AlbumModel.findOne({ name: name })
    console.log(album)
    if (!album) {
        throw new Error("album not found")
    }
    const updatedAlbum = await AlbumModel.findOneAndUpdate({ name: name, user: userId }, { name: updatedName })
    return updatedAlbum
}