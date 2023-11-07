import Contracts from '../models/contracts.model.js'
import { v2 as cloudinary } from 'cloudinary'
class ContractsService {
  async createContract(payloadBody) {
    try {
      const result = await Contracts.create({ ...payloadBody })
      console.log(result)
      return result
    } catch (error) {
      console.log(error)
    }
  }

  async uploadFilePDFContract(payload) {
    // Get the path to the uploaded file
    const { path } = payload

    // Upload the PDF to Cloudinary
    cloudinary.uploader
      .upload(path, {
        resource_type: 'auto' // Automatically determine the file type
      })
      .then((cloudinaryResult) => {
        // Delete the temporarily uploaded file from your server
        fs.unlinkSync(path)

        // Respond with the Cloudinary result, which includes the public URL
        return cloudinaryResult
      })
      .catch((error) => {
        throw new Error('Error uploading file pdf url')
      })
  }
}

const contractsService = new ContractsService()
export default contractsService
