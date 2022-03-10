const { helpfulAnswer, reportAnswer} = require('../controllers');
const answers = require('express').Router();

//  put--> mark as helpful
//    params: answer_id
answers.put('/helpful', helpfulAnswer);

//  put --> report a question
//    params: answer_id
answers.put('/report', reportAnswer)

module.exports = answers;