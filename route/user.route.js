const express = require("express");
const bcrypt = require("bcryptjs");
const userRoutes = express.Router();
let User = require("../model/auth.model");
const validateRegisterInput = require("../form_valid/register");

/* GET ALL USERS */

userRoutes.get("/", async function(req, res) {
    var user_id;
    var querie_2;
    var actual_user = { _id: "", status: "" };

    try {
        user_id = req.session.user._id;
        querie_2 = User.findById(user_id);
        actual_user = await querie_2.exec();
    } catch {
        user_id = "";
        actual_user._id = "";
        actual_user.status = "";
    }

    if (
        actual_user._id.toString() == user_id.toString() &&
        actual_user._id != "" &&
        actual_user.status == "admin"
    ) {
        User.find(function(err, user) {
            if (err) {
                res.status(404).send("Not found");
            } else {
                res.status(200).json(user);
            }
        });
    } else {
        res.status(400).send("Not connected");
    }
});

/* GET BY ADMIN */

userRoutes.get("/byadmin", async function(req, res) {
    var user_id;
    var querie_2;
    var actual_user = { _id: "", status: "" };

    try {
        user_id = req.session.user._id;
        querie_2 = User.findById(user_id);
        actual_user = await querie_2.exec();
    } catch {
        user_id = "";
        actual_user._id = "";
        actual_user.status = "";
    }

    if (
        actual_user._id.toString() == user_id.toString() &&
        actual_user._id != ""
    ) {
        let id = req.session.user._id;

        User.findById(id, function(err, user) {
            if (user.status == "admin") {
                User.find(function(err, users) {
                    if (err) {
                        res.status(404).send("Not found");
                    } else {
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
            } else {
                return res.status(404).send("Not Admin");
            }
        });
    } else {
        res.status(400).send("Not connected");
    }
});

/* FORM UPDATE USER */

userRoutes.get("/edit/:id", async function(req, res) {
    var user_id;
    var querie_2;
    var actual_user = { _id: "", status: "" };

    try {
        user_id = req.session.user._id;
        querie_2 = User.findById(user_id);
        actual_user = await querie_2.exec();
    } catch {
        user_id = "";
        actual_user._id = "";
        actual_user.status = "";
    }

    if (
        actual_user._id.toString() == user_id.toString() &&
        actual_user._id != ""
    ) {
        let id = req.params.id;

        User.findById(req.session.user._id, function(err, actual_user) {
            if (id == actual_user._id || actual_user.status == "admin") {
                User.findById(id, function(err, user) {
                    res.render("form", {
                        title: "Update user",
                        user: req.session.user,
                        action: "/user/update/" + id,
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
            } else {
                return res.status(404).send("You do not have the rights");
            }
        });
    } else {
        res.status(400).send("Not connected");
    }
});

/* GET USER BY NAME */

userRoutes.get("/name/:name", async function(req, res) {
    var user_id;
    var querie_2;
    var actual_user = { _id: "", status: "" };

    try {
        user_id = req.session.user._id;
    } catch (e) {
        user_id = "";
    }
    try {
        querie_2 = User.findById(user_id);
        actual_user = await querie_2.exec();
    } catch (e) {
        actual_user = { _id: "", status: "" };
    }

    if (
        actual_user._id.toString() == user_id.toString() &&
        actual_user._id != ""
    ) {
        let name = req.params.name;
        var user_search = [];

        try {
            const querie_1 = User.find().where("username", name);
            user_search = await querie_1.exec();
        } catch (e) {
            user_search = [];
        }

        (async function() {
            if (user_search.length == 0) {
                user_search[0] = { _id: "" };
            }
        })();

        if (
            actual_user._id.toString() == user_search[0]._id.toString() ||
            actual_user.status == "admin"
        ) {
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
        } else {
            res.status(404).send("No permissions");
        }
    } else {
        res.status(400).send("Not connected");
    }
});

/* UPDATE ONE USER */

userRoutes.post("/update/:id", async function(req, res) {
    var user_id;
    var querie_2;
    var actual_user = { _id: "", status: "" };

    try {
        user_id = req.session.user._id;
        querie_2 = User.findById(user_id);
        actual_user = await querie_2.exec();
    } catch {
        user_id = "";
        actual_user._id = "";
        actual_user.status = "";
    }

    if (
        actual_user._id.toString() == user_id.toString() &&
        actual_user._id != ""
    ) {
        User.findById(req.params.id, function(err, user) {
            if (!user) res.status(404).send("data is not found");
            else {
                const { errors, isValid } = validateRegisterInput(req.body);

                if (!isValid) {
                    return res.status(400).json(errors);
                }

                user.username = req.body.username;
                user.email = req.body.email;
                user.password = req.body.password;
                user.status = req.body.status;

                bcrypt.genSalt(10, (err, salt) => {
                    if (err) res.status(404).send("SALT error");
                    else {
                        bcrypt.hash(user.password, salt, (err, hash) => {
                            if (err) res.status(404).send("Hash error");
                            else {
                                user.password = hash;
                                user.save().then(user => {
                                    if (user.status == "user") {
                                        res.status(200).redirect(
                                            "/user/name/" + user.username
                                        );
                                    } else {
                                        res.status(200).redirect(
                                            "/user/byadmin"
                                        );
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    } else {
        res.status(400).send("Not connected");
    }
});

// DELETE ONE USER

userRoutes.route("/delete/:id").delete(async function(req, res) {
    var user_id;
    var querie_2;
    var actual_user = { _id: "", status: "" };

    try {
        user_id = req.session.user._id;
        querie_2 = User.findById(user_id);
        actual_user = await querie_2.exec();
    } catch {
        user_id = "";
        actual_user._id = "";
        actual_user.status = "";
    }

    if (
        actual_user._id.toString() == user_id.toString() &&
        actual_user._id != "" &&
        actual_user.status == "admin"
    ) {
        user.findByIdAndRemove({ _id: req.params.id }, function(err, user) {
            if (err) {
                res.status(404).json(err);
            } else {
                if (actual_user.status == "user") {
                    res.status(200).redirect(
                        "/actual_user/name/" + actual_user.username
                    );
                } else {
                    res.status(200).redirect("/user/byadmin");
                }
            }
        });
    } else {
        res.status(400).send("Not connected");
    }
});

module.exports = userRoutes;
