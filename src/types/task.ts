// src/types/task.ts
export interface Task {
    id: string
    name: string
    description: string
    dueDate: string
    status: 'pending' | 'in-progress' | 'completed'
    createdAt: string
    updatedAt: string
  }
  
  export interface TaskFormData {
    name: string
    description: string
    dueDate: string
    status: Task['status']
  }