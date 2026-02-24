// Implement filtering by status and priority



// Add search functionality



// Show active filter indicators

import type { TaskFilterProps, TaskStatus} from "../../types"

export function TaskFilter ({onFilterChange}: TaskFilterProps) {
// returns dropdown menus for filtering tasks with appropriate callback functions and props
    return (
        <form className="flex gap-3 px-5 justify-center text-white">
            <label className="font-bold" htmlFor="status">Choose a filter option:</label>
            <select className="border-1 bg-gray-800 rounded-sm cursor-pointer transition-all duration-[250ms] ease-in-out hover:border-[#3182ce] focus:outline-none" id="status" onChange={(e) => {
                let statusValue: any = e.target.value;
                statusValue === ""? (statusValue = "") : (statusValue as TaskStatus);
                onFilterChange({status: statusValue});
            }}>
                <option value="">All Statuses</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In-Progress</option>
            </select>

            <label className="font-bold" htmlFor="priority">Choose a filter option:</label>
            <select className="border-1 bg-gray-800 rounded-sm cursor-pointer transition-all duration-[250ms] ease-in-out hover:border-[#3182ce] focus:outline-none" id="priority" onChange={(e) => {
              let priorityValue: any = e.target.value;
              priorityValue === ""? (priorityValue = "") : (priorityValue as 'low' | 'medium' | 'high');
              onFilterChange({priority: priorityValue});
            }}>
                <option value="">All Priorities</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
        </form>
    );
};