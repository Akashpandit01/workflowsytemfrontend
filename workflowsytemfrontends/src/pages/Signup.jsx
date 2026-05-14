import {
  useState
} from "react"

import {
  useNavigate,
  Link
} from "react-router-dom"
import {
  FaArrowLeft
} from "react-icons/fa"

import api from "../services/api"

const Signup = () => {

  const navigate =
    useNavigate()

  const [formData,
    setFormData] =
      useState({
        name: "",
        email: "",
        password: ""
      })

  const handleChange = e => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    })
  }

  const handleSubmit =
    async e => {

      e.preventDefault()

      try {

        await api.post(
          "/auth/signup",
          formData
        )

        navigate("/login")

      } catch (error) {

        alert(
          error.response.data.message
        )
      }
    }

  return (
    <>
    <button
  className="btn btn-dark mb-4"
  onClick={() =>
    navigate("/")
  }
>

  <FaArrowLeft className="me-2" />

  Back Home

</button>
    <div className="container mt-5">

      <div className="row justify-content-center">

        <div className="col-md-4">

          <div className="card p-4">

            <h3 className="mb-3">
              Signup
            </h3>

            <form
              onSubmit={
                handleSubmit
              }
            >

              <input
                type="text"
                name="name"
                placeholder="Name"
                className="form-control mb-3"
                onChange={
                  handleChange
                }
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                className="form-control mb-3"
                onChange={
                  handleChange
                }
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                className="form-control mb-3"
                onChange={
                  handleChange
                }
              />

              <button className="btn btn-success w-100">
                Signup
              </button>

            </form>

            <p className="mt-3">
              Already have account?
              <Link to="/login">
                Login
              </Link>
            </p>

          </div>

        </div>

      </div>

    </div>
    </>
  )
}

export default Signup