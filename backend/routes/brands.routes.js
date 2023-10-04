import express from 'express'
import { createBrand } from '../controllers/brands.controllers.js'
const brandsRoutes = express.Router()

brandsRoutes.post('/createBrand', createBrand)

export default brandsRoutes