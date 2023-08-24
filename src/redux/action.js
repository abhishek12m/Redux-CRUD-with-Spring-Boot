export const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS';
export const ADD_TASK_SUCCESS = 'ADD_TASK_SUCCESS';
export const UPDATE_TASK_SUCCESS = 'UPDATE_TASK_SUCCESS';
export const DELETE_TASK_SUCCESS = 'DELETE_TASK_SUCCESS';

export const fetchTasksSuccess = (tasks) => {
  return {
    type: FETCH_TASKS_SUCCESS,
    tasks: tasks,
  };
};

export const addTaskSuccess = (newTask) => {
  return {
    type: ADD_TASK_SUCCESS,
    newTask: newTask,
  };
};

export const updateTaskSuccess = (updatedTask) => {
  return {
    type: UPDATE_TASK_SUCCESS,
    updatedTask: updatedTask,
  };
};

export const deleteTaskSuccess = (deletedTaskId) => {
  return {
    type: DELETE_TASK_SUCCESS,
    deletedTaskId: deletedTaskId,
  };
};
