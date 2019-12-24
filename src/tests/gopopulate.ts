var User = require("../model/auth.model");
var school = require("../model/school.model");
const Populate = require("./populate")

describe("/Populate", () => {

    before(async function() {
        await User.deleteMany({});
        await school.deleteMany({});
    });

    describe("Populate Database User & Schools", async () => {

        it("Populate users", async () => {

        const res = await User.insertMany(Populate[1]);
        console.log(res)

        });

        it("Populate schools", async () => {

        const res = await school.insertMany(Populate[0]);
        console.log(res)

        });

    });

});