import patientData from '../../data/patients'

import { NewPatientEntry, PatientEntry, patientDataWithoutSSN, Patient, Entry } from '../types';

let patients: Array<PatientEntry> = patientData;

import { v4 as uuid } from "uuid";

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
const findById = (id: any): Patient | undefined => {
	const patient = patients.find((p) => p.id === id);
	return patient;
  };

const getEntries = (): Array<PatientEntry> => {
	return patients;
};

const getEntriesWithoutSSN = (): patientDataWithoutSSN[] => {
	return patients.map(({id, name, dateOfBirth, gender, occupation, ssn, entries}) => ({
		id, name, dateOfBirth, gender, occupation, ssn, entries
	}));
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
	const newPatientEntry = {
		...entry,
		id: uuid()
	}

	patients.push(newPatientEntry)
	return newPatientEntry;
};

const addEntry = (patient: Patient, newEntry: Entry) => {
	const entry: Entry = { ...newEntry, id: uuid() };
	const savedPatient = { ...patient, entries: patient.entries.concat(entry) };
	patients = patients.map((p) => (p.id === savedPatient.id) ? savedPatient : p);
  
	return savedPatient;
}

export default {
	getEntries,
	addPatient,
	getEntriesWithoutSSN,
	findById,
	addEntry 
};