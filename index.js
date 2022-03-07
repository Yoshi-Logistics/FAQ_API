const express = require('express');
const pool = require('./db');
const controller = require('./controllers');

// import middlewear

const app = express();
app.use(express.json())


//routes

const questions = require('./router/questions');

const answers = require('./router/answers')

app.use('/api/qa/questions', questions);

app.use('/api/qa/answers', answers)

var server = app.listen(3000, () => {
  console.log("server is listening on port 3000")
});

// app.listen(3000, () => {
//   console.log("server is listening on port 3000")
// });

module.exports = server;