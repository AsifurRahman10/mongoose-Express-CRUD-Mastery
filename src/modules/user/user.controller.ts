import { createUserService, isUserExistService } from './user.service.js'
import { Request, Response } from 'express'
import userValidationSchema from './user.validation.js'

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
