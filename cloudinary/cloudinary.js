//  using multer and cloudinary to store user uploaded images
const cloudinary = require("cloudinary");
const multer = require("multer");
const cloudinaryStorage = require("multer-storage-cloudinary");
const dotenv = require('dotenv');
dotenv.config()

// load in cloudinary environment variables
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

// configure the cloudinary storage, only accepts jpg and png files
const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: "VolunTeam",
    allowedFormats: ["jpg", "png"],
    transformation: [{ width: 1000, height: 500, crop: "limit" }]
});

// sets multers upload to the cloudinary storage
const parser = multer({ storage: storage });

// export the configured parser
module.exports = parser;