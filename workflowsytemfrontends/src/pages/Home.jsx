import {
  Link
} from "react-router-dom"

const Home = () => {

  return (

    <div>

      {/* Navbar */}

      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">

        <Link
          className="navbar-brand fw-bold"
          to="/"
        >
          WorkflowX
        </Link>

        <div className="ms-auto d-flex gap-2">

          <Link
            to="/login"
            className="btn btn-outline-light"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="btn btn-primary"
          >
            Signup
          </Link>

        </div>

      </nav>

      {/* Hero Section */}

      <section className="container py-5">

        <div className="row align-items-center">

          <div className="col-md-6">

            <h1 className="display-4 fw-bold mb-4">

              Collaborative Workflow
              Orchestration System

            </h1>

            <p className="lead text-muted mb-4">

              Manage projects, tasks,
              dependencies, realtime updates,
              execution planning and team
              collaboration in one powerful
              platform.

            </p>

            <div className="d-flex gap-3">

              <Link
                to="/signup"
                className="btn btn-primary btn-lg"
              >
                Get Started
              </Link>

              <Link
                to="/login"
                className="btn btn-outline-dark btn-lg"
              >
                Login
              </Link>

            </div>

          </div>

          <div className="col-md-6 text-center">

            <img
              src="https://cdn-icons-png.flaticon.com/512/4149/4149653.png"
              alt="workflow"
              className="img-fluid"
              style={{
                maxHeight: "400px"
              }}
            />

          </div>

        </div>

      </section>

      {/* Features */}

      <section className="bg-light py-5">

        <div className="container">

          <div className="text-center mb-5">

            <h2 className="fw-bold">
              Features
            </h2>

          </div>

          <div className="row">

            <div className="col-md-4">

              <div className="card p-4 h-100 shadow-sm">

                <h4>
                  Realtime Collaboration
                </h4>

                <p className="text-muted">

                  Instantly sync updates
                  using Socket.IO realtime
                  communication.

                </p>

              </div>

            </div>

            <div className="col-md-4">

              <div className="card p-4 h-100 shadow-sm">

                <h4>
                  Dependency Engine
                </h4>

                <p className="text-muted">

                  Smart execution planning
                  with cycle detection and
                  dependency management.

                </p>

              </div>

            </div>

            <div className="col-md-4">

              <div className="card p-4 h-100 shadow-sm">

                <h4>
                  Conflict Safe Updates
                </h4>

                <p className="text-muted">

                  Optimistic concurrency
                  prevents stale updates
                  and conflicts.

                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* Footer */}

      <footer className="bg-dark text-light text-center py-3">

        <p className="mb-0">

          © 2026 WorkflowX.
          All Rights Reserved.

        </p>

      </footer>

    </div>
  )
}

export default Home