import Joi from 'joi'

const userValidation = Joi.object({
  username: Joi.string().alphanum().required().messages({
    'string.base': 'Username must be a string',
    'string.alphanum': 'Username can only contain letters and numbers',
    'any.required': 'Username is required',
  }),

  password: Joi.string().required().messages({
    'string.base': 'Password must be a string',
    'any.required': 'Password is required',
  }),

  fullName: Joi.object({
    firstName: Joi.string().messages({
      'string.base': 'First name must be a string',
    }),
    lastName: Joi.string().messages({
      'string.base': 'Last name must be a string',
    }),
  }).messages({
    'object.base': 'Full name must be an object',
  }),

  age: Joi.number().messages({
    'number.base': 'Age must be a number',
  }),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required()
    .messages({
      'string.base': 'Email must be a string',
      'string.email':
        'Email must be a valid email address (e.g., user@example.com)',
      'any.required': 'Email is required',
    }),

  isActive: Joi.boolean().required().messages({
    'boolean.base': 'isActive must be true or false',
    'any.required': 'isActive field is required',
  }),

  hobbies: Joi.array()
    .items(
      Joi.string().messages({
        'string.base': 'Each hobby must be a string',
      })
    )
    .messages({
      'array.base': 'Hobbies must be an array',
    }),

  address: Joi.object({
    street: Joi.string().messages({
      'string.base': 'Street must be a string',
    }),
    city: Joi.string().messages({
      'string.base': 'City must be a string',
    }),
    country: Joi.string().messages({
      'string.base': 'Country must be a string',
    }),
  }).messages({
    'object.base': 'Address must be an object',
  }),

  orders: Joi.array()
    .items(
      Joi.object({
        productName: Joi.string().required().messages({
          'string.base': 'Product name must be a string',
          'any.required': 'Product name is required',
        }),
        price: Joi.number().required().messages({
          'number.base': 'Price must be a number',
          'any.required': 'Price is required',
        }),
        quantity: Joi.number().integer().min(1).required().messages({
          'number.base': 'Quantity must be a number',
          'number.integer': 'Quantity must be an integer',
          'number.min': 'Quantity must be at least 1',
          'any.required': 'Quantity is required',
        }),
      }).messages({
        'object.base': 'Order must be an object',
      })
    )
    .messages({
      'array.base': 'Orders must be an array',
    }),
})

export default userValidation
