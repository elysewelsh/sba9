// Create a controlled form for adding/editing tasks



// Implement form validation



// Handle form submission



// Show validation feedback

import { useState } from 'react';
import type {Task} from '../../types'

// interface Props {}

// export interface Task {
//   id: string;
//   title: string;
//   description: string;
//   status: TaskStatus;
//   priority: TaskPriority;
//   dueDate: string;
// }

export function TaskForm() {
  const [newTask, setNewTask] = useState<Task>({
    id: '',
    title: '',
    description: '',
    status: 'pending',
    priority: '',
    dueDate: ''
    }); // State holds the input value

   
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target; // Destructure name and value
    setNewTask(prevNewTask => ({
        ...prevNewTask,
        [name]: value
    }));
    }; 


  return (
    <form onSubmit={handleAddTask}>
        <label htmlFor="id">Task ID:</label>
        <input
            type="text"
            name="id"
            value={newTask.id} // Input value is controlled by state
            onChange={handleChange} // State is updated on change
        />

        <label className="font-bold" htmlFor="title">Task Title:</label>
        <input
            type="text"
            name="title"
            value={newTask.title} // Input value is controlled by state
            onChange={handleChange} // State is updated on change
        />

        <label className="font-bold" htmlFor="description">Task Description:</label>
        <input
            type="text"
            name="description"
            value={newTask.description}
            onChange={handleChange}
        />

        <label className="font-bold" htmlFor="status">Status:</label>
        <select className="border-1 bg-gray-800 rounded-sm cursor-pointer transition-all duration-[250ms] ease-in-out hover:border-[#3182ce] focus:outline-none" 
            name="status" onChange={(e) => {
            let statusValue: any = e.target.value;
            statusValue === ""? (statusValue = "") : (statusValue);
            setNewTask(prevNewTask => ({
            ...prevNewTask, // Spread existing state
            status: statusValue     // Update changed field
            }));
            }}
        >
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In-Progress</option>
            <option value="daily">Daily Recurring</option>
        </select>

        <label className="font-bold" htmlFor="priority">Priority:</label>
        <select className="border-1 bg-gray-800 rounded-sm cursor-pointer transition-all duration-[250ms] ease-in-out hover:border-[#3182ce] focus:outline-none"
            name="priority" onChange={(e) => {
            let priorityValue: any = e.target.value;
            priorityValue === ""? (priorityValue = "") : (priorityValue);
            setNewTask(prevNewTask => ({
            ...prevNewTask, // Spread existing state
            priority: priorityValue     // Update changed field
            }));
            }}
        >
            <option value=""></option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
        </select>
        <label className="font-bold" htmlFor="dueDate">Due Date:</label>
        <input type="date" name="dueDate" value={newTask.dueDate} onChange={handleChange}/>
    </form>
  );
};

export default TaskForm;