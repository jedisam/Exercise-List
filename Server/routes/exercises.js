const express = require('express');
const router = express.Router()

let Exercise = require('../models/exercise.model') 

// get all Exercises
router.get('/',(req,res)=>{
    Exercise.find({})
        .then(exercise => res.json(exercise))
        .catch(err=>res.status(400).json('Error '+ err))
})

// add an exersice
router.post('/add',(req,res)=>{
    const username = req.body.username
    const description = req.body.description
    const duration = Number(req.body.duration)
    const date = Date.parse(req.body.date)

    const newExercise = new Exercise({
        username,
        description,
        duration,
        date
    })
    
    newExercise.save()
        .then(()=>{res.json('Exercise added!')})
        .catch(err=>res.status(400).json('Error '+err))
})
// Get single Exercise
router.get('/:id',(req,res)=>{
    Exercise.findById(req.params.id)
        .then(exercise=>res.json(exercise))
        .catch(err=>res.status(400).json('Error '+err))
})
// Delete an Exersice
router.delete('/:id',(req,res)=>{
    Exercise.findByIdAndDelete(req.params.id)
        .then(()=>{res.json('Exercise Deleted')})
        .catch(err=>res.status(400).json("Error "+err))
})
// Update an Exersice
router.patch('/update/:id',(req,res)=>{
    Exercise.findById(req.params.id)
        .then(exercise=>{
            exercise.username= req.body.username
            exercise.description= req.body.description
            exercise.duration= req.body.duration
            exercise.date= req.body.date

            exercise.save()
                .then(()=>{res.json('Exercise Updated!')})
                .catch(err=>res.status(400).json('Error: '+err))
        })
        .catch(err=>res.status(400).json('Error: '+err))
})


module.exports = router