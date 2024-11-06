// src/lib/routes.ts
export const routes = {
  dashboard: '/',
  products: '/products',
  tasks: '/tasks',
} as const

export type AppRoute = typeof routes[keyof typeof routes]

export const getRoute = (route: AppRoute): string => route