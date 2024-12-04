import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../actions/taskActions";
import { useNavigate } from "react-router-dom";
import "./AddTask.css";

function AddTask() {
  const [task, setTask] = useState({ title: "", description: "", dueDate: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddTask = (e) => {
    e.preventDefault();

    // Validate input
    if (!task.title || !task.description || !task.dueDate) {
      alert("All fields are required!");
      return;
    }

    // Add task to Redux store
    const newTaskWithId = { ...task, id: Date.now(), isCompleted: false };
    dispatch(addTask(newTaskWithId));

    // Clear form and navigate back
    setTask({ title: "", description: "", dueDate: "" });
    navigate("/"); // Navigate to the TaskList page
  };

  return (
    <div className="add-task-container">
      <h1>Add a New Task</h1>

      <form className="add-task-form" onSubmit={handleAddTask}>
        <input
          type="text"
          placeholder="Task Title"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
        />
        <textarea
          placeholder="Task Description"
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
        ></textarea>
        <input
          type="date"
          value={task.dueDate}
          onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
        />
        <button type="submit" onClick={() => navigate("/")}>Add Task</button>
      </form>

      <button
        className="back-button"
        onClick={() => navigate("/")}
      >
        Back to Home
      </button>
    </div>
  );
}

export default AddTask;
