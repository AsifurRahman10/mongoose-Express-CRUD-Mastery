import { Model, model, Schema } from 'mongoose'
import { TUser, UserModal } from './user.interface.js'
import bcrypt from 'bcrypt'
import dotEnv from '../../config/index.js'

const nameSchema = new Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
  },
  { _id: false }
)

const addressSchema = new Schema(
  {
    street: { type: String },
    city: { type: String },
    country: { type: String },
  },
  { _id: false }
)

const orderSchema = new Schema(
  {
    productName: { type: String },
    price: { type: Number },
    quantity: { type: Number },
  },
  { _id: false }
)

const userSchema = new Schema<TUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  fullName: nameSchema,
  age: Number,
  email: { type: String, required: true, unique: true },
  isActive: { type: Boolean, required: true },
  hobbies: [String],
  address: addressSchema,
  orders: [orderSchema],
})

userSchema.pre('save', async function (this: any) {
  if (typeof this.isModified === 'function' && !this.isModified('password'))
    return

  const saltRounds = Number(
    process.env.BCRYPT_SALT_ROUNDS ?? dotEnv?.bcrypt_salt_rounds ?? 10
  )
  this.password = await bcrypt.hash(this.password, saltRounds)
})
function removeSensitive(doc: any, ret: any) {
  delete ret.password
  delete ret.__v
  return ret
}

userSchema.set('toJSON', { transform: removeSensitive })
userSchema.set('toObject', { transform: removeSensitive })

userSchema.statics.existsById = async function (id: string) {
  return !!(await this.exists({ _id: id }))
}

export const User = model<TUser, UserModal>('User', userSchema)
