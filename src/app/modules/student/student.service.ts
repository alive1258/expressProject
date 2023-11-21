import { TStudent } from './student.interface';
import { Student } from './student.model';

const createStudentIntoDB = async (studentData: TStudent) => {
  if (await Student.isUserExists(studentData.id)) {
    throw new Error('user already exists');
  }
  // const result = await StudentModel.create(student); // built in static method
  const result = await Student.create(studentData);

  // built in static method
  // const student = new Student(studentData); //create an instance
  // if (await student.isUserExits(studentData.id)) {
  //   throw new Error('user already exists!');
  // }

  // const result = await student.save(); // built in instance method
  // const result = await student.save(); // built in instance method

  return result;
};
const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};
const getSingleStudentsFromDB = async (id: string) => {
  // const result = await Student.findOne({ id });
  const result = await Student.aggregate([{ $match: { id: id } }]);
  return result;
};
const deleteStudentsFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentsFromDB,
  deleteStudentsFromDB,
};
