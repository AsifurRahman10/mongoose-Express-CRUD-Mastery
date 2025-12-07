import { Router } from 'express'
import { createUser, getAllUser, getSingleUser } from './user.controller.js'

const route = Router()

route.post('/create-user', createUser)
route.get('/', getAllUser)
route.get('/:id', getSingleUser)

export default route
