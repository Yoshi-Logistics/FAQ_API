# FAQ_API

## Overview: 
Questions and Answers microservice built to serve questions and answers section of an e-commerce website. The microservice can currently:
- list questions for a product
- list answers for a question
- post questions for a product
- update questions and answers to show if users find them helpful
- update questions and answers to show if users reported them


## Setup
1. clone down this repo
1. Make sure to install any dependency using `` npm install ``
1. Turn on the microservice using `` npm run server ``

## Endpoints

### List Quesitons
| HTTP Request | endpoint | description |
|--------------|-----------|-------------|
| GET | `` /api/qa/quesitons/:product_id `` | Returns questions, answers, and photos associated with a Product |

 #### Params
 | param | type | description |
 |-------|------|-------------|
 | product_id | Number | ID of the product for which to recieve questions |

 #### Body params
 | param | type | description |
 |-------|------|-------------|
 | page | Number | Input what page answers should be selected from. Default = 1 |
 | Count | Number | Input how many Questions are desired. Default = 5 |
 
 #### Example:
  ##### Request: `` /api/qa/questions/7 ``
  ##### Response:
 ```
{
    "product_id": "7",
    "results": [
        {
            "question_id": 41,
            "question_body": "What fabric is the top made of?",
            "question_date": "2020-09-05T09:19:08-07:00",
            "asker_name": "coolkid",
            "reported": false,
            "question_helpfulness": 9,
            "answers": {
                "81": {
                    "id": 81,
                    "body": "Suede",
                    "date": "2021-02-08T12:07:08-08:00",
                    "answerer_name": "warmkid",
                    "helpfullness": 0,
                    "photos": [
                        {
                            "id": 17,
                            "url": "https://images.unsplash.com/photo-1548430395-ec39eaf2aa1a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1974&q=80"
                        }
                    ]
                },
                "82": {
                    "id": 82,
                    "body": "Something pretty soft but I can't be sure",
                    "date": "2020-11-21T21:27:23-08:00",
                    "answerer_name": "warmkid",
                    "helpfullness": 1,
                    "photos": []
                },
                "93": {
                    "id": 93,
                    "body": "Its the best! Seriously magic fabric",
                    "date": "2021-02-21T21:19:34-08:00",
                    "answerer_name": "warmkid",
                    "helpfullness": 1,
                    "photos": []
                },
                "94": {
                    "id": 94,
                    "body": "Supposedly suede, but I think its synthetic",
                    "date": "2021-03-02T06:17:15-08:00",
                    "answerer_name": "warmkid",
                    "helpfullness": 2,
                    "photos": []
                }
            }
        },
        {
            "question_id": 43,
            "question_body": "Why is this product cheaper here than other sites?",
            "question_date": "2020-09-05T09:19:08-07:00",
            "asker_name": "l33tgamer",
            "reported": false,
            "question_helpfulness": 5,
            "answers": {}
        },
        {
            "question_id": 42,
            "question_body": "How long does it last?",
            "question_date": "2020-06-09T16:43:00-07:00",
            "asker_name": "jbilas",
            "reported": true,
            "question_helpfulness": 0,
            "answers": {}
        }
    ]
}
 ```
# 

### List Answers
| HTTP Request | endpoint | description |
|--------------|-----------|-------------|
| GET | `` /api/qa/quesitons/:question_id/answers `` | Returns answers, and photos associated with a Question |

 #### Params
 | param | type | description |
 |-------|------|-------------|
 | question_id | Number | ID of the question for which to retrieve answers |

 #### Body params
 | param | type | description |
 |-------|------|-------------|
 | page | Number | Input what page answers should be selected from. Default = 1 |
 | Count | Number | Input how many Questions are desired. Default = 5 |
 
 #### Example:
  ##### Request: `` /api/qa/questions/1/answers ``
  ##### Response:
 ```
{
    "question": "1",
    "page": 0,
    "count": 5,
    "results": [
        {
            "answer_id": 8,
            "body": "DONT BUY IT! It's bad for the environment",
            "date": "2020-09-19T21:49:22.000Z",
            "answerer_name": "metslover",
            "helpful": 8,
            "photos": []
        },
        {
            "answer_id": 7,
            "body": "Its the best! Seriously magic fabric",
            "date": "2021-02-27T18:45:24.000Z",
            "answerer_name": "metslover",
            "helpful": 7,
            "photos": []
        },
        {
            "answer_id": 57,
            "body": "Suede",
            "date": "2021-04-11T16:51:31.000Z",
            "answerer_name": "metslover",
            "helpful": 7,
            "photos": []
        },
        {
            "answer_id": 5,
            "body": "Something pretty soft but I can't be sure",
            "date": "2020-09-13T09:49:20.000Z",
            "answerer_name": "metslover",
            "helpful": 5,
            "photos": [
                {
                    "url": "https://images.unsplash.com/photo-1530519729491-aea5b51d1ee1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80",
                    "id": 1
                },
                {
                    "url": "https://images.unsplash.com/photo-1511127088257-53ccfcc769fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80",
                    "id": 2
                },
                {
                    "url": "https://images.unsplash.com/photo-1500603720222-eb7a1f997356?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1653&q=80",
                    "id": 3
                }
            ]
        },
        {
            "answer_id": 95,
            "body": "Supposedly suede, but I think its synthetic",
            "date": "2020-09-14T21:53:52.000Z",
            "answerer_name": "metslover",
            "helpful": 3,
            "photos": []
        }
    ]
}
 ```
  # 
  
### Add a Question
| HTTP Request | endpoint | description |
|--------------|-----------|-------------|
| POST | `` /api/qa/quesitons/ `` | Returns questions, answers, and photos associated with a Product |

 #### Payload
 | param | type | description |
 |-------|------|-------------|
 | body | text | Text of question being asked |
 | name | text | Question asker's username|
 | email | text | Question asker's email |
 | product_id | text | Product for which the question is posted |
 
response: `` 201 ``

# 

### Mark a Questions as Helpful
| HTTP Request | endpoint | description |
|--------------|-----------|-------------|
| PUT | `` /api/qa/quesitons/:question_id/helpful `` | Updates question to indicate that user found it helpful |

 #### Params
 | param | type | description |
 |-------|------|-------------|
 | question_id | Number | ID of the question to update |

Response: `` 204 ``
# 

### Mark an Answer as Helpful
| HTTP Request | endpoint | description |
|--------------|-----------|-------------|
| PUT | `` /api/qa/answers/:answer_id/helpful `` | Updates answer to indicate that user found it helpful |

 #### Params
 | param | type | description |
 |-------|------|-------------|
 | answer_id | Number | ID of the answer to update |

Response: `` 204 ``
# 

### Report a Question
| HTTP Request | endpoint | description |
|--------------|-----------|-------------|
| PUT | `` /api/qa/quesitons/:question_id/report `` | Updates question to indicate that user reported question |

 #### Params
 | param | type | description |
 |-------|------|-------------|
 | question_id | Number | ID of the question to update |

Response: `` 204 ``
# 

### Report an Answer
| HTTP Request | endpoint | description |
|--------------|-----------|-------------|
| PUT | `` /api/qa/answers/:answer_id/report `` | Updates answer to indicate that user reported answer |

 #### Params
 | param | type | description |
 |-------|------|-------------|
 | answer_id | Number | ID of the answer to update |

Response: `` 204 ``
# 

### Future Updates
- Add endpoint to post an answer (and photos for said answer) for any question desired
