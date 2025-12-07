import { model, Schema } from 'mongoose'
import { TUser } from './user.interface.js'
import bcrypt from 'bcrypt'
import dotEnv from '../../config/index.js'

const nameSchema = new Schema({
  fullName: {
    firstName: { type: String },
    lastName: { type: String },
  },
})

const addressSchema = new Schema({
  street: {
    type: String,
  },
  city: {
    type: String,
  },
  country: {
    type: String,
  },
})

const orderSchema = new Schema({
  productName: { type: String },
  price: { type: Number },
  quantity: { type: Number },
})

const userSchema = new Schema<TUser>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  fullName: nameSchema,
  age: {
    type: Number,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
  hobbies: {
    type: [String],
  },
  address: addressSchema,
  orders: {
    type: [orderSchema],
  },
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

export const User = model('User', userSchema)
