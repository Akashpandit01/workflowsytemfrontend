import {
  useState
} from "react"

import {
  useParams
} from "react-router-dom"

import api from "../services/api"

import Navbar
  from "../components/Navbar"

import BackButton
  from "../components/BackButton"

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
                hours
            }
          )

        setResult(
          res.data
        )

        setLoading(false)

      } catch (error) {

        setLoading(false)

        alert(
          error.response?.data
            ?.message ||
          "Simulation failed"
        )
      }
    }

  return (

    <>

      <Navbar />

      <div className="container mt-4">

        <BackButton />

        {/* HEADER */}

        <div className="text-center mb-5">

          <h1 className="fw-bold">
            Daily Simulation
          </h1>

          <p className="text-muted">

            Optimize workflow execution
            based on available hours,
            task priority, and
            dependencies.

          </p>

        </div>

        {/* INPUT */}

        <div className="card p-4 shadow-sm mb-4">

          <div className="row align-items-center">

            <div className="col-md-10">

              <input
                type="number"
                className="form-control form-control-lg"
                value={hours}
                onChange={e =>
                  setHours(
                    e.target.value
                  )
                }
                placeholder="Available Hours"
              />

            </div>

            <div className="col-md-2">

              <button
                className="btn btn-primary btn-lg w-100"
                onClick={
                  runSimulation
                }
              >

                {
                  loading
                    ? "Running..."
                    : "Simulate"
                }

              </button>

            </div>

          </div>

        </div>

        {/* RESULT */}

        {
          result && (

            <div className="card p-4 shadow-sm">

              <h2 className="text-center mb-5">

                Execution Result

              </h2>

              {/* SUMMARY */}

              <div className="row text-center mb-5">

                <div className="col-md-4 mb-3">

                  <div className="card p-4 shadow-sm border-0">

                    <h5 className="text-muted">

                      Total Priority

                    </h5>

                    <h1 className="fw-bold text-primary">

                      {
                        result.totalPriority
                      }

                    </h1>

                  </div>

                </div>

                <div className="col-md-4 mb-3">

                  <div className="card p-4 shadow-sm border-0">

                    <h5 className="text-muted">

                      Used Hours

                    </h5>

                    <h1 className="fw-bold text-success">

                      {
                        result.usedHours
                      }

                    </h1>

                  </div>

                </div>

                <div className="col-md-4 mb-3">

                  <div className="card p-4 shadow-sm border-0">

                    <h5 className="text-muted">

                      Remaining Hours

                    </h5>

                    <h1 className="fw-bold text-danger">

                      {
                        result.remainingHours
                      }

                    </h1>

                  </div>

                </div>

              </div>

              {/* EXECUTION ORDER */}

              <div className="mb-5">

                <h3 className="mb-3">

                  Execution Order

                </h3>

                {
                  result.selectedTasks &&
                  result.selectedTasks
                    .length > 0

                    ? (

                      <ul className="list-group">

                        {
                          result.selectedTasks.map(
                            task => (

                              <li
                                key={task._id}
                                className="list-group-item d-flex justify-content-between align-items-center"
                              >

                                <span>
                                  {task.title}
                                </span>

                                <span className="badge bg-primary">

                                  Priority:
                                  {" "}
                                  {
                                    task.priority
                                  }

                                </span>

                              </li>
                            )
                          )
                        }

                      </ul>

                    )

                    : (

                      <div className="alert alert-info">

                        No tasks selected

                      </div>
                    )
                }

              </div>

              {/* BLOCKED TASKS */}

              <div className="mb-5">

                <h3 className="mb-3">

                  Blocked Tasks

                </h3>

                {
                  result.blockedTasks &&
                  result.blockedTasks
                    .length > 0

                    ? (

                      <ul className="list-group">

                        {
                          result.blockedTasks.map(
                            task => (

                              <li
                                key={task._id}
                                className="list-group-item list-group-item-danger"
                              >

                                {task.title}

                              </li>
                            )
                          )
                        }

                      </ul>

                    )

                    : (

                      <div className="alert alert-success">

                        No blocked tasks

                      </div>
                    )
                }

              </div>

              {/* SKIPPED TASKS */}

              <div>

                <h3 className="mb-3">

                  Skipped Tasks

                </h3>

                {
                  result.skippedTasks &&
                  result.skippedTasks
                    .length > 0

                    ? (

                      <ul className="list-group">

                        {
                          result.skippedTasks.map(
                            task => (

                              <li
                                key={task._id}
                                className="list-group-item list-group-item-warning"
                              >

                                {task.title}

                              </li>
                            )
                          )
                        }

                      </ul>

                    )

                    : (

                      <div className="alert alert-success">

                        No skipped tasks

                      </div>
                    )
                }

              </div>

            </div>
          )
        }

      </div>

    </>
  )
}

export default SimulationPage
