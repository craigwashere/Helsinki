import React from "react";
import { Item, Icon, List } from "semantic-ui-react";

import { HospitalEntry as Hospital } from "../types";

import DiagnosisList from "./DiagnosisList";

const HospitalEntry: React.FC<{ entry: Hospital }> = ({ entry }) => {
	return (
		<Item>
			<Item.Content>
				<Item.Header>{entry.date} <Icon color="red" name="hospital symbol" /></Item.Header>
				<Item.Meta>by {entry.specialist}</Item.Meta>
				<Item.Description>{entry.description}</Item.Description>
				<Item.Extra>
					{entry.diagnosisCodes && (<DiagnosisList diagnosesCodes={entry.diagnosisCodes} />)}
				</Item.Extra>
				<Item.Extra>
					<List>
						<List.Item>
							<List.Header>Discharged on {entry.discharge.date}</List.Header>
								{entry.discharge.criteria}
						</List.Item>
					</List>
				</Item.Extra>
			</Item.Content>
		</Item>
	);
};

export default HospitalEntry;