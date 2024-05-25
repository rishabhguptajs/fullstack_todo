import React, { useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

const HomePage = () => {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState("")
  const [due, setDue] = useState("")

  const fetchTasks = async () => {
    const tasksData = await axios.get("http://localhost:8080/api/tasks")
    setTasks(tasksData.data.tasks)
  }

  fetchTasks()

  return (
    <div>
      <h1>Task List</h1>
      <div className="new-task">
        <Link to="/new">New Task</Link>
      </div>
      <div className="container">
        <div className="tasks-all">
          {tasks.map((task) => (
            <div key={task.id} className="task">
              <h2>{task.title}</h2>
              <p>{task.description}</p>
              <p>{task.status}</p>
              <p>{task.due}</p>
              <div className="task-actions">
                <Link to={`/edit/${task.id}`}>Edit</Link>
                <button
                  onClick={async () => {
                    await axios.delete(
                      `http://localhost:8080/api/tasks/${task.id}`
                    )
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomePage
