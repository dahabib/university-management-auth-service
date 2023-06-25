import express from 'express'
import { AcademicFacultyValidation } from './academicFaculty.validation'
import { AcademicFacultyController } from './academicFaculty.controller'
import validateRequest from '../../middlewares/validateRequest'

const router = express.Router()

router.post(
  '/create-faculty',
  validateRequest(AcademicFacultyValidation.createAcademicFacultyZodSchema),
  AcademicFacultyController.createFaculty
)

router.get('/:id', AcademicFacultyController.getSingleFaculty)
router.patch(
  '/:id',
  validateRequest(AcademicFacultyValidation.updateAcademicFacultyZodSchema),
  AcademicFacultyController.updateFaculty
)
router.delete('/:id', AcademicFacultyController.deleteFaculty)
router.get('/', AcademicFacultyController.getAllFaculty)

export const AcademicFacultyRoutes = router
