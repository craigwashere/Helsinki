import React from "react";

const Header = ({name}) => {
  return (
  <div>
      <h1>{name}</h1>
  </div>
  )
}

const Content = ({parts}) => {
  return parts.map(part => (<p key = {part.id}>{part.name} - {part.exercises}</p>)
  )
}

const Total = ({parts}) => {
  let total = parts.reduce( (s, p)  => {return s + p.exercises}, 0)
  return (
    <div>
      <p>Number of exercises: {total}</p>
    </div>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header name = {course.name} /> 
      <Content parts = {course.parts} />
      <Total parts = {course.parts} />
    </div>  
  )
}

export default Course
