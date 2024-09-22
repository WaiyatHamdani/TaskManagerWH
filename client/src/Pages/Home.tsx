import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../CSS/Home.css'; 

interface Task {
  id: number;
  taskname: string;
  date: string;
}

// Normal function for displaying task cards
function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    try {
      const response = await axios.get('http://localhost:8080/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  }

  return (
    <div>
      <h1>Task Tracker</h1>

      {/* Display tasks in a card layout */}
      <div>
        {tasks.map((task) => (
          <label key={task.id}>
            <input type="checkbox" />
            <div className="card">
              <div className="front">{task.taskname}</div>
              <div className="back">
                <p>{task.taskname} : finish by
                 {task.date.toString()}</p>
              </div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}

export default Home;
