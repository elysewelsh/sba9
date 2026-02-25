import { useState } from 'react'
import type { Task } from '../types'
// Implement task filtering logic



// Add sorting functions



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
// Add date formatting utilities

