// school.route.js

import * as express from "express";
const schoolRoutes = express.Router();
let school = require("../model/school.model");
let User = require("../model/auth.model");

// GET FORM SCHOOL TO ADD ONE

schoolRoutes.get("/form", async function(req:any, res:any) {
    var user_id;
    var querie_2;
    var actual_user = { _id: "", status: "" };

    try{
        user_id = req.session.user._id;
        querie_2 = User.findById(user_id);
        actual_user = await querie_2.exec();
    }catch(e){
        user_id = "";
        actual_user._id = "";
        actual_user.status = "";
    }

    var JSONCountry = require("../model/states.json");

    JSONCountry = JSONCountry.map(function(state:any) {
        return state.name.toUpperCase();
    });

    if (
        actual_user._id.toString() == user_id.toString() &&
        actual_user._id != ""
    ) {
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
    } else {
        res.status(400).send("Not connected");
    }
});

// GET CHART FROM ALL SCHOOLS

schoolRoutes.get("/chart/all", async function(req:any, res:any) {
    var user_id;
    var querie_2;
    var actual_user = { _id: "", status: "" };

    try{
        user_id = req.session.user._id;
        querie_2 = User.findById(user_id);
        actual_user = await querie_2.exec();
    }catch(e){
        user_id = "";
        actual_user._id = "";
        actual_user.status = "";
    }

    if (
        actual_user._id.toString() == user_id.toString() &&
        actual_user.status == "admin" &&
        actual_user._id != ""
    ) {
        school.find(function(err:any, school:any) {
            if (err) {
                res.status(404).send("Not found");
            } else {
                var data_grade = [];
                var data_age = [];
                var data_set = [];
                var names = [];

                const propComparator = (propName:any) => (a:any, b:any) =>
                    a[propName] == b[propName]
                        ? 0
                        : a[propName] < b[propName]
                        ? -1
                        : 1;

                school = school.sort(
                    propComparator("age"),
                    propComparator("grade")
                );

                for (let index = 0; index < school.length; index++) {
                    if (school[index].age === undefined) {
                        data_age.push(0);
                    } else {
                        data_age.push(school[index].age);
                    }

                    if (school[index].grade === undefined) {
                        data_grade.push(0);
                    } else {
                        data_grade.push(school[index].grade);
                    }

                    const data_full = [];

                    for (let i = 0; i < school.length; i++) {
                        if (i >= index) {
                            data_full.push(school[index].grade);
                        } else {
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
    } else {
        res.status(400).send("Not connected or not admin");
    }
});

// GET CHART BY CURRENT USER

schoolRoutes.get("/chart/byuser", async function(req:any, res:any) {
    var user_id;
    var querie_2;
    var actual_user = { _id: "", status: "" };

    try{
        user_id = req.session.user._id;
        querie_2 = User.findById(user_id);
        actual_user = await querie_2.exec();
    }catch(e){
        user_id = "";
        actual_user._id = "";
        actual_user.status = "";
    }

    if (
        actual_user._id.toString() == user_id.toString() &&
        actual_user._id != ""
    ) {
        school
            .find()
            .where("user_id", user_id)
            .exec(function(err:any, school:any) {
                if (err) {
                    res.status(404).send("Not found");
                } else {
                    var data_grade = [];
                    var data_age = [];
                    var data_set = [];
                    var names = [];

                    const propComparator = (propName:any) => (a:any, b:any) =>
                        a[propName] == b[propName]
                            ? 0
                            : a[propName] < b[propName]
                            ? -1
                            : 1;

                    school = school.sort(
                        propComparator("age"),
                        propComparator("grade")
                    );

                    for (let index = 0; index < school.length; index++) {
                        if (school[index].age === undefined) {
                            data_age.push(0);
                        } else {
                            data_age.push(school[index].age);
                        }

                        if (school[index].grade === undefined) {
                            data_grade.push(0);
                        } else {
                            data_grade.push(school[index].grade);
                        }

                        const data_full = [];

                        for (let i = 0; i < school.length; i++) {
                            if (i >= index) {
                                data_full.push(school[index].grade);
                            } else {
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
    } else {
        res.status(400).send("Not connected or not admin");
    }
});

// GET TABLE OF SCHOOL BY CURRENT USER

schoolRoutes.get("/byuser", async function(req:any, res:any) {
    var user_id;
    var querie_2;
    var actual_user = { _id: "", status: "" };

    try{
        user_id = req.session.user._id;
        querie_2 = User.findById(user_id);
        actual_user = await querie_2.exec();
    }catch(e){
        user_id = "";
        actual_user._id = "";
        actual_user.status = "";
    }

    if (
        actual_user._id.toString() == user_id.toString() &&
        actual_user._id != ""
    ) {
        school
            .find()
            .where("user_id", user_id)
            .exec(function(err:any, school:any) {
                if (!school) res.status(404).send("data is not found");

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
    } else {
        res.status(400).send("Not connected");
    }
});

// ADD SCHOOL TO THE DATABASE
schoolRoutes.post("/add", async function(req:any, res:any) {
    var user_id;
    var querie_2;
    var actual_user = { _id: "", status: "" };

    try{
        user_id = req.session.user._id;
        querie_2 = User.findById(user_id);
        actual_user = await querie_2.exec();
    }catch(e){
        user_id = "";
        actual_user._id = "";
        actual_user.status = "";
    }

    if (
        actual_user._id.toString() == user_id.toString() &&
        actual_user._id != ""
    ) {
        var school_add = new school(req.body);
        school_add.user_id = user_id;

        school_add
            .save()
            .then((school:any) => {
                res.status(200).redirect("/school/byuser");
            })
            .catch((err:any) => {
                res.status(400).send("unable to save to database");
            });
    } else {
        res.status(400).send("Not connected");
    }
});

schoolRoutes.get("/byadmin", async function(req:any, res:any) {
    var user_id;
    var querie_2;
    var actual_user = { _id: "", status: "" };

    try{
        user_id = req.session.user._id;
        querie_2 = User.findById(user_id);
        actual_user = await querie_2.exec();
    }catch(e){
        user_id = "";
        actual_user._id = "";
        actual_user.status = "";
    }

    if (
        actual_user._id.toString() == user_id.toString() &&
        actual_user.status == "admin" &&
        actual_user._id != ""
    ) {
        let id = user_id;

        User.findById(id, function(err:any, user:any) {
            if (user.status == "admin") {
                school.find(function(err:any, school:any) {
                    if (err) {
                        res.status(404).send("Data not found");
                    } else {
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
            } else {
                res.status(400).send("You're not admin");
            }
        });
    } else {
        res.status(400).send("Not connected");
    }
});

// UPDATE ONE SCHOOL IN THE FORM
schoolRoutes.get("/edit/:id", async function(req:any, res:any) {
    var user_id;
    var querie_2;
    var actual_user = { _id: "", status: "" };

    try{
        user_id = req.session.user._id;
        querie_2 = User.findById(user_id);
        actual_user = await querie_2.exec();
    }catch(e){
        user_id = "";
        actual_user._id = "";
        actual_user.status = "";
    }

    var JSONCountry = require("../model/states.json");

    JSONCountry = JSONCountry.map(function(state:any) {
        return state.name.toUpperCase();
    });

    if (
        actual_user._id.toString() == user_id.toString() &&
        actual_user._id != ""
    ) {
        let id = req.params.id;
        school.findById(id, function(err:any, school:any) {
            res.status(200).render("form", {
                title: "Update school",
                action: "/school/update/" + id,
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
    } else {
        res.status(400).send("Not connected or not admin");
    }
});

// UPDATE THE SCHOOL IN THE DATABASE
schoolRoutes.post("/update/:id", async function(req:any, res:any) {
    var user_id;
    var querie_2;
    var actual_user = { _id: "", status: "" };

    try{
        user_id = req.session.user._id;
        querie_2 = User.findById(user_id);
        actual_user = await querie_2.exec();
    }catch(e){
        user_id = "";
        actual_user._id = "";
        actual_user.status = "";
    }

    if (
        actual_user._id.toString() == user_id.toString() &&
        actual_user._id != ""
    ) {
        school.findById(req.params.id, function(err:any, school:any) {
            if (!school) res.status(404).send("data is not found");
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
                    .then((school:any) => {
                        res.status(200).redirect("/school/byuser");
                    })
                    .catch((err:any) => {
                        res.status(400).send("unable to update the database");
                    });
            }
        });
    } else {
        res.status(400).send("Not connected");
    }
});

// DELETE A SCHOOL FROM DATABASE
schoolRoutes.route("/delete/:id").delete(async function(req:any, res:any) {
    var user_id;
    var querie_2;
    var actual_user = { _id: "", status: "" };

    try{
        user_id = req.session.user._id;
        querie_2 = User.findById(user_id);
        actual_user = await querie_2.exec();
    }catch(e){
        user_id = "";
        actual_user._id = "";
        actual_user.status = "";
    }

    if (
        actual_user._id.toString() == user_id.toString() &&
        actual_user._id != ""
    ) {
        school.findByIdAndRemove({ _id: req.params.id }, async function(
            err:any,
            school:any
        ) {
            if (err) {
                res.status(404).json(err);
            } else {
                res.status(200).redirect("/school/byuser");
            }
        });
    } else {
        res.status(400).send("Not connected");
    }
});

module.exports = schoolRoutes;
