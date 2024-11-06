// src/store/types.ts
import { Product } from '@/types/product'
import { Task } from '@/types/task'

export interface LoadingState {
  products: boolean
  tasks: boolean
}

export interface ErrorState {
  message: string | null
  type: 'products' | 'tasks' | 'general' | null
}

export interface StoreState {
  products: Product[]
  tasks: Task[]
  metrics: {
    totalProducts: number
    activeTasks: number
    totalCustomers: number
    revenue: number
  }
  loading: LoadingState
  error: ErrorState
}