
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

// maths

export function progressBar (tasks: Task[]): number {
const totalTasks = tasks.filter(function(task: Task){
  if (task.status !== "daily") {
    return true;
  } else {
    return false;
  }
});
return totalTasks.length;
}

export function pendingCount (tasks: Task[]): number {
const pendingTasks = tasks.filter(function(task: Task){
  if (task.status === "pending") {
    return true;
  } else {
    return false;
  }
});
return pendingTasks.length;
}

export function inProgressCount (tasks: Task[]): number {
const inProgressTasks = tasks.filter(function(task: Task){
  if (task.status === "in-progress") {
    return true;
  } else {
    return false;
  }
});
return inProgressTasks.length;
}

export function completedCount (tasks: Task[]): number {
const completedTasks = tasks.filter(function(task: Task){
  if (task.status === "completed") {
    return true;
  } else {
    return false;
  }
});
return completedTasks.length;
}