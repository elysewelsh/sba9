import { useState } from 'react';
import type {Task, TaskFormProps} from '../../types'
import { formGood } from '../../utils/taskUtils';

export function TaskForm({taskToEdit, onSubmit, onEditSubmit}: TaskFormProps ) {

// status of input, initialized to empty
const [newTask, setNewTask] = useState<Task>(taskToEdit ? taskToEdit :
    {
    id: '',
    title: '',
    description: '',
    status: 'pending',
    priority: '-',
    dueDate: ''
    }); // State holds the input value

// updates properties in new task input by field
const handleChange = (e:any) => {
    const { name, value } = e.target; // Destructure name and value
    setNewTask(prevNewTask => ({
        ...prevNewTask,
        [name]: value
    }));
    }; 

// actions taken when "submit" button clicked: default form behavior suppressed, form inputs validated, 
// onSubmit function run (adds new task to tasks array), form inputs and new task states cleared (or alert for more info)
const formSubmit = (e: any) => {
    e.preventDefault();
    const formError = formGood(newTask);
    if (formError[0] === "Submitted") {
        onSubmit(newTask);
        setNewTask({
            id: '',
            title: '',
            description: '',
            status: 'pending',
            priority: '-',
            dueDate: ''
        });
    } else {
        alert(formError.join(' '));
    }
};

// same behavior as above, but for editing
function taskEdit (e: any) {
    e.preventDefault();
    const formError = formGood(newTask);
    if (formError[0] === "Submitted" ) {
        onEditSubmit(newTask);
        setNewTask({
        id: '',
        title: '',
        description: '',
        status: 'pending',
        priority: '-',
        dueDate: ''
    });
} else {
    alert(Object.values(formError).join(' '));
}
}

  return (
    <form className="flex flex-col justify-start max-w-[30vw] m-4 p-4 gap-3 border-1 rounded-xl" onSubmit={taskToEdit.id !== '' ? taskEdit : formSubmit}>
        <label htmlFor="id">Task ID:</label>
        <input className="border-1 bg-gray-800 rounded-sm cursor-pointer transition-all duration-[250ms] ease-in-out hover:border-[#3182ce] focus:outline-none"
            type="text"
            name="id"
            value={newTask.id} // Input value is controlled by state
            onChange={handleChange} // State is updated on change
        />

        <label className="font-bold" htmlFor="title">Task Title:</label>
        <input className="border-1 bg-gray-800 rounded-sm cursor-pointer transition-all duration-[250ms] ease-in-out hover:border-[#3182ce] focus:outline-none"
            type="text"
            name="title"
            value={newTask.title} // Input value is controlled by state
            onChange={handleChange} // State is updated on change
        />

        <label className="font-bold" htmlFor="description">Task Description:</label>
        <input className="border-1 bg-gray-800 rounded-sm cursor-pointer transition-all duration-[250ms] ease-in-out hover:border-[#3182ce] focus:outline-none"
            type="text"
            name="description"
            value={newTask.description}
            onChange={handleChange}
        />
<div className="flex flex-row m-5">
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
        </div>
        <button type="submit">{taskToEdit.id !== '' ? "Save Changes" : "Add Task"}</button>
    </form>
  );
};

export default TaskForm;