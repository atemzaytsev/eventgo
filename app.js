var express = require("express"),
    app = express(),
    expressSanitizer = require("express-sanitizer"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    methodOverride = require("method-override");

/*
==========================
App config
==========================
*/   
mongoose.connect("mongodb://eventgo:eventgo123@ds147390.mlab.com:47390/eventgo");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

/*
==========================
Mongoose/model config
==========================
*/
var eventSchema = new mongoose.Schema({
    title: String,
    body: String,
    organiser: String,
    place: String,
    start: String,
    finish: String,
    image: String,
    category: String
});
var Event = mongoose.model("Event", eventSchema);

/*
==========================
Routes
==========================
*/

//Home
app.get("/", function (req, res) {
    res.render("home");
});

//INDEX
app.get("/events", function (req, res) {
    Event.find({}, function (err, event) {
        if (err) {
            console.log(err)
        } else {
            res.render("index", {
                event: event
            });
        }
    })
});

//NEW
app.get("/events/new", function (req, res) {
    res.render("new");
});

//CREATE
app.post("/events", function (req, res) {
    //create event
    req.body.event.body = req.sanitize(req.body.event.body);
    Event.create(req.body.event, function (err, newEvent) {
        if (err) {
            res.render("new")
        } else {
            //redirect
            res.redirect("/events")
        }
    })
})

//SHOW 
app.get("/events/:id", function (req, res) {
    Event.findById(req.params.id, function (err, foundEvent) {
        if (err) {
            res.redirect("/events");
        } else {
            //render show template
            res.render("show", {
                event: foundEvent
            });
        }
    });
});

//EDITE 
app.get("/events/:id/edit", function (req, res) {
    Event.findById(req.params.id, function (err, foundEvent) {
        if (err) {
            res.redirect("/events");
        } else {
            //render show template
            res.render("edit", {
                event: foundEvent
            });
        }
    });
});
//UPDATE 
app.put("/events/:id", function (req, res) {
    req.body.event.body = req.sanitize(req.body.event.body);
    Event.findByIdAndUpdate(req.params.id, req.body.event, function (err, updatedEvent) {
        if (err) {
            res.redirect("/events");
        } else {
            res.redirect("/events/" + req.params.id)
        }
    });
});

//DESTROY 
app.delete("/events/:id", function (req, res) {
    Event.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.redirect("/events");
        } else {
            res.redirect("/events");
        }
    });
});


app.listen(process.env.PORT, process.env.IP, function () {
    console.log("the server has started");
});