const Header = (props) => {
  return (
  <div>
      <h1>{props.name}</h1>
  </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises: {props.total}</p>
    </div>
  )
}

function Content ({props}) {
  return props.map(prop => (
    <p>{prop.part}: {prop.exercises}</p>
  ));
}

const App = () => {
  const course = 'Half Stack application development';
  const parts = [{part: 'Fundamentals of React', exercises: 10},
                 {part: 'Using props to pass data', exercises: 7},
                 {part: 'State of a component', exercises: 14}];

  let total2 = 0;
  for (let i = 0; i < parts.length; i++)
    total2 += parts[i].exercises;
  
  return (
    <div>
      <Header name = {course} />
      <Content props = {parts} />
      <Total total = {total2} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
