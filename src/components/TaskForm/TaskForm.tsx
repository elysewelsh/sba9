// Create a controlled form for adding/editing tasks



// Implement form validation



// Handle form submission



// Show validation feedback

import { useState } from 'react';
import type {Task, TaskFormProps} from '../../types'

// interface Props {}

// export interface Task {
//   id: string;
//   title: string;
//   description: string;
//   status: TaskStatus;
//   priority: TaskPriority;
//   dueDate: string;
// }

export function TaskForm({taskToEdit, onSubmit, onEditSubmit}: TaskFormProps ) {

  const [newTask, setNewTask] = useState<Task>(taskToEdit ? taskToEdit :
    {
    id: '',
    title: '',
    description: '',
    status: 'pending',
    priority: '-',
    dueDate: ''
    }); // State holds the input value

   
  const handleChange = (e:any) => {
    const { name, value } = e.target; // Destructure name and value
    setNewTask(prevNewTask => ({
        ...prevNewTask,
        [name]: value
    }));
    }; 

    const formSubmit = (e: any) => {
        e.preventDefault();
        //validation
        //try catch
        alert(`Adding New Task ID: ${newTask.id}`);
        onSubmit(newTask);
        setNewTask({
            id: '',
            title: '',
            description: '',
            status: 'pending',
            priority: '-',
            dueDate: ''
        });
    };

    function taskEdit (e: any) {
        e.preventDefault();
        alert(`Editing Task ID: ${newTask.id}`);
        onEditSubmit(newTask);
            setNewTask({
            id: '',
            title: '',
            description: '',
            status: 'pending',
            priority: '-',
            dueDate: ''
        });
    }

  return (
    <form onSubmit={taskToEdit.id !== '' ? taskEdit : formSubmit}>
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
            name="status" 
            value={newTask.status}
            onChange={(e) => {
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
            name="priority" 
            value={newTask.priority}
            onChange={(e) => {
                let priorityValue: any = e.target.value;
                priorityValue === ""? (priorityValue = "") : (priorityValue);
                setNewTask(prevNewTask => ({
                ...prevNewTask, // Spread existing state
                priority: priorityValue     // Update changed field
            }));
            }}
        >
            <option value="-"></option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
        </select>
        <label className="font-bold" htmlFor="dueDate">Due Date:</label>
        <input type="date" name="dueDate" value={newTask.dueDate} onChange={handleChange}/>
        <button type="submit">{taskToEdit.id !== '' ? "Save Changes" : "Add Task"}</button>
    </form>
  );
};

export default TaskForm;