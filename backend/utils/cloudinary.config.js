import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import multer from 'multer'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
})

const storage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ['jpg', 'png'],
  params: {
    folder: 'cars'
  }
})

const storagePDF = new CloudinaryStorage({
  cloudinary,
  allowedFormats: 'pdf',
  params: {
    folder: 'contracts'
  }
})

const uploadCloud = multer({ storage })
export const uploadCloudPDF = multer({ storagePDF })

export default uploadCloud
