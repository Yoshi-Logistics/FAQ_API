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


