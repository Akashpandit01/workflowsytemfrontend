import {
  useEffect,
  useState
} from "react"

import {
  useParams
} from "react-router-dom"

import api from "../services/api"

import socket from "../socket/socket"

import Navbar
  from "../components/Navbar"
import BackButton from "../components/BackButton"

const ProjectPage = () => {

  const { projectId } =
    useParams()

  const [tasks,
    setTasks] =
      useState([])

  const [loading,
    setLoading] =
      useState(false)

  const [history,
    setHistory] =
      useState([])

  const [executionPlan,
    setExecutionPlan] =
      useState([])

  const [editingTask,
    setEditingTask] =
      useState(null)

  const [taskData,
    setTaskData] =
      useState({
        title: "",
        description: "",
        priority: 1,
        estimatedHours: 1,
        dependencies: [],
        resourceTag: ""
      })

  // =========================
  // FETCH TASKS
  // =========================

  const fetchTasks =
    async () => {

      try {

        setLoading(true)

        const res =
          await api.get(
            `/tasks/project/${projectId}`
          )

        setTasks(
          res.data
        )

        setLoading(false)

      } catch (error) {

        setLoading(false)

        console.log(error)
      }
    }

  // =========================
  // SOCKETS
  // =========================

  useEffect(() => {

    fetchTasks()

    socket.emit(
      "join-project",
      projectId
    )

    socket.on(
      "task-created",
      task => {

        setTasks(prev => [
          ...prev,
          task
        ])
      }
    )

    socket.on(
      "task-updated",
      updatedTask => {

        setTasks(prev =>
          prev.map(task =>
            task._id ===
            updatedTask._id
              ? updatedTask
              : task
          )
        )
      }
    )

    return () => {

      socket.off(
        "task-created"
      )

      socket.off(
        "task-updated"
      )
    }

  }, [])

  // =========================
  // HANDLE INPUT
  // =========================

  const handleChange =
    e => {

      setTaskData({
        ...taskData,
        [e.target.name]:
          e.target.value
      })
    }

  // =========================
  // CREATE TASK
  // =========================

  const createTask =
    async e => {

      e.preventDefault()

      try {

        await api.post(
          "/tasks",
          {
            ...taskData,
            projectId
          }
        )

        setTaskData({
          title: "",
          description: "",
          priority: 1,
          estimatedHours: 1,
          dependencies: [],
          resourceTag: ""
        })

        fetchTasks()

      } catch (error) {

        alert(
          error.response.data.message
        )
      }
    }

  // =========================
  // UPDATE STATUS
  // =========================

  const updateStatus =
    async (
      taskId,
      status,
      versionNumber
    ) => {

      try {

        await api.put(
          `/tasks/${taskId}`,
          {
            status,
            versionNumber
          }
        )

        fetchTasks()

      } catch (error) {

        if (
          error.response.status ===
          409
        ) {

          alert(
            "Version conflict detected"
          )

        } else {

          alert(
            error.response.data.message
          )
        }
      }
    }

  // =========================
  // RETRY TASK
  // =========================

  const retryTask =
    async taskId => {

      try {

        await api.post(
          `/tasks/${taskId}/retry`
        )

        fetchTasks()

      } catch (error) {

        alert(
          error.response.data.message
        )
      }
    }

  // =========================
  // TASK HISTORY
  // =========================

  const getTaskHistory =
    async taskId => {

      try {

        const res =
          await api.get(
            `/tasks/${taskId}/history`
          )

        setHistory(
          res.data
        )

      } catch (error) {

        console.log(error)
      }
    }

  // =========================
  // EXECUTION PLAN
  // =========================

  const computeExecution =
    async () => {

      try {

        const res =
          await api.post(
            `/projects/${projectId}/compute-execution`
          )

        setExecutionPlan(
          res.data
        )

      } catch (error) {

        console.log(error)
      }
    }

  // =========================
  // SAVE EDIT TASK
  // =========================

  const saveEditTask =
    async () => {

      try {

        await api.put(
          `/tasks/${editingTask._id}`,
          editingTask
        )

        setEditingTask(
          null
        )

        fetchTasks()

      } catch (error) {

        alert(
          error.response.data.message
        )
      }
    }

  return (

    <>

      <Navbar />
      {/* <BackButton /> */}

      <div className="container mt-4">

        <div className="d-flex justify-content-between align-items-center mb-4">

          <h2>
            Project Tasks
          </h2>

          <button
            className="btn btn-dark"
            onClick={
              computeExecution
            }
          >
            Compute Execution
          </button>

        </div>

        {/* Execution Plan */}

        {
          executionPlan.length > 0 && (

            <div className="card p-4 mb-4">

              <h4>
                Execution Plan
              </h4>

              <ol>

                {
                  executionPlan.map(
                    task => (

                      <li
                        key={task._id}
                      >
                        {task.title}
                      </li>
                    )
                  )
                }

              </ol>

            </div>
          )
        }

        {/* Create Task */}

        <div className="card p-4 mb-4">

          <h4 className="mb-3">
            Create Task
          </h4>

          <form
            onSubmit={createTask}
          >

            <input
              type="text"
              name="title"
              placeholder="Title"
              className="form-control mb-3"
              value={taskData.title}
              onChange={
                handleChange
              }
              required
            />

            <textarea
              name="description"
              placeholder="Description"
              className="form-control mb-3"
              value={
                taskData.description
              }
              onChange={
                handleChange
              }
            />

            <input
              type="number"
              name="priority"
              placeholder="Priority"
              className="form-control mb-3"
              value={
                taskData.priority
              }
              onChange={
                handleChange
              }
            />

            <input
              type="number"
              name="estimatedHours"
              placeholder="Estimated Hours"
              className="form-control mb-3"
              value={
                taskData.estimatedHours
              }
              onChange={
                handleChange
              }
            />

            <input
              type="text"
              name="resourceTag"
              placeholder="Resource Tag"
              className="form-control mb-3"
              value={
                taskData.resourceTag
              }
              onChange={
                handleChange
              }
            />

           {/* Dependencies */}

<label className="mb-2 fw-bold">
  Select Dependencies
</label>

<select
  multiple
  className="form-control mb-3"
  value={taskData.dependencies}
  onChange={e => {

    const selectedDependencies =
      Array.from(
        e.target.selectedOptions,
        option => option.value
      )

    setTaskData({
      ...taskData,
      dependencies:
        selectedDependencies
    })
  }}
>

  {
    tasks.map(task => (

      <option
        key={task._id}
        value={task._id}
      >
        {task.title}
      </option>
    ))
  }

</select>

            <button className="btn btn-primary">

              Create Task

            </button>

          </form>

        </div>

        {/* Loading */}

        {
          loading && (
            <h5>
              Loading...
            </h5>
          )
        }

        {/* Empty State */}

        {
          tasks.length === 0 && (

            <div className="alert alert-info">

              No tasks available

            </div>
          )
        }

        {/* Task List */}

        <div className="row">

          {
            tasks.map(task => (

              <div
                className="col-md-4"
                key={task._id}
              >

                <div className="card p-3 mb-3 shadow-sm">

                  <h5>
                    {task.title}
                  </h5>

                  <p>
                    {task.description}
                  </p>

                  <p>
                    <strong>
                      Priority:
                    </strong>
                    {" "}
                    {task.priority}
                  </p>

                  <p>
                    <strong>
                      Status:
                    </strong>
                    {" "}
                    {task.status}
                  </p>

                  <p>
                    <strong>
                      Hours:
                    </strong>
                    {" "}
                    {
                      task.estimatedHours
                    }
                  </p>

                  <p>
                    <strong>
                      Resource:
                    </strong>
                    {" "}
                    {
                      task.resourceTag
                    }
                  </p>

                  <div className="d-flex flex-wrap gap-2">

                    <button
                      className="btn btn-success btn-sm"
                      onClick={() =>
                        updateStatus(
                          task._id,
                          "Running",
                          task.versionNumber
                        )
                      }
                    >
                      Run
                    </button>

                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() =>
                        updateStatus(
                          task._id,
                          "Completed",
                          task.versionNumber
                        )
                      }
                    >
                      Complete
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        updateStatus(
                          task._id,
                          "Failed",
                          task.versionNumber
                        )
                      }
                    >
                      Fail
                    </button>

                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() =>
                        retryTask(
                          task._id
                        )
                      }
                    >
                      Retry
                    </button>

                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() =>
                        getTaskHistory(
                          task._id
                        )
                      }
                    >
                      History
                    </button>

                    <button
                      className="btn btn-info btn-sm"
                      onClick={() =>
                        setEditingTask(
                          task
                        )
                      }
                    >
                      Edit
                    </button>

                  </div>

                </div>

              </div>
            ))
          }

        </div>

        {/* History */}

        {
          history.length > 0 && (

            <div className="card p-4 mt-4">

              <h4>
                Task History
              </h4>

              {
                history.map(
                  (
                    item,
                    index
                  ) => (

                    <div
                      key={index}
                      className="border-bottom mb-3"
                    >

                      <p>
                        <strong>
                          Version:
                        </strong>
                        {" "}
                        {
                          item.versionNumber
                        }
                      </p>

                      <p>
                        {item.title}
                      </p>

                    </div>
                  )
                )
              }

            </div>
          )
        }

        {/* Edit Modal */}

        {
          editingTask && (

            <div
              className="modal d-block"
              style={{
                background:
                  "rgba(0,0,0,0.5)"
              }}
            >

              <div className="modal-dialog">

                <div className="modal-content p-4">

                  <h4>
                    Edit Task
                  </h4>

                  <input
                    type="text"
                    className="form-control mb-3"
                    value={
                      editingTask.title
                    }
                    onChange={e =>
                      setEditingTask({
                        ...editingTask,
                        title:
                          e.target.value
                      })
                    }
                  />

                  <textarea
                    className="form-control mb-3"
                    value={
                      editingTask.description
                    }
                    onChange={e =>
                      setEditingTask({
                        ...editingTask,
                        description:
                          e.target.value
                      })
                    }
                  />

                  <button
                    className="btn btn-primary"
                    onClick={
                      saveEditTask
                    }
                  >
                    Save
                  </button>

                  <button
                    className="btn btn-secondary ms-2"
                    onClick={() =>
                      setEditingTask(
                        null
                      )
                    }
                  >
                    Close
                  </button>

                </div>

              </div>

            </div>
          )
        }

      </div>

    </>
  )
}

export default ProjectPage
