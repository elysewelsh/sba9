export interface DashboardProps {
    text: string
}

export type TaskStatus = 'pending' | 'in-progress' | 'completed' | 'recurring daily';
export type TaskPriority = 'low' | 'medium' | 'high' | '';

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
  onDelete: (taskId: string) => void;
}

export interface TaskItemProps {
  task: Task;
  onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
  onDelete: (taskId: string) => void;
}

export interface TaskFilterProps {
  onFilterChange: (filters: {
    status?: TaskStatus;
    priority?: 'low' | 'medium' | 'high';
    search?: string
  }) => void;
}

export interface IFilterProp {
    status?: string,
    priority?: string
}

export interface TaskFormProps {
    onSubmit: (newTask: Task) => void;
}