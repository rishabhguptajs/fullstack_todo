import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [due, setDue] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const taskData = await axios.get(`http://localhost:8080/api/tasks/${id}`);
        setTitle(taskData.data.task.title);
        setDescription(taskData.data.task.description);
        setStatus(taskData.data.task.status);
        setDue(taskData.data.task.due);
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };

    fetchTask();
  }, [id]);

  const handleChange = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8080/api/tasks/${id}`, {
        title,
        description,
        status,
        due
      });

      setTitle("");
      setDescription("");
      setStatus("");
      setDue("");

      navigate("/");
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div>
      <h1>Edit Task</h1>
      <form onSubmit={handleChange}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Status</label>
          {/* input has to be dropdown, selecing in between Pending, In-progress, and completed */}
            <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
            >
                <option value="Pending">Pending</option>
                <option value="In-progress">In-progress</option>
                <option value="Completed">Completed</option>
            </select>
        </div>
        <div>
          <label>Due</label>
          <input
            type="date"
            value={due}
            onChange={(e) => setDue(e.target.value)}
          />
        </div>
        <button type="submit">Update Task</button>
      </form>
    </div>
  );
};

export default EditPage;
