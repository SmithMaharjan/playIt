import * as MusicController from "../controllers/music.js"
import express from "express"
import { authenticationJWT } from "../middleware/auth.js"
import { authenticatedRole } from "../middleware/role.js"
export const router = express.Router()
router.post("/addMusic", authenticationJWT, authenticatedRole(["artist"]), MusicController.addMusic)
router.get("/getAllMusics", MusicController.getAllMusics)
router.post("/Musics", authenticationJWT, authenticatedRole(["artist"]), MusicController.getMusics)
router.patch("/updateMusic", authenticationJWT, authenticatedRole(["artist"]), MusicController.updateMusic)