import couponsService from '../services/coupons.services.js'
import { HTTP_STATUS } from '../constants/httpStatus.js'
import moment from "moment-timezone";

export const createCoupons = async (req, res, next) => {
    try {
        const expiry = moment().add(req.body.expiry, 'days').valueOf();
        const result = await couponsService.createCoupons(req.body, expiry);

        return res.status(HTTP_STATUS.CREATED).json({
            message: 'Created coupon successfully',
            result
        });
    } catch (error) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: "Something went wrong",
            error: error.message
        })
    }
}

export const getCoupons = async (req, res, next) => {
    try {
        const result = await couponsService.getCoupons()
        return res.status(HTTP_STATUS.OK).json({
            message: 'Get coupons successfully',
            result
        })
    } catch (error) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: 'Something went wrong',
            error: error.message
        })
    }
}

export const updateCoupons = async (req, res, next) => {
    try {
        const { cid } = req.params
        const result = await couponsService.updateCoupons(cid, req.body)
        if (!result) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({ error: 'Coupon not found' })
        } else {
            return res.status(HTTP_STATUS.OK).json({
                message: 'Coupon Updated',
                result
            })
        }
    } catch (error) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: 'Something went wrong',
            error: error.message
        })
    }
}
