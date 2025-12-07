import { TUser } from './user.interface.js'
import { User } from './user.model.js'

export const isUserExistService = async (username: string, email: string) => {
  const isExist = await User.findOne({
    $or: [{ username }, { email }],
  })
  return isExist
}

export const createUserService = async (userData: TUser) => {
  try {
    const createUser = await User.create(userData)
    return createUser.toJSON()
  } catch (error) {
    throw error
  }
}
