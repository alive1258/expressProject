import Joi from 'joi';

const usernameValidationSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .required()
    .max(25)
    .regex(/^[A-Z][a-z]*$/, { name: 'capitalized' })
    .messages({
      'string.base': 'firstName must be a string',
      'string.empty': 'firstName cannot be empty',
      'string.max': 'firstName cannot be more than 25 characters',
      'string.pattern.base': 'firstName must start with a capital letter',
      'any.required': 'firstName is required',
    }),
  middleName: Joi.string().trim(),
  lastName: Joi.string()
    .trim()
    .required()
    .max(25)
    .regex(/^[A-Za-z]+$/, { name: 'alphabetic' })
    .messages({
      'string.base': 'lastName must be a string',
      'string.empty': 'lastName cannot be empty',
      'string.max': 'lastName cannot be more than 25 characters',
      'string.pattern.base': 'lastName must contain only letters',
      'any.required': 'lastName is required',
    }),
});

const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().trim().required(),
  fatherOccupation: Joi.string().required(),
  fatherContact: Joi.string().required(),
  motherName: Joi.string().trim().required(),
  motherOccupation: Joi.string().trim().required(),
  motherContact: Joi.string().required(),
});

const localGuardianValidationSchema = Joi.object({
  name: Joi.string().trim().required(),
  occupation: Joi.string().trim().required(),
  contactNo: Joi.string().required(),
  address: Joi.string().required(),
});

const studentValidationSchema = Joi.object({
  id: Joi.string().required(),
  name: usernameValidationSchema.required(),
  gender: Joi.string().valid('male', 'female', 'other').required().messages({
    'any.only': 'Gender must be: male, female, other',
    'any.required': 'Gender is required',
  }),
  dateOfBirth: Joi.string(),
  email: Joi.string().email().required(),
  contactNo: Joi.string().required(),
  emergencyContactNo: Joi.string().required(),
  bloodGroup: Joi.string().valid(
    'A+',
    'A-',
    'B+',
    'B-',
    'AB+',
    'AB-',
    'O+',
    'O-',
  ),
  presentAddress: Joi.string().required(),
  permanentAddress: Joi.string().required(),
  guardian: guardianValidationSchema.required(),
  localGuardian: localGuardianValidationSchema.required(),
  profileImg: Joi.string(),
  isActive: Joi.string().valid('active', 'blocked').default('active'),
});
export default studentValidationSchema;
