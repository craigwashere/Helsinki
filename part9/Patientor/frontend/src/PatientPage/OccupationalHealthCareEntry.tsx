import React from "react";
import { Item, Icon, List } from "semantic-ui-react";

import { OccupationalHealthCareEntry as OccupationalHealthCare } from "../types";

import DiagnosisList from "./DiagnosisList";

const OccupationalHealthCareEntry: React.FC<{entry: OccupationalHealthCare;}> = ({ entry }) => {
	return (
		<Item>
			<Item.Content>
				<Item.Header>{entry.date} <Icon color="purple" name="cog" /></Item.Header>
				<Item.Meta>by {entry.specialist}</Item.Meta>
				<Item.Description>{entry.description}</Item.Description>
				<List>
					<List.Item><strong>Employer:</strong> {entry.employerName}</List.Item>
					{entry.sickLeave && (
						<List.Item>
							<strong>Sick Leave:</strong> {entry.sickLeave.startDate} to{" "} {entry.sickLeave.endDate}
						</List.Item>
					)}
				</List>
				<Item.Extra>
					{entry.diagnosisCodes && (<DiagnosisList diagnosesCodes={entry.diagnosisCodes} />)}
				</Item.Extra>
			</Item.Content>
		</Item>
	);
};

export default OccupationalHealthCareEntry;
