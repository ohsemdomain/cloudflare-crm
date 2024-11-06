// src/components/products/ProductForm.tsx
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ProductFormData } from '@/types/product'

interface ProductFormProps {
  initialData?: ProductFormData
  onSubmit: (data: ProductFormData) => void
  onCancel: () => void
}

export const ProductForm = ({ initialData, onSubmit, onCancel }: ProductFormProps) => {
  const [formData, setFormData] = useState<ProductFormData>(
    initialData || {
      name: '',
      quantity: 0,
      image: ''
    }
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Product Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="quantity">Quantity</Label>
        <Input
          id="quantity"
          type="number"
          value={formData.quantity}
          onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value, 10) })}
          required
          min="0"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Image URL</Label>
        <Input
          id="image"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          required
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {initialData ? 'Update' : 'Create'} Product
        </Button>
      </div>
    </form>
  )
}