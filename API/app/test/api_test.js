const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");


chai.should();

 chai.use(chaiHttp); 


describe("Test books directory API", () => {
     
    /*
    * GET (all) API
    */
   it("Test get all value", (done) => {
     chai.request("http://localhost:3000")
        .get("/api/get/all")
        .end( (err, res) => {
             res.should.have.status(200);
             res.body.should.be.a("array");
             res.body[0].should.be.a("object");
             res.body[0].should.have.property("id");
             res.body[0].should.have.property("titolo");
             res.body[0].should.have.property("autore");
             res.body[0].should.have.property("data_pubblicazione");
             res.body[0].id.should.be.a("number");
             res.body[0].titolo.should.be.a("string");
             res.body[0].autore.should.be.a("string");
             res.body[0].data_pubblicazione.should.be.a("string");
             done();
        });
   });

});

