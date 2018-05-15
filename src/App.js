import React, { Fragment } from 'react'
import { BrowserRouter, Route, NavLink } from 'react-router-dom'

const loadMarkdown = require.context(
  '!html-loader!markdown-loader!./',
  false,
  /\.md$/
)

const readme = loadMarkdown('./README.md')

const defaultExerciseRenderer = ({
  UserSolution,
  Solution,
  exerciseNumber,
}) => (
  <ExercisePanel
    exerciseNumber={exerciseNumber}
    solution={<Solution />}
    userSolution={<UserSolution />}
  />
)

const exercises = {
  '01': defaultExerciseRenderer,
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
  '05': ({ UserSolution, Solution, exerciseNumber }) => {
    const time = Math.round(Math.random() * 10000)
    const timeEntries = [
      { id: 1, time: 3600, project: 'React Workshop' },
      { id: 2, time: 18425, project: 'TimeBillingX' },
      { id: 3, time: 5678, project: 'LemonLabs' },
      { id: 4, time: 0, project: 'TheTimeBilling' },
    ]

    return (
      <ExercisePanel
        exerciseNumber={exerciseNumber}
        solution={<Solution timeEntries={timeEntries} />}
        userSolution={<UserSolution timeEntries={timeEntries} />}
      />
    )
  },
}

const getExerciseName = number => `Ejercicio ${parseInt(number, 10)}`

const App = () => (
  <BrowserRouter>
    <div className="App">
      <div className="App__wrapper">
        <ul className="App__nav">
          <li>
            <NavLink to="/" exact>
              Inicio
            </NavLink>
          </li>
          {Object.keys(exercises).map(exercise => (
            <li key={exercise}>
              <NavLink to={`/${exercise}`}>{getExerciseName(exercise)}</NavLink>
            </li>
          ))}
        </ul>

        <div className="App__content">
          <Route exact path="/" component={Home} />
          <Route path="/:exercise" component={Exercise} />
        </div>
      </div>
    </div>
  </BrowserRouter>
)

const Home = () => (
  <div
    className="Home"
    dangerouslySetInnerHTML={{
      __html: readme,
    }}
  />
)

const Exercise = ({
  match: {
    params: { exercise },
  },
}) => {
  const UserSolution = require(`./exercises/${exercise}`).default
  const Solution = require(`./solutions/${exercise}`).default
  const renderer = exercises[exercise]

  return renderer({
    exerciseNumber: exercise,
    UserSolution,
    Solution,
  })
}

const ExercisePanel = ({ exerciseNumber, userSolution, solution }) => (
  <Fragment>
    <h1>{getExerciseName(exerciseNumber)}</h1>

    <div className="Exercise__row">
      <div className="Exercise__column">
        <div className="Exercise__label">Tu solución</div>

        <div className="Exercise__panel">{userSolution}</div>
      </div>

      <div className="Exercise__column">
        <div className="Exercise__label">Resultado esperado</div>

        <div className="Exercise__panel">{solution}</div>
      </div>
    </div>
  </Fragment>
)

export default App
