"use strict";
// school.route.js
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = __importStar(require("express"));
var schoolRoutes = express.Router();
var school = require("../model/school.model");
var User = require("../model/auth.model");
// GET FORM SCHOOL TO ADD ONE
schoolRoutes.get("/form", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var user_id, querie_2, actual_user, e_1, JSONCountry;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    actual_user = { _id: "", status: "" };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    user_id = req.session.user._id;
                    querie_2 = User.findById(user_id);
                    return [4 /*yield*/, querie_2.exec()];
                case 2:
                    actual_user = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    user_id = "";
                    actual_user._id = "";
                    actual_user.status = "";
                    return [3 /*break*/, 4];
                case 4:
                    JSONCountry = require("../model/states.json");
                    JSONCountry = JSONCountry.map(function (state) {
                        return state.name.toUpperCase();
                    });
                    if (actual_user._id.toString() == user_id.toString() &&
                        actual_user._id != "") {
                        res.status(200).render("form", {
                            title: "Add school",
                            action: "/school/add",
                            user: req.session.user,
                            fields: [
                                {
                                    name: "website_link",
                                    prettyname: "Website link",
                                    type: "text",
                                    property: "required",
                                    error: ""
                                },
                                {
                                    name: "adress",
                                    prettyname: "Adress",
                                    type: "text",
                                    property: "required",
                                    error: ""
                                },
                                {
                                    name: "description_eng",
                                    prettyname: "Description",
                                    type: "textarea",
                                    property: "required",
                                    error: ""
                                },
                                {
                                    name: "school_icon",
                                    prettyname: "School icon",
                                    type: "text",
                                    property: "required",
                                    error: ""
                                },
                                {
                                    name: "mystate",
                                    prettyname: "State",
                                    type: "select",
                                    queries: JSONCountry,
                                    property: "required",
                                    error: ""
                                },
                                {
                                    name: "name_school",
                                    prettyname: "School name",
                                    type: "text",
                                    property: "required",
                                    error: ""
                                },
                                {
                                    name: "grade",
                                    prettyname: "Grade",
                                    type: "text",
                                    property: "required",
                                    error: ""
                                },
                                {
                                    name: "age",
                                    prettyname: "Age",
                                    type: "text",
                                    property: "required",
                                    error: ""
                                }
                            ]
                        });
                    }
                    else {
                        res.status(400).send("Not connected");
                    }
                    return [2 /*return*/];
            }
        });
    });
});
// GET CHART FROM ALL SCHOOLS
schoolRoutes.get("/chart/all", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var user_id, querie_2, actual_user, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    actual_user = { _id: "", status: "" };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    user_id = req.session.user._id;
                    querie_2 = User.findById(user_id);
                    return [4 /*yield*/, querie_2.exec()];
                case 2:
                    actual_user = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_2 = _a.sent();
                    user_id = "";
                    actual_user._id = "";
                    actual_user.status = "";
                    return [3 /*break*/, 4];
                case 4:
                    if (actual_user._id.toString() == user_id.toString() &&
                        actual_user.status == "admin" &&
                        actual_user._id != "") {
                        school.find(function (err, school) {
                            if (err) {
                                res.status(404).send("Not found");
                            }
                            else {
                                var data_grade = [];
                                var data_age = [];
                                var data_set = [];
                                var names = [];
                                var propComparator = function (propName) { return function (a, b) {
                                    return a[propName] == b[propName]
                                        ? 0
                                        : a[propName] < b[propName]
                                            ? -1
                                            : 1;
                                }; };
                                school = school.sort(propComparator("age"), propComparator("grade"));
                                for (var index = 0; index < school.length; index++) {
                                    if (school[index].age === undefined) {
                                        data_age.push(0);
                                    }
                                    else {
                                        data_age.push(school[index].age);
                                    }
                                    if (school[index].grade === undefined) {
                                        data_grade.push(0);
                                    }
                                    else {
                                        data_grade.push(school[index].grade);
                                    }
                                    var data_full = [];
                                    for (var i = 0; i < school.length; i++) {
                                        if (i >= index) {
                                            data_full.push(school[index].grade);
                                        }
                                        else {
                                            data_full.push(0);
                                        }
                                        if (i == school.length - 1) {
                                            data_full.push(school[index].grade);
                                        }
                                    }
                                    data_set.push({
                                        data: data_full,
                                        label: school[index].name_school,
                                        borderColor: "#3e95cd",
                                        fill: false
                                    });
                                    names.push(school[index].name_school);
                                }
                                data_age.push(2019);
                                res.status(200).render("chart", {
                                    title: "Chart",
                                    fields: names,
                                    table: data_grade,
                                    table_sec: data_age,
                                    data_set: data_set,
                                    user: req.session.user
                                });
                            }
                        });
                    }
                    else {
                        res.status(400).send("Not connected or not admin");
                    }
                    return [2 /*return*/];
            }
        });
    });
});
// GET CHART BY CURRENT USER
schoolRoutes.get("/chart/byuser", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var user_id, querie_2, actual_user, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    actual_user = { _id: "", status: "" };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    user_id = req.session.user._id;
                    querie_2 = User.findById(user_id);
                    return [4 /*yield*/, querie_2.exec()];
                case 2:
                    actual_user = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_3 = _a.sent();
                    user_id = "";
                    actual_user._id = "";
                    actual_user.status = "";
                    return [3 /*break*/, 4];
                case 4:
                    if (actual_user._id.toString() == user_id.toString() &&
                        actual_user._id != "") {
                        school
                            .find()
                            .where("user_id", user_id)
                            .exec(function (err, school) {
                            if (err) {
                                res.status(404).send("Not found");
                            }
                            else {
                                var data_grade = [];
                                var data_age = [];
                                var data_set = [];
                                var names = [];
                                var propComparator = function (propName) { return function (a, b) {
                                    return a[propName] == b[propName]
                                        ? 0
                                        : a[propName] < b[propName]
                                            ? -1
                                            : 1;
                                }; };
                                school = school.sort(propComparator("age"), propComparator("grade"));
                                for (var index = 0; index < school.length; index++) {
                                    if (school[index].age === undefined) {
                                        data_age.push(0);
                                    }
                                    else {
                                        data_age.push(school[index].age);
                                    }
                                    if (school[index].grade === undefined) {
                                        data_grade.push(0);
                                    }
                                    else {
                                        data_grade.push(school[index].grade);
                                    }
                                    var data_full = [];
                                    for (var i = 0; i < school.length; i++) {
                                        if (i >= index) {
                                            data_full.push(school[index].grade);
                                        }
                                        else {
                                            data_full.push(0);
                                        }
                                        if (i == school.length - 1) {
                                            data_full.push(school[index].grade);
                                        }
                                    }
                                    data_set.push({
                                        data: data_full,
                                        label: school[index].name_school,
                                        borderColor: "#3e95cd",
                                        fill: false
                                    });
                                    names.push(school[index].name_school);
                                }
                                data_age.push(2019);
                                res.status(200).render("chart", {
                                    title: "Chart",
                                    fields: names,
                                    table: data_grade,
                                    table_sec: data_age,
                                    data_set: data_set,
                                    user: req.session.user
                                });
                            }
                        });
                    }
                    else {
                        res.status(400).send("Not connected or not admin");
                    }
                    return [2 /*return*/];
            }
        });
    });
});
// GET TABLE OF SCHOOL BY CURRENT USER
schoolRoutes.get("/byuser", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var user_id, querie_2, actual_user, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    actual_user = { _id: "", status: "" };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    user_id = req.session.user._id;
                    querie_2 = User.findById(user_id);
                    return [4 /*yield*/, querie_2.exec()];
                case 2:
                    actual_user = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_4 = _a.sent();
                    user_id = "";
                    actual_user._id = "";
                    actual_user.status = "";
                    return [3 /*break*/, 4];
                case 4:
                    if (actual_user._id.toString() == user_id.toString() &&
                        actual_user._id != "") {
                        school
                            .find()
                            .where("user_id", user_id)
                            .exec(function (err, school) {
                            if (!school)
                                res.status(404).send("data is not found");
                            res.status(200).render("tables", {
                                title: "School By User",
                                action: "/",
                                user: req.session.user,
                                key: [
                                    "_id",
                                    "website_link",
                                    "adress",
                                    "description_eng",
                                    "school_icon",
                                    "mystate",
                                    "name_school",
                                    "grade",
                                    "age",
                                    "user_id"
                                ],
                                fields: school
                            });
                        });
                    }
                    else {
                        res.status(400).send("Not connected");
                    }
                    return [2 /*return*/];
            }
        });
    });
});
// ADD SCHOOL TO THE DATABASE
schoolRoutes.post("/add", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var user_id, querie_2, actual_user, e_5, school_add;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    actual_user = { _id: "", status: "" };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    user_id = req.session.user._id;
                    querie_2 = User.findById(user_id);
                    return [4 /*yield*/, querie_2.exec()];
                case 2:
                    actual_user = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_5 = _a.sent();
                    user_id = "";
                    actual_user._id = "";
                    actual_user.status = "";
                    return [3 /*break*/, 4];
                case 4:
                    if (actual_user._id.toString() == user_id.toString() &&
                        actual_user._id != "") {
                        school_add = new school(req.body);
                        school_add.user_id = user_id;
                        school_add
                            .save()
                            .then(function (school) {
                            res.status(200).redirect("/school/byuser");
                        })
                            .catch(function (err) {
                            res.status(400).send("unable to save to database");
                        });
                    }
                    else {
                        res.status(400).send("Not connected");
                    }
                    return [2 /*return*/];
            }
        });
    });
});
schoolRoutes.get("/byadmin", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var user_id, querie_2, actual_user, e_6, id;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    actual_user = { _id: "", status: "" };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    user_id = req.session.user._id;
                    querie_2 = User.findById(user_id);
                    return [4 /*yield*/, querie_2.exec()];
                case 2:
                    actual_user = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_6 = _a.sent();
                    user_id = "";
                    actual_user._id = "";
                    actual_user.status = "";
                    return [3 /*break*/, 4];
                case 4:
                    if (actual_user._id.toString() == user_id.toString() &&
                        actual_user.status == "admin" &&
                        actual_user._id != "") {
                        id = user_id;
                        User.findById(id, function (err, user) {
                            if (user.status == "admin") {
                                school.find(function (err, school) {
                                    if (err) {
                                        res.status(404).send("Data not found");
                                    }
                                    else {
                                        res.render("tables", {
                                            title: "All schools by admin",
                                            action: "/",
                                            user: req.session.user,
                                            key: [
                                                "_id",
                                                "website_link",
                                                "adress",
                                                "description_eng",
                                                "school_icon",
                                                "mystate",
                                                "name_school",
                                                "grade",
                                                "age",
                                                "user_id"
                                            ],
                                            fields: school
                                        });
                                    }
                                });
                            }
                            else {
                                res.status(400).send("You're not admin");
                            }
                        });
                    }
                    else {
                        res.status(400).send("Not connected");
                    }
                    return [2 /*return*/];
            }
        });
    });
});
// UPDATE ONE SCHOOL IN THE FORM
schoolRoutes.get("/edit/:id", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var user_id, querie_2, actual_user, e_7, JSONCountry, id_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    actual_user = { _id: "", status: "" };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    user_id = req.session.user._id;
                    querie_2 = User.findById(user_id);
                    return [4 /*yield*/, querie_2.exec()];
                case 2:
                    actual_user = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_7 = _a.sent();
                    user_id = "";
                    actual_user._id = "";
                    actual_user.status = "";
                    return [3 /*break*/, 4];
                case 4:
                    JSONCountry = require("../model/states.json");
                    JSONCountry = JSONCountry.map(function (state) {
                        return state.name.toUpperCase();
                    });
                    if (actual_user._id.toString() == user_id.toString() &&
                        actual_user._id != "") {
                        id_1 = req.params.id;
                        school.findById(id_1, function (err, school) {
                            res.status(200).render("form", {
                                title: "Update school",
                                action: "/school/update/" + id_1,
                                user: req.session.user,
                                fields: [
                                    {
                                        name: "website_link",
                                        prettyname: "Website link",
                                        value: school.website_link,
                                        type: "text",
                                        property: "required",
                                        error: ""
                                    },
                                    {
                                        name: "adress",
                                        prettyname: "Adress",
                                        value: school.adress,
                                        type: "text",
                                        property: "required",
                                        error: ""
                                    },
                                    {
                                        name: "description_eng",
                                        prettyname: "Description",
                                        value: school.description_eng,
                                        type: "textarea",
                                        property: "required",
                                        error: ""
                                    },
                                    {
                                        name: "school_icon",
                                        prettyname: "School icon",
                                        value: school.school_icon,
                                        type: "text",
                                        property: "required",
                                        error: ""
                                    },
                                    {
                                        name: "mystate",
                                        prettyname: "State",
                                        type: "select",
                                        queries: JSONCountry,
                                        property: "required",
                                        error: ""
                                    },
                                    {
                                        name: "name_school",
                                        prettyname: "School name",
                                        value: school.name_school,
                                        type: "text",
                                        property: "required",
                                        error: ""
                                    },
                                    {
                                        name: "grade",
                                        prettyname: "Grade",
                                        value: school.grade,
                                        type: "text",
                                        property: "required",
                                        error: ""
                                    },
                                    {
                                        name: "age",
                                        prettyname: "Age",
                                        value: school.age,
                                        type: "text",
                                        property: "required",
                                        error: ""
                                    }
                                ]
                            });
                        });
                    }
                    else {
                        res.status(400).send("Not connected or not admin");
                    }
                    return [2 /*return*/];
            }
        });
    });
});
// UPDATE THE SCHOOL IN THE DATABASE
schoolRoutes.post("/update/:id", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var user_id, querie_2, actual_user, e_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    actual_user = { _id: "", status: "" };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    user_id = req.session.user._id;
                    querie_2 = User.findById(user_id);
                    return [4 /*yield*/, querie_2.exec()];
                case 2:
                    actual_user = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_8 = _a.sent();
                    user_id = "";
                    actual_user._id = "";
                    actual_user.status = "";
                    return [3 /*break*/, 4];
                case 4:
                    if (actual_user._id.toString() == user_id.toString() &&
                        actual_user._id != "") {
                        school.findById(req.params.id, function (err, school) {
                            if (!school)
                                res.status(404).send("data is not found");
                            else {
                                school.name_school = req.body.name_school;
                                school.mystate = req.body.mystate;
                                school.school_icon = req.body.school_icon;
                                school.description_eng = req.body.description_eng;
                                school.adress = req.body.adress;
                                school.website_link = req.body.website_link;
                                school.grade = req.body.grade;
                                school.age = req.body.age;
                                school.user_id = actual_user._id.toString();
                                school
                                    .save()
                                    .then(function (school) {
                                    res.status(200).redirect("/school/byuser");
                                })
                                    .catch(function (err) {
                                    res.status(400).send("unable to update the database");
                                });
                            }
                        });
                    }
                    else {
                        res.status(400).send("Not connected");
                    }
                    return [2 /*return*/];
            }
        });
    });
});
// DELETE A SCHOOL FROM DATABASE
schoolRoutes.route("/delete/:id").delete(function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var user_id, querie_2, actual_user, e_9;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    actual_user = { _id: "", status: "" };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    user_id = req.session.user._id;
                    querie_2 = User.findById(user_id);
                    return [4 /*yield*/, querie_2.exec()];
                case 2:
                    actual_user = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_9 = _a.sent();
                    user_id = "";
                    actual_user._id = "";
                    actual_user.status = "";
                    return [3 /*break*/, 4];
                case 4:
                    if (actual_user._id.toString() == user_id.toString() &&
                        actual_user._id != "") {
                        school.findByIdAndRemove({ _id: req.params.id }, function (err, school) {
                            return __awaiter(this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    if (err) {
                                        res.status(404).json(err);
                                    }
                                    else {
                                        res.status(200).redirect("/school/byuser");
                                    }
                                    return [2 /*return*/];
                                });
                            });
                        });
                    }
                    else {
                        res.status(400).send("Not connected");
                    }
                    return [2 /*return*/];
            }
        });
    });
});
module.exports = schoolRoutes;
