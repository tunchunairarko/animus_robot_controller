const router = require("express").Router();
const auth = require("../middleware/auth");
const axios = require('axios');
const Prescription = require("../models/PrescriptionModel");
require("dotenv").config();




function dumpError(err) {
    if (typeof err === 'object') {
        if (err.message) {
            console.log('\nMessage: ' + err.message)
        }
        if (err.stack) {
            console.log('\nStacktrace:')
            console.log('====================')
            console.log(err.stack);
        }
    }
    else {
        console.log('dumpError :: argument is not an object');
    }
}
router.get("/prescription", auth, async (req, res) => {
    const prescriptions = await Prescription.find().sort({"updatedAt":-1});
    res.json(prescriptions);
  });
router.post("/prescription/new", auth, async (req, res) => {
    try {
        let { username, patientname, prescriptionMsg, prescriptionSchedule, prescriptionType,prescriptionPriority } = req.body;
        const newPrescription = new Prescription({
            username,
            patientname,
            prescriptionMsg,
            prescriptionSchedule,
            prescriptionType,
            prescriptionPriority
        });
        const savedPrescription = await newPrescription.save();
        const prescriptions = await Prescription.find().sort({"updatedAt":-1});

        res.json(prescriptions)



    } catch (err) {
        dumpError(err)
        res.status(500).json({ error: err.message });
    }
})


module.exports = router;