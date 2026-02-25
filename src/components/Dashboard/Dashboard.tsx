import { useState } from 'react'
import type { DashboardProps, Task, TaskStatus }from "../../types"
import { TaskForm } from "../TaskForm/TaskForm"
import { TaskFilter } from "../TaskFilter/TaskFilter"
import {TaskList } from "../TaskList/Tasklist"

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

    const [tasks, setTasks] = useState<Task[]>(() => {
        const localStorageExists = localStorage.getItem('tasks');
        return localStorageExists ? JSON.parse(localStorageExists) : ogTasks;
    });

    const [filterState, setFilterState] = useState({
        status: "",
        priority: "",
        search: "",
    });

    function handleFilterChange (filters: {status?: TaskStatus, priority?: 'low' | 'medium' | 'high', search?: string}) {  
        setFilterState((prevFilterState) => {return { ...prevFilterState, ...filters };});
    };

    const handleSubmit = (newTask: Task) => {
        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
        localStore(updatedTasks);
    };

    function handleStatusChange (taskId:string, newStatus:TaskStatus) {
        const updatedTasks = tasks.map(task => task.id === taskId ? {...task, status: newStatus } : task );
        setTasks(updatedTasks);
        localStore(updatedTasks);
    };

    function handleDelete(taskId: string) {
        const updatedTasks = tasks.filter(task => task.id !== taskId);
        setTasks(updatedTasks);
        localStore(updatedTasks);
    };

    function localStore (tasks: Task[]) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const filteredTasks = tasks.filter(task => {
        const includesStatus = filterState.status === "" || task.status.includes(filterState.status);
        const includesPriority = filterState.priority === "" || task.priority.includes(filterState.priority);
        const includesSearch = filterState.search === "" || (task.title.toLowerCase().includes(filterState.search.toLowerCase()) || task.description.toLowerCase().includes(filterState.search.toLowerCase()))
        return includesStatus && includesPriority && includesSearch;
    });

    return (
        <>
        <h1>{text}</h1>
        <TaskForm onSubmit={handleSubmit}/>
        <TaskFilter onFilterChange={handleFilterChange}/>
        <p>Search Results for "{filterState.search}":</p>
        <TaskList tasks={filteredTasks} onStatusChange={handleStatusChange} onDelete={handleDelete}/>
        </>
    )
}
