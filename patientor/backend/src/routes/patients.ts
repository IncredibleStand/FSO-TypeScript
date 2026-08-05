import { z } from 'zod';
import express from 'express';
import { NewPatientSchema } from '../types.ts';
import patientService from '../services/patientService.ts';

const router: express.Router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.post('/', (req, res) => {
  try {
    const newPatientData = NewPatientSchema.parse(req.body);

    const addedPatient = patientService.addPatient(newPatientData);

    res.json(addedPatient);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: 'Unknown error' });
    }
  }
});

export default router;
