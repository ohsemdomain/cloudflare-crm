// src/pages/Tasks/index.tsx
import { useState } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { useStore } from '@/store'
import { Task, TaskFormData } from '@/types/task'
import { ErrorAlert } from '@/components/ui/error-alert'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { TaskForm } from '@/components/tasks/TaskForm'
import { StatusBadge } from '@/components/tasks/StatusBadge'

export const TasksPage = () => {
  const {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    loading,
    setLoading,
    setError,
  } = useStore()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [deletingTask, setDeletingTask] = useState<Task | null>(null)

  const handleCreate = async (data: TaskFormData) => {
    try {
      setLoading('tasks', true)
      const newTask: Task = {
        id: Date.now().toString(),
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      addTask(newTask)
      setIsModalOpen(false)
    } catch (error) {
      setError({
        type: 'tasks',
        message: 'Failed to create task. Please try again.',
      })
    } finally {
      setLoading('tasks', false)
    }
  }

  const handleEdit = (data: TaskFormData) => {
    if (!editingTask) return

    const updatedTask: Task = {
      ...editingTask,
      ...data,
      updatedAt: new Date().toISOString(),
    }

    updateTask(updatedTask)
    setEditingTask(null)
  }

  const handleDelete = () => {
    if (!deletingTask) return

    deleteTask(deletingTask.id)
    setDeletingTask(null)
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString()
  }

  return (
    <div className="space-y-6">
      <ErrorAlert />
      
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Tasks</h1>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Task
        </Button>
      </div>

      {loading.tasks ? (
        <LoadingSpinner />
      ) : (
        <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task: Task) => (
              <TableRow key={task.id}>
                <TableCell className="font-medium">{task.name}</TableCell>
                <TableCell className="max-w-xs truncate">
                  {task.description}
                </TableCell>
                <TableCell>{formatDate(task.dueDate)}</TableCell>
                <TableCell>
                  <StatusBadge status={task.status} />
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingTask(task)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setDeletingTask(task)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      )}

      <Dialog 
        open={isModalOpen || !!editingTask} 
        onOpenChange={(open: boolean) => {
          if (!open) {
            setIsModalOpen(false)
            setEditingTask(null)
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingTask ? 'Edit Task' : 'Add New Task'}
            </DialogTitle>
          </DialogHeader>
          <TaskForm
            initialData={editingTask || undefined}
            onSubmit={editingTask ? handleEdit : handleCreate}
            onCancel={() => {
              setIsModalOpen(false)
              setEditingTask(null)
            }}
          />
        </DialogContent>
      </Dialog>

      <Dialog
        open={!!deletingTask}
        onOpenChange={(open: boolean) => {
          if (!open) {
            setDeletingTask(null)
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>Are you sure you want to delete the task "{deletingTask?.name}"?</p>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setDeletingTask(null)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                Delete
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}