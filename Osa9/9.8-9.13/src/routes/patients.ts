import express from 'express';

import patientsService from '../services/patientsService';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientsService.getNonSensitivePatientRecords());
});

router.post('/', (req, res) => {
    try {
        const data = req.body;
        const newPatient = toNewPatient(data);

        patientsService.addPatient(newPatient);

        res.status(200).send('patient added!');
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

export default router;