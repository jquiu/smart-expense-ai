import { z } from 'zod'

export const expenseSchema = z.object({
  description: z.string().min(3, "La descripción debe tener al menos 3 caracteres"),
  amount: z.coerce.number().positive("El monto debe ser mayor a 0"),
  categoryId: z.string().min(1, "Debes seleccionar una categoría"),
  date: z.date().default(() => new Date()),
})

export type ExpenseFormValues = z.infer<typeof expenseSchema>