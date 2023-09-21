// import { defaultErrorHandler } from './middlewares/error.middlewares'
import usersRouter from './routes/users.routes.js'
import databaseServices from './services/database.services.js'
import { defaultErrorHandler } from './middlewares/errors.middlewares.js'
import express from 'express'
import mongoose from 'mongoose'
const app = express()
const port = 4000
console.log('hello')
// databaseServices.connect()

mongoose
  .connect(
    'mongodb+srv://anhsangprovl:anhsangprovl@cluster0.defhizq.mongodb.net/rental-car?retryWrites=true&w=majority'
  )
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((err) => {
    console.log(err)
  })
app.use(express.json())

app.use('/users', usersRouter)
app.use(defaultErrorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
