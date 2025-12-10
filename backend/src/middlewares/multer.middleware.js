import multer from "multer";
import fs from "fs";
import path from "path";

const __dirname = path.resolve();
const uploadPath = path.join(__dirname, "public", "temp");

// Ensure folder exists (important in prod)
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

export const upload = multer({ storage });
