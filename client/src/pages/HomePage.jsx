import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./styles/HomePage.css";

const HomePage = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const tasksData = await axios.get("http://localhost:8080/api/tasks");
    setTasks(tasksData.data.tasks);
  };

  fetchTasks();

  return (
    <div className="homepage-main">
      <h1 className="homepage-title">Task List</h1>
      <div className="homepage-new-task">
        <Link to="/new" className="homepage-new-task-link">
          New Task
        </Link>
      </div>
      <div className="homepage-task-container">
        <div className="homepage-tasks-all">
          {tasks.length === 0 ? (
            <p className="no-tasks-h2">No tasks added yet.</p>
          ) : (
            tasks.map((task) => (
              <div key={task.id} className="main-task">
                <div className="homepage-task-header">
                  <h2>{task.title.toUpperCase()}</h2>
                  <div className="homepage-task-actions">
                    <Link
                      to={`/edit/${task.id}`}
                      className="homepage-task-action-edit"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={async () => {
                        await axios.delete(
                          `http://localhost:8080/api/tasks/${task.id}`
                        );
                      }}
                      className="homepage-task-action-delete"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="homepage-task-details">
                  <p>
                    <span>Description - </span>
                    {task.description}
                  </p>
                  <p>
                    <span>Status : </span>
                    {task.status}
                  </p>
                  <p>
                    <span>Due date: </span>
                    {task.due}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
