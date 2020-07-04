import { Gender, Entry, EntryType, Patient} from './types';

const isDate = (date: string): boolean => {
	return Boolean(Date.parse(date));
};

const isArrayOfEntries = (param: any[]): param is Entry[] => {
	const hasInvalidEntry = param.some((entry) => {
		return !Object.values(EntryType).includes(entry.type);
	});

	return !hasInvalidEntry;
};

const isString = (text: any): text is string => {
	return ((typeof text === 'string') || (text instanceof String));
};

const parseDate = (date: any): string => {
	if (!date || !isString(date) || !isDate(date)) {
		throw new Error('Incorrect or missing date: ' + date);
	}
	return date;
};

const parseID = (ID: any): string => {
	if (!ID || !isString(ID)) {
		throw new Error('Incorrect or missing name: ' + ID);
	}

	return ID;
}

const parseName = (name: any): string => {
	if (!name || !isString(name)) {
		throw new Error('Incorrect or missing name: ' + name);
	}

	return name;
}

const parseSSN = (SSN: any): string => {
	if (!SSN || !isString(SSN)) {
		throw new Error('Incorrect or missing name: ' + SSN);
	}

	return SSN;
}

const parseOccupation = (occupation: any): string => {
	if (!occupation || !isString(occupation)) {
		throw new Error('Incorrect or missing occupation: ' + occupation);
	}

	return occupation;
}

const isGender = (param: any): param is Gender => {
	return Object.values(Gender).includes(param);
};

const parseGender = (gender: any): Gender => {
	if (!gender || !isGender(gender)) {
		throw new Error('Incorrect or missing gender: ' + gender);
	}
	return gender;
};

const parseEntries = (entries: any): Entry[] => {
	if (!entries || !Array.isArray(entries) || !isArrayOfEntries(entries)) {
		throw new Error(`Incorrect or missing entries: ${JSON.stringify(entries)}`);
	}
	return entries;
};

export const toPatient = (object: any): Patient => {
	return {
		name: 		parseName(object.name),
		occupation:	parseOccupation(object.occupation),
		gender:		parseGender(object.gender),
		ssn:		parseSSN(object.ssn),
		dateOfBirth:	parseDate(object.dateOfBirth),
		id:		parseID(object.id),
		entries:	parseEntries(object.entries),
  };
};

/**
 * Helper function for exhaustive type checking
 */
export const assertNever = (value: any): never => {
	throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

export default toPatient;