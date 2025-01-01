import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserForm from './components/UserForm';
import PatientForm from './components/PatientForm';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList'; // Import TaskList

const apiBaseUrl = 'http://localhost:5000/api'; // Your Node.js backend URL

function App() {
  const [activeTab, setActiveTab] = useState('user');
  const [tasks, setTasks] = useState([]); // Store tasks in state

  // Fetch tasks when component mounts or when tasks are updated
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/tasks`);
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [tasks]); // Refetch tasks whenever `tasks` state changes

  const handleTaskFormSubmit = async (newTask) => {
    try {
      // Add the task to the backend
      await axios.post(`${apiBaseUrl}/tasks`, newTask);

      // After the task is successfully created, fetch the updated task list
      const response = await axios.get(`${apiBaseUrl}/tasks`);
      setTasks(response.data); // Update the tasks state with the new list

      alert('Task created successfully');
    } catch (error) {
      console.error('Error creating task:', error);
      alert('Failed to create task');
    }
  };

  return (
    <div className='min-h-screen bg-gray-100 p-6'>
      <h1 className='text-4xl font-bold text-center text-indigo-600 mb-8'>
        Medical Practice Management
      </h1>

      <div className='flex justify-center gap-8 mb-6'>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === 'user' ? 'text-white bg-indigo-600' : 'text-gray-700'
          } rounded-md`}
          onClick={() => setActiveTab('user')}
        >
          User Management
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === 'patient'
              ? 'text-white bg-indigo-600'
              : 'text-gray-700'
          } rounded-md`}
          onClick={() => setActiveTab('patient')}
        >
          Patient Management
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === 'task' ? 'text-white bg-indigo-600' : 'text-gray-700'
          } rounded-md`}
          onClick={() => setActiveTab('task')}
        >
          To-Do Management
        </button>
      </div>

      <div className='bg-white shadow-lg rounded-lg p-8'>
        {activeTab === 'user' && <UserForm />}
        {activeTab === 'patient' && <PatientForm />}
        {activeTab === 'task' && (
          <div>
            <TaskForm onSubmit={handleTaskFormSubmit} />{' '}
            {/* Pass the submit handler to TaskForm */}
            <TaskList tasks={tasks} /> {/* Pass the tasks state to TaskList */}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
