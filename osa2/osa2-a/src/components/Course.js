import React from "react";

const Header = props => <h1>{props.course}</h1>;

const Total = props => {
  let total = 0;
  props.parts.forEach(element => {
    total += element.exercises;
  });

  return <p>yhteensä {total} tehtävää</p>;
};

const Part = props => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
);

const Content = ({parts}) => {
  const rows = () => parts.map(part =>
    <Part 
      key={part.id}
      part={part}
    />
  )

  return (
    <div>
      {rows()}
    </div>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course