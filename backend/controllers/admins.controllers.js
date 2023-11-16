import { HTTP_STATUS } from '../constants/httpStatus.js'
import adminServices from '../services/admin.services.js'


export const getUsers = async (req, res, next) => {
    try {
        const result = await adminServices.getUsers()
        return res.status(HTTP_STATUS.OK).json({
            message: 'Get List Users Success',
            result
        })
    } catch (error) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: 'Could not get list users' })
    }
}

export const getDetailUser = async (req, res, next) => {
    try {
        const { userId } = req.params
        const result = await adminServices.getDetailUser(userId)
        if (!result) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({ error: 'User not found' })
        } else {
            return res.status(HTTP_STATUS.OK).json({
                message: 'Get Detail User Success',
                result
            })
        }
    } catch (e) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: 'Something went wrong' })
    }
}

export const getStaffs = async (req, res, next) => {
    try {
        const result = await adminServices.getStaffs()
        return res.status(HTTP_STATUS.OK).json({
            message: 'Get List Staffs success',
            result
        })
    } catch (error) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: 'Could not get list staffs' })
    }
}

export const createStaff = async (req, res, next) => {
    try {
        const result = await adminServices.createStaff(req.body)
        return res.status(HTTP_STATUS.OK).json({
            message: "Staff created successfully",
            result: result
        })
    } catch (error) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            error: "Something went wrong",
        })
    }
}

export const updateStatusUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const result = await adminServices.updateStatusUser(userId, req.body);

        if (!result) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                message: "User not found"
            });
        } else {
            return res.status(HTTP_STATUS.OK).json({
                message: "Status updated",
                result
            });
        }
    } catch (error) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            error: 'Something went wrong'
        });
    }
};