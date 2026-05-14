import {
  Link,
  useNavigate
} from "react-router-dom"

import {
  useAuth
} from "../context/AuthContext"

const Navbar = () => {

  const { logout } =
    useAuth()

  const navigate =
    useNavigate()

  const handleLogout =
    () => {

      logout()

      navigate("/login")
    }

  return (

    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">

      <Link
        className="navbar-brand fw-bold"
        to="/dashboard"
      >
        WorkflowX
      </Link>

      <div className="ms-auto">

        <button
          className="btn btn-danger"
          onClick={
            handleLogout
          }
        >
          Logout
        </button>

      </div>

    </nav>
  )
}

export default Navbar