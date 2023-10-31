import DriverLicenses from "../models/driverLicenses.model.js";

class DriverLicensesService {
    async regisLicensesDriver(payloadBody, payloadFile) {
        try {
            const image = payloadFile.path
            if (image) payloadBody.image = image
            const { dob } = payloadBody;
            const dobParts = dob.split('-');
            const dobDate = new Date(dobParts[2], dobParts[1] - 1, dobParts[0]);

            if (!isNaN(dobDate.getTime())) {
                payloadBody.dob = `${dobParts[2]}-${dobParts[1]}-${dobParts[0]}`
            }
            const result = await DriverLicenses.create({ ...payloadBody })
            console.log(result)
            return result
        } catch (error) {
            console.log(error);
            throw error
        }
    }

    async acceptLicensesDriver(did, newStatus) {
        try {
            const acceptLicensesDriver = await DriverLicenses.findByIdAndUpdate(did, newStatus)
            return acceptLicensesDriver
        } catch (error) {
            throw new Error(error)
        }
    }
}

const driverLicensesService = new DriverLicensesService()
export default driverLicensesService