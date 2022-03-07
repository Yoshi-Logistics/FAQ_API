const request = require("supertest");

const app = require("../index.js");

describe("Working status for get Answers", () => {
  test ("GET /", (done) => {
    request(app)
      .get("/api/qa/questions/1/answers")
      .expect("Content-Type", /json/)
      .expect(200)
    .end((err, res)=> {
      if(err) return done(err);
      return done();
    });
  });
});