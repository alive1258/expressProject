import config from '../../config';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  //create a user object
  const userData: Partial<TUser> = {};

  //if password is not given, use default password
  userData.password = password || (config.default_password as string);
  //   if (!password) {
  //     user.password = config.default_password as string;
  //   } else {
  //     user.password = password;
  //   }
  //set student role

  userData.role = 'student';
  //set manulaaly genarate id
  userData.id = '2030100001';

  const newUser = await User.create(userData);

  if (Object.keys(newUser).length) {
    studentData.id = newUser.id;
    studentData.user = newUser._id; //reference_id
    const newStudent = await Student.create(studentData);
    return newStudent;
  }
  return newUser;
};

export const UserServices = {
  createStudentIntoDB,
};
