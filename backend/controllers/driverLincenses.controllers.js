import driverLicensesService from "../services/driverLicenses.services.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";

export const regisLicensesDriver = async (req, res, next) => {
    try {
        const result = await driverLicensesService.regisLicensesDriver(req.body, req?.file)
        return res.status(HTTP_STATUS.OK).json({
            message: "Register Driver License successfully",
            result
        })

    } catch (error) {
        console.log(error)
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            error: "Internal Server Error",
        })
    }
}