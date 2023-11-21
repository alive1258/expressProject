import express from 'express';
import { StudentControllers } from './student.controller';

const router = express.Router();
// http://localhost:5000/api/v1/students/createStudent
//will call controller function
router.get('/', StudentControllers.getAllStudents);
router.post('/createStudent', StudentControllers.createStudent);

router.get('/:studentId', StudentControllers.getSingleStudent);
router.delete('/:studentId', StudentControllers.deleteStudent);

export const StudentRoutes = router;
