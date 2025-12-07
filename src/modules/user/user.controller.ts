import {
  createUserService,
  deleteUserService,
  getAllUserService,
  getSingleUserService,
  isUserExistService,
  updateUserService,
} from './user.service.js'
import { Request, Response } from 'express'
import { userValidationSchema, updateUserSchema } from './user.validation.js'
import { User } from './user.model.js'

export const createUser = async (req: Request, res: Response) => {
  try {
    const validatedData = await userValidationSchema.validateAsync(req.body, {
      abortEarly: false,
      stripUnknown: true,
    })

    const exists = await isUserExistService(
      validatedData.username,
      validatedData.email
    )
    if (exists) {
      return res.status(409).json({
        success: false,
        message: 'Username or email already exists',
      })
    }
    const user = await createUserService(validatedData)
    return res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: user,
    })
  } catch (error: any) {
    if (error.isJoi) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.details.map((e: any) => e.message),
      })
    }

    // 6️⃣ Internal server error
    return res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
    })
  }
}

export const getAllUser = async (req: Request, res: Response) => {
  const allUser = await getAllUserService()
  return res.status(201).json({
    success: true,
    message: 'All User retrieve successfully',
    data: allUser,
  })
}

export const getSingleUser = async (req: Request, res: Response) => {
  const { id } = req.params
  if (!id) {
    return res.status(500).json({
      success: false,
      message: 'Id is required',
    })
  }
  try {
    const user = await getSingleUserService(id)
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' })
    }
    return res.status(201).json({
      success: true,
      message: 'User retrieve successfully',
      data: user,
    })
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: 'Internal server error' })
  }
}

export const updateUserInfo = async (req: Request, res: Response) => {
  const { id } = req.params
  if (!id) {
    return res.status(500).json({
      success: false,
      message: 'Id is required',
    })
  }

  try {
    const { error, value } = updateUserSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    })
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.details.map((d) => d.message),
      })
    }
    const exists = await User.existsById(id)
    if (!exists) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      })
    }
    const updatedUser = await updateUserService(id, value)

    return res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: updatedUser,
    })
  } catch (error) {
    console.log(error)
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params
  if (!id) {
    return res.status(500).json({
      success: false,
      message: 'Id is required',
    })
  }

  try {
    const exists = await User.existsById(id)
    if (!exists) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      })
    }
    const deleteUser = await deleteUserService(id)
    if (deleteUser) {
      return res.status(201).json({
        success: true,
        message: 'User deleted successfully!',
        data: null,
      })
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: 'Internal server error' })
  }
}
