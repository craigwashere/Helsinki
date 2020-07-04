export enum Gender {
	Male	= 'male',
	Female	= 'female',
	Other	= 'other'
}

export interface DiagnosisEntry {
	code:	string;
	name:	string;
	latin?:	string;
} 

export interface PatientEntry {
	id: 			string;
	name:			string;
	dateOfBirth:	string;
	ssn:			string;
	gender:			Gender;
	occupation:		string;
	entries: Entry[]
}

export type patientDataWithoutSSN = Omit <PatientEntry, 'ssn'>;

export type NewPatientEntry = Omit<PatientEntry, 'id'>;

export interface Patient {
	id:				string;
	name:			string;
	ssn:			string;
	occupation:		string;
	gender:			Gender;
	dateOfBirth:	string;
	entries:		Entry[]
}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries' >

export enum HealthCheckRating {
	"Healthy" = 0,
	"LowRisk" = 1,
	"HighRisk" = 2,
	"CriticalRisk" = 3
  }

  interface BaseEntry {
	id: string;
	description: string;
	date: string;
	specialist: string;
	diagnosisCodes?: Array<DiagnosisEntry['code']>;
  }
  
  export interface HealthCheckEntry extends BaseEntry {
	type: "HealthCheck";
	healthCheckRating: HealthCheckRating;
  }
  
  export type SickLeave = {
	  startDate:	string;
	  endDate:		string;
  }
  
  export interface OccupationalHealthCareEntry extends BaseEntry {
	  type:			"OccupationalHealthcare";
	  employerName:	string;
	  description:	string;
	  sickLeave?:	SickLeave;
  }
  
  export type Discharge = {
	  date:		string;
	  criteria:	string;
  }
  
  export interface HospitalEntry extends BaseEntry {
	  type:		"Hospital";
	  discharge:	Discharge;
  }
  
  export type Entry =
	| HospitalEntry
	| OccupationalHealthCareEntry
	| HealthCheckEntry;
  
  export enum EntryType {
	  HealthCheck = "HealthCheck",
	  OccupationalHealthCare = "OccupationalHealthcare",
	  Hospital = "Hospital",
  }

  export type NewEntry = Omit<Entry, 'id'>;