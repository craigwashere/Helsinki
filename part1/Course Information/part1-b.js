const Header = (props) => {
  return (
  <div>
      <h1>{props.name}</h1>
  </div>
  )
}

const Total = (parts) => {
  let total = 0;
  for (let i = 0; i < parts.parts.length; i++)
    {
      total += parts.parts[i].exercises;
      console.log({total});
    }
  return (
    <div>
      <p>Number of exercises: {total}</p>
    </div>
  )
}

const Content = ({parts}) => {
  return parts.map(part => (<p>{part.name} - {part.exercises}</p>)
  
  )
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header name = {course.name} /> 
      <Content parts = {course.parts} />
      <Total parts = {course.parts} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
