const cron = require("node-cron");
const express = require("express");
const fs = require("fs");
const nodemailer = require("nodemailer");

// app = express();

// Initialize nodemailer object for transport
let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "/my email",
        pass: "/my password"
    }
});

// Setting credentials
let mailDetails = {
    from: "/my email",
    to: "/to person email",
    subject: "Test mail using Cron job",
    text: "Node.js cron job email testing"
};


// Cron job for every 30 minutes
// Setting a cron job
cron.schedule("*/10 * * * * *", () => {
    // Data to print
    // let data = `${new Date().toUTCString()} : Server is working\n`;

    // Sending Email
    mailTransporter.sendMail(mailDetails,
        function (err, data) {
            if (err) {
                console.log("Error Occurs", err);
            } else {
                console.log("Email sent successfully");
            }
        });
});

// app.listen(3000);