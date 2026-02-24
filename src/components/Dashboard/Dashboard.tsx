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
        id: "AC",
        title: "See Alice Cooper Live",
        description: `"Does this guy know how to party or what?"`,
        status: 'pending',
        priority: 'low',
        dueDate: "November",
    }
,
    {
        id: "GR",
        title: "Refuse Gun Rack",
        description: `"I don't even own ah gun, let alone many guns that would necessitate an entire rack."`,
        status: "completed",
        priority: 'low',
        dueDate: "Yesterday",
    }
,
    {
        id: "GA",
        title: "Play Epic Drum Solo",
        description: `"Thanks. I like to play."`,
        status: "completed",
        priority: 'high',
        dueDate: "Last Month",
    }
,
    {
        id: "DE",
        title: "Visit Delaware",
        description: `"Hi. I'm in...Delaware"`,
        status: "in-progress",
        priority: 'low',
        dueDate: "2027",
    }
,
    {
        id: "WC",
        title: "Buy Excalibur",
        description: `"No Stairway!"`,
        status: "in-progress",
        priority:'high',
        dueDate: "ASAP",
    }
,
    {
        id: "BR",
        title: "Road Trip",
        description: `"If you're gonna spew, spew into this."`,
        status: "pending",
        priority: 'medium',
        dueDate:"Tonight",
    }
]
    const [tasks, setTasks] = useState<Task[]>(ogTasks);
    const [filterState, setFilterState] = useState({
        status: "",
        priority: "",
        search: "",
    });

    const handleSubmit = (newTask: Task) => {
        //validation util
        setTasks(prevTasks => [...prevTasks, newTask]);
    }

    function handleFilterChange (filters: {status?: TaskStatus, priority?: 'low' | 'medium' | 'high', search?: string}) {  
        setFilterState((prevFilterState) => {return { ...prevFilterState, ...filters };});
    };

    function handleStatusChange (taskId:string, newStatus:TaskStatus) {
        setTasks(prevTasks => prevTasks.map(task => task.id === taskId ? {...task, status: newStatus } : task));
    };

    function handleDelete (taskId:string) {
        setTasks((prevTask) => prevTask.filter(tasks => tasks.id !== taskId));
    }

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
