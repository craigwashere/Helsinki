/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry, {toNewEntry} from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
	res.send(patientService.getEntriesWithoutSSN());
})

router.get('/api/patients/:id', async (request, response) => {
console.log("get /patients/:id");
    const patient = patientService.findById(request.params.id)
    if (patient) {
        response.json(patient)
    } else {
        response.status(404).end()
    }
})

router.post('/', (_req, res) => {
	try {
		const newPatientEntry = toNewPatientEntry(_req.body);
		const addedPatient = patientService.addPatient(newPatientEntry);
		res.json(addedPatient)
	} catch (e) {
		res.status(400).send(e.message);
	}
})

router.post('/:id/entries', (request, response) => {
	const patient = patientService.findById(request.params.id);
	if (patient)
	console.log("patient", patient?.name)
		try {
			const newEntry = toNewEntry(request.body);
			console.log("newEntry", newEntry)
			const updatedPatient = patientService.addEntry(patient, newEntry);
			console.log("updatedPatient", updatedPatient.entries)
			response.json(updatedPatient)
		} catch (e) {
			console.log("e:", e.message)
			response.statusMessage = e.message;
			response.status(500).send(e.message);
		}
})
export default router;