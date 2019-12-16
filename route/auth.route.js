const validateRegisterInput = require("../form_valid/register");
const validateLoginInput = require("../form_valid/login");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
var express = require("express");
var router = express.Router();
var User = require("../model/auth.model.js");
var school = require("../model/school.model.js");

router.get("/", async function(req, res) {
    var isuser = "";
    try {
        isuser = req.session.user._id;
    } catch {
        console.log("error");
    }

    if (isuser !== "" && isuser !== undefined) {
        User.findById(isuser).exec(function(error, user) {
            if (error) {
                return next(error);
            } else {
                if (user === null) {
                    res.render("form", {
                        title: "Login",
                        action: "/",
                        fields: [
                            {
                                name: "logemail",
                                type: "text",
                                property: "required",
                                error: ""
                            },
                            {
                                name: "logpassword",
                                type: "password",
                                property: "required",
                                error: ""
                            }
                        ]
                    });
                } else {
                    res.render("acceuil", {
                        success: true,
                        user: req.session.user,
                        nbr_school: 0
                    });
                }
            }
        });
    } else {
        res.render("form", {
            title: "Login",
            action: "/",
            fields: [
                {
                    name: "logemail",
                    type: "text",
                    property: "required",
                    error: ""
                },
                {
                    name: "logpassword",
                    type: "password",
                    property: "required",
                    error: ""
                }
            ]
        });
    }
});

router.get("/register", async function(req, res) {
    var isuser = "";
    try {
        isuser = req.session.user._id;
    } catch {
        console.log("error");
    }

    if (isuser !== "") {
        User.findById(isuser).exec(function(error, user) {
            if (error) {
                return next(error);
            } else {
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
                } else {
                    res.render("acceuil", {
                        success: true,
                        user: req.session.user,
                        nbr_school: 0
                    });
                }
            }
        });
    } else {
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
});

// GET THE MENU OF THE APPLICATION

router.get("/menu", async function(req, res) {
    var user_id;

    try {
        user_id = req.session.user._id;
    } catch {
        user_id = null;
    }

    User.findById(user_id).exec(async function(error, user) {
        if (error) {
            return next(error);
        } else {
            if (user === null) {
                return res.render("form", {
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
            } else {
                querie_2 = school.find().where("user_id", user_id);
                nbr_school_user = await querie_2.exec();

                return res.render("acceuil", {
                    success: true,
                    user: user,
                    nbr_school: 0
                });
            }
        }
    });
});

// ADD A USER IN THE DATABASE

router.post("/", async function(req, res, next) {
    if (req.body.password !== req.body.passwordConf) {
        var err = new Error("Passwords do not match.");
        err.status = 400;
        res.send("passwords dont match");
        return next(err);
    }

    if (
        req.body.email &&
        req.body.username &&
        req.body.password &&
        req.body.passwordConf
    ) {
        const { errors, isValid } = validateRegisterInput(req.body);

        if (!isValid) {
            return res.status(400).json(errors);
        }

        User.findOne({
            email: req.body.email
        }).then(user => {
            if (user) {
                return res.status(400).json({
                    email: "Email already exists"
                });
            } else {
                const avatar = gravatar.url(req.body.email, {
                    s: "200",
                    r: "pg",
                    d: "mm"
                });

                var newUser = new User({
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    status: req.body.status,
                    avatar
                });

                bcrypt.hash(newUser.password, 10, (err, hash) => {
                    if (err) res.status(404).send("SALT error");
                    else {
                        newUser.password = hash;
                        req.session.user = newUser;

                        newUser.save().then(user => {
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
    } else if (req.body.logemail && req.body.logpassword) {
        const { errors, isValid } = validateLoginInput(req.body);

        if (!isValid) {
            return res.status(404).render("form", {
                title: "Login",
                action: "/",
                fields: [
                    {
                        name: "logemail",
                        prettyname: "Email",
                        type: "text",
                        property: "required",
                        error: errors.email
                    },
                    {
                        name: "logpassword",
                        prettyname: "Password",
                        type: "password",
                        property: "required",
                        error: errors.password
                    }
                ]
            });
        }

        var email = req.body.logemail;
        var password = req.body.logpassword;

        User.findOne({ email }).then(user => {
            if (!user) {
                errors.email = "User not found";
                return res.status(404).render("form", {
                    title: "Login",
                    action: "/",
                    fields: [
                        {
                            name: "logemail",
                            prettyname: "Email",
                            type: "text",
                            property: "required",
                            error: errors.email
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

            bcrypt.compare(password, user.password).then(isMatch => {
                if (isMatch) {
                    const payload = {
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
                } else {
                    errors.password = "Incorrect Password";
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
                                error: errors.password
                            }
                        ]
                    });
                }
            });
        });
    } else {
        var err = new Error("All fields required.");
        err.status = 400;
        return next(err);
    }
});

// GET THE LOGOUT

router.get("/logout", function(req, res, next) {
    if (req.session) {
        req.session.destroy(function(err) {
            if (err) {
                return next(err);
            } else {
                return res.status(200).redirect("/");
            }
        });
    }
});

module.exports = router;
