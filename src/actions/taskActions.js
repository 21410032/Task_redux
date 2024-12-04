export const addTask = (task) => {
  return {
    type: "ADD_TASK",
    payload: task
  }
    
  };
  
  export const updateTask = (id, updatedTask) => {
    return {type: "UPDATE_TASK",
    payload: { id, updatedTask }
  }
  };
  
  export const deleteTask = (id) => {
    return { type: "DELETE_TASK",
    payload: id
  }
  };
  
  export const setSearchQuery = (query) => {
    return { type: "SET_SEARCH_QUERY",
    payload: query
  }
  };
  