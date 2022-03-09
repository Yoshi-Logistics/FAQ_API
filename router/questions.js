const controller = require('../controllers');
const questions = require('express').Router();

// get --> answersList
//    params: question_id
//    Query params: page | count
questions.get('/:question_id/answers', controller.getAnswers);

//  get --> list questions
//    params: product_id | page | count
questions.get('/:product_id', controller.getQuestions);

//  post: add a Question
//    params: body | name | email | product_id
questions.post('/', controller.postQuestion);

//  post --> add an Answer
//    params (body) : body | name | email | productID
questions.post('/:question_id/answers', controller.postAnswer);

//  put--> mark as helpful
//    params: question_id
questions.put('/:question_id/helpful', controller.helpfulQuestion);

//  put --> report a question
//    params: question_id
questions.put('/:question_id/report', controller.reportQuestion)


module.exports = questions;