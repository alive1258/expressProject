import { TStudent } from './student.interface';
import { Student } from './student.model';

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
  // const result = await Student.findByIdAndDelete(id);
  return result;
};

const updateStudentsFromDB = async (studentData: TStudent, id: string) => {
  const result = await Student.findByIdAndUpdate(id, studentData, {
    new: true,
    runValidators: true,
  });

  return result;
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentsFromDB,
  deleteStudentsFromDB,
  updateStudentsFromDB,
};
