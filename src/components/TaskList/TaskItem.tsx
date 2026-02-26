import type { TaskItemProps, TaskStatus } from "../../types";

function TaskItem({task, onStatusChange, onEdit, onDelete}: TaskItemProps) {
const priorityStyles: any = {
    low: "text-green-500",
    medium: "text-amber-500",
    high: "text-red-500"
}
// returns formatted individual task
    return (
        <div className="text-white">
            <div className="flex flex-row m-5 border-1 rounded-lg p-5 gap-5 justify-between bg-gray-700" id="orange">
                <div className="flex flex-col gap-2 justify-start" id="green">
                    <h2 className="text-2xl font-bold">{task.title}</h2>
                    <p>{task.description}</p>
                    <div className="flex flex-row gap-5 text-lg" id="pink">
                        <p>Priority: <span className={priorityStyles[task.priority]}>{task.priority}</span></p>
                        <p>Due Date: {task.dueDate}</p>
                    </div>
                </div>
                <div className="flex flex-col justify-between" id="purple">
                    <div className="flex flex-row gap-3" id="yellow">
                        <p>Status: </p>
                        <select className="border-1 bg-gray-800 rounded-sm cursor-pointer transition-all duration-[250ms] ease-in-out hover:border-[#3182ce] focus:outline-none" value={task.status} onChange={(e) => onStatusChange(task.id, (e.target.value as TaskStatus))}>
                            <option value="daily">Daily Recurring</option>
                            <option value="completed">Completed</option>
                            <option value="pending">Pending</option>
                            <option value="in-progress">In Progress</option>
                        </select>
                    <div>
                        <button className="rounded border-2 border-transparent px-8 py-4 text-lg font-semibold bg-gray-800 cursor-pointer transition-all duration-[250ms] ease-in-out hover:border-[#3182ce] focus:outline-none focus:ring-2 focus:ring-[#3182ce]" onClick={() => onEdit(task.id)}>Edit</button>
                    </div>
                    </div>
                        <button className="rounded border-2 border-transparent px-8 py-4 text-lg font-semibold bg-gray-800 cursor-pointer transition-all duration-[250ms] ease-in-out hover:border-[#3182ce] focus:outline-none focus:ring-2 focus:ring-[#3182ce]" onClick={() => onDelete(task.id, task.title)}>Delete</button>
                    </div>
            </div>
        </div>
    );
};
export default TaskItem;