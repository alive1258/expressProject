import express from 'express';
import { FacultyControllers } from './faculty.controller';
import validateRequest from '../../middlwares/validateRequest';
import { updateFacultyValidationSchema } from './faculty.validation';
const router = express.Router();

router.get('/:facultyId', FacultyControllers.getSingleFaculty);

router.patch(
  '/:facultyId',
  validateRequest(updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
);

router.delete('/:facultyId', FacultyControllers.deleteFaculty);

router.get('/', FacultyControllers.getAllFaculties);

export const FacultyRoutes = router;
