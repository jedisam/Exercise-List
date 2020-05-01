const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose');
require('dotenv').config()

const ExerciseRouter = require('./routes/exercises');
const UsersRouter = require('./routes/users');

const app = express()

//cors
app.use(cors())

// DB connection

const uri = process.env.db
mongoose.connect(uri,{ useNewUrlParser:true, useCreateIndex:true, useUnifiedTopology:true })
const connection = mongoose.connection;
connection.once('open',()=>{
    console.log('MongoDB connection has been succsessfully established!')
})



 
app.get('/',(req,res)=>{
    res.send(`<h1>Home Page</h1>`)
})

// Middlewares

  //Bodyparser
  app.use(bodyParser.urlencoded({extended:false}))
  app.use(bodyParser.json())


app.use('/exercise',ExerciseRouter)
app.use('/users',UsersRouter)

const PORT = process.env.PORT || 9000

app.listen(PORT,()=>{
    console.log(`Server Started on port ${PORT}`)
})