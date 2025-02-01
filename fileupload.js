// Set up the storage destination and file naming
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const folders = [
    'uploads/user/document',
    'uploads/user/profile',
    'uploads/banner',
    'uploads/blog',
    'uploads',
];

// Create folders if they don't exist
folders.forEach(folder => {
    const folderPath = path.join(__dirname, folder);
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, {recursive: true});
    }
});


const storage = multer.diskStorage({
    // const uploadFolder;

    destination: (req, file, cb) => {
        const route = req.originalUrl;
        let folderPath;
        // if (route.includes('/user')) {
        //     folderPath = 'uploads/user';
        // } else if (route.includes('/user_document')) {
        //     folderPath = 'uploads/user/document';
        // } else {
        folderPath = 'uploads';
        // }
        cb(null, path.join(__dirname, folderPath)); // Folder to store files
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}-${file.originalname}`;
        cb(null, uniqueSuffix);
    },
});

// Initialize multer
const uploadStorage = multer({storage,});

module.exports = uploadStorage;