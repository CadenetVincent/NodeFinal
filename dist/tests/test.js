"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var User = require("../model/auth.model");
var school = require("../model/school.model");
var request = require("supertest");
var expect = require("chai").expect;
var my_app = require("../server");
var users_test = require("./auth_test");
var schools_test = require("./schools_test");
describe("/User", function () {
    before(function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, User.deleteMany({})];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    describe("USE CASE 1) register & connect user", function () {
        it("AUTH ROUTE / should add user 1 inscription", function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request(my_app)
                            .post("/")
                            .send(users_test[2][0])];
                    case 1:
                        res = _a.sent();
                        expect(res.status).to.equal(200);
                        return [2 /*return*/];
                }
            });
        }); });
        it("AUTH ROUTE / should NOT add an existing user inscription", function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request(my_app)
                            .post("/")
                            .send(users_test[2][0])];
                    case 1:
                        res = _a.sent();
                        expect(res.status).to.equal(400);
                        return [2 /*return*/];
                }
            });
        }); });
        it("AUTH ROUTE / should NOT add user 4 inscription (validator)", function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request(my_app)
                            .post("/")
                            .send(users_test[2][3])];
                    case 1:
                        res = _a.sent();
                        expect(res.status).to.equal(400);
                        return [2 /*return*/];
                }
            });
        }); });
        it("AUTH ROUTE / should * connect user 1 (Admin) *", function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request(my_app)
                            .post("/")
                            .send(users_test[1][0])];
                    case 1:
                        res = _a.sent();
                        expect(res.status).to.equal(200);
                        return [2 /*return*/];
                }
            });
        }); });
        it("AUTH ROUTE / should NOT * connect user error (Not Found) *", function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request(my_app)
                            .post("/")
                            .send(users_test[1][3])];
                    case 1:
                        res = _a.sent();
                        expect(res.status).to.equal(404);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("USE CASE 2) USER RIGHTS", function () {
        var agent = request.agent(my_app);
        var code;
        it("AUTH ROUTE / should connect user 3 (User) for access page ", function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, agent
                            .post("/", function (req, res) {
                            return __awaiter(this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    req.session.user = users_test[2][2];
                                    return [2 /*return*/];
                                });
                            });
                        })
                            .send(users_test[2][2])];
                    case 1:
                        res = _a.sent();
                        expect(res.status).to.equal(200);
                        return [2 /*return*/];
                }
            });
        }); });
        it("AUTH ROUTE / should get menu page", function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, agent.get("/menu")];
                    case 1:
                        res = _a.sent();
                        expect(res.status).to.equal(200);
                        return [2 /*return*/];
                }
            });
        }); });
        it("AUTH ROUTE / should get register page", function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, agent.get("/register")];
                    case 1:
                        res = _a.sent();
                        expect(res.status).to.equal(200);
                        return [2 /*return*/];
                }
            });
        }); });
        it("AUTH ROUTE / should get login page", function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, agent.get("/")];
                    case 1:
                        res = _a.sent();
                        expect(res.status).to.equal(200);
                        return [2 /*return*/];
                }
            });
        }); });
        it("SCHOOL ROUTE / should get school table modify by current user", function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, agent.get("/school/byuser")];
                    case 1:
                        res = _a.sent();
                        expect(res.status).to.equal(200);
                        return [2 /*return*/];
                }
            });
        }); });
        it("SCHOOL ROUTE / should NOT get table with all schools (by admin)", function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, agent.get("/school/byadmin")];
                    case 1:
                        res = _a.sent();
                        expect(res.status).to.equal(400);
                        return [2 /*return*/];
                }
            });
        }); });
        it("SCHOOL ROUTE / should get school form", function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, agent.get("/school/form")];
                    case 1:
                        res = _a.sent();
                        expect(res.status).to.equal(200);
                        return [2 /*return*/];
                }
            });
        }); });
        it("SCHOOL ROUTE / should get chart by user", function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, agent.get("/school/chart/byuser")];
                    case 1:
                        res = _a.sent();
                        expect(res.status).to.equal(200);
                        return [2 /*return*/];
                }
            });
        }); });
        it("SCHOOL ROUTE / should NOT get chart by admin (All schools chart)", function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, agent.get("/school/chart/all")];
                    case 1:
                        res = _a.sent();
                        expect(res.status).to.equal(400);
                        return [2 /*return*/];
                }
            });
        }); });
        it("SCHOOL ROUTE / should add a school & redirect to the table page of school", function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, agent.post("/school/add").send(schools_test[0])];
                    case 1:
                        res = _a.sent();
                        expect(res.status).to.equal(302);
                        return [2 /*return*/];
                }
            });
        }); });
        it("SCHOOL ROUTE / should edit a school in the form page", function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, school
                            .find()
                            .where("name_school", schools_test[0].name_school)];
                    case 1:
                        code = _a.sent();
                        return [4 /*yield*/, agent.get("/school/edit/" + code[0]._id)];
                    case 2:
                        res = _a.sent();
                        expect(res.status).to.equal(200);
                        return [2 /*return*/];
                }
            });
        }); });
        it("SCHOOL ROUTE / should update a school & redirect to the table page of school", function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, agent
                            .post("/school/update/" + code[0]._id)
                            .send(schools_test[1])];
                    case 1:
                        res = _a.sent();
                        expect(res.status).to.equal(302);
                        return [2 /*return*/];
                }
            });
        }); });
        it("SCHOOL ROUTE / should delete a school & redirect to the table page of school", function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, agent.delete("/school/delete/" + code[0]._id)];
                    case 1:
                        res = _a.sent();
                        expect(res.status).to.equal(302);
                        return [2 /*return*/];
                }
            });
        }); });
        it("USER ROUTE / should NOT get user by admin (because you're user)", function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, agent.get("/user/byadmin")];
                    case 1:
                        res = _a.sent();
                        expect(res.status).to.equal(404);
                        return [2 /*return*/];
                }
            });
        }); });
        it("USER ROUTE / should NOT get the list of users (admin)", function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, agent.get("/user/")];
                    case 1:
                        res = _a.sent();
                        expect(res.status).to.equal(400);
                        return [2 /*return*/];
                }
            });
        }); });
        it("USER ROUTE / should get the user page info by his name", function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, User.find().where("username", users_test[0][2].username)];
                    case 1:
                        code = _a.sent();
                        return [4 /*yield*/, agent.get("/user/name/" + code[0].username)];
                    case 2:
                        res = _a.sent();
                        expect(res.status).to.equal(200);
                        return [2 /*return*/];
                }
            });
        }); });
        it("USER ROUTE / should NOT get another user page info by his name", function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, agent.get("/user/name/NoYourAccount")];
                    case 1:
                        res = _a.sent();
                        expect(res.status).to.equal(404);
                        return [2 /*return*/];
                }
            });
        }); });
        it("USER ROUTE / should edit a user 3 in the form", function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, agent.get("/user/edit/" + code[0]._id)];
                    case 1:
                        res = _a.sent();
                        expect(res.status).to.equal(200);
                        return [2 /*return*/];
                }
            });
        }); });
        it("USER ROUTE / should update a user 3 with user 2 & redirect to the user table", function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, agent
                            .post("/user/update/" + code[0]._id)
                            .send(users_test[3][1])];
                    case 1:
                        res = _a.sent();
                        expect(res.status).to.equal(302);
                        return [2 /*return*/];
                }
            });
        }); });
        it("USER ROUTE / should NOT delete a user (admin permission)", function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, agent.delete("/user/delete/" + code[0]._id)];
                    case 1:
                        res = _a.sent();
                        expect(res.status).to.equal(400);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("USE CASE 3) ADMIN RIGHTS", function () {
        var agent = request.agent(my_app);
        var code;
        it("AUTH ROUTE / should connect user 1 (ADMIN) for access page ", function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, agent
                            .post("/")
                            .send(users_test[1][0])];
                    case 1:
                        res = _a.sent();
                        expect(res.status).to.equal(200);
                        return [2 /*return*/];
                }
            });
        }); });
        it("SCHOOL ROUTE / should get table with all schools (by admin)", function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, agent.get("/school/byadmin")];
                    case 1:
                        res = _a.sent();
                        expect(res.status).to.equal(200);
                        return [2 /*return*/];
                }
            });
        }); });
        it("SCHOOL ROUTE / should get chart by admin (All schools chart)", function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, agent.get("/school/chart/all")];
                    case 1:
                        res = _a.sent();
                        expect(res.status).to.equal(200);
                        return [2 /*return*/];
                }
            });
        }); });
        it("USER ROUTE / should get the list of users (admin)", function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, agent.get("/user/")];
                    case 1:
                        res = _a.sent();
                        expect(res.status).to.equal(200);
                        return [2 /*return*/];
                }
            });
        }); });
        it("USER ROUTE / should delete a user (admin permission) & redirect to user table page", function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, User.find().where("username", users_test[0][1].username)];
                    case 1:
                        code = _a.sent();
                        return [4 /*yield*/, agent.delete("/user/delete/" + code[0]._id)];
                    case 2:
                        res = _a.sent();
                        expect(res.status).to.equal(302);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
module.exports = my_app;
