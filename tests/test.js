var User = require("../model/auth.model.js");
var school = require("../model/school.model.js");
const request = require("supertest");
const expect = require("chai").expect;
const app = require("../server");
const users_test = require("./auth_test.js");
const schools_test = require("./schools_test.js");

describe("/User", () => {
    before(async function() {
        await User.deleteMany({});
    });

    describe("USE CASE 1) register & connect user", () => {
        it("AUTH ROUTE / should add user 1 inscription", async () => {
            const res = await request(app)
                .post("/")
                .send(users_test[2][0]);

            expect(res.status).to.equal(200);
        });

        it("AUTH ROUTE / should add user 2 inscription", async () => {
            const res = await request(app)
                .post("/")
                .send(users_test[2][1]);

            expect(res.status).to.equal(200);
        });

        it("AUTH ROUTE / should add user 3 inscription", async () => {
            const res = await request(app)
                .post("/")
                .send(users_test[2][2]);

            expect(res.status).to.equal(200);
        });

        it("AUTH ROUTE / should NOT add an existing user inscription", async () => {
            const res = await request(app)
                .post("/")
                .send(users_test[2][2]);

            expect(res.status).to.equal(400);
        });

        it("AUTH ROUTE / should NOT add user 4 inscription (validator)", async () => {
            const res = await request(app)
                .post("/")
                .send(users_test[2][3]);

            expect(res.status).to.equal(400);
        });

        it("AUTH ROUTE / should * connect user 1 (Admin) *", async () => {
            const res = await request(app)
                .post("/")
                .send(users_test[1][0]);

            expect(res.status).to.equal(200);
        });

        it("AUTH ROUTE / should * connect user 2 (User) *", async () => {
            const res = await request(app)
                .post("/")
                .send(users_test[1][1]);

            expect(res.status).to.equal(200);
        });

        it("AUTH ROUTE / should * connect user 3 (User) *", async () => {
            const res = await request(app)
                .post("/")
                .send(users_test[1][2]);

            expect(res.status).to.equal(200);
        });

        it("AUTH ROUTE / should NOT * connect user error (Not Found) *", async () => {
            const res = await request(app)
                .post("/")
                .send(users_test[1][3]);

            expect(res.status).to.equal(404);
        });
    });


    describe("USE CASE 2) USER RIGHTS", () => {
        let agent = request.agent(app);
        var code;

        it("AUTH ROUTE / should reconnect user 3 (User) for access page ", async () => {
            const res = await agent
                .post("/", async function(req, res) {
                    req.session.user = new User(users_test[0][2]);
                })
                .send(users_test[1][2]);

            expect(res.status).to.equal(200);
        });

        it("AUTH ROUTE / should get menu page", async () => {
            const res = await request(app).get("/menu");
            expect(res.status).to.equal(200);
        });

        it("AUTH ROUTE / should get register page", async () => {
            const res = await request(app).get("/register");
            expect(res.status).to.equal(200);
        });

        it("AUTH ROUTE / should get login page", async () => {
            const res = await request(app).get("/");
            expect(res.status).to.equal(200);
        });

        it("SCHOOL ROUTE / should get school table modify by current user", async () => {
            const res = await agent.get("/school/byuser");
            expect(res.status).to.equal(200);
        });

        it("SCHOOL ROUTE / should NOT get table with all schools (by admin)", async () => {
            const res = await agent.get("/school/byadmin");
            expect(res.status).to.equal(400);
        });

        it("SCHOOL ROUTE / should get school form", async () => {
            const res = await agent.get("/school/form");
            expect(res.status).to.equal(200);
        });

        it("SCHOOL ROUTE / should get chart by user", async () => {
            const res = await agent.get("/school/chart/byuser");
            expect(res.status).to.equal(200);
        });

        it("SCHOOL ROUTE / should NOT get chart by admin (All schools chart)", async () => {
            const res = await agent.get("/school/chart/all");
            expect(res.status).to.equal(400);
        });

        it("SCHOOL ROUTE / should add a school & redirect to the table page of school", async () => {
            const res = await agent.post("/school/add").send(schools_test[0]);
            expect(res.status).to.equal(302);
        });

        it("SCHOOL ROUTE / should edit a school in the form page", async () => {
            code = await school
                .find()
                .where("name_school", schools_test[0].name_school);
            const res = await agent.get("/school/edit/" + code[0]._id);
            expect(res.status).to.equal(200);
        });

        it("SCHOOL ROUTE / should update a school & redirect to the table page of school", async () => {
            const res = await agent
                .post("/school/update/" + code[0]._id)
                .send(schools_test[1]);
            expect(res.status).to.equal(302);
        });

        it("SCHOOL ROUTE / should delete a school & redirect to the table page of school", async () => {
            const res = await agent.delete("/school/delete/" + code[0]._id);
            expect(res.status).to.equal(302);
        });

        it("USER ROUTE / should NOT get user by admin (because you're user)", async () => {
            const res = await agent.get("/user/byadmin");
            expect(res.status).to.equal(404);
        });

        it("USER ROUTE / should NOT get the list of users (admin)", async () => {
            const res = await agent.get("/user/");
            expect(res.status).to.equal(400);
        });

        it("USER ROUTE / should get the user page info by his name", async () => {
            code = await User.find().where(
                "username",
                users_test[0][2].username
            );

            const res = await agent.get("/user/name/" + code[0].username);
            expect(res.status).to.equal(200);
        });

        it("USER ROUTE / should NOT get another user page info by his name", async () => {
            const res = await agent.get("/user/name/NoYourAccount");
            expect(res.status).to.equal(404);
        });

        it("USER ROUTE / should edit a user 3 in the form", async () => {
            const res = await agent.get("/user/edit/" + code[0]._id);
            expect(res.status).to.equal(200);
        });

        it("USER ROUTE / should update a user 3 with user 2 & redirect to the user table", async () => {
            const res = await agent
                .post("/user/update/" + code[0]._id)
                .send(users_test[3][1]);
            expect(res.status).to.equal(302);
        });


        it("USER ROUTE / should NOT delete a user (admin permission)", async () => {
            const res = await agent.delete("/user/delete/" + code[0]._id);
            expect(res.status).to.equal(400);
        });
    });

    describe("USE CASE 3) ADMIN RIGHTS", () => {
        let agent = request.agent(app);
        var code;

        it("AUTH ROUTE / should reconnect user 1 (ADMIN) for access page ", async () => {
            const res = await agent
                .post("/")
                .send(users_test[1][0]);

            expect(res.status).to.equal(200);
        });

        it("SCHOOL ROUTE / should get table with all schools (by admin)", async () => {
            const res = await agent.get("/school/byadmin");
            expect(res.status).to.equal(200);
        });

        it("SCHOOL ROUTE / should get chart by admin (All schools chart)", async () => {
            const res = await agent.get("/school/chart/all");
            expect(res.status).to.equal(200);
        });

        it("USER ROUTE / should get the list of users (admin)", async () => {
            const res = await agent.get("/user/");
            expect(res.status).to.equal(200);
        });

        it("USER ROUTE / should delete a user (admin permission) & redirect to user table page", async () => {

            code = await User.find().where(
                "username",
                users_test[0][1].username
            );

            const res = await agent.delete("/user/delete/" + code[0]._id);
            expect(res.status).to.equal(302);
        });
    });
    /*

  describe("GET /", () => {
    it("should return all users", async () => {
      await User.insertMany(users_test.data_auth);
      const res = await request(app).get("/user/");
      expect(res.status).to.equal(200);
      expect(res.body.length).to.equal(3);
    });
  });

  describe("GET/:id", () => {
    it("should return a user if valid id is passed", async () => {
      await users_test.data_auth[0].save();
      const res = await request(app).get("/user/edit/" + users_test.data_auth[0]._id);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("username", users_test.data_auth[0].username);
    });

    it("should return 400 error when invalid object id is passed", async () => {
      const res = await request(app).get("/user/edit/1");
      expect(res.status).to.equal(400);
    });

    it("should return 404 error when valid object id is passed but does not exist", async () => {
      const res = await request(app).get("/user/edit/111111111111");
      expect(res.status).to.equal(404);
    });
  });

  describe("POST /", () => {
    it("should return user when the all request body is valid", async () => {
      const res = await request(app)
        .post("/api/users")
        .send({
          name: "test",
          email: "test@gmail.com",
          gender: "male"
        });
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("_id");
      expect(res.body).to.have.property("name", "test");
    });

    // add more tests to validate request body accordingly eg, make sure name is more than 3 characters etc
  });

  describe("PUT /:id", () => {
    it("should update the existing order and return 200", async () => {
      const user = new User({
        name: "test",
        email: "test@gmail.com",
        gender: "male"
      });
      await user.save();

      const res = await request(app)
        .put("/api/users/" + user._id)
        .send({
          name: "newTest",
          email: "newemail@gmail.com",
          gender: "male"
        });

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("name", "newTest");
    });
  });

  describe("DELETE /:id", () => {
    it("should delete requested id and return response 200", async () => {
      const user = new User({
        name: "test",
        email: "test@gmail.com",
        gender: "male"
      });
      await user.save();

      const res = await request(app).delete("/api/users/" + user._id);
      expect(res.status).to.be.equal(200);
    });

    it("should return 404 when deleted user is requested", async () => {
      const user = new User({
        name: "test",
        email: "test@gmail.com",
        gender: "male"
      });
      await user.save();

      let res = await request(app).delete("/api/users/" + user._id);
      expect(res.status).to.be.equal(200);

      res = await request(app).get("/api/users/" + user._id);
      expect(res.status).to.be.equal(404);
    });
  });
  */
});
