// src/pages/Products/index.tsx
import { useState } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { useStore } from '@/store'
import { Product, ProductFormData } from '@/types/product'
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
import { ProductForm } from '@/components/products/ProductForm'

export const ProductsPage = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    loading,
    setLoading,
    setError,
  } = useStore()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null)

  const handleCreate = async (data: ProductFormData) => {
    try {
      setLoading('products', true)
      const newProduct: Product = {
        id: Date.now().toString(),
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      addProduct(newProduct)
      setIsModalOpen(false)
    } catch (error) {
      setError({
        type: 'products',
        message: 'Failed to create product. Please try again.',
      })
    } finally {
      setLoading('products', false)
    }
  }

  const handleEdit = (data: ProductFormData) => {
    if (!editingProduct) return

    const updatedProduct: Product = {
      ...editingProduct,
      ...data,
      updatedAt: new Date().toISOString(),
    }

    updateProduct(updatedProduct)
    setEditingProduct(null)
  }

  const handleDelete = () => {
    if (!deletingProduct) return

    deleteProduct(deletingProduct.id)
    setDeletingProduct(null)
  }

  return (
    <div className="space-y-6">
      <ErrorAlert />
      
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Products</h1>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>

      {loading.products ? (
        <LoadingSpinner />
      ) : (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product: Product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-10 w-10 rounded object-cover"
                    />
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingProduct(product)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setDeletingProduct(product)}
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
        open={isModalOpen || !!editingProduct} 
        onOpenChange={(open: boolean) => {
          if (!open) {
            setIsModalOpen(false)
            setEditingProduct(null)
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </DialogTitle>
          </DialogHeader>
          <ProductForm
            initialData={editingProduct || undefined}
            onSubmit={editingProduct ? handleEdit : handleCreate}
            onCancel={() => {
              setIsModalOpen(false)
              setEditingProduct(null)
            }}
          />
        </DialogContent>
      </Dialog>

      <Dialog
        open={!!deletingProduct}
        onOpenChange={(open: boolean) => {
          if (!open) {
            setDeletingProduct(null)
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>Are you sure you want to delete the product "{deletingProduct?.name}"?</p>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setDeletingProduct(null)}>
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
