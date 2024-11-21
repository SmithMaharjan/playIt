import mongoose, { Schema } from "mongoose";
const AlbumSchema = new Schema({
    name: { type: String },
    musics: [{ type: Schema.Types.ObjectId, ref: "Music" }],
    user: { type: Schema.Types.ObjectId, ref: "User" }
})
const AlbumModel = mongoose.model("Album", AlbumSchema)
export default AlbumModel