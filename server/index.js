const express = require('express');
const bodyParser = require('body-parser');
const setUpMongoDBServer = require("./db.js");
const userAuthRoute = require("./Routes/userAuth.js");
const getVaccinationDataRoute = require("./Routes/vaccinationData.js");
const postVaccinationDataRoute = require("./Routes/scrapAndUpdateVaccinationData.js");
const scheduleVaccinationDataRoute = require("./Routes/scheduleVaccinationData.js");

// Setting up Mongo DB server
setUpMongoDBServer();

const app = express();
const port = process.env.PORT || 5000;

// app.use(express.urlencoded({
//     extended: true
// }));
app.use(express.json());


// Middleware for user auth [Login and Signup]
app.use("/user", userAuthRoute);

app.use("/vaccination/data", getVaccinationDataRoute);

app.use("/update", postVaccinationDataRoute);

app.use("/schedule", scheduleVaccinationDataRoute);

app.get("/", (req, res) => {
    return res.json({ msg: "Hello Express!!" })
})

app.listen(port, () => console.log(`Listening on port ${port}`));
