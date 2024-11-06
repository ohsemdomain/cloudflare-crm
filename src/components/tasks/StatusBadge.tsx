// src/components/tasks/StatusBadge.tsx
import { Badge } from '@/components/ui/badge'
import { Task } from '@/types/task'

interface StatusBadgeProps {
  status: Task['status']
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const styles = {
    'pending': 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100',
    'in-progress': 'bg-blue-100 text-blue-800 hover:bg-blue-100',
    'completed': 'bg-green-100 text-green-800 hover:bg-green-100',
  }

  const labels = {
    'pending': 'Pending',
    'in-progress': 'In Progress',
    'completed': 'Completed',
  }

  return (
    <Badge className={styles[status]} variant="outline">
      {labels[status]}
    </Badge>
  )
}