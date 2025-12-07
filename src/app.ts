import express, { Application } from 'express'
import cors from 'cors'

const app: Application = express()

app.use(express.json())
app.use(cors())

import userRouter from '../src/modules/user/user.route.js'

app.use('/api/v1/user', userRouter)

export default app
