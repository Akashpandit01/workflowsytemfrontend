import {
  useEffect,
  useState
} from "react"

import {
  Link
} from "react-router-dom"

import api from "../services/api"

import Navbar
  from "../components/Navbar"

const Dashboard = () => {

  const [projects,
    setProjects] =
      useState([])

  const [loading,
    setLoading] =
      useState(false)

  const [projectName,
    setProjectName] =
      useState("")

  const [inviteLink,
    setInviteLink] =
      useState("")

  // =========================
  // FETCH PROJECTS
  // =========================

  const fetchProjects =
    async () => {

      try {

        setLoading(true)

        const res =
          await api.get(
            "/projects"
          )

        setProjects(
          res.data
        )

        setLoading(false)

      } catch (error) {

        setLoading(false)

        console.log(error)
      }
    }

  // =========================
  // LOAD PROJECTS
  // =========================

  useEffect(() => {

    fetchProjects()

  }, [])

  // =========================
  // CREATE PROJECT
  // =========================

  const createProject =
    async e => {

      e.preventDefault()

      try {

        await api.post(
          "/projects",
          {
            name:
              projectName
          }
        )

        setProjectName("")

        fetchProjects()

      } catch (error) {

        alert(
          error.response.data.message
        )
      }
    }

  // =========================
  // GENERATE INVITE LINK
  // =========================

  const generateInvite =
    async projectId => {

      try {

        const res =
          await api.post(
            `/projects/${projectId}/invite`
          )

        setInviteLink(
          `${window.location.origin}/join/${res.data.token}`
        )

      } catch (error) {

        alert(
          error.response.data.message
        )
      }
    }

  // =========================
  // COPY LINK
  // =========================

  const copyInviteLink =
    () => {

      navigator.clipboard.writeText(
        inviteLink
      )

      alert(
        "Invite link copied"
      )
    }

  return (

    <>

      <Navbar />

      <div className="container mt-4 fade-in">

        {/* HEADER */}

        <div className="d-flex justify-content-between align-items-center mb-5">

          <div>

            <h1 className="fw-bold">

              Workflow Dashboard

            </h1>

            <p className="text-muted">

              Manage intelligent workflow orchestration projects.

            </p>

          </div>

        </div>

        {/* CREATE PROJECT */}

        <div className="card p-4 shadow-sm mb-5">

          <h3 className="mb-4">

            Create Project

          </h3>

          <form
            onSubmit={
              createProject
            }
          >

            <div className="row">

              <div className="col-md-10">

                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Enter project name"
                  value={
                    projectName
                  }
                  onChange={e =>
                    setProjectName(
                      e.target.value
                    )
                  }
                  required
                />

              </div>

              <div className="col-md-2">

                <button className="btn btn-primary btn-lg w-100">

                  Create

                </button>

              </div>

            </div>

          </form>

        </div>

        {/* INVITE LINK */}

        {
          inviteLink && (

            <div className="alert alert-success d-flex justify-content-between align-items-center mb-5">

              <div className="text-break">

                {inviteLink}

              </div>

              <button
                className="btn btn-dark ms-3"
                onClick={
                  copyInviteLink
                }
              >

                Copy

              </button>

            </div>
          )
        }

        {/* LOADING */}

        {
          loading && (

            <div className="text-center">

              <h4>
                Loading...
              </h4>

            </div>
          )
        }

        {/* EMPTY */}

        {
          !loading &&
          projects.length === 0 && (

            <div className="alert alert-info">

              No projects found

            </div>
          )
        }

        {/* PROJECTS */}

        <div className="row">

          {
            projects.map(
              project => (

                <div
                  className="col-md-4"
                  key={project._id}
                >

                  <div className="card p-4 shadow-sm mb-4 project-card">

                    <h3 className="mb-3">

                      {project.name}

                    </h3>

                    <p className="text-muted">

                      Collaborative workflow orchestration project.

                    </p>

                    <div className="d-flex flex-wrap gap-2 mt-3">

                      {/* OPEN */}

                      <Link
                        to={`/project/${project._id}`}
                        className="btn btn-primary"
                      >

                        Open

                      </Link>

                      {/* SIMULATION */}

                      <Link
                        to={`/simulation/${project._id}`}
                        className="btn btn-dark"
                      >

                        Simulation

                      </Link>

                      {/* INVITE */}

                      <button
                        className="btn btn-success"
                        onClick={() =>
                          generateInvite(
                            project._id
                          )
                        }
                      >

                        Invite

                      </button>

                    </div>

                  </div>

                </div>
              )
            )
          }

        </div>

      </div>

    </>
  )
}

export default Dashboard
