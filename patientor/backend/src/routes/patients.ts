import express from 'express';
import patientService from '../services/patientService.ts';
import { parseNewPatient } from '../utils.ts';

const router: express.Router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.post('/', (req, res) => {
  try {
    // Extract the data from the request body
    const newPatientData = parseNewPatient(req.body);

    const addedPatient = patientService.addPatient(newPatientData);

    // Return the newly created patient back to the frontend
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
