
import { z } from 'zod'

export const productSchema = z.object({
  title: z.string().min(1, 'Le titre est requis'),
  slug: z.string().min(1, 'Le slug est requis'),
  brand: z.string().optional(),
  description: z.string().min(1, 'La description est requise'),
  priceMAD: z.number().positive('Le prix doit être positif'),
  images: z.array(z.string()).min(1, 'Au moins une image est requise'),
  metalColor: z.string().optional(),
  carat: z.string().optional(),
  categoryId: z.string().min(1, 'La catégorie est requise'),
  status: z.enum(['ACTIVE', 'HIDDEN'])
})

export const orderRequestSchema = z.object({
  productId: z.string().min(1, 'ID produit requis'),
  customerName: z.string().min(1, 'Le nom est requis'),
  phone: z.string().min(1, 'Le téléphone est requis'),
  city: z.string().min(1, 'La ville est requise'),
  address: z.string().min(1, 'L\'adresse est requise'),
  notes: z.string().optional()
})

export const contactSchema = z.object({
  name: z.string().min(1, 'Le nom est requis'),
  phone: z.string().min(1, 'Le téléphone est requis'),
  message: z.string().min(1, 'Le message est requis')
})

export const categorySchema = z.object({
  name: z.string().min(1, 'Le nom est requis'),
  slug: z.string().min(1, 'Le slug est requis'),
  type: z.enum(['Bijoux', 'Montres'])
})
