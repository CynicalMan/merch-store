import path from "path"
import multer from "multer"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "upload");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    // Define the allowed file types (MIME types) here
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'video/mp4', 'video/quicktime'];

    if (allowedMimeTypes.includes(file.mimetype)) {
        return cb(null, true);
    } else {
        return cb(('File type not allowed'));
    }
};

const upload = multer({
    storage: storage,
    fileSize: 10 * 1024 * 1024, // 10MB
    fileFilter: fileFilter
});

export default upload