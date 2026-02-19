"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

// Cambiamos el retorno a Promise<void> para que TypeScript no pelee
export async function createCategory(formData: FormData): Promise<void> {
  const name = formData.get("name") as string
  const icon = formData.get("icon") as string

  if (!name) return;

  try {
    await prisma.category.create({
      data: { name, icon: icon || null }
    })
    revalidatePath("/admin/categories")
  } catch (error) {
    console.error("Error:", error)
  }
}

export async function deleteCategory(id: string): Promise<void> {
  try {
    await prisma.category.delete({ where: { id } })
    revalidatePath("/admin/categories")
  } catch (error) {
    console.error("Error:", error)
  }
}