// Implement list rendering with proper key management



// Handle task status updates



// Implement task addition



// Implement task deletion



// Add sorting functionality



// Add a search bar to search for tasks

import type { TaskListProps } from '../../types'
import TaskItem from './TaskItem'


export function TaskList ( {tasks, onStatusChange, onDelete}: TaskListProps) {
// iterates over tasks array and calls TaskItem component to display individual task with unique and stable key    
    const list = tasks.map((task) => {
            return (
                <div key={task.id}>
                <TaskItem  task={task} onStatusChange={onStatusChange} onDelete={onDelete}/>
                </div>
            );
        });
// display the array of formatted tasks
        return (
            <>
                {list}
            </>
        );
};