import axios from "axios"
import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import "./styles/EditPage.css"

const EditPage = () => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState("")
  const [due, setDue] = useState("")
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const taskData = await axios.get(
          `http://localhost:8080/api/tasks/${id}`
        )
        setTitle(taskData.data.task.title)
        setDescription(taskData.data.task.description)
        setStatus(taskData.data.task.status)
        setDue(taskData.data.task.due)
      } catch (error) {
        console.error("Error fetching task:", error)
      }
    }

    fetchTask()
  }, [id])

  const handleChange = async (e) => {
    e.preventDefault()

    try {
      await axios.put(`http://localhost:8080/api/tasks/${id}`, {
        title,
        description,
        status,
        due,
      })

      setTitle("")
      setDescription("")
      setStatus("")
      setDue("")

      navigate("/")
    } catch (error) {
      console.error("Error updating task:", error)
    }
  }

  return (
    <div className="edit-task-page">
      <div className="edit-task-container">
        <h1 className="edit-task-heading">Edit Task</h1>
        <form onSubmit={handleChange} className="edit-task-form">
          <div className="edit-task-form-title">
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="edit-task-form-title-input"
            />
          </div>
          <div className="edit-task-form-desc">
            <label>Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="edit-task-form-desc-input"
            />
          </div>
          <div className="edit-task-form-status">
            <label>Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}
              className="edit-task-form-status-select"
            >
              <option value="Pending" className="edit-task-form-status-option">Pending</option>
              <option value="In-progress" className="edit-task-form-status-option">In-progress</option>
              <option value="Completed" className="edit-task-form-status-option">Completed</option>
            </select>
          </div>
          <div className="edit-task-form-due">
            <label>Due</label>
            <input
              type="date"
              value={due}
              onChange={(e) => setDue(e.target.value)}
              className="edit-task-form-due-input"
            />
          </div>
          <button type="submit" className="edit-task-update-btn">Update Task</button>
        </form>
      </div>
    </div>
  )
}

export default EditPage
