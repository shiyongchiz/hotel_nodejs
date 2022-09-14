require('dotenv').config;
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

let imageProcess = {
  upload: async (image, userId) => {
    try {
      let fileStr = image.path;
      const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
        public_id: userId,
        upload_preset: 'dev_setups'
      })
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = { cloudinary, imageProcess }