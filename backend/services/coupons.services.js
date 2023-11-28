import Coupons from "../models/coupons.model.js";

class CouponsService {
    async createCoupons(payload, expiry) {
        try {
            const createCoupons = await Coupons.create({ ...payload, expiry: new Date(expiry) });
            return createCoupons;
        } catch (error) {
            throw Error(error);
        }
    }

    async getCoupons() {
        try {
            const getCoupons = Coupons.find().sort({ createdAt: -1 })
            return getCoupons
        } catch (error) {
            throw Error(error);
        }
    }

    async updateCoupons(cid, payload) {
        try {
            const updateCoupons = await Coupons.findByIdAndUpdate(cid, payload, { new: true })
            return updateCoupons
        } catch (error) {
            throw new Error(error)
        }
    }
}
const couponsService = new CouponsService();
export default couponsService;