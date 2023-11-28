export type TUser = {
  id: string;
  password: string;
  needPassWordChange: boolean;
  role: 'admin' | 'student' | 'faculty';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
};
