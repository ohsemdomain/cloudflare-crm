import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { DashboardPage } from './pages/Dashboard'
import { ProductsPage } from './pages/Products'
import { TasksPage } from './pages/Tasks'
import { routes } from './lib/routes'
import { RootLayout } from './components/layout/RootLayout'

const App = () => {
  return (
    <Router>
      <RootLayout>
        <Routes>
          <Route path={routes.dashboard} element={<DashboardPage />} />
          <Route path={routes.products} element={<ProductsPage />} />
          <Route path={routes.tasks} element={<TasksPage />} />
        </Routes>
      </RootLayout>
    </Router>
  )
}

export default App
