export interface Transaction {
  id: string
  value: number
  description: string
  categoryId: number
  typeId: number
  type: {
    id: number
    name: string
  }
  category: {
    id: number
    name: string
  }
  createdAt: string
  updatedAt: string
  deletedAt: string
}
