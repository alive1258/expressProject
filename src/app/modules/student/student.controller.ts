import { Request, Response } from 'express';
import { StudentServices } from './student.service';
// import studentValidationSchema from './student.validation';
// import { z } from 'zod';

// import StudentZodValidationSchema from './student.zod.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    //creating a schema validation suing Joi
    const { student: studentData } = req.body;

    //data validation wit zod
    // const zodParsedData = StudentZodValidationSchema.parse(studentData);
    //data validation using Joi
    // const { error, value } = studentValidationSchema.validate(studentData);
    // console.log({ error }, { value });
    // const result = await StudentServices.createStudentIntoDB(value);
    // const result = await StudentServices.createStudentIntoDB(studentData);
    const result = await StudentServices.createStudentIntoDB(studentData);
    // if (error) {
    //   res.status(500).json({
    //     success: false,
    //     message: 'something went wrong',
    //     error: error.details,
    //   });
    // }
    // will call service function to send  this data

    //send response
    res.status(200).json({
      success: true,
      message: 'student is created successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'something went wrong',
      error,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: 'students are retrieved successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'something went wrong',
      error,
    });
  }
};
const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentsFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'students is retrieved successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'something went wrong',
      error,
    });
  }
};
const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.deleteStudentsFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'students is deleted successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'something went wrong',
      error,
    });
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
