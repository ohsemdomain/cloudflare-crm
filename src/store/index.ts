import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { StoreState, ErrorState, LoadingState } from './types'
import { Product } from '@/types/product'
import { Task } from '@/types/task'

interface StoreActions {
  // Product actions
  addProduct: (product: Product) => void
  updateProduct: (product: Product) => void
  deleteProduct: (id: string) => void

  // Task actions
  addTask: (task: Task) => void
  updateTask: (task: Task) => void
  deleteTask: (id: string) => void

  // Metrics actions
  updateMetrics: (metrics: Partial<StoreState['metrics']>) => void

  // Loading actions
  setLoading: (key: keyof LoadingState, value: boolean) => void

  // Error actions
  setError: (error: ErrorState) => void
  clearError: () => void
}

const initialState: StoreState = {
  products: [],
  tasks: [],
  metrics: {
    totalProducts: 0,
    activeTasks: 0,
    totalCustomers: 1234,
    revenue: 12345,
  },
  loading: {
    products: false,
    tasks: false,
  },
  error: {
    message: null,
    type: null,
  },
}

export const useStore = create<StoreState & StoreActions>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,

        // Product actions
        addProduct: (product) =>
          set((state) => ({
            products: [...state.products, product],
            metrics: {
              ...state.metrics,
              totalProducts: state.metrics.totalProducts + 1,
            },
          })),

        updateProduct: (product) =>
          set((state) => ({
            products: state.products.map((p) =>
              p.id === product.id ? product : p
            ),
          })),

        deleteProduct: (id) =>
          set((state) => ({
            products: state.products.filter((p) => p.id !== id),
            metrics: {
              ...state.metrics,
              totalProducts: state.metrics.totalProducts - 1,
            },
          })),

        // Task actions
        addTask: (task) =>
          set((state) => ({
            tasks: [...state.tasks, task],
            metrics: {
              ...state.metrics,
              activeTasks: state.tasks.filter(
                (t) => t.status !== 'completed'
              ).length + 1,
            },
          })),

        updateTask: (task) =>
          set((state) => ({
            tasks: state.tasks.map((t) => (t.id === task.id ? task : t)),
            metrics: {
              ...state.metrics,
              activeTasks: state.tasks
                .map((t) => (t.id === task.id ? task : t))
                .filter((t) => t.status !== 'completed').length,
            },
          })),

        deleteTask: (id) =>
          set((state) => ({
            tasks: state.tasks.filter((t) => t.id !== id),
            metrics: {
              ...state.metrics,
              activeTasks: state.tasks
                .filter((t) => t.id !== id)
                .filter((t) => t.status !== 'completed').length,
            },
          })),

        // Metrics actions
        updateMetrics: (metrics) =>
          set((state) => ({
            metrics: { ...state.metrics, ...metrics },
          })),

        // Loading actions
        setLoading: (key, value) =>
          set((state) => ({
            loading: { ...state.loading, [key]: value },
          })),

        // Error actions
        setError: (error) => set(() => ({ error })),
        clearError: () =>
          set(() => ({ error: { message: null, type: null } })),
      }),
      {
        name: 'crm-storage',
        partialize: (state) => ({
          products: state.products,
          tasks: state.tasks,
          metrics: state.metrics,
        }),
      }
    )
  )
)