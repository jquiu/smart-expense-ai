"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function createCategory(formData: FormData): Promise<void> {
  const name = formData.get("name") as string
  const icon = formData.get("icon") as string

  if (!name) return

  try {
    await prisma.category.create({
      data: { name, icon: icon || null }
    })
    // Forzamos la actualización de la ruta donde está el formulario
    revalidatePath("/admin/categories")
  } catch (error) {
    console.error("Error en el servidor:", error)
  }
}

export async function deleteCategory(id: string): Promise<void> {
  try {
    await prisma.category.delete({
      where: { id }
    })

    // Esto hace que la tabla se actualice eliminando la fila visualmente
    revalidatePath("/admin/categories")
  } catch (error) {
    console.error("Error al eliminar de Neon:", error)
  }
}