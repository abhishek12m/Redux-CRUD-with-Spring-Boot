import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTask } from '../api/api';
import { addTaskSuccess } from '../redux/action';
import '../App.css';

const TaskForm = () => {
  const [localTasks, setLocalTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const dispatch = useDispatch();

  const handleCreate = async () => {
    if (!title || !description) {
      setErrorMessage('Both title and description are required.');


      setTimeout(() => {
        setErrorMessage('');
      }, 3000);

      return;
    }

    const newTask = {
      title: title,
      description: description,
      completed: false,
    };

    const newLocalTask = { ...newTask, id: Date.now() };
    setLocalTasks([...localTasks, newLocalTask]);

    try {
      const createdTask = await createTask(newTask);
      dispatch(addTaskSuccess(createdTask));

      const updatedLocalTasks = localTasks.map(task =>
        task.id === newLocalTask.id ? createdTask : task
      );
      setLocalTasks(updatedLocalTasks);

      setSuccessMessage('Task created successfully.');
      setTitle('');
      setDescription('');
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      setLocalTasks(localTasks.filter(task => task.id !== newLocalTask.id));
      setErrorMessage('An error occurred while creating the task.');
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);

      return;
    }
  };

  return (
    <div className="task-form">
      <h2>Create Task</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <input
        className="input-field"
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        className="input-field"
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <button className="create-button" onClick={handleCreate}>
        Create
      </button>
    </div>
  );
};

export default TaskForm;
