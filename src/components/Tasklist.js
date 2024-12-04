import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTask, deleteTask, setSearchQuery } from "../actions/taskActions";
import { useNavigate } from "react-router-dom";
import "./Tasklist.css";

function TaskList() {
  const { tasks, searchQuery } = useSelector((state) => state.task);
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const [filter, setFilter] = useState("ALL");
  const [showModal, setShowModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editedTask, setEditedTask] = useState({});

  const today = new Date().toISOString().split("T")[0];

  // Filter tasks
  const filteredTasks = tasks
    .filter((task) => {
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
    })
    .filter((task) => task.title.toLowerCase().includes(searchQuery.toLowerCase()));

  // Toggle task completion
  const handleToggleCompletion = (task) => {
    dispatch(updateTask(task.id, { isCompleted: !task.isCompleted }));
  };

  // Open delete modal
  const confirmDelete = (id) => {
    setTaskToDelete(id);
    setShowModal(true);
  };

  // Delete task
  const handleDeleteTask = () => {
    dispatch(deleteTask(taskToDelete));
    setShowModal(false);
    setTaskToDelete(null);
  };

  // Open edit modal with task details
  const openEditModal = (task) => {
    setEditedTask(task);
    setEditModalVisible(true);
  };

  // Handle edit task form submission
  const handleEditTask = (e) => {
    e.preventDefault();
    dispatch(updateTask(editedTask.id, editedTask));
    setEditModalVisible(false);
    setEditedTask({});
  };

  return (
    <div>
      
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Task Management</h1>
      </div>
      <div className="task-container">
        {/* Search Bar */}
        <input
          type="text"
          className="search-bar"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        />

        {/* Filters */}
        <div className="filters">
          <button className={filter === "ALL" ? "active" : ""} onClick={() => setFilter("ALL")}>
            All Tasks
          </button>
          <button className={filter === "COMPLETED" ? "active" : ""} onClick={() => setFilter("COMPLETED")}>
            Completed Tasks
          </button>
          <button className={filter === "PENDING" ? "active" : ""} onClick={() => setFilter("PENDING")}>
            Pending Tasks
          </button>
          <button className={filter === "OVERDUE" ? "active" : ""} onClick={() => setFilter("OVERDUE")}>
            Overdue Tasks
          </button>
        </div>

        {/* Task Cards */}
        <div className="task-cards">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <div key={task.id} className={`card ${task.isCompleted ? "completed" : ""}`}>
                <h2>{task.title}</h2>
                <p>{task.description}</p>
                <p>Due: {task.dueDate}</p>
                <p>Status: {task.isCompleted ? "Completed" : "Not Completed"}</p>
                <label>
                  <input
                    type="checkbox"
                    checked={task.isCompleted}
                    onChange={() => handleToggleCompletion(task)}
                  />
                  Mark as Completed
                </label>
                <div className="buttons">
                <button className="card-button delete" onClick={() => confirmDelete(task.id)}>
                  Delete
                </button>
                <button className="card-button update" onClick={() => openEditModal(task)}>
                  Update
                </button>
                </div>

                
              </div>
            ))
          ) : (
            <p>No tasks found.</p>
          )}
        </div>
      </div>
      <div style={{ textAlign: "center", marginTop: "50px" }}>
      <button
        onClick={() => navigate("/add")}
        style={{
          padding: "15px 30px",
          fontSize: "18px",
          backgroundColor: "#5c6bc0",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Add New Task
      </button>
</div>
      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="modal">
          <h3>Confirm Delete</h3>
          <p>Are you sure you want to delete this task?</p>
          <button className="modal-button cancel" onClick={() => setShowModal(false)}>
            Cancel
          </button>
          <button className="modal-button confirm" onClick={handleDeleteTask}>
            Confirm
          </button>
        </div>
      )}

      {/* Edit Task Modal */}
      {editModalVisible && (
        <div className="modal">
          <h3>Edit Task</h3>
          <form onSubmit={handleEditTask}>
            <label>
              Title:
              <input
                type="text"
                value={editedTask.title}
                onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
              />
            </label>
            <label>
              Description:
              <textarea
                value={editedTask.description}
                onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
              />
            </label>
            <label>
              Due Date:
              <input
                type="date"
                value={editedTask.dueDate}
                onChange={(e) => setEditedTask({ ...editedTask, dueDate: e.target.value })}
              />
            </label>
            <button type="submit" className="modal-button confirm">
              Save Changes
            </button>
            <button
              type="button"
              className="modal-button cancel"
              onClick={() => setEditModalVisible(false)}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default TaskList;
