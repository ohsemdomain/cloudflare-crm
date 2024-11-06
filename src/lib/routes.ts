export const routes = {
    dashboard: '/',
    products: '/products',
    tasks: '/tasks',
  } as const
  
  export type AppRoute = typeof routes[keyof typeof routes]
  
  // Helper function to ensure type-safe navigation
  export const getRoute = (route: AppRoute): string => route