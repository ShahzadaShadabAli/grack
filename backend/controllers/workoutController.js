import Workout from "../models/workoutModel.js"
import asyncHandler from "express-async-handler"


const deleteWorkout = asyncHandler(async (req, res) => {
    const deleted = await Workout.findByIdAndDelete(req.params.id);
    if (deleted) {
        res.status(200).json({ message: "Successfully Deleted Track" })
    } else {
        res.status(400).json({ message: "Failed to delete track" })
    }
})

const postWorkout = asyncHandler(async (req, res) => {
    const { workout, reps, day, weight, user } = req.body;

    if (!workout || !reps || !weight || !user || !day) {
        res.status(400).json({ message: 'Kindly fill all the credentials' });
    }

    const totalWeight = Number(reps * weight)

    const newWorkout = new Workout({
        workout,
        reps,
        weight,
        day,
        totalWeight,
        user
    });

    const saved = await newWorkout.save();

    if (saved) {
        res.status(200).json({ message: 'Successfully sent workout' });
    } else {
        res.status(400).json({ message: 'Failed to send workout' });
    }
})

const getWorkouts = async (req, res) => {
    const dateParam = req.params.date;
    const startDate = new Date(dateParam);
    const endDate = new Date(dateParam);
    endDate.setDate(endDate.getDate() + 1); 

    try {
        const data = await Workout.find({
            dateCreated: {
                $gte: startDate,
                $lt: endDate,
            },
            user: req.user
        });
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllRecords = async (req, res) => {
    try {
        const datesWithSums = await Workout.aggregate([
            {
                $match: { user: req.user._id }
            },
            {
                $group: {
                    _id: {
                        $dateToString: { format: "%Y-%m-%d", date: "$dateCreated" }
                    },
                    totalWeight: { $sum: "$totalWeight" },
                    day: { $first: "$day" },
                    dateCreated: { $first: "$dateCreated" }
                }
            },
            {
                $sort: { dateCreated: -1 }
            }
        ]);

        res.status(200).json(datesWithSums);
    } catch (error) {
        res.status(400).json({ message: 'Failed to send workout', error: error.message });
    }
};


const exports = { getWorkouts, postWorkout, deleteWorkout, getAllRecords }
export default exports