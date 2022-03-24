require('dotenv').config()
const express = require("express");
const path = require('path')
const cors = require("cors");
const app = express(); 

app.use(express.json());
app.use(cors());


// const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
//const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
//const serviceAccount = require('./path/to/serviceAccountKey.json');
// const db = initializeApp({
    //     credential: applicationDefault(),
    //     databaseURL: 'https://traviss-choice.firebaseio.com'
    // });

const { getLocations } = require('./controller.js')

// Serving up static public 

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

// Actual Endpoints

app.get("/locations/:zipCode/:limit", getLocations)



app.listen(process.env.SERVER_PORT, () => {
    console.log(`server running on port ${process.env.SERVER_PORT}`)
})