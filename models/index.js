const db = require('../db');


var getQuestions = function (product, callback) {

  var queryString =  `SELECT json_agg(
    json_build_object(
      'question_id', questions.question_id,
      'question_body', questions.body,
      'question_date', to_timestamp(questions.date_written/1000),
      'asker_name', questions.asker_name,
      'reported', questions.reported,
      'question_helpfulness', questions.helpful,
      'answers', (SELECT coalesce
        (answers, '{}':: json)
        FROM ( SELECT json_object_agg( answers.id, json_build_object(
          'id', answers.id,
          'body', answers.body,
          'date', to_timestamp(answers.date_written/1000),
          'answerer_name', answers.answerer_name,
          'helpfullness', answers.helpful,
          'photos', (SELECT coalesce
            (photos, '[]':: json)
            FROM ( SELECT json_agg(json_build_object(
              'id', photos.id,
              'url', photos.url))
            AS photos From photos
            WHERE photos.answers_id = answers.id)
            AS photosArray)
        )) AS answers
        FROM answers
        WHERE answers.question_id = questions.question_id)
      AS answersObject)) ORDER BY helpful DESC)
    AS results FROM questions
    WHERE product_id = ${product}`
  db.query(queryString, callback)
};

// get answers for a question
var getAnswers = function (question,limit, cb) {
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
  ORDER BY a.helpful DESC
  LIMIT ${limit}`
  db.query(queryString, cb)
}

// add a question
var addQuestion = function(data, cb){
  var queryString = 'INSERT INTO questions ( product_id, body, date_written, asker_name, asker_email, reported, helpful) VALUES ($1, $2, $3, $4, $5, $6, $7)'
  db.query(queryString, [data.product_id, data.body, data.date, data.name, data.email, data.reported, data.helpful], cb)
}

// mark a question as helpful
var helpfulQuestion = function( id, cb ) {
  // console.log('here')
  var queryString = `UPDATE questions
    SET helpful = helpful + 1
    WHERE question_id = ${id}`
  db.query(queryString, cb);
}

//  report a question
var reportQuestion = function (id, cb) {
  var queryString =`UPDATE questions SET reported = NOT reported WHERE question_id = ${id}`
  db.query(queryString, cb)
}

module.exports= { getQuestions, getAnswers, addQuestion, helpfulQuestion, reportQuestion};
