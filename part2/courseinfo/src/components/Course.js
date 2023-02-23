import React from 'react'

const Header = ({ title }) => {
    return (
        <h1>{title}</h1>
    )
}

const Part = (props) => {
    return (
        <p>
            {props.part} {props.exercises}
        </p>
    )
}


const Content = (props) => {
    return (
        <div>
            {props.parts.map((p, i) => {
                return (<Part key={p.id} part={p.name} exercises={p.exercises} />)
            })}
        </div>
    )
}

const Total = (props) => {
    return (
        <p>Number of exercises {props.parts.reduce((prev, current) => {
            return prev + current.exercises;
        }, 0)}</p>
    );
}

const Course = ({ course }) => {
    return (
        <div>
            <Header title={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>);
}


export default Course;