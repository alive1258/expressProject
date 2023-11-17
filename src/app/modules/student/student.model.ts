// Importing necessary modules from mongoose and interfaces
import { Schema, model } from 'mongoose';
import {
  Guardian,
  LocalGuardian,
  Student,
  Username,
} from './student.interface';

// Defining a schema for the first name, middle name, and last name
const userNameSchema = new Schema<Username>({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
});

// Defining a schema for the guardian details (father and mother)
const guardianSchema = new Schema<Guardian>({
  fatherName: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  fatherContact: { type: String, required: true },
  motherName: { type: String, required: true },
  motherOccupation: { type: String, required: true },
  motherContact: { type: String, required: true },
});
// Defining a schema for the local guardian details
const localGuardianSchema = new Schema<LocalGuardian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
});

// Defining a schema for the student
const studentSchema = new Schema<Student>({
  id: { type: String },
  name: userNameSchema, // Using the previously defined userNameSchema
  gender: ['male', 'female'], // Enum type for gender
  dateOfBirth: { type: String },
  email: { type: String, required: true },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  bloodGroup: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], // Enum type for blood group
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: guardianSchema, // Using the previously defined guardianSchema
  localGuardian: localGuardianSchema, // Using the previously defined localGuardianSchema
  profileImg: { type: String },
  isActive: ['active', 'blocked'], // Enum type for student status
});

// create model
const Student = model<Student>('Student', studentSchema);
