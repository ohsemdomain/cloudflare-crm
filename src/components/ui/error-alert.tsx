// src/components/ui/error-alert.tsx
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useStore } from '@/store'

export const ErrorAlert = () => {
  const { error, clearError } = useStore()

  if (!error.message) return null

  return (
    <Alert variant="destructive" className="mb-4">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription className="flex justify-between items-center">
        {error.message}
        <button
          onClick={clearError}
          className="text-sm underline hover:no-underline"
        >
          Dismiss
        </button>
      </AlertDescription>
    </Alert>
  )
}