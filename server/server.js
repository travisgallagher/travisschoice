require('dotenv').config()
const express = require("express");
const path = require('path')
const cors = require("cors");
const app = express(); 

app.use(express.json());
app.use(cors());


const { getLocations, saveChoices, getChoices, deleteChoice } = require('./controller.js')

// Static Endpoints

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public"))
}); 

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"))
})

app.get("/js", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/main.js"))
})

app.get("/styles", function(req, res) {
    res.sendFile(path.join(path.join(__dirname, "../public/index.css")))
}) 

app.get("/login", function(req, res) {
    res.sendFile(path.join(path.join(__dirname, "../public/login.html")))
})

app.get("/signup", function(req, res) {
    res.sendFile(path.join(path.join(__dirname, "../public/signup.html")))
})

app.get("/contact", function(req, res) {
    res.sendFile(path.join(path.join(__dirname, "../public/contact.html")))
})

// Actual Endpoints

app.get("/choices", getChoices)
app.delete("/choices/:id", deleteChoice)
app.post("/choices", saveChoices)
app.get("/locations/:zipCode/:limit", getLocations)

const port = process.env.PORT || 4004; 

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
}); 