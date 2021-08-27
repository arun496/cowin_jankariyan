const express = require("express");
const router = express.Router();
const { spawn } = require("child_process");

// Vaccination Data Schema
const VaccinationData = require("../Model/vaccinationDataSchema.js");

router.post("/:email/:pincode", async (req, res) => {
    const { email, pincode } = req.params;
    const process = spawn("python", ["scrapVaccinationData.py", pincode]);
    process.stdout.on("data", async (data) => {
        console.log(`stdout: ${data}`);
        res.setHeader("Content-Type", "application/json");
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
            return res.json({ data: updatedVaccinationData,msg: "Executed script success!!" });
        } catch (err) {
            return res.params.json({ msg: "Something went wrong.." });
        }
    });
    
});

module.exports = router;