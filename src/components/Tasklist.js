import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, updateTask, deleteTask, setSearchQuery } from "../actions/taskActions";
import "./Tasklist.css";

function TaskList() {
  const { tasks, searchQuery } = useSelector((state) => state.task);
  const dispatch = useDispatch();

  const [newTask, setNewTask] = useState({ title: "", description: "", dueDate: "", isCompleted: false });
  const [filter, setFilter] = useState("ALL"); // Filter state
  const [showModal, setShowModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const today = new Date().toISOString().split("T")[0];
  console.log(today)
  const filteredTasks = tasks.filter((task) => {
    switch (filter) {
      case "COMPLETED":
        return task.isCompleted;
      case "PENDING":
        return !task.isCompleted;
      case "OVERDUE":
        return !task.isCompleted && task.dueDate < today;
      default:
        return true;
    }
  }).filter((task) => task.title.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.title || !newTask.description || !newTask.dueDate) {
      alert("All fields are required!");
      return;
    }
    const newTaskWithId = { ...newTask, id: Date.now() };
    dispatch(addTask(newTaskWithId));
    setNewTask({ title: "", description: "", dueDate: "", isCompleted: false });
  };

  const confirmDelete = (id) => {
    setTaskToDelete(id);
    setShowModal(true);
  };

  const handleDeleteTask = () => {
    dispatch(deleteTask(taskToDelete));
    setShowModal(false);
    setTaskToDelete(null);
  };

  const handleUpdateTask = (task) => {
    const updatedTitle = prompt("Enter new title:", task.title) || task.title;
    const updatedDescription = prompt("Enter new description:", task.description) || task.description;
    const updatedDueDate = prompt("Enter new due date:", task.dueDate) || task.dueDate;
    const updatedIsCompleted = prompt("Completed? (true/false):", task.isCompleted) === "true";

    dispatch(
      updateTask(task.id, {
        title: updatedTitle,
        description: updatedDescription,
        dueDate: updatedDueDate,
        isCompleted: updatedIsCompleted,
      })
    );
  };

  return (
    <div>
      <h1>Task List</h1>

      <input
        type="text"
        className="search-bar"
        placeholder="Search by title..."
        value={searchQuery}
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
      />

<div className="filters">
  <button 
    className={filter === "ALL" ? "active" : ""} 
    onClick={() => setFilter("ALL")}
  >
    All Tasks
  </button>
  <button 
    className={filter === "COMPLETED" ? "active" : ""} 
    onClick={() => setFilter("COMPLETED")}
  >
    Completed Tasks
  </button>
  <button 
    className={filter === "PENDING" ? "active" : ""} 
    onClick={() => setFilter("PENDING")}
  >
    Pending Tasks
  </button>
  <button 
    className={filter === "OVERDUE" ? "active" : ""} 
    onClick={() => setFilter("OVERDUE")}
  >
    Overdue Tasks
  </button>
</div>


      <form className="task-form" onSubmit={handleAddTask}>
        <input
          type="text"
          placeholder="Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        />
        <input
          type="date"
          value={newTask.dueDate}
          onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
        />
        <input
          type="checkbox"
          checked={newTask.isCompleted}
          onChange={(e) => setNewTask({ ...newTask, isCompleted: e.target.checked })}
        />
        <label>Task Completed</label>
        <button type="submit">Add Task</button>
      </form>

      {filteredTasks.map((task) => (
        <div key={task.id} className={`card ${task.isCompleted ? "completed" : ""}`}>
          <h2>{task.title}</h2>
          <p>{task.description}</p>
          <p>Due: {task.dueDate}</p>
          <p>Status: {task.isCompleted ? "Completed" : "Not Completed"}</p>
          <button className="card-button" onClick={() => handleUpdateTask(task)}>Update</button>
          <button className="card-button delete" onClick={() => confirmDelete(task.id)}>Delete</button>
        </div>
      ))}

      {showModal && (
        <div className="modal">
          <h3>Confirm Delete</h3>
          <p>Are you sure you want to delete this task?</p>
          <button className="modal-button cancel" onClick={() => setShowModal(false)}>Cancel</button>
          <button className="modal-button confirm" onClick={handleDeleteTask}>Confirm</button>
        </div>
      )}
    </div>
  );
}

export default TaskList;
