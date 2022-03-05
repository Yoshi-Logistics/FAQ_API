const db = require('../db');


var getQuestions = function (product ,callback) {
  var queryString = `SELECT questions.question_id, answers.id FROM questions INNER JOIN answers ON question.question_id = answers.question_id where questions.question_id = 1`
  db.query(queryString, callback)
};

// get answers for a question
var getAnswers = function (question, cb) {
  var queryString = `SELECT id AS question_id, body, date_written AS date, answerer_name, helpful AS helpfullness FROM answers where question_id = ${question}`
  db.query(queryString, cb)
}

module.exports= { getQuestions, getAnswers };
// `Select * FROM questions where product_id = ${product} ;`
/*
select statements used so far:
// returns first quesiton for one product_id
select question_id, body, date_written, asker_name, helpful, reported FROM questions where product_id = ${product} LIMIT 1

// returns all questions for one product:
select question_id, body, date_written, asker_name, helpful, reported FROM questions where product_id = ${product}

// returns all answers for one question
//  used in the getAnswers function
`SELECT * FROM answers where question_id = (select question_id FROM questions where product_id = ${product} LIMIT 1)`

// try a join to get the desired info in one object
// attempt not working tho
`SELECT question.question_id, question.body, question.date_written, asker_name, question.reported, question.helpful, id, answers.body, answers.date_written, answerer_name, answers.reported, answers.helpful FROM questions INNER JOIN answers ON question.question_id = answers.question_id WHERE question.question_id = (select question_id FROM questions where product_id = ${product} LIMIT 1)`




select statement
 from where are we selecting
 join statementes
 where
 group
look at json build object

*/