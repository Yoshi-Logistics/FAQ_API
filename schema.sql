DROP DATABASE IF EXISTS questionsandanswers;

CREATE DATABASE questionsandanswers;

\c questionsandanswers;

CREATE TABLE questions (
 question_id SERIAL NOT NULL PRIMARY KEY,
 product_id INTEGER NOT NULL,
 body VARCHAR(250) NOT NULL,
 date_written BIGINT NOT NULL,
 asker_name VARCHAR(50) NOT NULL,
 asker_email VARCHAR(75) NOT NULL,
 reported BOOLEAN DEFAULT 'false',
 helpful SMALLINT DEFAULT 0
);


-- ALTER TABLE questions ADD CONSTRAINT questions_pkey PRIMARY KEY (question_id);

CREATE TABLE answers (
 id SERIAL NOT NULL PRIMARY KEY,
 question_id INTEGER NOT NULL,
 body VARCHAR(250) NOT NULL,
 date_written BIGINT NOT NULL,
 answerer_name VARCHAR(50) NOT NULL DEFAULT 'NULL',
 answerer_email VARCHAR(75) NOT NULL,
 reported SMALLINT NOT NULL DEFAULT 0,
 helpful SMALLINT NOT NULL DEFAULT 0
);


-- ALTER TABLE answers ADD CONSTRAINT answers_pkey PRIMARY KEY (id);

CREATE TABLE photos (
 id SERIAL NOT NULL PRIMARY KEY,
 answers_id INTEGER,
 url VARCHAR(300) NOT NULL
);


-- ALTER TABLE photos ADD CONSTRAINT photos_pkey PRIMARY KEY (id);

ALTER TABLE answers ADD CONSTRAINT answers_question_id_fkey FOREIGN KEY (question_id) REFERENCES questions(question_id);
ALTER TABLE photos ADD CONSTRAINT photos_answers_id_fkey FOREIGN KEY (answers_id) REFERENCES answers(id);

-- copy info here
-- csv files are in git ignore

copy questions from '/mnt/c/Users/kevin/HackReactor/SDC/FAQ_API/FAQ_API/csv/questions.csv' delimiter ',' csv HEADER;
copy answers from '/mnt/c/Users/kevin/HackReactor/SDC/FAQ_API/FAQ_API/csv/answers.csv' delimiter ',' csv HEADER;
copy photos from '/mnt/c/Users/kevin/HackReactor/SDC/FAQ_API/FAQ_API/csv/answers_photos.csv' delimiter ',' csv HEADER;

-- product_id index
CREATE INDEX questions_prodcut_id_idx ON questions (product_id);
-- q.questions
CREATE INDEX answers_question_id_idx ON answers (question_id);
CREATE INDEX answers_reported_idx ON answers (reported);
CREATE INDEX photos_answers_id_idx ON photos (answers_id);

-- sequences
SELECT setval(pg_get_serial_sequence('questions', 'question_id'), coalesce(max(question_id), 0)+1 , false) FROM questions;

SELECT setval(pg_get_serial_sequence('answers', 'id'), coalesce(max(id), 0)+1 , false) FROM answers;

SELECT setval(pg_get_serial_sequence('photos', 'id'), coalesce(max(id), 0)+1 , false) FROM photos;

SELECT coalesce (answers, '[]':: json)
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
AS answersObject

SELECT coalesce (results, '[]':: json)
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
    AS resultsObj