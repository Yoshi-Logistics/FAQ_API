DROP DATABASE IF EXISTS questionsandanswers;

CREATE DATABASE questionsandanswers;

\c questionsandanswers;

CREATE TABLE questions (
 question_id SERIAL NOT NULL PRIMARY KEY,
 question_body VARCHAR(250) NOT NULL,
 question_date DATE NOT NULL DEFAULT CURRENT_DATE,
 asker_name VARCHAR(50) NOT NULL,
 question_helpfullness SMALLINT DEFAULT 0,
 reported BOOLEAN DEFAULT 'false',
 product_id INTEGER NOT NULL
);


-- ALTER TABLE questions ADD CONSTRAINT questions_pkey PRIMARY KEY (question_id);

CREATE TABLE answers (
 id SERIAL NOT NULL PRIMARY KEY,
 body VARCHAR(250) NOT NULL,
 date DATE DEFAULT CURRENT_DATE,
 answerer_name VARCHAR(25) NOT NULL DEFAULT 'NULL',
 helpfulness INTEGER NOT NULL DEFAULT 0,
 question_id INTEGER NOT NULL
);


-- ALTER TABLE answers ADD CONSTRAINT answers_pkey PRIMARY KEY (id);

CREATE TABLE photos (
 id SERIAL NOT NULL PRIMARY KEY,
 url VARCHAR(250) NOT NULL,
 answers_id INTEGER
);


-- ALTER TABLE photos ADD CONSTRAINT photos_pkey PRIMARY KEY (id);

ALTER TABLE answers ADD CONSTRAINT answers_question_id_fkey FOREIGN KEY (question_id) REFERENCES questions(question_id);
ALTER TABLE photos ADD CONSTRAINT photos_answers_id_fkey FOREIGN KEY (answers_id) REFERENCES answers(id);

