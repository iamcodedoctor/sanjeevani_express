import express from 'express'
import { errorHandler } from '../utils/middlewares/error/errorHandlerMiddleware.js'
import authRouter from '../routes/authRoute.js'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())

app.use('/api/auth', authRouter)

app.use(errorHandler)

export default app
