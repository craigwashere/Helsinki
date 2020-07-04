import React from 'react'
import { useStateValue, setDiagnosisCodes, updatePatient } from "../state";
import { Icon, Item, Button } from 'semantic-ui-react';
import { useParams } from "react-router-dom";
import { Patient, Diagnosis, EntryType, 
	HospitalEntry, OccupationalHealthCareEntry, HealthCheckEntry } from "../types";
import axios from 'axios';
import { apiBaseUrl } from "../constants";
import EntryDetails from "./EntryDetails";

import AddDiagnosisModal from "../AddDiagnosisModal";
import { DiagnosisFormValues } from "../AddDiagnosisModal/AddDiagnosisForm";

const PatientPage: React.FC = () => {
	const patientStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}
	const { id } = useParams<{ id: string }>();
	const [{ patients }, dispatch] = useStateValue();
	const patient = patients[id];

	React.useEffect(() => {
		const fetchDiagnosisCodes = async () => {
			try {
				const { data: diagnosisCodesFromApi } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnosis`);
				setDiagnosisCodes(diagnosisCodesFromApi);
			} catch (e) {
				console.error(e);
			}
		};
		fetchDiagnosisCodes();
	}, [dispatch]);
	
	const [modalOpen, setModalOpen] = React.useState<boolean>(false);
	const [error, setError] = React.useState<string | undefined>();

	const openModal = (): void => setModalOpen(true);

	const closeModal = (): void => {
		setModalOpen(false);
		setError(undefined);
	};

	const submitNewDiagnosis = async (values: DiagnosisFormValues) => {
		try {
			var targetEntry = {  description: values.description,
				date: values.date,
				specialist: values.specialist,
				diagnosisCodes: (values.diagnosisCodes)? values.diagnosisCodes : [],
				type: values.type
			};

			var sourceEntry;
			switch(values.type) {
				case EntryType.Hospital: sourceEntry = {discharge: {date: (values as HospitalEntry).discharge.date, 
																	criteria: (values as HospitalEntry).discharge.criteria } };
										break;
				case EntryType.OccupationalHealthCare:  sourceEntry = {	employerName:	(values as OccupationalHealthCareEntry).employerName,
																		sickLeave:		(values as OccupationalHealthCareEntry).sickLeave};
																		break;
				case EntryType.HealthCheck:  sourceEntry = {healthCheckRating: 4-(values as HealthCheckEntry).healthCheckRating}; 
											break;
			  }

			Object.assign(targetEntry, sourceEntry)

			const { data: newEntry } = await axios.post<Patient>(`${apiBaseUrl}/patients/${id}/entries`, targetEntry);
			dispatch(updatePatient(id, newEntry));

			closeModal();

		} catch (e) {
			console.error(e.response.data);
			setError(e.response.data);
		}
	};

  	return (
		<div>
			<div style = {patientStyle} className='patient'>
				<div>
					<h2>{patient.name}
					{patient.gender === 'male' ? <Icon name = 'mars' /> : <Icon name = 'venus' />}</h2>
					<ul>
						<li>Date of Birth: {patient.dateOfBirth}</li>
						<li>SSN: {patient.ssn}</li>
						<li>Occupation: {patient.occupation}</li>
					</ul>
				</div>
				<hr />
				<Item.Group>
					{patient.entries.map(entry => <EntryDetails key={entry.id} entry={entry} />)}
				</Item.Group>
				<AddDiagnosisModal
					modalOpen={modalOpen}
					onSubmit={submitNewDiagnosis}
					error={error}
					onClose={closeModal}
				/>
				</div>
				<div>
					<Button onClick={() => openModal()}>Add Diagnosis</Button>
				</div>
		</div>
	)
}

export default PatientPage
