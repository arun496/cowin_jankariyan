require('dotenv').config()
const express = require("express");
const router = express.Router();
const { spawn } = require("child_process");
const cron = require("node-cron");
const nodemailer = require("nodemailer");

// Initialize nodemailer object for transport
let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_PASSWORD
    }
});


// Vaccination Data Schema
const VaccinationData = require("../Model/vaccinationDataSchema.js");
const { response } = require("express");

router.post("/vaccination/:email/:pincode", (req, res, next) => {
    const { email, pincode } = req.params;
    let process;

    // Schedule cron process for every 30 minutes
    cron.schedule("*/30 * * * *", () => {
        process = spawn("python", ["scrapVaccinationData.py", pincode]);
        process.stdout.on("data", async (data) => {
            // console.log(`stdout: ${data}`);
            let filter = { email: email };
            let newVaccinationDataUpdate = {
                email: email,
                vaccinationCentresData: JSON.parse(data)
            }
            try {
                let updatedVaccinationData = await VaccinationData.findOneAndUpdate(filter, newVaccinationDataUpdate, {
                    new: true,
                    upsert: true // Make this update into an upsert
                })
                // console.log(updatedVaccinationData.vaccinationCentresData);
                await validateAndSendEmails(updatedVaccinationData.vaccinationCentresData, email);
                res.setHeader("Content-Type", "application/json");
                res.json({ data: updatedVaccinationData, msg: "Scheduled Vaccination Data Cron" });
                res.end();
                next();
            } catch (err) {
                res.json({ msg: "Something went wrong.." });
                res.end();
            }
        });
    });

});

function validateAndSendEmails(updatedVaccinationData, userEmail) {
    return new Promise((resolve, reject) => {
        let { scrapedData } = updatedVaccinationData;
        if (!scrapedData) return;

        let vaccineSlotAvailable;
        for (let vaccineCentreObject of scrapedData) {
            let { dosage } = vaccineCentreObject;
            for (let dosageObject of dosage) {
                if (dosageObject) vaccineSlotAvailable = true;
                if (vaccineSlotAvailable) break;
            }
            if (vaccineSlotAvailable) break; // If slot available then, just break out and send email to user
        }

        console.log("Checking existence of slot", vaccineSlotAvailable);
        if (vaccineSlotAvailable) sendEmailOnVaccineUpdate(userEmail);
        resolve(vaccineSlotAvailable);
    })
}

function sendEmailOnVaccineUpdate(userEmail) {
    // Setting credentials for user
    let mailDetails = {
        from: "arun496.in@gmail.com",
        to: userEmail,
        subject: "Test mail using Cron job [Backend Scraping]",
        text: "Node.js cron job email testing [Backend Scraping]"
    };

    // Sending Email
    mailTransporter.sendMail(mailDetails, function (err, data) {
        if (err) {
            console.log("Error Occurs", err);
        } else {
            console.log("Email sent successfully");
        }
    });
    console.log("Mail sent!!");
}

module.exports = router;