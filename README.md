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
 
 #### Return:
 Request: `` /api/qa/questions/1 ``
 ```
 json goes here
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
 
 #### Return:
 Request: `` /api/qa/questions/1/answers ``
 ```
 json goes here
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
