const db = require('../db');


var getQuestions = function (product ,callback) {
  console.log('in models')
  var queryString = `
    SELECT
      questions.question_id AS question_id,
      questions.body AS question_body,
      questions.date_written AS question_date,
      questions.asker_name,
      questions.helpful AS question_helpfulness,
      questions.reported,
      (
        SELECT jsonb_agg(nested_answers)
        FROM (
          SELECT
            answers.id,
            answers.body,
            (
              SELECT json_agg(nested_photos)
              FROM (
                SELECT
                photos.id,
                photos.url
                FROM photos
                where photos.answers_id = answers.id
              )As nested_photos
            )As photos
      FROM answers
      where answers.question_id = questions.question_id
      )AS nested_answers
    )As answers
    FROM questions
    where questions.product_id = ${product}`
  db.query(queryString, callback)
};

// get answers for a question
var getAnswers = function (question, cb) {

  // following sql gives pretty close to what we want
  // only issue is that for no photos the array has keys with values === null
  var queryString = `SELECT
  a.id AS answer_id,
  a.body,
  to_timestamp(a.date_written/1000) AS date,
  a.answerer_name,
  a.helpful,
  json_agg(json_build_object('url' , p.url, 'id', p.id)) AS photos
  FROM answers a
  LEFT JOIN photos p
  ON a.id = p.answers_id
  WHERE a.question_id = ${question}
  AND a.reported = 0
  GROUP BY a.id
  `
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

unsure what this does
`SELECT questions.question_id, answers.id FROM questions INNER JOIN answers ON question.question_id = answers.question_id where questions.question_id = 1`

//left join answers with photos
SELECT a.id, a.question_id, a.body, a.date_written, a.answerer_name, a.answerer_email, a.reported, a.helpful, p.url FROM answers a LEFT JOIN photos p ON a.id = p.answers_id WHERE a.question_id = 1 AND a.reported = 0

nested queries?



select statement
 from where are we selecting
 join statementes
 where
 group
look at json build object

*/

/*-------------------------- touch if dumb:--------------------------------

`SELECT row_to_json(test)
  FROM (
    SELECT
      questions.question_id AS question_id,
      questions.body AS question_body,
      questions.date_written AS question_date,
      questions.asker_name,
      questions.helpful AS question_helpfulness,
      questions.reported,
      (
        SELECT jsonb_agg(nested_answers)
        FROM (
          SELECT
            answers.id,
            answers.body,
            (
              SELECT json_agg(nested_photos)
              FROM (
                SELECT
                photos.id,
                photos.url
                FROM photos
                where photos.answers_id = answers.id
              )As nested_photos
            )As photos
      FROM answers
      where answers.question_id = questions.question_id
      )AS nested_answers
    )As answers
    FROM questions
    where questions.product_id = ${product}
  )AS  test;`
  */