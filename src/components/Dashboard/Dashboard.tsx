import type { DashboardProps, Task }from "../../types"
import { TaskForm } from "../TaskForm/TaskForm"

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
    const [tasks, setTasks] = useState(ogTasks);
    const [filterState, setFilterState] = useState({
        status: "",
        priority: ""
    });

    const handleAddTask = (newTask: Task) => {
        setTasks(prevTasks => [...prevTasks, newTask]);
    }

    return (
        <>
        <h1>{text}</h1>
        <TaskForm onSubmit={handleAddTask}/>
        </>
    )
}
