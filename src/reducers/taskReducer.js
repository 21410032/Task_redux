const initialState = {
  tasks: JSON.parse(localStorage.getItem("lists")) || [], // Read tasks from localStorage
  searchQuery: "",
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TASK":
      const newTasksAdd = [...state.tasks, action.payload];
      localStorage.setItem("lists", JSON.stringify(newTasksAdd));
      return { ...state, tasks: newTasksAdd };

    case "UPDATE_TASK":
      const updatedTasks = state.tasks.map((task) =>
        task.id === action.payload.id ? { ...task, ...action.payload.updatedTask } : task
      );
      localStorage.setItem("lists", JSON.stringify(updatedTasks));
      return { ...state, tasks: updatedTasks };

    case "DELETE_TASK":
      const filteredTasks = state.tasks.filter((task) => task.id !== action.payload);
      localStorage.setItem("lists", JSON.stringify(filteredTasks));
      return { ...state, tasks: filteredTasks };

    case "SET_SEARCH_QUERY":
      return { ...state, searchQuery: action.payload };

    default:
      return state;
  }
};

export default taskReducer;
