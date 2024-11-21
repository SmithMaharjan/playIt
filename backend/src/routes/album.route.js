import express from "express"
import * as AlbumController from "../controllers/album.js"
import { authenticationJWT } from "../middleware/auth.js"
import { authenticatedRole } from "../middleware/role.js"
export const router = express.Router()
router.post("/addAlbum", authenticationJWT, authenticatedRole(["artist"]), AlbumController.addAlbum)
router.post("/addMusicInAlbum", authenticationJWT, authenticatedRole(["artist"]), AlbumController.addMusicToAlbum)
router.get("/allAlbums", AlbumController.getAllAlbums)
router.patch("/updateAlbum", authenticationJWT, authenticatedRole(["artist"]), AlbumController.updateAlbum)