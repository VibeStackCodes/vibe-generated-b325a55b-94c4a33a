import { create } from 'zustand';
import { Task, TaskList, AppState } from '@/types';
import { STORAGE_KEYS } from '@/lib/constants';
import { getLocalStorage, setLocalStorage, generateId } from '@/lib/utils';

interface TaskStoreState extends AppState {
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTaskComplete: (id: string) => void;
  reorderTasks: (tasks: Task[]) => void;
  addList: (list: Omit<TaskList, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateList: (id: string, updates: Partial<TaskList>) => void;
  deleteList: (id: string) => void;
  selectList: (id: string | null) => void;
  reorderLists: (lists: TaskList[]) => void;
  getTasksByList: (listId: string) => Task[];
  getCompletedCount: (listId: string) => number;
  getTotalCount: (listId: string) => number;
  clearAllData: () => void;
  loadFromStorage: () => void;
}

const initialState: AppState = {
  tasks: [],
  lists: [],
  selectedListId: null,
  lastSyncTime: Date.now(),
};

export const useTaskStore = create<TaskStoreState>((set, get) => ({
  ...initialState,

  addTask: (task) => {
    const newTask: Task = {
      ...task,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    set((state) => {
      const newTasks = [...state.tasks, newTask];
      setLocalStorage(STORAGE_KEYS.TASKS, newTasks);
      return { tasks: newTasks, lastSyncTime: Date.now() };
    });
  },

  updateTask: (id, updates) => {
    set((state) => {
      const newTasks = state.tasks.map((task) =>
        task.id === id
          ? { ...task, ...updates, updatedAt: new Date().toISOString() }
          : task
      );
      setLocalStorage(STORAGE_KEYS.TASKS, newTasks);
      return { tasks: newTasks, lastSyncTime: Date.now() };
    });
  },

  deleteTask: (id) => {
    set((state) => {
      const newTasks = state.tasks.filter((task) => task.id !== id);
      setLocalStorage(STORAGE_KEYS.TASKS, newTasks);
      return { tasks: newTasks, lastSyncTime: Date.now() };
    });
  },

  toggleTaskComplete: (id) => {
    set((state) => {
      const newTasks = state.tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed, updatedAt: new Date().toISOString() }
          : task
      );
      setLocalStorage(STORAGE_KEYS.TASKS, newTasks);
      return { tasks: newTasks, lastSyncTime: Date.now() };
    });
  },

  reorderTasks: (tasks) => {
    set((state) => {
      const newTasks = tasks.map((task, index) => ({
        ...task,
        order: index,
        updatedAt: new Date().toISOString(),
      }));
      setLocalStorage(STORAGE_KEYS.TASKS, newTasks);
      return { tasks: newTasks, lastSyncTime: Date.now() };
    });
  },

  addList: (list) => {
    const newList: TaskList = {
      ...list,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    set((state) => {
      const newLists = [...state.lists, newList];
      setLocalStorage(STORAGE_KEYS.LISTS, newLists);
      return { lists: newLists, lastSyncTime: Date.now() };
    });
  },

  updateList: (id, updates) => {
    set((state) => {
      const newLists = state.lists.map((list) =>
        list.id === id
          ? { ...list, ...updates, updatedAt: new Date().toISOString() }
          : list
      );
      setLocalStorage(STORAGE_KEYS.LISTS, newLists);
      return { lists: newLists, lastSyncTime: Date.now() };
    });
  },

  deleteList: (id) => {
    set((state) => {
      const newLists = state.lists.filter((list) => list.id !== id);
      const newTasks = state.tasks.filter((task) => task.listId !== id);
      const newSelectedListId =
        state.selectedListId === id ? (newLists[0]?.id ?? null) : state.selectedListId;

      setLocalStorage(STORAGE_KEYS.LISTS, newLists);
      setLocalStorage(STORAGE_KEYS.TASKS, newTasks);
      setLocalStorage(STORAGE_KEYS.SELECTED_LIST, newSelectedListId);

      return {
        lists: newLists,
        tasks: newTasks,
        selectedListId: newSelectedListId,
        lastSyncTime: Date.now(),
      };
    });
  },

  selectList: (id) => {
    set((state) => {
      setLocalStorage(STORAGE_KEYS.SELECTED_LIST, id);
      return { selectedListId: id };
    });
  },

  reorderLists: (lists) => {
    set((state) => {
      const newLists = lists.map((list, index) => ({
        ...list,
        order: index,
        updatedAt: new Date().toISOString(),
      }));
      setLocalStorage(STORAGE_KEYS.LISTS, newLists);
      return { lists: newLists, lastSyncTime: Date.now() };
    });
  },

  getTasksByList: (listId) => {
    const state = get();
    return state.tasks
      .filter((task) => task.listId === listId)
      .sort((a, b) => a.order - b.order);
  },

  getCompletedCount: (listId) => {
    const state = get();
    return state.tasks.filter((task) => task.listId === listId && task.completed).length;
  },

  getTotalCount: (listId) => {
    const state = get();
    return state.tasks.filter((task) => task.listId === listId).length;
  },

  clearAllData: () => {
    set(() => {
      localStorage.removeItem(STORAGE_KEYS.TASKS);
      localStorage.removeItem(STORAGE_KEYS.LISTS);
      localStorage.removeItem(STORAGE_KEYS.SELECTED_LIST);
      return initialState;
    });
  },

  loadFromStorage: () => {
    const tasks = getLocalStorage<Task[]>(STORAGE_KEYS.TASKS, []);
    const lists = getLocalStorage<TaskList[]>(STORAGE_KEYS.LISTS, []);
    const selectedListId = getLocalStorage<string | null>(STORAGE_KEYS.SELECTED_LIST, null);

    set({
      tasks,
      lists,
      selectedListId,
      lastSyncTime: Date.now(),
    });
  },
}));
