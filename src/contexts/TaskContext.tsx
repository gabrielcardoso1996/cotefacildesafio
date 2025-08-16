import { createContext, useContext, useReducer, ReactNode } from 'react';

export type TaskStatus = 'pending' | 'in-progress' | 'completed';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface ITask {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: Date;
  updatedAt: Date;
  assignee?: string;
  dueDate?: Date;
}

interface TaskState {
  tasks: ITask[];
  draggedTask: ITask | null;
}

type TaskAction =
  | { type: 'ADD_TASK'; payload: Omit<ITask, 'id' | 'createdAt' | 'updatedAt'> }
  | { type: 'UPDATE_TASK'; payload: { id: string; updates: Partial<ITask> } }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'MOVE_TASK'; payload: { taskId: string; newStatus: TaskStatus } }
  | { type: 'SET_DRAGGED_TASK'; payload: ITask | null }
  | { type: 'LOAD_TASKS'; payload: ITask[] };

const initialState: TaskState = {
  tasks: [],
  draggedTask: null,
};

function taskReducer(state: TaskState, action: TaskAction): TaskState {
  switch (action.type) {
    case 'ADD_TASK':
      const newTask: ITask = {
        ...action.payload,
        id: crypto.randomUUID(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      return {
        ...state,
        tasks: [...state.tasks, newTask],
      };

    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id
            ? { ...task, ...action.payload.updates, updatedAt: new Date() }
            : task
        ),
      };

    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
      };

    case 'MOVE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.taskId
            ? { ...task, status: action.payload.newStatus, updatedAt: new Date() }
            : task
        ),
      };

    case 'SET_DRAGGED_TASK':
      return {
        ...state,
        draggedTask: action.payload,
      };

    case 'LOAD_TASKS':
      return {
        ...state,
        tasks: action.payload,
      };

    default:
      return state;
  }
}

interface TaskContextType {
  state: TaskState;
  addTask: (task: Omit<ITask, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (id: string, updates: Partial<ITask>) => void;
  deleteTask: (id: string) => void;
  moveTask: (taskId: string, newStatus: TaskStatus) => void;
  setDraggedTask: (task: ITask | null) => void;
  getTasksByStatus: (status: TaskStatus) => ITask[];
  getTaskStats: () => { pending: number; inProgress: number; completed: number };
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  const addTask = (task: Omit<ITask, 'id' | 'createdAt' | 'updatedAt'>) => {
    dispatch({ type: 'ADD_TASK', payload: task });
  };

  const updateTask = (id: string, updates: Partial<ITask>) => {
    dispatch({ type: 'UPDATE_TASK', payload: { id, updates } });
  };

  const deleteTask = (id: string) => {
    dispatch({ type: 'DELETE_TASK', payload: id });
  };

  const moveTask = (taskId: string, newStatus: TaskStatus) => {
    dispatch({ type: 'MOVE_TASK', payload: { taskId, newStatus } });
  };

  const setDraggedTask = (task: ITask | null) => {
    dispatch({ type: 'SET_DRAGGED_TASK', payload: task });
  };

  const getTasksByStatus = (status: TaskStatus): ITask[] => {
    return state.tasks.filter(task => task.status === status);
  };

  const getTaskStats = () => {
    return {
      pending: getTasksByStatus('pending').length,
      inProgress: getTasksByStatus('in-progress').length,
      completed: getTasksByStatus('completed').length,
    };
  };

  const value: TaskContextType = {
    state,
    addTask,
    updateTask,
    deleteTask,
    moveTask,
    setDraggedTask,
    getTasksByStatus,
    getTaskStats,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTaskContext() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
}
