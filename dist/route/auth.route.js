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
var validateRegisterInput = require("../form_valid/register");
var validateLoginInput = require("../form_valid/login");
var gravatar = require("gravatar");
var bcrypt = require("bcryptjs");
var express = __importStar(require("express"));
var router = express.Router();
var User = require("../model/auth.model.js");
var school = require("../model/school.model.js");
router.get("/", function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var isuser;
        return __generator(this, function (_a) {
            isuser = "";
            try {
                isuser = req.session.user._id;
            }
            catch (e) {
                isuser = "";
            }
            if (isuser !== "" && isuser !== undefined) {
                User.findById(isuser).exec(function (error, user) {
                    if (error) {
                        return next(error);
                    }
                    else {
                        if (user === null) {
                            res.render("form", {
                                title: "Login",
                                action: "/",
                                fields: [
                                    {
                                        name: "logemail",
                                        prettyname: "Email",
                                        type: "text",
                                        property: "required",
                                        error: ""
                                    },
                                    {
                                        name: "logpassword",
                                        prettyname: "Password",
                                        type: "password",
                                        property: "required",
                                        error: ""
                                    }
                                ]
                            });
                        }
                        else {
                            res.render("acceuil", {
                                success: true,
                                user: req.session.user,
                                nbr_school: 0
                            });
                        }
                    }
                });
            }
            else {
                res.render("form", {
                    title: "Login",
                    action: "/",
                    fields: [
                        {
                            name: "logemail",
                            prettyname: "Email",
                            type: "text",
                            property: "required",
                            error: ""
                        },
                        {
                            name: "logpassword",
                            prettyname: "Password",
                            type: "password",
                            property: "required",
                            error: ""
                        }
                    ]
                });
            }
            return [2 /*return*/];
        });
    });
});
router.get("/register", function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var isuser;
        return __generator(this, function (_a) {
            isuser = "";
            try {
                isuser = req.session.user._id;
            }
            catch (e) {
                isuser = "";
            }
            if (isuser !== "") {
                User.findById(isuser).exec(function (error, user) {
                    if (error) {
                        return next(error);
                    }
                    else {
                        if (user === null) {
                            res.render("form", {
                                title: "Register",
                                action: "/",
                                fields: [
                                    {
                                        name: "email",
                                        prettyname: "Email",
                                        type: "text",
                                        property: "required",
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
                                        error: ""
                                    },
                                    {
                                        name: "status",
                                        prettyname: "Status",
                                        type: "select",
                                        queries: ["admin", "user"],
                                        property: "required",
                                        error: ""
                                    }
                                ]
                            });
                        }
                        else {
                            res.render("acceuil", {
                                success: true,
                                user: req.session.user,
                                nbr_school: 0
                            });
                        }
                    }
                });
            }
            else {
                res.render("form", {
                    title: "Register",
                    action: "/",
                    fields: [
                        {
                            name: "email",
                            prettyname: "Email",
                            type: "text",
                            property: "required",
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
                            error: ""
                        },
                        {
                            name: "status",
                            prettyname: "Status",
                            type: "select",
                            queries: ["admin", "user"],
                            property: "required",
                            error: ""
                        }
                    ]
                });
            }
            return [2 /*return*/];
        });
    });
});
// GET THE MENU OF THE APPLICATION
router.get("/menu", function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var user_id;
        return __generator(this, function (_a) {
            try {
                user_id = req.session.user._id;
            }
            catch (e) {
                user_id = "";
            }
            User.findById(user_id).exec(function (error, user) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        if (error) {
                            return [2 /*return*/, next(error)];
                        }
                        else {
                            if (user === null) {
                                return [2 /*return*/, res.render("form", {
                                        title: "Login",
                                        action: "/",
                                        fields: [
                                            {
                                                name: "logemail",
                                                prettyname: "Email",
                                                type: "text",
                                                property: "required",
                                                error: ""
                                            },
                                            {
                                                name: "logpassword",
                                                prettyname: "Password",
                                                type: "password",
                                                property: "required",
                                                error: ""
                                            }
                                        ]
                                    })];
                            }
                            else {
                                return [2 /*return*/, res.render("acceuil", {
                                        success: true,
                                        user: user,
                                        nbr_school: 0
                                    })];
                            }
                        }
                        return [2 /*return*/];
                    });
                });
            });
            return [2 /*return*/];
        });
    });
});
// ADD A USER IN THE DATABASE
router.post("/", function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var err, _a, errors, isValid, _b, errors_1, isValid, email, password, err;
        return __generator(this, function (_c) {
            if (req.body.password !== req.body.passwordConf) {
                err = new Error("Passwords do not match.");
                err.status = 400;
                res.send("passwords dont match");
                return [2 /*return*/, next(err)];
            }
            if (req.body.email &&
                req.body.username &&
                req.body.password &&
                req.body.passwordConf) {
                _a = validateRegisterInput(req.body), errors = _a.errors, isValid = _a.isValid;
                if (!isValid) {
                    return [2 /*return*/, res.status(400).json(errors)];
                }
                User.findOne({
                    email: req.body.email
                }).then(function (user) {
                    if (user) {
                        return res.status(400).json({
                            email: "Email already exists"
                        });
                    }
                    else {
                        var avatar = gravatar.url(req.body.email, {
                            s: "200",
                            r: "pg",
                            d: "mm"
                        });
                        var newUser = new User({
                            username: req.body.username,
                            email: req.body.email,
                            password: req.body.password,
                            status: req.body.status,
                            avatar: avatar
                        });
                        bcrypt.hash(newUser.password, 10, function (err, hash) {
                            if (err)
                                res.status(404).send("SALT error");
                            else {
                                newUser.password = hash;
                                req.session.user = newUser;
                                newUser.save().then(function (user) {
                                    res.status(200).render("acceuil", {
                                        success: true,
                                        user: newUser,
                                        nbr_school: 0
                                    });
                                });
                            }
                        });
                    }
                });
            }
            else if (req.body.logemail && req.body.logpassword) {
                _b = validateLoginInput(req.body), errors_1 = _b.errors, isValid = _b.isValid;
                if (!isValid) {
                    return [2 /*return*/, res.status(404).render("form", {
                            title: "Login",
                            action: "/",
                            fields: [
                                {
                                    name: "logemail",
                                    prettyname: "Email",
                                    type: "text",
                                    property: "required",
                                    error: errors_1.email
                                },
                                {
                                    name: "logpassword",
                                    prettyname: "Password",
                                    type: "password",
                                    property: "required",
                                    error: errors_1.password
                                }
                            ]
                        })];
                }
                email = req.body.logemail;
                password = req.body.logpassword;
                User.findOne({ email: email }).then(function (user) {
                    if (!user) {
                        errors_1.email = "User not found";
                        return res.status(404).render("form", {
                            title: "Login",
                            action: "/",
                            fields: [
                                {
                                    name: "logemail",
                                    prettyname: "Email",
                                    type: "text",
                                    property: "required",
                                    error: errors_1.email
                                },
                                {
                                    name: "logpassword",
                                    prettyname: "Password",
                                    type: "password",
                                    property: "required",
                                    error: ""
                                }
                            ]
                        });
                    }
                    bcrypt.compare(password, user.password).then(function (isMatch) {
                        if (isMatch) {
                            var payload = {
                                id: user._id,
                                username: user.username,
                                avatar: user.avatar,
                                status: user.status
                            };
                            req.session.user = user;
                            res.render("acceuil", {
                                success: true,
                                user: payload,
                                nbr_school: 0
                            });
                        }
                        else {
                            errors_1.password = "Incorrect Password";
                            return res.status(404).render("form", {
                                title: "Login",
                                action: "/",
                                fields: [
                                    {
                                        name: "logemail",
                                        prettyname: "Email",
                                        type: "text",
                                        property: "required",
                                        error: ""
                                    },
                                    {
                                        name: "logpassword",
                                        prettyname: "Password",
                                        type: "password",
                                        property: "required",
                                        error: errors_1.password
                                    }
                                ]
                            });
                        }
                    });
                });
            }
            else {
                err = new Error("All fields required.");
                err.status = 400;
                return [2 /*return*/, next(err)];
            }
            return [2 /*return*/];
        });
    });
});
// GET THE LOGOUT
router.get("/logout", function (req, res, next) {
    if (req.session) {
        req.session.destroy(function (err) {
            if (err) {
                return next(err);
            }
            else {
                return res.status(200).redirect("/");
            }
        });
    }
});
module.exports = router;
