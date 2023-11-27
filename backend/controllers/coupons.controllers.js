import couponsService from '../services/coupons.services.js'
import { HTTP_STATUS } from '../constants/httpStatus.js'
import { validate } from '../utils/validator.js';
import Coupons from '../models/coupons.model.js';

export const createCoupon = async (req, res, next) => {
    try {
        const expiry = Date.now() + req.body.expiry * 24 * 60 * 60 * 1000;
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

export const deleteCoupon = async (req, res) => {

    const {id} = req.params;
    validate(id);
    try {
        const deleteCoupon = await Coupons.findByIdAndDelete(id, req.body,{
            new: true,
        });
        res.json(deleteCoupon)
    } catch (error) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: 'Something went wrong',
            error: error.message
        })
    }
}