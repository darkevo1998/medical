import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PatientForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    contact: '',
    doctors: '', // Store the doctor name
  });

  const [doctors, setDoctors] = useState([]); // List of doctors

  useEffect(() => {
    // Fetch list of doctors
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users');
        // Filter doctors from the response data based on their role
        const doctorList = response.data.filter(
          (user) => user.role === 'Doctor'
        );
        setDoctors(doctorList);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/patients', formData);
    alert('Patient created successfully');
    setFormData({ name: '', dob: '', contact: '', doctors: '' }); // Reset form
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <div>
        <label className='block text-gray-700'>Patient Name</label>
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
        <label className='block text-gray-700'>Date of Birth</label>
        <input
          type='date'
          name='dob'
          value={formData.dob}
          onChange={handleChange}
          className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
          required
        />
      </div>
      <div>
        <label className='block text-gray-700'>Contact Number</label>
        <input
          type='text'
          name='contact'
          value={formData.contact}
          onChange={handleChange}
          className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
          required
        />
      </div>
      <div>
        <label className='block text-gray-700'>Doctors</label>
        <select
          name='doctors'
          value={formData.doctors}
          onChange={handleChange}
          className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
        >
          <option value=''>Select a Doctor</option> {/* Default option */}
          {doctors.map((doctor) => (
            <option key={doctor.id} value={doctor.name}>
              {doctor.name}
            </option>
          ))}
        </select>
      </div>
      <button
        type='submit'
        className='w-full py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none'
      >
        Create Patient
      </button>
    </form>
  );
};

export default PatientForm;
