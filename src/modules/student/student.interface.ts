export type TUser = {
  username: string
  password: string
  fullName: TName
  age: number
  email: string
  isActive: boolean
  hobbies: string[]
  address: TAddress
  orders: TOrder[]
}

interface TName {
  firstName: string
  lastName: string
}

export interface TAddress {
  street: string
  city: string
  country: string
}

export interface TOrder {
  productName: string
  price: number
  quantity: number
}
