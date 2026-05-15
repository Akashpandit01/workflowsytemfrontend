import "../styles/Home.css"

import {
  Link
} from "react-router-dom"

const Home = () => {

  return (

    <div className="home-container">

      {/* Navbar */}

      <nav className="navbar navbar-expand-lg navbar-dark premium-navbar px-4 py-3">

        <Link
          className="navbar-brand fw-bold fs-3 logo-text"
          to="/"
        >
          WorkflowX
        </Link>

        <div className="ms-auto d-flex gap-3">

          <Link
            to="/login"
            className="btn btn-outline-light px-4 rounded-pill"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="btn premium-btn px-4 rounded-pill shadow"
          >
            Signup
          </Link>

        </div>

      </nav>

      {/* Hero Section */}

      <section className="container py-5">

        <div className="row align-items-center min-vh-100">

          <div className="col-md-6">

            <span className="badge hero-badge px-4 py-2 mb-4">

              Smart Team Collaboration Platform

            </span>

            <h1 className="hero-title fw-bold mb-4">

              Collaborative Workflow
              Orchestration System

            </h1>

            <p className="hero-text lead mb-4">

              Manage projects, tasks,
              dependencies, realtime updates,
              execution planning and team
              collaboration in one powerful
              platform.

            </p>

            <div className="d-flex gap-3 flex-wrap">

              <Link
                to="/signup"
                className="btn premium-btn btn-lg px-5 py-3 rounded-pill shadow"
              >
                Get Started
              </Link>

              <Link
                to="/login"
                className="btn btn-outline-dark btn-lg px-5 py-3 rounded-pill"
              >
                Login
              </Link>

            </div>

          </div>

          <div className="col-md-6 text-center position-relative">

            <div className="hero-glow"></div>

            <img
              src="https://cdn-icons-png.flaticon.com/512/4149/4149653.png"
              alt="workflow"
              className="img-fluid workflow-image"
            />

          </div>

        </div>

      </section>

      {/* Features */}

      <section className="py-5">

        <div className="container">

          <div className="text-center mb-5">

            <h2 className="features-title fw-bold">

              Powerful Features

            </h2>

            <p className="features-subtitle">

              Everything your team needs
              to manage workflows efficiently
              and collaborate seamlessly.

            </p>

          </div>

          <div className="row g-4">

            <div className="col-md-4">

              <div className="feature-card">

                <div className="feature-icon icon-purple">
                  ⚡
                </div>

                <h4 className="fw-bold">

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

              <div className="feature-card">

                <div className="feature-icon icon-blue">
                  🔗
                </div>

                <h4 className="fw-bold">

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

              <div className="feature-card">

                <div className="feature-icon icon-green">
                  🛡️
                </div>

                <h4 className="fw-bold">

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

      <footer className="premium-footer text-light text-center py-4 mt-5">

        <p className="mb-0">

          © 2026 WorkflowX.
          All Rights Reserved.

        </p>

      </footer>

    </div>
  )
}

export default Home
