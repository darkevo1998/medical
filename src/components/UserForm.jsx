import React, { useState } from 'react';
import axios from 'axios';

const UserForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Doctor',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/users', formData);
      alert('User created successfully');
      setFormData({
        name: '',
        email: '',
        role: 'Doctor',
      });
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Failed to create user');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <div>
        <label className='block text-gray-700'>Name</label>
        <input
          type='text'
          name='name'
          value={formData.name}
          onChange={handleChange}
          className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
          required
        />
      </div>
      <div>
        <label className='block text-gray-700'>Email</label>
        <input
          type='email'
          name='email'
          value={formData.email}
          onChange={handleChange}
          className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
          required
        />
      </div>
      <div>
        <label className='block text-gray-700'>Role</label>
        <select
          name='role'
          value={formData.role}
          onChange={handleChange}
          className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
        >
          <option value='Doctor'>Doctor</option>
          <option value='Nurse'>Nurse</option>
          <option value='Secretary'>Secretary</option>
        </select>
      </div>

      <button
        type='submit'
        className='w-full py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none'
      >
        Create User
      </button>
    </form>
  );
};

export default UserForm;
