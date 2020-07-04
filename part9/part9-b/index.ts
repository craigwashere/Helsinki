import express from 'express';
const app = express();
import { BMI } from './calculateBmi';
import {calculateExercises } from './exerciseCalculator'

var bodyParser = require('body-parser')

app.get('/Hello', (req, res) => {
	res.send('Hello Full Stack!');
});

app.get('/bmi', (request, response) => {
	try{
		response.send({	weight: request.query.weight,
				height: request.query.height,
				bmi:	BMI(request.query.weight, request.query.height)
			});
	} catch (e) {
		//eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		response.send(e.message)
	}
});

app.use(bodyParser.json()) // for parsing application/json

app.post('/exercises', (request, response) => {
console.log("target", request.body)
	try {
		if((request.body.target === undefined) || (request.body.daily_exercises === undefined)){
			console.log("parameters missing");
			response.status(400).json({error: "parameters missing"});
		}

		if (isNaN(request.body.target)){
			console.log("malformatted parameters");
			response.status(400).json({error: "malformatted parameters"});
		}

		request.body.daily_exercises.forEach(element => {
			if (isNaN(element)){
				console.log("malformatted parameters");
				response.status(400).json({error: "malformatted parameters"});
			}
		});
		response.send(calculateExercises(request.body.daily_exercises, request.body.target));
	} catch (e) {
		//eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		response.send(e.message)
	}
});

const PORT = 3003;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
