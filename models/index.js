const db = require('../db');


var getQuestions = function (product, callback) {

  // var queryString =  `SELECT json_agg(
  //   json_build_object(
  //     'question_id', questions.question_id,
  //     'question_body', questions.body,
  //     'question_date', to_timestamp(questions.date_written/1000),
  //     'asker_name', questions.asker_name,
  //     'reported', questions.reported,
  //     'question_helpfulness', questions.helpful,
  //     'answers', (SELECT coalesce
  //       (answers, '{}':: json)
  //       FROM ( SELECT json_object_agg( answers.id, json_build_object(
  //         'id', answers.id,
  //         'body', answers.body,
  //         'date', to_timestamp(answers.date_written/1000),
  //         'answerer_name', answers.answerer_name,
  //         'helpfullness', answers.helpful,
  //         'photos', (SELECT coalesce
  //           (photos, '[]':: json)
  //           FROM ( SELECT json_agg(json_build_object(
  //             'id', photos.id,
  //             'url', photos.url))
  //           AS photos From photos
  //           WHERE photos.answers_id = answers.id)
  //           AS photosArray)
  //       )) AS answers
  //       FROM answers
  //       WHERE answers.question_id = questions.question_id)
  //     AS answersObject)
  //     ) ORDER BY helpful DESC)
  //   AS results FROM questions
  //   WHERE product_id = ${product}`
  var queryString = `SELECT coalesce (results, '[]':: json)
  FROM (SELECT json_agg(
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
        AS answersObject)
        ) ORDER BY helpful DESC)
      AS results FROM questions
      WHERE product_id = ${product})
      AS resultsObj`
  db.query(queryString, callback)
};

// get answers for a question
var getAnswers = function (question,limit, cb) {
var queryString =  `SELECT coalesce (answers, '[]':: json)
  FROM ( SELECT json_agg(json_build_object(
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
  WHERE answers.question_id =${question})
AS answersObject`
  db.query(queryString, cb)
}

// add a question
var addQuestion = function(data, cb){
  var queryString = 'INSERT INTO questions ( product_id, body, date_written, asker_name, asker_email, reported, helpful) VALUES ($1, $2, $3, $4, $5, $6, $7)'
  db.query(queryString, [data.postInfo.product_id, data.postInfo.body, data.date, data.postInfo.name, data.postInfo.email, data.reported, data.helpful], cb)
}

// add a photo
// add a question
var addAnswer = function(data, cb){
  var queryString = 'INSERT INTO questions ( product_id, body, date_written, asker_name, asker_email, reported, helpful) VALUES ($1, $2, $3, $4, $5, $6, $7)'
  db.query(queryString, [data.product_id, data.body, data.date, data.name, data.email, data.reported, data.helpful], cb)
}

// mark a question as helpful
var addPhoto = function(url, cb) {
  var queryString = `INSERT INTO photos (url, answers_id) vaules(${url}, (SELECT MAX(ID) FROM answers))`
  db.query(queryString, cb)
}

var helpfulQuestion = function( id, cb ) {
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

// mark a answer as helpful
var helpfulAnswer = function( id, cb ) {
  var queryString = `UPDATE answers
    SET helpful = helpful + 1
    WHERE id = ${id}`
  db.query(queryString, cb);
}

// report answer
var reportAnswer = function (id, cb) {
  var queryString =`UPDATE answers SET reported = NOT reported WHERE id = ${id}`
  db.query(queryString, cb)
}

module.exports= { getQuestions, getAnswers, addQuestion, addAnswer, addPhoto, helpfulQuestion, reportQuestion, helpfulAnswer, reportAnswer};
