import multer from "multer";
import path from 'path';
import fs from "fs"


const storage = multer.diskStorage({
    destination: "./uploads/",
    filename: function (req, file, cb) {
        // Generate a unique filename for the uploaded file
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const fileExtension = path.extname(file.originalname);
        cb(null, file.fieldname + "-" + uniqueSuffix + fileExtension);
    },
});

const fileFilter = (req, file, cb) => {
    // Define allowed MIME types for images and videos
    const allowedMimeTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "video/mp4",
        "video/mpeg",
    ];

    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type"), false);
    }
};

const upload = multer({ storage: storage });


const handleFileUpload = (cover) => async (req, res) => {
    try {
        const imageExts = [".jpeg", ".png", ".gif", ".WebP", ".jpg"];
        media = []

        upload.array('files')(req, res, (err) => {
            
            errorCheck()
            req.files.forEach((file) => {
                media.push(file.filename);
            });

            media.forEach((filename) => {
                if (imageExts.includes(path.extname(filename).toLowerCase())) {
                    cover = filename;
                }
            });

            

            const newEvent = new Event(event);
            newEvent.save();
            return res.status(201).json({ message: 'File(s) uploaded successfully' });
        });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};


const errorCheck = (err) => {
    if (err instanceof multer.MulterError) {
        deleteMedia(media);
        return res.status(400).json({ message: 'Multer error occurred', error: err });
    } else if (err) {
        deleteMedia(media);
        return res.status(500).json({ message: 'Internal server error', error: err });
    }
}

const deleteMedia = (media) => {
    media.forEach(fileName => {
        const filePath = path.join(__dirname, '../', 'uploads', fileName);
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error('Error deleting file:', err);
            } else {
                console.log('File deleted:', filePath);
            }
        });
    });
}

export { handleFileUploadAnd };

