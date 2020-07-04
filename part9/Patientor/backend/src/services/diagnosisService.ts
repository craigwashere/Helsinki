import diagnosisData from '../../data/diagnoses.json'

import { DiagnosisEntry } from '../types';

const diagnoses: Array<DiagnosisEntry> = diagnosisData;

const getEntries = (): Array<DiagnosisEntry> => {
console.log("diagnosis service getEntries")
  return diagnoses;
};

const addEntry = () => {
  return null;
};

export default {
  getEntries,
  addEntry
};