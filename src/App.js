import React, { Fragment } from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'

const exercises = require.context('./exercises', false, /\d+\.js$/)
  .keys()
  .map(file => file.match(/(\d+)/)[1])

const getExerciseName = number => `Ejercicio ${parseInt(number, 10)}`

const App = () => (
  <BrowserRouter>
    <div className="App">
      <h1>React Workshop</h1>

      <ul className="App__nav">
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

      <div className="App__content">
        <Route exact path='/' component={Home} />
        <Route path='/:exercise' component={Exercise} />
      </div>
    </div>
  </BrowserRouter>
)

const Home = () => (
  <Fragment>
    <h2>Inicio</h2>
  </Fragment>
)

const Exercise = ({ match: { params: { exercise } } }) => {
  const UserSolution = require(`./exercises/${exercise}`).default
  const Solution = require(`./solutions/${exercise}`).default
  const renderer = exercisesRenderers[exercise] || exercisesRenderers.default

  return renderer({
    exerciseNumber: exercise,
    UserSolution,
    Solution,
  })
}

const ExercisePanel = ({ exerciseNumber, userSolution, solution }) => (
  <Fragment>
    <h2>{getExerciseName(exerciseNumber)}</h2>

    <div className="Exercise__row">
      <div className="Exercise__column">
        <div className="Exercise__label">
          Tu solución
        </div>

        {userSolution}
      </div>

      <div className="Exercise__column">
        <div className="Exercise__label">
          Resultado esperado
        </div>

        {solution}
      </div>
    </div>
  </Fragment>
)

const exercisesRenderers = {
  'default': ({ UserSolution, Solution, exerciseNumber }) => (
    <ExercisePanel
      exerciseNumber={exerciseNumber}
      solution={<Solution />}
      userSolution={<UserSolution />}
    />
  ),
  '02': ({ UserSolution, Solution, exerciseNumber }) => {
    const time = Math.round(Math.random() * 10000)

    return (
      <ExercisePanel
        exerciseNumber={exerciseNumber}
        solution={<Solution time={time} />}
        userSolution={<UserSolution time={time} />}
      />
    )
  },
  '03': ({ UserSolution, Solution, exerciseNumber }) => {
    const time = Math.round(Math.random() * 10000)

    return (
      <ExercisePanel
        exerciseNumber={exerciseNumber}
        solution={<Solution time={time} />}
        userSolution={<UserSolution time={time} />}
      />
    )
  },
  '04': ({ UserSolution, Solution, exerciseNumber }) => {
    const time = Math.round(Math.random() * 10000)

    return (
      <ExercisePanel
        exerciseNumber={exerciseNumber}
        solution={<Solution time={time} />}
        userSolution={<UserSolution time={time} />}
      />
    )
  },
}


export default App
