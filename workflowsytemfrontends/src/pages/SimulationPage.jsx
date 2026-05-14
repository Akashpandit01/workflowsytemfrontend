import {
  useState
} from "react"

import {
  useParams
} from "react-router-dom"

import api from "../services/api"

import Navbar
  from "../components/Navbar"

const SimulationPage = () => {

  const { projectId } =
    useParams()

  const [hours,
    setHours] =
      useState(8)

  const [result,
    setResult] =
      useState(null)

  const [loading,
    setLoading] =
      useState(false)

  // =========================
  // RUN SIMULATION
  // =========================

  const runSimulation =
    async () => {

      try {

        setLoading(true)

        const res =
          await api.post(
            `/projects/${projectId}/simulate`,
            {
              availableHours:
                Number(hours)
            }
          )

        setResult(
          res.data
        )

        setLoading(false)

      } catch (error) {

        setLoading(false)

        console.log(error)
      }
    }

  return (

    <>

      <Navbar />

      <div className="container mt-4">

        <h2 className="mb-4">
          Daily Simulation
        </h2>

        <div className="card p-4 mb-4">

          <div className="d-flex gap-2">

            <input
              type="number"
              className="form-control"
              value={hours}
              onChange={e =>
                setHours(
                  e.target.value
                )
              }
            />

            <button
              className="btn btn-primary"
              onClick={
                runSimulation
              }
            >
              Simulate
            </button>

          </div>

        </div>

        {
          loading && (
            <h5>
              Loading...
            </h5>
          )
        }

        {
          result && (

            <div className="card p-4">

              <h4 className="mb-3">
                Execution Order
              </h4>

              <ol>

                {
                  result.executionOrder.map(
                    (
                      task,
                      index
                    ) => (

                      <li
                        key={index}
                      >
                        {task}
                      </li>
                    )
                  )
                }

              </ol>

              <hr />

              <h5>
                Total Priority Score:
                {" "}
                {
                  result.totalPriorityScore
                }
              </h5>

              <h5>
                Used Hours:
                {" "}
                {
                  result.usedHours
                }
              </h5>

              <h5>
                Remaining Hours:
                {" "}
                {
                  result.remainingHours
                }
              </h5>

              <hr />

              <h5>
                Blocked Tasks:
              </h5>

              <ul>

                {
                  result.blockedTasks.map(
                    task => (

                      <li
                        key={task._id}
                      >
                        {task.title}
                      </li>
                    )
                  )
                }

              </ul>

              <h5>
                Skipped Tasks:
              </h5>

              <ul>

                {
                  result.skippedTasks.map(
                    task => (

                      <li
                        key={task._id}
                      >
                        {task.title}
                      </li>
                    )
                  )
                }

              </ul>

            </div>
          )
        }

      </div>

    </>
  )
}

export default SimulationPage