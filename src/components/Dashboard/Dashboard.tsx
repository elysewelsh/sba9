import { useState } from 'react'
import type { DashboardProps, Task, TaskPriority, TaskStatus }from "../../types"
import { TaskForm } from "../TaskForm/TaskForm"
import { TaskFilter } from "../TaskFilter/TaskFilter"
import {TaskList } from "../TaskList/Tasklist"
import { formGood, localStore } from "../../utils/taskUtils"

export function Dashboard ( {text}: DashboardProps) {


// Add task statistics
// bar by task status
    // total in status divided total non-recurring tasks
// bar by due date
    // map tasks array into sorted date array, % by date, 2 bars with same inhertited styling %s
// completed daily tasks
    // completed daily recurring divided by total daily recurring
// completed weekly tasks
    //completed weekly recurring divided by total weekly recurring
// high priority tasks remaining: count


// Handle component communication


// Implement responsive layout
// Compose all components into a cohesive dashboard

    const ogTasks: Task[] = [
        {
            id: "01",
            title: "localStorage",
            description: `Save task array to localStorage`,
            status: 'pending',
            priority: 'high',
            dueDate: "2026-02-25",
        }
    ,
        {
            id: "02",
            title: "Task Statistics",
            description: `Make status bar or other information radiators on dashboard`,
            status: "pending",
            priority: 'high',
            dueDate: "2026-02-25",
        }
    ,
        {
            id: "03",
            title: "Make Tasks Editable",
            description: `Move tasks to form like blog`,
            status: "pending",
            priority: 'high',
            dueDate: "2026-02-25",
        }
    ,
        {
            id: "04",
            title: "Sort",
            description: `Implement task sorting`,
            status: "pending",
            priority: 'high',
            dueDate: "2026-02-25",
        }
    ,
        {
            id: "05",
            title: "Form Validation",
            description: `Add form validation in utils`,
            status: "pending",
            priority:'medium',
            dueDate: "2026-02-25",
        }
    ,
        {
            id: "06",
            title: "Format Dates",
            description: `Add date formatting to utils and change dueDate type to date`,
            status: "pending",
            priority: 'medium',
            dueDate:"2026-02-25",
        }
    ,
        {
            id: "07",
            title: "Styling",
            description: `Style and make responsive`,
            status: "pending",
            priority: 'low',
            dueDate:"2026-02-25",
        }
    ,
        {
            id: "08",
            title: "Move Functions to Utils",
            description: `Move functions (e.g., filtering) to utils file`,
            status: "pending",
            priority: 'low',
            dueDate:"2026-02-25",
        }
    ,
        {
            id: "09",
            title: "Move Data to App?",
            description: `Move this array of tasks to highest level? States too?`,
            status: "pending",
            priority: 'low',
            dueDate:"2026-02-25",
        }
    ,
        {
            id: "10",
            title: "Show Validation Feedback",
            description: `Add error spans, etc. to inputs, submit, and search`,
            status: "pending",
            priority: 'low',
            dueDate:"2026-02-25",
        }
    ,
        {
            id: "11",
            title: "Show Active Filter Indicators",
            description: `Add additional text to Dashboard to show current filter states`,
            status: "pending",
            priority: 'low',
            dueDate:"2026-02-25",
        }
    ,
        {
            id: "12",
            title: "Test",
            description: `Form Validators, Filtering, Sorting, Responsiveness, Component Interactions`,
            status: "pending",
            priority: 'low',
            dueDate:"2026-02-25",
        }
    ,
        {
            id: "13",
            title: "Documentation",
            description: `Comment code, README with setup instructions and Reflections, document component props and usage`,
            status: "pending",
            priority: 'low',
            dueDate:"2026-02-25",
        }
    ]


// keeps track of current state of task list (filtered?) and retrieves from local storage as initial state
    const [tasks, setTasks] = useState<Task[]>(() => {
        const localStorageExists = localStorage.getItem('tasks');
        return localStorageExists ? JSON.parse(localStorageExists) : ogTasks;
    });

// keeps track of task id to be edited
    const [editId, setEditId] = useState<string | null>(null);

// keeps track of entire task being edited and any changes to properties
    const [editTask, setEditTask] = useState<Task>(
        {
        id: '',
        title: '',
        description: '',
        status: 'pending',
        priority: '-',
        dueDate: ''
        }
    );

// keeps track of array sorting status
    const [sortOrder, setSortOrder] = useState<Task[]>(tasks);

// task array newest to oldest
    let sortedNewTasks = [...tasks].sort((a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime());

// task array oldest to newest
    let sortedOldTasks = [...tasks].sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

// keeps track of current filter state of tasks
    const [filterState, setFilterState] = useState({
        status: "",
        priority: "",
        search: "",
    });

// sets filter state
    function handleFilterChange (filters: {status?: TaskStatus, priority?: TaskPriority, search?: string}) {  
        setFilterState((prevFilterState) => {return { ...prevFilterState, ...filters };});
    };

// uses filter state to compare to tasks in tasks array
    const filteredTasks = sortOrder.filter(task => {
        const includesStatus = filterState.status === "" || task.status.includes(filterState.status);
        const includesPriority = filterState.priority === "" || task.priority.includes(filterState.priority);
        const includesSearch = filterState.search === "" || (task.title.toLowerCase().includes(filterState.search.toLowerCase()) || task.description.toLowerCase().includes(filterState.search.toLowerCase()))
        return includesStatus && includesPriority && includesSearch;
    });

// when new task submitted with add task button
    const handleSubmit = (newTask: Task) => {
        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
        localStore(updatedTasks);
        setEditTask({
                id: '',
                title: '',
                description: '',
                status: 'pending',
                priority: '-',
                dueDate: ''
                });
    };

// when status updated on individual task with dropdown
    function handleStatusChange (taskId:string, newStatus:TaskStatus) {
        const updatedTasks = tasks.map(task => task.id === taskId ? {...task, status: newStatus } : task );
        setTasks(updatedTasks);
        localStore(updatedTasks);
    };

// when "save changes" button is clicked after editing existing task
    function handleFullEdit (newTask : Task) {
        let validateForm = formGood(newTask);
        if (validateForm[0] === "Submitted") {
            const updatedTasks = tasks.map(task => task.id === editId ? newTask : task);
            setTasks(updatedTasks);
            localStore(updatedTasks);
            setEditId(null);
            setEditTask(
                {
                id: '',
                title: '',
                description: '',
                status: 'pending',
                priority: '-',
                dueDate: ''
                }
            );
        } else {
        let errorDisplay: any = Object.values(validateForm).join(' ');
        alert(`${errorDisplay}`);
        return errorDisplay;
        }
    };

// when "edit" button is clicked from inside individual task
    function handleEditRequest (taskId: string) {
        const editTask = tasks.find(task => task.id === taskId);
        if (editTask) {
            setEditId(editTask.id);
            setEditTask(editTask);
        };
    };

// when "delete" button is clicked from within individual task
    function handleDelete(taskId: string, taskTitle: string) {
        const updatedTasks = tasks.filter(task => task.id !== taskId || task.title !== taskTitle);
        setTasks(updatedTasks);
        localStore(updatedTasks);
    };


return (
        <>
        <header className="flex justify-between bg-gray-800 p-4" ></header>
        <h1 className="text-2xl font-white text-center font-bold">{text}</h1>
        <TaskForm key={editId || "new"} taskToEdit={editTask} onSubmit={handleSubmit} onEditSubmit={handleFullEdit}/>
        <button
            onClick={() => setSortOrder(sortedNewTasks)}
            className="ml-4 text-gray-500 hover:text-gray-700"
        >
            Sort New to Old
        </button>
        <button
            onClick={() => setSortOrder(sortedOldTasks)}
            className="ml-4 text-gray-500 hover:text-gray-700"
        >
            Sort Old to New
        </button>
        <TaskFilter onFilterChange={handleFilterChange}/>
        <p>Search Results for "{filterState.search}":</p>
        <TaskList tasks={filteredTasks} onStatusChange={handleStatusChange} onEdit={handleEditRequest} onDelete={handleDelete}/>
        </>
    )
}
