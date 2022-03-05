const express = require('express');
const pool = require('./db');
const controller = require('./controllers');

// import middlewear

const app = express();
app.use(express.json())


//routes

//  get --> list questions
//    params: product_id | page | count
app.get('/api/qa/questions/:product_id', controller.getQuestions);


// get --> answersList
//    params: question_id
//    Query params: page | count
app.get('/api/qa/questions/:question_id/answers', controller.getAnswers);

//  post: add a Question
//    params: body | name | email | product_id
app.post('/api/qa/questions', controller.postQuestion);

//  post --> add an Answer
//    params (body) : body | name | email | productID
app.post('/api/qa/questions/:question_id/answers', controller.postAnswer);

//  put--> mark as helpful
//    params: question_id
app.put('/api/qa/questions/:question_id/helpful', controller.helpfulQuestion);

//  put --> report a question
//    params: question_id
app.put('/api/qa/questions/:question_id/report', controller.reportQuestion)

//  put--> mark as helpful
//    params: answer_id
app.put('/api/qa/answers/:answer_id/helpful', controller.helpfulAnswer);

//  put --> report a question
//    params: answer_id
app.put('/api/qa/answers/:answer_id/report', controller.reportAnswer)


app.listen(3000, () => {
  console.log("server is listening on port 3000")
});

