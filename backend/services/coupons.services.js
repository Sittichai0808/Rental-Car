
  import Coupons from '../models/coupons.model.js'

class CouponsService {
    async createCoupons(payload, expiry) {
        try {
            const createCoupons = await Coupons.create({ ...payload, expiry: expiry });
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
    async getCouponById(couponId) {
        console.log(couponId)
        try {
          const getCouponById = await Coupons.findById(couponId)
          return getCouponById
        } catch (error) {
          console.log(error)
        }
      }

    async updateCoupon(couponId, payload) {
        try {
            const updateCoupon = await Coupons.findByIdAndUpdate(couponId, payload, { new: true })
            return updateCoupon
        } catch (error) {
            throw new Error(error)
        }
    }
    async deleteCoupon(couponId) {
        try { 
             await Coupons.findByIdAndDelete(couponId);         
          return {message: "Delete thanh cong!"}
        } catch (error) {
            throw new Error(error)
        }
    }
     
}
 
const couponsService = new CouponsService();
export default couponsService;