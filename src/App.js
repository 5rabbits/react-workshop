import React, { Fragment } from 'react'
import { BrowserRouter, Route, NavLink } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { Tooltip } from 'react-tippy'
import 'react-tippy/dist/tippy.css'

const loadMarkdown = require.context(
  '!html-loader!markdown-loader!./',
  false,
  /\.md$/
)

const readme = loadMarkdown('./README.md')

const exercises = {
  '01': ({ UserSolution, Solution, exerciseNumber }) => (
    <ExercisePanel
      description="El componente debe mostrar el texto correcto."
      exerciseNumber={exerciseNumber}
      solution={<Solution />}
      userSolution={<UserSolution />}
    />
  ),
  '02': ({ UserSolution, Solution, exerciseNumber }) => {
    const time = Math.round(Math.random() * 10000)

    return (
      <ExercisePanel
        description="El trabajo debe mostrar el tiempo correcto."
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
        description="Agregar un botón para el timer que cambie de estado al hacer click."
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
        description="El tiempo debe incrementar mientras el timer esté activo."
        exerciseNumber={exerciseNumber}
        solution={<Solution time={time} />}
        userSolution={<UserSolution time={time} />}
      />
    )
  },
  '05': ({ UserSolution, Solution, exerciseNumber }) => {
    const timeEntries = [
      { id: 1, time: 3600, project: 'React Workshop' },
      { id: 2, time: 18425, project: 'TimeBillingX' },
      { id: 3, time: 5678, project: 'LemonLabs' },
      { id: 4, time: 0, project: 'TheTimeBilling' },
    ]

    return (
      <ExercisePanel
        description="Mostrar una lista de trabajos."
        exerciseNumber={exerciseNumber}
        solution={<Solution timeEntries={timeEntries} />}
        userSolution={<UserSolution timeEntries={timeEntries} />}
      />
    )
  },
  '06': ({ UserSolution, Solution, exerciseNumber }) => {
    const timeEntries = [
      { id: 1, time: 3600, project: 'React Workshop' },
      { id: 2, time: 18425, project: 'TimeBillingX' },
      { id: 3, time: 5678, project: 'LemonLabs' },
      { id: 4, time: 0, project: 'TheTimeBilling' },
    ]

    return (
      <ExercisePanel
        description="Solo un trabajo a la vez puede tener su timer activo."
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
              <NavLink to={`/${exercise}`}>
                {getExerciseName(exercise)}{' '}
                <span className="App__nav__icon">
                  <ExerciseCheck exercise={exercise} />
                </span>
              </NavLink>
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

const ExerciseCheck = inject('store')(
  observer(({ store, exercise, visibleTooltip }) => {
    const result = store.getExerciseState(exercise)

    if (result.state === 'passing') {
      return (
        <i className="icon ion-md-checkmark ExerciseCheck ExerciseCheck--passing" />
      )
    }

    if (result.state === 'failing' && result.explicit) {
      return (
        <Tooltip
          duration={0}
          open={visibleTooltip}
          position="right"
          title={result.failureMessage.split('\n')[0].split(' › ')[1]}
        >
          <i className="icon ion-md-close ExerciseCheck ExerciseCheck--failing" />
        </Tooltip>
      )
    }

    return null
  })
)

const ExercisePanel = ({
  description,
  exerciseNumber,
  userSolution,
  solution,
  store,
}) => (
  <Fragment>
    <h1>
      {getExerciseName(exerciseNumber)}{' '}
      <ExerciseCheck exercise={exerciseNumber} visibleTooltip />
    </h1>

    {description && <p>{description}</p>}

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
