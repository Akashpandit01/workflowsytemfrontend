import {
  useNavigate
} from "react-router-dom"

import {
  FaArrowLeft
} from "react-icons/fa"

const BackButton = () => {

  const navigate =
    useNavigate()

  return (

    <button
      className="btn btn-dark"
      onClick={() =>
        navigate("/dashboard")
      }
    >

      <FaArrowLeft />

      Dashboard

    </button>
  )
}

export default BackButton