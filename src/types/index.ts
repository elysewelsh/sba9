export interface DashboardProps {
    text: string
}

export type TaskStatus = 'pending' | 'in-progress' | 'completed' | 'daily';
export type TaskPriority = 'low' | 'medium' | 'high' | '-';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
}
 
export interface TaskListProps {
  tasks: Task[];
  onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
  onEdit: (taskId: string) => void;
  onDelete: (taskId: string, taskTitle: string) => void;
}

export interface TaskItemProps {
  task: Task;
  onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
  onEdit: (taskId: string) => void;
  onDelete: (taskId: string, taskTitle: string) => void;
}

export interface TaskFilterProps {
  onFilterChange: (filters: {
    status?: TaskStatus;
    priority?: TaskPriority;
    search?: string
  }) => void;
}

export interface TaskFormProps {
    taskToEdit: Task,
    onSubmit: (newTask: Task) => void;
    onEditSubmit: (newTask: Task) => void;
}