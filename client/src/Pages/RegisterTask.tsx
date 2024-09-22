import axios from 'axios';
import React, { FormEvent, useState } from 'react';
import "../CSS/main.css";


function RegisterTask() {
  const [taskName, setTaskName] = useState<string>('');
  const [taskDate, setTaskDate] = useState<string>('');

  async function createTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!taskName || !taskDate) return;

    try {
      const response = await axios.post('http://localhost:8080/tasks', {
        taskname: taskName,
        date: taskDate,
      });

      setTaskName(''); // Clear input fields
      setTaskDate('');
    } catch (error) {
      console.error('Error creating task:', error);
    }
  }

  return (
    <div className="task-container">
      <form className="task-form" onSubmit={createTask}>
        <h1>Add a New Task</h1>
        <label htmlFor="taskname">Task Name</label>
        <input
          type="text"
          id="taskname"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Enter task name"
          required
        />
        <br />
        <label htmlFor="date">Task Date</label>
        <input
          type="date"
          id="date"
          value={taskDate}
          onChange={(e) => setTaskDate(e.target.value)}
          required
        />
        <br />
        <button type='submit'>Add Task</button>
      </form>
    </div>
  );
}

export default RegisterTask
