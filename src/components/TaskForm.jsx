import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskForm = () => {
  const [formData, setFormData] = useState({
    description: '',
    deadline: '',
    assignedTo: [], // Store assigned user IDs as an array
  });

  const [users, setUsers] = useState([]); // List of users

  useEffect(() => {
    // Fetch list of users (e.g., doctors, all users)
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users');
        console.log(response.data);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Handle multi-select for assigned users
    if (name === 'assignedTo') {
      if (type === 'checkbox') {
        setFormData((prev) => ({
          ...prev,
          assignedTo: checked
            ? [...prev.assignedTo, value] // Add the user ID if checked
            : prev.assignedTo.filter((id) => id !== value), // Remove the user ID if unchecked
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the task creation request, including the assignedTo array
      await axios.post('http://localhost:5000/api/tasks', formData);
      alert('Task created successfully');
      setFormData({ description: '', deadline: '', assignedTo: [] });
    } catch (error) {
      console.error('Error creating task:', error);
      alert('Failed to create task');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <div>
        <label className='block text-gray-700'>Task Description</label>
        <input
          type='text'
          name='description'
          value={formData.description}
          onChange={handleChange}
          className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
          required
        />
      </div>
      <div>
        <label className='block text-gray-700'>Deadline</label>
        <input
          type='date'
          name='deadline'
          value={formData.deadline}
          onChange={handleChange}
          className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
          required
        />
      </div>
      <div>
        <label className='block text-gray-700'>Assigned To</label>
        <div className='space-y-2'>
          {users.map((user) => (
            <div key={user.id} className='flex items-center'>
              <input
                type='checkbox'
                name='assignedTo'
                value={user.id}
                checked={formData.assignedTo.includes(user.id.toString())}
                onChange={handleChange}
                className='mr-2'
              />
              <span>
                {user.name} ({user.role})
              </span>
            </div>
          ))}
        </div>
      </div>
      <button
        type='submit'
        className='w-full py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none'
      >
        Create Task
      </button>
    </form>
  );
};

export default TaskForm;
