
import type { Task } from '../types'


// Create validation helpers

export function formGood (newTask: Task): string[] {
    const errorList: string[] = [];
    if (!newTask.id.trim()) {
        errorList.push("Please add a Task ID.");
    }
    if (!newTask.title.trim()) {
        errorList.push("Please add a Task Title.");
    }
    if (errorList.length > 0) {
        return errorList;
    }
    return ["Submitted"];
}

// localStorage
export function localStore (tasks: Task[]) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

