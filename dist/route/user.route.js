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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = __importStar(require("express"));
var bcrypt = __importStar(require("bcryptjs"));
var userRoutes = express.Router();
var User = require("../model/auth.model");
var validateRegisterInput = require("../form_valid/register");
/* GET ALL USERS */
userRoutes.get("/", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var user_id, querie_2, actual_user, e_1;
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
                    if (actual_user._id.toString() == user_id.toString() &&
                        actual_user._id != "" &&
                        actual_user.status == "admin") {
                        User.find(function (err, user) {
                            if (err) {
                                res.status(404).send("Not found");
                            }
                            else {
                                res.status(200).json(user);
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
/* GET BY ADMIN */
userRoutes.get("/byadmin", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var user_id, querie_2, actual_user, e_2, id;
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
                        actual_user._id != "") {
                        id = req.session.user._id;
                        User.findById(id, function (err, user) {
                            if (user.status == "admin") {
                                User.find(function (err, users) {
                                    if (err) {
                                        res.status(404).send("Not found");
                                    }
                                    else {
                                        res.render("tables", {
                                            title: "Users By Admin",
                                            action: "/",
                                            user: req.session.user,
                                            key: [
                                                "_id",
                                                "username",
                                                "email",
                                                "password",
                                                "avatar",
                                                "status",
                                                "date"
                                            ],
                                            fields: users
                                        });
                                    }
                                });
                            }
                            else {
                                return res.status(404).send("Not Admin");
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
/* FORM UPDATE USER */
userRoutes.get("/edit/:id", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var user_id, querie_2, actual_user, e_3, id_1;
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
                        id_1 = req.params.id;
                        User.findById(req.session.user._id, function (err, actual_user) {
                            if (id_1 == actual_user._id || actual_user.status == "admin") {
                                User.findById(id_1, function (err, user) {
                                    res.render("form", {
                                        title: "Update user",
                                        user: req.session.user,
                                        action: "/user/update/" + id_1,
                                        fields: [
                                            {
                                                name: "email",
                                                prettyname: "Email",
                                                type: "text",
                                                property: "required",
                                                value: user.email,
                                                error: ""
                                            },
                                            {
                                                name: "password",
                                                prettyname: "Password",
                                                type: "password",
                                                property: "required",
                                                error: ""
                                            },
                                            {
                                                name: "passwordConf",
                                                prettyname: "Password confirm",
                                                type: "password",
                                                property: "required",
                                                error: ""
                                            },
                                            {
                                                name: "username",
                                                prettyname: "User name",
                                                type: "text",
                                                property: "required",
                                                value: user.username,
                                                error: ""
                                            },
                                            {
                                                name: "status",
                                                prettyname: "Status",
                                                type: "select",
                                                queries: ["admin", "user"],
                                                value: user.status,
                                                property: "required",
                                                error: ""
                                            }
                                        ]
                                    });
                                });
                            }
                            else {
                                return res.status(404).send("You do not have the rights");
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
/* GET USER BY NAME */
userRoutes.get("/name/:name", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var user_id, querie_2, actual_user, e_4, name_1, user_search, querie_1, e_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    actual_user = { _id: "", status: "" };
                    try {
                        user_id = req.session.user._id;
                    }
                    catch (e) {
                        user_id = "";
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    querie_2 = User.findById(user_id);
                    return [4 /*yield*/, querie_2.exec()];
                case 2:
                    actual_user = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_4 = _a.sent();
                    actual_user = { _id: "", status: "" };
                    return [3 /*break*/, 4];
                case 4:
                    if (!(actual_user._id.toString() == user_id.toString() &&
                        actual_user._id != "")) return [3 /*break*/, 9];
                    name_1 = req.params.name;
                    user_search = [];
                    _a.label = 5;
                case 5:
                    _a.trys.push([5, 7, , 8]);
                    querie_1 = User.find().where("username", name_1);
                    return [4 /*yield*/, querie_1.exec()];
                case 6:
                    user_search = _a.sent();
                    return [3 /*break*/, 8];
                case 7:
                    e_5 = _a.sent();
                    user_search = [];
                    return [3 /*break*/, 8];
                case 8:
                    (function () {
                        return __awaiter(this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                if (user_search.length == 0) {
                                    user_search[0] = { _id: "" };
                                }
                                return [2 /*return*/];
                            });
                        });
                    })();
                    if (actual_user._id.toString() == user_search[0]._id.toString() ||
                        actual_user.status == "admin") {
                        res.render("table", {
                            title: "About " + user_search[0].username,
                            action: "/auth/login",
                            user: req.session.user,
                            fields: [
                                { name: user_search[0]._id, type: "_id" },
                                { name: user_search[0].username, type: "Name" },
                                { name: user_search[0].email, type: "Email" },
                                { name: user_search[0].password, type: "Password" },
                                { name: user_search[0].avatar, type: "Avatar" },
                                { name: user_search[0].status, type: "Status" },
                                { name: user_search[0].date, type: "Date inscription" }
                            ]
                        });
                    }
                    else {
                        res.status(404).send("No permissions");
                    }
                    return [3 /*break*/, 10];
                case 9:
                    res.status(400).send("Not connected");
                    _a.label = 10;
                case 10: return [2 /*return*/];
            }
        });
    });
});
/* UPDATE ONE USER */
userRoutes.post("/update/:id", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var user_id, querie_2, actual_user, e_6;
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
                        actual_user._id != "") {
                        User.findById(req.params.id, function (err, user) {
                            if (!user)
                                res.status(404).send("data is not found");
                            else {
                                var _a = validateRegisterInput(req.body), errors = _a.errors, isValid = _a.isValid;
                                if (!isValid) {
                                    return res.status(400).json(errors);
                                }
                                user.username = req.body.username;
                                user.email = req.body.email;
                                user.password = req.body.password;
                                user.status = req.body.status;
                                bcrypt.genSalt(10, function (err, salt) {
                                    if (err)
                                        res.status(404).send("SALT error");
                                    else {
                                        bcrypt.hash(user.password, salt, function (err, hash) {
                                            if (err)
                                                res.status(404).send("Hash error");
                                            else {
                                                user.password = hash;
                                                user.save().then(function (user) {
                                                    if (user.status == "user") {
                                                        res.status(200).redirect("/user/name/" + user.username);
                                                    }
                                                    else {
                                                        res.status(200).redirect("/user/byadmin");
                                                    }
                                                });
                                            }
                                        });
                                    }
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
// DELETE ONE USER
userRoutes.route("/delete/:id").delete(function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var user_id, querie_2, actual_user, e_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    actual_user = { _id: "", status: "", username: "" };
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
                    if (actual_user._id.toString() == user_id.toString() &&
                        actual_user._id != "" &&
                        actual_user.status == "admin") {
                        User.findByIdAndRemove({ _id: req.params.id }, function (err, user) {
                            if (err) {
                                res.status(404).json(err);
                            }
                            else {
                                if (actual_user.status == "user") {
                                    res.status(200).redirect("/user/name/" + actual_user.username);
                                }
                                else {
                                    res.status(200).redirect("/user/byadmin");
                                }
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
module.exports = userRoutes;
