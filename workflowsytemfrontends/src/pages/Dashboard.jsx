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

  const [name,
    setName] =
      useState("")

  const [loading,
    setLoading] =
      useState(false)

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

  useEffect(() => {

    fetchProjects()

  }, [])

  // =========================
  // CREATE PROJECT
  // =========================

  const createProject =
    async () => {

      try {

        if (!name) {

          return alert(
            "Project name required"
          )
        }

        await api.post(
          "/projects",
          { name }
        )

        setName("")

        fetchProjects()

      } catch (error) {

        console.log(error)
      }
    }

  // =========================
  // GENERATE INVITE
  // =========================

  const generateInvite =
    async projectId => {

      try {

        const res =
          await api.post(
            `/projects/${projectId}/invite`
          )

        navigator.clipboard.writeText(
          res.data.inviteLink
        )

        alert(
          "Invite link copied"
        )

      } catch (error) {

        console.log(error)
      }
    }

  return (

    <>

      <Navbar />

      <div className="container mt-4">

        <div className="d-flex justify-content-between align-items-center mb-4">

          <h2>
            Dashboard
          </h2>

        </div>

        {/* Create Project */}

        <div className="card p-4 mb-4">

          <h4 className="mb-3">
            Create Project
          </h4>

          <div className="d-flex gap-2">

            <input
              type="text"
              placeholder="Project Name"
              className="form-control"
              value={name}
              onChange={e =>
                setName(
                  e.target.value
                )
              }
            />

            <button
              className="btn btn-primary"
              onClick={
                createProject
              }
            >
              Create
            </button>

          </div>

        </div>

        {/* Loading */}

        {
          loading && (
            <h5>
              Loading...
            </h5>
          )
        }

        {/* Empty */}

        {
          projects.length === 0 && (

            <div className="alert alert-info">

              No projects found

            </div>
          )
        }

        {/* Projects */}

        <div className="row">

          {
            projects.map(project => (

              <div
                className="col-md-4"
                key={project._id}
              >

                <div className="card p-4 mb-4 shadow-sm">

                  <h4>
                    {project.name}
                  </h4>

                  <div className="d-flex flex-wrap gap-2 mt-3">

                    <Link
                      to={`/project/${project._id}`}
                      className="btn btn-dark"
                    >
                      Open
                    </Link>

                    <Link
                      to={`/simulation/${project._id}`}
                      className="btn btn-primary"
                    >
                      Simulation
                    </Link>

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
            ))
          }

        </div>

      </div>

    </>
  )
}

export default Dashboard
