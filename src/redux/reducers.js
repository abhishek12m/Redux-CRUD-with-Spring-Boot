import {
    FETCH_TASKS_SUCCESS,
    ADD_TASK_SUCCESS,
    UPDATE_TASK_SUCCESS,
    DELETE_TASK_SUCCESS,
  } from './action';
  
  const initialState = {
    tasks: [],
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_TASKS_SUCCESS:
        return {
          ...state,
          tasks: action.tasks,
        };
      case ADD_TASK_SUCCESS:
        return {
          ...state,
          tasks: [...state.tasks, action.newTask],
        };
      case UPDATE_TASK_SUCCESS:
        const updatedTaskIndex = state.tasks.findIndex(task => task.id === action.updatedTask.id);
        if (updatedTaskIndex !== -1) {
          const updatedTasks = [...state.tasks];
          updatedTasks[updatedTaskIndex] = action.updatedTask;
          return {
            ...state,
            tasks: updatedTasks,
          };
        }
        return state;
      case DELETE_TASK_SUCCESS:
        return {
          ...state,
          tasks: state.tasks.filter(task => task.id !== action.deletedTaskId),
        };
      default:
        return state;
    }
  };
  
  export default reducer;
  