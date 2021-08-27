const mongoose = require("mongoose");


// Create Vaccination Data schema to set up in DB
// Split Schema for easy go through and arrangement
const dosagedata = mongoose.Schema(
    {
        d1: {
            type: Boolean,
        },
        d2: {
            type: Boolean
        }
    }
)
const vaccinedata = mongoose.Schema(
    {
        nameHeader: {
            type: String,
        },
        localityAddress: {
            type: String,
        },
        dosage: [dosagedata]
    }
)
const vaccinationDataSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    vaccinationCentresData: {
        dates: [String],
        scrapedData: [
            vaccinedata
        ]
    }
});

let VaccinationData = mongoose.model("vaccinationData", vaccinationDataSchema);
module.exports = VaccinationData;