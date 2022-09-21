const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')


// GET all workouts
const getWorkouts = async (req, res) => {
  const workouts = await Workout.find({}).sort({createdAt: -1})

  res.status(200).json(workouts)
}

// GET a single workout
const getWorkout = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'Workout not found'})
  }

  const workout = await Workout.findById(id)

  if (!workout) {
    return res.status(404).json({error: 'Workout not found'})
  }

  res.status(200).json(workout)
}

// POST a new workout
const createWorkout = async (req, res) => {
  const {title, reps, load} = req.body

  // add document to database
  try {
    const workout = await Workout.create({title, reps, load})
    res.status(200).json(workout)
  } catch (err) {
    res.status(400).json({error: err.message})
  }
}


// DELETE a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'Workout not found'})
  }

  const workout = await Workout.findOneAndDelete({_id: id})

  if (!workout) {
    return res.status(404).json({error: 'Workout not found'})
  }

  res.status(200).json(workout)
}

// UPDATE a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'Workout not found'})
  }

  // const {title, reps, load} = req.body

  // update document
  const workout = await Workout.findOneAndUpdate({_id: id}, {
    ...req.body
  })
  
  if (!workout) {
    return res.status(404).json({error: 'Workout not found'})
  }

  res.status(200).json(workout)
}


module.exports = { 
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout
}