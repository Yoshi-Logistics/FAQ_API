const express = require('express');
const pool = require('./db');
const controller = require('./controllers');

// import middlewear

const app = express();
app.use(express.urlencoded({extended: true}))
app.use(express.json({extended: true}))


const questions = require('./router/questions');

const answers = require('./router/answers')

//routes

app.use('/api/qa/questions', questions);

app.use('/api/qa/answers/:answer_id', answers)


var server = app.listen(3000, () => {
  console.log("server is listening on port 3000")
});


module.exports = server;