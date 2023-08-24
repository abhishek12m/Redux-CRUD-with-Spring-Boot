import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>Task Manager</h1>
        <TaskForm />
        <TaskList />
      </div>
    </Provider>
  );
}

export default App;
