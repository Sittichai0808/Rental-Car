// import { defaultErrorHandler } from './middlewares/error.middlewares'
import usersRouter from './routes/users.routes.js'
import brandsRoutes from './routes/brands.routes.js'
import modelsRoutes from './routes/models.routes.js'
import carsRoutes from './routes/cars.routes.js'
import databaseServices from './services/database.services.js'
import { defaultErrorHandler } from './middlewares/errors.middlewares.js'
import pkg from 'lodash'
const { omit } = pkg
import { HTTP_STATUS } from './constants/httpStatus.js'
import { ErrorWithStatus } from './models/error.js'

import express from 'express'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import cors from 'cors'
const app = express()
const port = 4000
console.log('hello')
databaseServices.connect()
app.use(
  cors({
    origin: 'http://localhost:3000', // Thay đổi nguồn gốc tại đây nếu cần
    credentials: true // Cho phép sử dụng các credentials như cookie
  })
)
app.use(express.json())
app.use(cookieParser())

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


app.use('/users', usersRouter)

app.use((err, req, res, next) => {
  if (err instanceof ErrorWithStatus) {
    return res.status(err.status).json(omit(err, ['status']))
  }
  Object.getOwnPropertyNames(err || Object(err)).forEach((key) => {
    Object.defineProperty(err, key, { enumerable: true })
  })
  return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    message: err,
    errorInfo: omit(err, ['stack'])
  })
})
app.use('/brands', brandsRoutes);
app.use('/models', modelsRoutes);
app.use('/cars', carsRoutes)
