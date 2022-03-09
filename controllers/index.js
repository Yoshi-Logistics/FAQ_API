const model = require('../models');

// get all questions
var getQuestions = function(req, res) {
  const product = req.params.product_id;
  const limit = req.body.count || 5
  model.getQuestions(product, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send();
    } else {
      let slicedArray = result.rows[0].results;
      if(Array.isArray(slicedArray)) {
        slicedArray = result.rows[0].results.slice(0, limit)
      }
      const returnObj = {'product_id': product, 'results': slicedArray}
      res.status(200).send( returnObj)
    }
  })
}

//get Answers for a Question
var getAnswers = function (req,res) {
  const question = req.params.question_id;
  const page = req.query.page || 0;
  const limit = req.query.count || 5;
  model.getAnswers(question, limit, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      const returnObj = {
        "question": question,
        "page": page,
        "count": limit,
        "results": result.rows
      }
      res.status(200).send(returnObj)

    }
  })
}

//  add a question

var postQuestion = function (req,res) {
  const data = {
    body : req.body.body,
    name : req.body.name,
    email : req.body.email,
    product_id : req.body.product_id,
    date : Date.now(),
    reported : 'false',
    helpful : 0
  }
  model.addQuestion(data, (err, result)=> {
    if (err) {
      res.status(424).send(err)
    } else {
      res.status(201).send('success')
    }
  })
}

//  add an answer
//  might not work
var postAnswer = function (req,res) {
  // console.log('array?: ', (Array.isArray(req.body.photos)))
  //data has to be passed as json
  const photos = req.body.photos;
  const data = {
    body : req.body.body,
    name : req.body.name,
    email : req.body.email,
    question_id : req.params.question_id,
    date : Date.now(),
    reported : 'false',
    helpful : 0
  }
  model.addAnswer(data, (err, result)=> {
    if (err) {
      res.status(424).send('err in adding answer')
    } else {
      photos.forEach(url => {
        model.addPhoto(url, (err, result) => {
          if (err){
            res.status(424).send('pic upload fail')
          }
        });
      })
      res.status(201).send('posted')
    }
  })
  // if (err) {
  //   res.status(424).send
  // } else {
  //   res.status(201).send(result)
  // }
}

//  add to helpful | question

var helpfulQuestion = function (req,res) {
  const question = req.params.question_id;
  // console.log('question: ', question);
  model.helpfulQuestion(question, (err, result) => {
    if (err) {
      res.status(400).send()
    } else {
      res.status(204).send('updated!')
    }
  })
}

//  report a Question

var reportQuestion = function (req,res) {
  const question = req.params.question_id;
  // console.log('question: ', question);
  model.reportQuestion(question, (err, result) => {
    if (err) {
      res.status(400).send()
    } else {
      res.status(204).send('reported!')
    }
  })
}

//  helpful Answer

var helpfulAnswer = function (req,res) {
  const answer = req.params.question_id;
  model.helpfulAnswer(answer, (err, result) => {
    if (err) {
      res.status(400).send()
    } else {
      res.status(204).send('updated!')
    }
  })
}

//  report Answer

var reportAnswer = function (req,res) {
  const answer = req.params.answer_id;
  model.reportAnswer(answer, (err, result) => {
    if (err) {
      res.status(400).send()
    } else {
      res.status(204).send('reported!')
    }
  })
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