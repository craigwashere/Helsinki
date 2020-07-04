import React from "react";
import { Item, Icon } from "semantic-ui-react";

import { HealthCheckEntry as HealthCheck } from "../types";

import HealthRatingBar from "../components/HealthRatingBar";
//import DiagnosisList from "./DiagnosisList";
//				{entry.diagnosisCodes && ( <DiagnosisList diagnosesCodes={entry.diagnosisCodes} />)}

const HealthCheckEntry: React.FC<{ entry: HealthCheck }> = ({ entry }) => {
	return (
		<Item>
			<Item.Content>
				<Item.Header as='a'>{entry.date} <Icon color="orange" name="stethoscope" /></Item.Header>
				<Item.Meta>by {entry.specialist}</Item.Meta>
				<Item.Description>{entry.description}</Item.Description>
				<Item.Extra>
					<HealthRatingBar rating={entry.healthCheckRating} showText={true} />
				</Item.Extra>
			</Item.Content>
		</Item>
	);
};

export default HealthCheckEntry;