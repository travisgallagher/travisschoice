require('dotenv').config()
const express = require("express");
const cors = require("cors");
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
//const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
//const serviceAccount = require('./path/to/serviceAccountKey.json');
const { getLocations } = require('./controller.js')



// const db = initializeApp({
//     credential: applicationDefault(),
//     databaseURL: 'https://traviss-choice.firebaseio.com'
// });

const app = express(); 

app.use(express.json());
app.use(cors());

app.get(`/locations/:zipcode/:limit`, getLocations)




const SERVER_PORT = 4004; 
// app.listen(SERVER_PORT, () => {
//     console.log(`Server is running on ${SERVER_PORT}`);
// }); 

app.listen(process.env.SERVER_PORT, () => {
    console.log(`server running on port ${process.env.SERVER_PORT}`)
})