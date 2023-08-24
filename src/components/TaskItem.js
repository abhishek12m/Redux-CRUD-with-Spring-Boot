import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateTask, deleteTask } from '../api/api';
import { updateTaskSuccess, deleteTaskSuccess } from '../redux/action';
import '../App.css';

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    const updatedTask = {
      ...task,
      title: editedTitle,
      description: editedDescription,
    };

    try {
      const updatedTaskResponse = await updateTask(task.id, updatedTask);
      dispatch(updateTaskSuccess(updatedTaskResponse));
      setIsEditing(false);
      setUpdateSuccess(true);
    } catch (error) {
      console.error(`Error updating task with id ${task.id}:`, error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTask(task.id);
      dispatch(deleteTaskSuccess(task.id));
      setDeleteSuccess(true);
    } catch (error) {
      console.error(`Error deleting task with id ${task.id}:`, error);
    }
  };

  useEffect(() => {
    if (updateSuccess) {
      const timeout = setTimeout(() => {
        setUpdateSuccess(false);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [updateSuccess]);

  useEffect(() => {
    if (deleteSuccess) {
      const timeout = setTimeout(() => {
        setDeleteSuccess(false);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [deleteSuccess]);

  return (
    <div className="task-item">
      {updateSuccess && <p className="success-message">Task updated successfully.</p>}
      {deleteSuccess && <p className="success-message">Task deleted successfully.</p>}
      {isEditing ? (
        <div className="edit-form">
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <input
            type="text"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <div>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <div className="task-actions">
            <button className="edit-button" onClick={handleEdit}>
              Update
            </button>
            <button className="delete-button" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
