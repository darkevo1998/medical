import React from 'react';

const TaskList = ({ tasks }) => {
  return (
    <div className='space-y-4'>
      {tasks.map((task) => (
        <div
          key={task._id}
          className='p-4 bg-white shadow-md rounded-md flex justify-between items-center'
        >
          <div>
            <h3 className='font-semibold text-gray-700'>{task.description}</h3>
            <p className='text-sm text-gray-500'>Deadline: {task.deadline}</p>
          </div>
          <div className='text-right'>
            <p className='text-sm text-gray-500'>
              Assigned to: {task.assignedTo.join(', ')}{' '}
              {/* Assuming assignedTo is an array */}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
