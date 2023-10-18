import { BRAND_MESSAGE } from '../constants/messages.js'
import brandsService from '../services/brands.services.js';

export const createBrand = async (req, res, next) => {
    const result = await brandsService.createBrands(req.body)
    return res.json({
        message: BRAND_MESSAGE.CREATE_BRAND_SUCCESS, result
    })
}
