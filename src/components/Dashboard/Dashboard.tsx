import { useState } from 'react'
import type { DashboardProps, Task, TaskStatus }from "../../types"
import { TaskForm } from "../TaskForm/TaskForm"
import { TaskFilter } from "../TaskFilter/TaskFilter"

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
        priority: ""
    });

    const handleSubmit = (newTask: Task) => {
        //validation util
        setTasks(prevTasks => [...prevTasks, newTask]);
    }

    function handleFilterChange (filters: {status?: TaskStatus, priority?: 'low' | 'medium' | 'high'}) {  
        setFilterState((prevFilterState) => {return { ...prevFilterState, ...filters };});
    };

    return (
        <>
        <h1>{text}</h1>
        <TaskForm onSubmit={handleSubmit}/>
        <TaskFilter onFilterChange={handleFilterChange}/>
        </>
    )
}
