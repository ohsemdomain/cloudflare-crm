// src/types/product.ts
export interface Product {
    id: string
    name: string
    quantity: number
    image: string
    createdAt: string
    updatedAt: string
  }
  
  export interface ProductFormData {
    name: string
    quantity: number
    image: string
  }