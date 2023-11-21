import { z } from 'zod';
// Define a Zod schema for the UserName
const UserNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(25)
    .refine(
      (value) => {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value;
      },
      { message: 'firstName must start with a capital letter' },
    ),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .min(1)
    .max(25)
    .regex(/^[A-Za-z]+$/, { message: 'lastName must contain only letters' }),
});

// Define a Zod schema for the Guardian
const GuardianValidationSchema = z.object({
  fatherName: z.string().min(1),
  fatherOccupation: z.string().min(1),
  fatherContact: z.string().min(1),
  motherName: z.string().min(1),
  motherOccupation: z.string().min(1),
  motherContact: z.string().min(1),
});

// Define a Zod schema for the Local Guardian
const LocalGuardianValidationSchema = z.object({
  name: z.string().min(1),
  occupation: z.string().min(1),
  contactNo: z.string().min(1),
  address: z.string().min(1),
});

// Define a Zod schema for the Student
const StudentZodValidationSchema = z.object({
  id: z.string().min(1),
  password: z.string().max(20),
  name: UserNameValidationSchema,
  gender: z.enum(['male', 'female', 'other']),
  dateOfBirth: z.string().optional(),
  email: z.string().email(),
  contactNo: z.string().min(1),
  emergencyContactNo: z.string().min(1),
  bloodGroup: z
    .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
    .optional(),
  presentAddress: z.string().min(1),
  permanentAddress: z.string().min(1),
  guardian: GuardianValidationSchema,
  localGuardian: LocalGuardianValidationSchema,
  profileImg: z.string().optional(),
  isActive: z.enum(['active', 'blocked']).default('active'),
  isDeleted: z.boolean(),
});
export default StudentZodValidationSchema;
