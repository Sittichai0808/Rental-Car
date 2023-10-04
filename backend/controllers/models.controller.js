import { MODEL_MESSAGE } from '../constants/messages.js'
import modelsService from '../services/models.services.js'

export const createModels = async (req, res, next) => {
    const result = await modelsService.createModels(req.body)
    return res.json({
        message: MODEL_MESSAGE.CREATE_MODEL_SUCCESS, result
    })
}
