import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import axios from "axios"
import useAuthContext from '../../hooks/useAuthContext';
import api from '../../Inceptor/api';

const ExerciseForm = ({ fetchTracks, isNewTrack }) => {
    console.log("IsNewTrack: "+isNewTrack)
    const [day, setDay] = useState('')
    const [workout, setWorkout] = useState('')
    const [weight, setWeight] = useState('')
    const [reps, setReps] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const { state, dispatch } = useAuthContext()

    const days = ["Pull", "Push", "Legs"]

    const setInStorage = (day) => {
        setDay(day)
        localStorage.setItem('day', JSON.stringify(day))
    }

    useState(() => {
        const workoutDay = JSON.parse(localStorage.getItem('day')) ? JSON.parse(localStorage.getItem('day')) : ''
        setDay(workoutDay)
    }, [])

    // if (workoutDay) setDay(workoutDay)

    const handleSubmit = async (e) => {
        setIsLoading(true)
        e.preventDefault()
        const workoutLog = {
            workout,
            weight,
            day,
            reps
        }
        try {
            const workouts = await api.post("https://grack.vercel.app/workouts", { ...workoutLog, user: state.user.id })
            if (workouts) {
                console.log("Workout Added Successfully")
            } else {
                console.log("Failed To Add Workout")
            }
        } catch (error) {
            console.log(error.message)
            setIsLoading(false)
        }
        fetchTracks()
        setWorkout('')
        setReps('')
        setWeight('')
        setIsLoading(false)
    }

    return (
        <Container className="form-container">
            <h2 className="text-center form-heading">Exercise Log</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="exercise" className="form-group mb-2">
                    <Form.Label className="form-label">Workout Day</Form.Label>
                    {!isNewTrack && <Form.Control
                        as="select"
                        disabled
                        value={day}
                        onChange={(e) => setInStorage(e.target.value)}
                        className="form-control"
                    >
                        <option value="">Select Day</option>
                        {days.map(day => {
                            return (
                                <option value={day}>{day}</option>
                            )
                        }
                        )}
                    </Form.Control>}
                    {isNewTrack && <Form.Control
                        as="select"
                        value={day}
                        onChange={(e) => setInStorage(e.target.value)}
                        className="form-control"
                    >
                        <option value="">Select Day</option>
                        {days.map(day => {
                            return (
                                <option value={day}>{day}</option>
                            )
                        }
                        )}
                    </Form.Control>}
                </Form.Group>

                <Form.Group controlId="exercise" className="form-group mb-2">
                    <Form.Label className="form-label">Exercise</Form.Label>
                    <Form.Control
                        value={workout}
                        onInput={(e) => setWorkout(e.target.value)}
                        type="text"
                        placeholder="Enter exercise"
                        className="form-control"
                    />
                </Form.Group>

                <Form.Group controlId="reps" className="form-group mb-2">
                    <Form.Label className="form-label">Reps</Form.Label>
                    <Form.Control
                        value={reps}
                        onInput={(e) => setReps(e.target.value)}
                        type="number"
                        placeholder="Enter reps"
                        className="form-control"
                    />
                </Form.Group>

                <Form.Group controlId="weight" className="form-group mb-2">
                    <Form.Label className="form-label">Weight (kg)</Form.Label>
                    <Form.Control
                        value={weight}
                        onInput={(e) => setWeight(e.target.value)}
                        type="number"
                        placeholder="Enter weight"
                        className="form-control"
                    />
                </Form.Group>

                {!isLoading && <Button type="submit" className="btn-custom ms-auto my-4">
                    Add Log
                </Button>}
                {isLoading && <Button disabled type="submit" className="btn-custom ms-auto my-4">
                    Adding Log...
                </Button>}
            </Form>
        </Container>
    );
};

export default ExerciseForm;
