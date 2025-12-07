import { Router } from 'express'
import { createUser } from './user.controller.js'

const route = Router()

route.post('/create-user', createUser)

export default route
