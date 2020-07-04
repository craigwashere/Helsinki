import { Gender, NewPatientEntry, EntryType,
	HealthCheckRating, NewEntry, Discharge, SickLeave } from './types';

export const parseFromString = (param: any, paramName: string): string => {
	// console.log("parseFromString", paramName)
	if (!param || !isString(param)) {
		throw new Error(`Incorrect or missing ${paramName}: ${param || ""}`);
	}
	return param;
};

const isDate = (date: string): boolean => {
	return Boolean(Date.parse(date));
};

const parseDate = (date: any): string => {
	if (!date || !isString(date) || !isDate(date)) {
		throw new Error('Incorrect or missing date: ' + date);
	}
	// console.log("parseDate")
	return date;
};

const isString = (text: any): text is string => {
	return ((typeof text === 'string') || (text instanceof String));
};

const isGender = (param: any): param is Gender => {
	return Object.values(Gender).includes(param);
};

const parseGender = (gender: any): Gender => {
	if (!gender || !isGender(gender)) {
		throw new Error('Incorrect or missing gender: ' + gender);
	}
	return gender;
};

const toNewPatientEntry = (object: any): NewPatientEntry => {
	return {
		dateOfBirth:	parseDate(object.dateOfBirth),
		name: 			parseFromString(object.namen, "Name"),
		gender:			parseGender(object.gender),
		occupation:		parseFromString(object.occupation, "Occupation"),
		entries:		[],
		ssn:			parseFromString(object.ssn, "SSN")
	}
}

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
	return (param <= Object.keys(HealthCheckRating).length)
}
const parseHealthCheckRating = (healthCheckRating: any): HealthCheckRating => {
	if((!healthCheckRating) || !isHealthCheckRating(healthCheckRating))
		throw new Error ('Incorrect or missing HealthCheck Rating: ' + healthCheckRating)
	return healthCheckRating;
}

const isEntryType = (param: any): param is EntryType => {
	return Object.values(EntryType).includes(param);
};

const parseType = (entryType: any): EntryType => {
	// console.log("entry type:", entryType)
	if (!entryType || !isEntryType(entryType)) {
		throw new Error('Incorrect or missing entry type: ' + entryType);
	}
	return entryType;
};

const parseDischarge = (discharge: Discharge): Discharge => {
	if ((!discharge) || (parseFromString(discharge.date, "Date")) || (parseFromString(discharge.criteria, "Criteria"))) {
		throw new Error('Incorrect or missing entry type: ' + discharge);
	}
	return discharge;
}

const parseSickLeave = (sickLeave: SickLeave): SickLeave => {
	//console.log("sickleave:", sickLeave);
	if ((parseFromString(sickLeave.startDate, "Start Date")) || (parseFromString(sickLeave.endDate, "End Date"))) {
		throw new Error('Incorrect or missing entry type: ' + sickLeave);
	}
	return sickLeave;
}

export const toNewEntry = (object: any): NewEntry => {
	// console.log("object:", object)
	const newEntry = {
		type:			parseType(object.type),
		description:	parseFromString(object.description, "Description"),
		date: 			parseDate(object.date),
		specialist:		parseFromString(object.specialist, "Specialist"),
	}
	switch (object.type) {
		case EntryType.HealthCheck:				const newHealthCheckEntry = {...newEntry,
													healthCheckRating:	parseHealthCheckRating(object.healthCheckRating)
												}
												return newHealthCheckEntry;
		case EntryType.OccupationalHealthCare:	const newOccupationalHealthcareEntry = {...newEntry,
														employerName:	parseFromString(object.employerName, "Employer Name"),
														sickLeave:		parseSickLeave(object.sickLeave)
												}
												return newOccupationalHealthcareEntry;
		case EntryType.Hospital:				const newHospitalEntry = {...newEntry,
													discharge:		parseDischarge(object.discharge)
												};
												return newHospitalEntry;
	}

	return  newEntry;
}
export default toNewPatientEntry;