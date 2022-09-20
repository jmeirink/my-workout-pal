require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')

// express app
const app = express()

// middleware
app.use(express.json())
app.use((req, res, next) => {
  console.log(req.method, req.path)
  next()
})

// routes
app.use('/api/workouts', workoutRoutes)

// connect to database
mongoose.connect(process.env.DATABASE_URL)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to database & listening on port 4000')
    })
  })
  .catch(err => {
    console.log(err)
  })



