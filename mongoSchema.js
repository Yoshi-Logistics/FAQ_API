const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', {useNewUrlParser: true, useUnifiedTopology: true});

let results = mongoose.Schema({
"product_id": Number,
"results": ["ObjectID('QUESTIONS')"]
});

let questions = mongoose.Schema({
  "_id": "ObjectID('QUESTIONS')"
  "question_id": Number,
  "question_body": String,
  "question_date": Date,
  "asker_name": String,
  "question_helpfulness": Number,
  "reported": Boolean,
  "answers": ["ObjectID('ANSWERS')"],
  });

let answers = mongoose.Schema({
  "_id": "ObjectID('ANSWERS')",
  "id": Number,
  "body": String,
  "date": Date,
  "answerer_name": String,
  "helpfulness": Number,
  "photos": ["ObjectID('PHOTOS')"]
})

let photos = mongoose.Schema({
  "_id": "ObjectID('PHOTOS')",
  "id": Number,
  "url": String
})