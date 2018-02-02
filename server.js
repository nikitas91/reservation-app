/* jshint esversion: 6 */

//  Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

//  Set up the express app
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var restaurantTables = [
    {
        "customerName": "Nick",
        "phoneNumber": "5201234567",
        "customerEmail": "nick@example.com",
        "customerID": "nick"
    },
    {
        "customerName": "Nick",
        "phoneNumber": "5201234567",
        "customerEmail": "nick@example.com",
        "customerID": "nick"
    },
    {
        "customerName": "Nick",
        "phoneNumber": "5201234567",
        "customerEmail": "nick@example.com",
        "customerID": "nick"
    },
    {
        "customerName": "Nick",
        "phoneNumber": "5201234567",
        "customerEmail": "nick@example.com",
        "customerID": "nick"
    },
    {
        "customerName": "Nick",
        "phoneNumber": "5201234567",
        "customerEmail": "nick@example.com",
        "customerID": "nick"
    }
];
var tableLimit = 5;
var waitingList = [];


//  Routes
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/reserve", function (req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/tables", function (req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/api/tables", function (req, res) {
    return res.json(restaurantTables);
});

app.get("/api/waitlist", function (req, res) {
    return res.json(waitingList);
});

app.post("/api/new", function (req, res) {
    var newTable = req.body;

    if (restaurantTables.length >= tableLimit){
        waitingList.push(newTable);
        res.json("wait");
    }
    else{
        restaurantTables.push(newTable);
        res.json("reserve");
    }
});

app.post("/api/delete", function(req, res){
    restaurantTables = [];
    waitingList = [];
});

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});