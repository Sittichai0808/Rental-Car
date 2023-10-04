import express from 'express'
import { createModels } from '../controllers/models.controller.js'
const modelsRoutes = express.Router()

modelsRoutes.post('/createModel', createModels)

export default modelsRoutes