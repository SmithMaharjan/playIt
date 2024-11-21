import mongoose, { Schema } from "mongoose";
const MusicSchema = new Schema({
    name: { type: String },
    artist: { type: Schema.Types.ObjectId, ref: "User" }
}, {
    timestamps: true
})
const MusicModel = mongoose.model("Music", MusicSchema)
export default MusicModel