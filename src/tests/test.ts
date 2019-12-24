var User = require("../model/auth.model");
var school = require("../model/school.model");
const request = require("supertest");
const expect = require("chai").expect;
const my_app = require("../server");
const users_test = require("./auth_test");
const schools_test = require("./schools_test");

describe("/User", () => {

    before(async function() {
        await User.deleteMany({});
    });

    describe("USE CASE 1) register & connect user", () => {

        it("AUTH ROUTE / should add user 1 inscription", async () => {
            const res = await request(my_app)
                .post("/")
                .send(users_test[2][0]);

            expect(res.status).to.equal(200);
        });

        it("AUTH ROUTE / should NOT add an existing user inscription", async () => {
            const res = await request(my_app)
                .post("/")
                .send(users_test[2][0]);

            expect(res.status).to.equal(400);
        });

        it("AUTH ROUTE / should NOT add user 4 inscription (validator)", async () => {
            const res = await request(my_app)
                .post("/")
                .send(users_test[2][3]);

            expect(res.status).to.equal(400);
        });

        it("AUTH ROUTE / should * connect user 1 (Admin) *", async () => {
            const res = await request(my_app)
                .post("/")
                .send(users_test[1][0]);

            expect(res.status).to.equal(200);
        });

        it("AUTH ROUTE / should NOT * connect user error (Not Found) *", async () => {
            const res = await request(my_app)
                .post("/")
                .send(users_test[1][3]);

            expect(res.status).to.equal(404);
        });
    });


    describe("USE CASE 2) USER RIGHTS", () => {
        let agent = request.agent(my_app);
        var code:any;

        it("AUTH ROUTE / should connect user 3 (User) for access page ", async () => {
            const res = await agent
                .post("/", async function(req:any, res:any) {
                    req.session.user = new User(users_test[2][2]);
                })
                .send(users_test[2][2]);

            expect(res.status).to.equal(200);
        });

        it("AUTH ROUTE / should get menu page", async () => {
            const res = await request(my_app).get("/menu");
            expect(res.status).to.equal(200);
        });

        it("AUTH ROUTE / should get register page", async () => {
            const res = await request(my_app).get("/register");
            expect(res.status).to.equal(200);
        });

        it("AUTH ROUTE / should get login page", async () => {
            const res = await request(my_app).get("/");
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
        let agent = request.agent(my_app);
        var code;

        it("AUTH ROUTE / should connect user 1 (ADMIN) for access page ", async () => {
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

});