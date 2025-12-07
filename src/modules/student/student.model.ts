import { model, Schema } from 'mongoose'
import { TUser } from './student.interface.js'

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

export const User = model('User', userSchema)
