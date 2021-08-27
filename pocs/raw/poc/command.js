const fs = require("fs");
const { spawn } = require("child_process");


const pincode = 600050;
const state = "Tamilnadu";
const city = "Chennai";

// const process = spawn("python", ["script.py", "pin", pincode]);
const process = spawn("python", ["script.py", state, city]);

process.stdout.on("data", data => {
    console.log(`stdout: ${data}`);
    // Writing json data
    fs.writeFileSync("jsondata.json", data);
});

process.stderr.on("data", data => {
    console.log(`stderr: ${data}`);
});

process.on('error', (error) => {
    console.log(`error: ${error.message}`);
});

process.on("close", code => {
    console.log(`child process exited with code ${code}`);
});



let IP = "223.228.156.114";
let fullConnectCode = `
    const { MongoClient } = require('mongodb');
    const uri = "mongodb+srv://arun496test:test496arun@dbtest.f3scq.mongodb.net/DBTest?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
    });
`
