const model = require('../models');

// get all questions
var getQuestions = function(req, res) {
  const product = req.params.product_id;
  // console.log('product: ', product);
  model.getQuestions(product, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send();
    } else {
      // loop through the array?
      // result.rows.forEach( result => console.log(result.body))
      res.send(result.rows)
    }
  })
  // console.log('entered getQuestions')
  // console.log('params should be 100: ', req.params.product_id)
}

//get Answers for a Question
var getAnswers = function (req,res) {
  const question = req.params.question_id;
  model.getAnswers(question, (err, result) => {
    if (err) {
      res.status(500).send();
    } else {
      res.status(200).send(result.rows)
      // at this point you have an array of answers with photos
    }
  })
}

//  add a question

var postQuestion = function (req,res) {
  if (err) {
    res.status(424).send
  } else {
    res.status(201).send(result)
  }
}

//  add an answer

var postAnswer = function (req,res) {
  if (err) {
    res.status(424).send
  } else {
    res.status(201).send(result)
  }
}

//  add to helpful | question

var helpfulQuestion = function (req,res) {
  if (err) {
    res.status(400).send
  } else {
    res.status(204).send(result)
  }
}

//  report a Question

var reportQuestion = function (req,res) {
  if (err) {
    res.status(400).send
  } else {
    res.status(204).send(result)
  }
}

//  helpful Answer

var helpfulAnswer = function (req,res) {
  if (err) {
    res.status(400).send
  } else {
    res.status(204).send(result)
  }
}

//  report Answer

var reportAnswer = function (req,res) {
  if (err) {
    res.status(400).send
  } else {
    res.status(204).send(result)
  }
}

module.exports = {
  getQuestions,
  getAnswers,
  postQuestion,
  postAnswer,
  helpfulQuestion,
  reportQuestion,
  helpfulAnswer,
  reportAnswer }