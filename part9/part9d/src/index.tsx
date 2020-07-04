import React from "react";
import ReactDOM from "react-dom";

const App: React.FC = () => {
	const courseName = "Half Stack application development";
	// new types
	interface CoursePartBase {
		name: string;
		exerciseCount: number;
		description?: string;
	}

	interface CoursePartOne extends CoursePartBase {
		name: "Fundamentals";
	}

	interface CoursePartTwo extends CoursePartBase {
		name: "Using props to pass data";
		groupProjectCount: number;
	}

	interface CoursePartThree extends CoursePartBase {
		name: "Deeper type usage";
		exerciseSubmissionLink: string;
	}

	type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree;

	// this is the new coursePart variable
	const courseParts: CoursePart[] = [
		{
			name: "Fundamentals",
			exerciseCount: 10,
			description: "This is an awesome course part"
		},
		{
			name: "Using props to pass data",
			exerciseCount: 7,
			groupProjectCount: 3
		},
		{
			name: "Deeper type usage",
			exerciseCount: 14,	
			description: "Confusing description",
			exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
		}
	];

	/*** Helper function for exhaustive type checking ***/
	const assertNever = (value: never): never => {
		throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
	};

	const Header: React.FC<{ name: string }> = ({ name }) => (
		<h1>{name}</h1>
	);

	const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
console.log("FUCK YOU TYPESCRIPT DRY IN THE ASS")
		return (<h1>Part</h1>)
	};

//why does typescript suck so much?
//I HATE TYPESCRIPT SO MUCH
//FUCK YOU TYPESCRIPT DRY IN THE ASS

	const Content: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => {
		return(<div>{courseParts.map(part => {
			switch(part.name) {
				case "Fundamentals":			return(<p>{part.name} {part.exerciseCount}  {part.description}</p>);
				case "Using props to pass data":	return(<p>{part.name}  {part.exerciseCount}  {part.groupProjectCount}</p>);
				case "Deeper type usage":		return(<p>{part.name}  {part.exerciseCount}  {part.description}  {part.exerciseSubmissionLink}</p>);
				default:				return assertNever(part);
			}
		})}</div>);
	};

	const Total: React.FC<{ total: number }> = ({ total }) => {
		return (<div>Number of exercises{" "} {total}</div>);
	};

  return (
	<div>
		<Header		name={courseName} />
		<Content	courseParts={courseParts} />
		<Total		total={courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)} />
	</div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
