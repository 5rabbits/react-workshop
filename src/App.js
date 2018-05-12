import React from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'

const exercises = require.context('./exercises', false, /\d+\.js$/)
  .keys()
  .map(file => file.match(/(\d+)/)[1])

const getExerciseName = number => `Ejercicio ${parseInt(number, 10)}`

const App = () => (
  <BrowserRouter>
    <div>
      <h1>React Workshop</h1>

      <ul>
        <li>
          <Link to='/'>Inicio</Link>
        </li>
        {exercises.map(exercise => (
          <li key={exercise}>
            <Link to={`/${exercise}`}>{getExerciseName(exercise)}</Link>
          </li>
        ))}
      </ul>

      <hr />

      <Route exact path='/' component={Home} />
      <Route path='/:exercise' component={Exercise} />
    </div>
  </BrowserRouter>
)

const Home = () => (
  <div>
    <h2>Inicio</h2>
  </div>
)

const Exercise = ({ match: { params: { exercise } } }) => {
  const ExerciseComponent = require(`./exercises/${exercise}`).default
  const SolutionComponent = require(`./solutions/${exercise}`).default

  return (
    <div>
      <h2>{getExerciseName(exercise)}</h2>

      <ExerciseComponent />
      <SolutionComponent />
    </div>
  )
}

export default App
