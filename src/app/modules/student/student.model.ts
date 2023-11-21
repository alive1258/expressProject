// Importing necessary modules from mongoose and interfaces
import validator from 'validator';
import { Schema, model } from 'mongoose';
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  StudentModel,
  TUsername,
} from './student.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

// Defining a schema for the first name, middle name, and last name
const userNameSchema = new Schema<TUsername>({
  firstName: {
    type: String,
    required: [true, 'firstName required'],
    trim: true,
    maxlength: [25, 'firstName cannot be more than 25 characters'],
    validate: {
      validator: function (value: string) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value;
      },
      message: '{VALUE} is not a capitalize formate',
    },
  },
  middleName: { type: String, trim: true },
  lastName: {
    type: String,
    required: [true, 'lastName required'],
    maxlength: [25, 'lastName cannot be more than 25 characters'],
    validate: {
      validator: (value: string) => {
        return validator.isAlpha(value); // Return the result of isAlpha validation
      },
      message: '{VALUE} is not a valid lastName',
    },
  },
});

// Defining a schema for the guardian details (father and mother)
const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, 'fatherName required'],
    trim: true,
  },
  fatherOccupation: { type: String, required: true },
  fatherContact: {
    type: String,
    required: [true, 'father Contact required'],
  },
  motherName: {
    type: String,
    required: [true, 'motherName required'],
    trim: true,
  },
  motherOccupation: { type: String, required: true, trim: true },
  motherContact: {
    type: String,
    required: [true, 'mother Contact required'],
  },
});
// Defining a schema for the local guardian details
const localGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String, required: true, trim: true },
  occupation: { type: String, required: true, trim: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
});

// Defining a schema for the student
const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: { type: String, required: [true, 'ID is Required'], unique: true },
    password: {
      type: String,
      required: [true, 'password is Required'],
      maxlength: [20, 'password can not be more the 20 character'],
    },
    // id: { type: String, required: true },
    name: {
      type: userNameSchema,
      required: true,
    }, // Using the previously defined userNameSchema
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        message:
          "{VALUE} is not Required.The Gender must be:'male','female','other'.",
      },
      required: true,
    }, // Enum type for gender
    dateOfBirth: { type: String },
    // email: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      // validate: {
      //   validator: (value: string) => {
      //     return validator.isEmail(value);
      //   },
      //   message: '{VALUE} is not a valid email type',
      // },
    },
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    }, // Enum type for blood group
    presentAddress: { type: String, required: true, trim: true },
    permanentAddress: { type: String, required: true, trim: true },
    guardian: {
      type: guardianSchema,
      required: true,
    }, // Using the previously defined guardianSchema
    localGuardian: {
      type: localGuardianSchema,
      required: true,
    }, // Using the previously defined localGuardianSchema
    profileImg: { type: String },
    isActive: {
      type: String,

      enum: ['active', 'blocked'],
      default: 'active',
    }, // Enum type for student status
    isDeleted: { type: Boolean, default: false },
  },
  {
    toJSON: { virtuals: true },
  },
);
//virtual
studentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName}  ${this.name.middleName}  ${this.name.lastName}`;
});

//pre save middleware/hook ; will work on create() save ())
studentSchema.pre('save', async function (next) {
  // console.log(this, 'pre hook: we will save the data');
  //hashing password and save into db
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; // ei this a current process document ke refer kory
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});
//post save middleware/hook
studentSchema.post('save', function (doc, next) {
  doc.password = '';
  console.log(this, 'post hook: we  saved the data');
  next();
});

//query Middleware
studentSchema.pre('find', function (next) {
  // console.log(this);
  this.find({ isDeleted: { $ne: true } });
  next();
});
studentSchema.pre('findOne', function (next) {
  // console.log(this);
  this.find({ isDeleted: { $ne: true } });
  next();
});
studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  // this.find({ isDeleted: { $ne: true } });
  next();
});
//creating a custom statics method

studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};
// Defining a schema method for checking if a user exists by ID

// creating a custom interface method
// studentSchema.methods.isUserExits = async function (id: string) {
//   const existingUser = await Student.findOne({ id });
//   return existingUser;
// };
// create model
export const Student = model<TStudent, StudentModel>('Student', studentSchema);
// export const Student = model<TStudent, StudentModel>('Student', studentSchema);
