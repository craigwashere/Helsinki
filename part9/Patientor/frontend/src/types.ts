export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface BaseEntry {
  id: string;
  date:               string;  
  description: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export interface HealthCheckEntry extends BaseEntry {
  type:               "HealthCheck";
  healthCheckRating:  HealthCheckRating;
}

type SickLeave = {
	startDate:	string;
	endDate:	  string;
}

export interface OccupationalHealthCareEntry extends BaseEntry {
	type:			    "OccupationalHealthcare";
	employerName:	string;
	description:	string;
	sickLeave?:		SickLeave;
}

type Discharge = {
	date:		  string;
	criteria: string;
}

export interface HospitalEntry extends BaseEntry {
	type:			    "Hospital";
  discharge:		Discharge;
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

export interface Patient {
	id:		string;
	name:		string;
	occupation:	string;
	gender:		Gender;
	ssn?:		string;
	dateOfBirth?:	string;
	entries:	Entry[];
}