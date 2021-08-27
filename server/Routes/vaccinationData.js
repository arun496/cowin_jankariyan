const express = require("express");
const router = express.Router();
const VaccinationData = require("../Model/vaccinationDataSchema.js");

router.get("/:email", async (req, res) => {
    const { email } = req.params;
    console.log(email);
    try {
        // Get user's vaccination data
        let vaccinationDataResponse = await VaccinationData.findOne({ email: email })
        console.log(vaccinationDataResponse);
        return res.json({ data: vaccinationDataResponse });
    } catch(e) {
        return res.json({ msg: "Error in Vaccination Data Retrieval.." });
    }
})

module.exports = router;