export interface Task {
  id: string;
  title: string;
  description?: string;
  listId: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
  order: number;
}

export interface TaskList {
  id: string;
  name: string;
  description?: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  order: number;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  tasks: Omit<Task, 'id' | 'listId' | 'createdAt' | 'updatedAt'>[];
  category: 'work' | 'personal' | 'health' | 'finance' | 'education';
}

export interface AppState {
  tasks: Task[];
  lists: TaskList[];
  selectedListId: string | null;
  lastSyncTime: number;
}

export interface ExportData {
  version: string;
  exportedAt: string;
  tasks: Task[];
  lists: TaskList[];
}

export type AsyncState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error };
