import { useState } from 'react'
import type { DashboardProps, Task, TaskPriority, TaskStatus }from "../../types"
import { TaskForm } from "../TaskForm/TaskForm"
import { TaskFilter } from "../TaskFilter/TaskFilter"
import {TaskList } from "../TaskList/Tasklist"
import { formGood, localStore, progressBar, pendingCount, inProgressCount, completedCount } from "../../utils/taskUtils"

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
    const [sortOrder, setSortOrder] = useState<Task[]>(() => {
        const localStorageExists = localStorage.getItem('tasks');
        return localStorageExists ? JSON.parse(localStorageExists) : ogTasks;
    });

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
        setSortOrder(updatedTasks);
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
        setSortOrder(updatedTasks);
        localStore(updatedTasks);
    };

// when "save changes" button is clicked after editing existing task
    function handleFullEdit (newTask : Task) {
        let validateForm = formGood(newTask);
        if (validateForm[0] === "Submitted") {
            const updatedTasks = tasks.map(task => task.id === editId ? newTask : task);
            setTasks(updatedTasks);
            setSortOrder(updatedTasks);
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
            setEditId(taskId);
            setEditTask(editTask);
            window.scrollTo(0, 0);
        }
        };

// when "delete" button is clicked from within individual task
    function handleDelete(taskId: string, taskTitle: string) {
        const updatedTasks = tasks.filter(task => task.id !== taskId || task.title !== taskTitle);
        setTasks(updatedTasks);
        setSortOrder(updatedTasks);
        localStore(updatedTasks);
    };

    const totalTasks = progressBar(tasks);
    const pendingTasks = pendingCount(tasks);
    const inProgressTasks = inProgressCount(tasks);
    const completedTasks = completedCount(tasks);

    const pendingBar = (pendingTasks/totalTasks)*100
    const inProgressBar = (inProgressTasks/totalTasks)*100
    const completedBar = (completedTasks/totalTasks)*100

    // const totalTasks = 1;
    // const pendingTasks = 2;
    // const inProgressTasks = 3;
    // const completedTasks = 4;

return (
    <>
    <header className="flex justify-center bg-gray-800 p-4 text-5xl font-white text-center font-bold" >
        {text}
    </header>
    <main className="flex">
        <div className="flex flex-col">
            <TaskForm key={editId || "new"} taskToEdit={editTask} onSubmit={handleSubmit} onEditSubmit={handleFullEdit}/>
            <div className="m-4 p-4 gap-3 border-1 rounded-xl">
                <div className="flex flex-row w-full border-1">
                    
                    <div style={{ width: `${pendingBar}%` }} className="bg-gray-400 p-2">
                        Pending
                    </div>
                    <div style={{ width: `${inProgressBar}%` }} className="bg-gray-500 p-2">
                        In-Progress
                    </div>
                    <div style={{ width: `${completedBar}%` }} className="bg-gray-700 p-2">
                        Completed
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div className="flex flex-row justify-between m-4 p-4 gap-3 border-1 rounded-xl">
                <div className="flex flex-row gap-3 p-4 ">
                    <button
                        onClick={() => setSortOrder(sortedNewTasks)}
                        className="border-1 bg-gray-800 rounded-sm cursor-pointer transition-all duration-[250ms] ease-in-out hover:border-[#3182ce] focus:outline-none"
                    >
                        Sort New to Old
                    </button>
                    <button
                        onClick={() => setSortOrder(sortedOldTasks)}
                        className="border-1 bg-gray-800 rounded-sm cursor-pointer transition-all duration-[250ms] ease-in-out hover:border-[#3182ce] focus:outline-none"
                    >
                        Sort Old to New
                    </button>
                </div>
                <div>
                    <TaskFilter onFilterChange={handleFilterChange}/>
                    <p>Search Results for "{filterState.search}":</p>
                </div>
            </div>
            <TaskList tasks={filteredTasks} onStatusChange={handleStatusChange} onEdit={handleEditRequest} onDelete={handleDelete}/>
        </div>
    </main>
        
        </>
    )
}
