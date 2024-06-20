import express from 'express'
import asyncHandler from "express-async-handler"
import controller from "../controllers/workoutController.js"
import authMiddleware from '../middlewares/authMiddleware.js'


const router = express.Router()

router.use(authMiddleware)

router.get('/', controller.getAllRecords)

router.post('/', controller.postWorkout)

router.delete('/:id', controller.deleteWorkout)

router.get('/:date', controller.getWorkouts)

export default router;
