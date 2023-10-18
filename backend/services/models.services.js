import Models from "../models/models.model.js"

class ModelsService {
    async createModels(payload) {
        const newModels = new Models({
            ...payload,
        })
        try {
            await newModels.save()
        } catch (error) {
        }
    }
}
const modelsService = new ModelsService()
export default modelsService