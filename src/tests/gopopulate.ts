var User = require("../model/auth.model");
var school = require("../model/school.model");
const Populate = require("./populate")
import expect from "chai";
var my_app = require("../server");

describe("/Populate", () => {

    before(async function() {
        await User.deleteMany({});
        await school.deleteMany({});
    });

    describe("Populate Database User & Schools", async () => {

        it("POPULATE / Should populate users", async () => {

        const res = await User.insertMany(Populate[1]);
         
        expect.expect(res).to.be.an('array');

        });

        it("POPULATE / Should populate schools", async () => {

        const res = await school.insertMany(Populate[0]);
       
        expect.expect(res).to.be.an('array')

        });

    });

});

module.exports = my_app;