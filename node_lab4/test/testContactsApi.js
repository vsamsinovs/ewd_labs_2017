import supertest from "supertest";
import { server } from "./../server.js";
import should from "should";

// UNIT test begin
describe("Contacts API unit test", function () {
  this.timeout(120000);//increase timeout of tests to 2 mins. Starting Mockgoose can take time.

  // #1 return a collection of json documents
  it("should return collection of JSON documents", function (done) {
    // calling home page api
    supertest(server)
      .get("/api/contacts")
      .expect("Content-type", /json/)
      .expect(200) // This is the HTTP response
      .end(function (err, res) {
        // HTTP status should be 200
        res.status.should.equal(200);
        done();
      });
  });

  // #2 add a contact
  it("should add a contact", function (done) {
    // post to /api/contacts
    // calling home page api
    supertest(server)
      .post('/api/contacts')
      .send({ name: "Contact 99", address: "123 Strand St" })
      .expect("Content-type", /json/)
      .expect(201)
      .end(function (err, res) {
        res.status.should.equal(201);
        res.body.contact.should.have.property('_id');
        res.body.contact.name.should.equal('Contact 99');
        done();
      });
  });

  it("should delete contact", function (done) {
    // post to /api/contacts
    // calling home page api
    const superserver = supertest(server);
    superserver
      .get("/api/contacts")
      .expect("Content-type", /json/)
      .expect(200) // THis is HTTP response
      .end(function (err, res) {
        const id = res.body[0]._id;
        superserver
          .delete("/api/contacts/" + id)
          .expect("Content-type", /json/)
          .expect(200) // THis is HTTP response
          .end(function (err, res) {
            res.body._id.should.equal(id);
            res.body.should.have.property("name");
            done();
          }
          );
      }
      );
  });


  it("should update contact", function (done) {
    // post to /api/contacts
    // calling home page api
    const superserver = supertest(server);
    superserver
      .get("/api/contacts")
      .expect("Content-type", /json/)
      .expect(200) // THis is HTTP response
      .end(function (err, res) {

        const id = res.body[0]._id,
          name = res.body[0].name,
          address = res.body[0].address;

        superserver
          .put("/api/contacts/" + id)
          .send({ name: name + 1, address: address + 1 })
          .expect("Content-type", /json/)
          .expect(200) // THis is HTTP response
          .end(function (err, res) {

            should.exist(res.body);
            res.status.should.equal(200);

            res.body.should.have.property('_id');
            res.body.name.should.equal(name + 1);
            res.body.address.should.equal(address + 1);
            done();
          });
      });
  });
});

