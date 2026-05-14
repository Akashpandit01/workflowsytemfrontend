import {
  useEffect
} from "react"

import {
  useParams,
  useNavigate
} from "react-router-dom"

import api from "../services/api"

const JoinProject = () => {

  const { token } =
    useParams()

  const navigate =
    useNavigate()

  useEffect(() => {

    const joinProject =
      async () => {

        try {

          await api.post(
            "/projects/join",
            { token }
          )

          alert(
            "Project joined successfully"
          )

          navigate(
            "/dashboard"
          )

        } catch (error) {

          alert(
            error.response.data.message
          )
        }
      }

    joinProject()

  }, [])

  return (

    <div className="container mt-5 text-center">

      <h2>
        Joining Project...
      </h2>

    </div>
  )
}

export default JoinProject