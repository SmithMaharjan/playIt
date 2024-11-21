import multer from "multer";
import path from "path"
import fs from "fs"
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, "..", "uploads");

        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath);
        }

        return cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        console.log(file, "filename")
        return cb(null, file.originalname)

    }
})
export const upload = multer({ storage })