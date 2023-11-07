import express from 'express'
import { uploadFilePDFContract } from '../controllers/contracts.controllers.js'
import { wrapRequestHandler } from '../utils/handlers.js'
import { accessTokenValidator, adminValidator, staffValidator } from '../middlewares/users.middlewares.js'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import multer from 'multer'
import { v2 as cloudinary } from 'cloudinary'
const contractsRoutes = express.Router()
const upload = multer()
const storage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: 'pdf',
  params: {
    folder: 'contracts'
  }
})
const uploadCloudPDF = multer({ storage: storage })
contractsRoutes.post('/uploadFilePDF', uploadCloudPDF.single('uploadPDF'), (req, res) => {
  // Get the path to the uploaded file
  const filePath = req?.file.path
  return res.json(filePath)
})
export default contractsRoutes
