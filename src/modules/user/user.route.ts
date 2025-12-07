import { Router } from 'express'
import {
  createUser,
  deleteUser,
  getAllUser,
  getSingleUser,
  updateUserInfo,
} from './user.controller.js'

const route = Router()

route.post('/create-user', createUser)
route.get('/', getAllUser)
route.get('/:id', getSingleUser)
route.put('/:id', updateUserInfo)
route.delete('/:id', deleteUser)

export default route
