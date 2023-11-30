import { UserController } from './user.controller';
import express from 'express';
import { createStudentZodValidationSchema } from '../student/student.zod.validation';
import validateRequest from '../../middlwares/validateRequest';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(createStudentZodValidationSchema),
  UserController.createStudent,
);

export const UserRoutes = router;
