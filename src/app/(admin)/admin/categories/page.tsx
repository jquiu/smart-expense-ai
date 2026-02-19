import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table"
import { Plus, Trash2, Tag } from "lucide-react"
import { createCategory, deleteCategory } from "@/app/actions/categories"

export default async function CategoriesPage() {
  const session = await auth()

  // 🛡️ Seguridad nivel Admin
  if (session?.user?.role !== "ADMIN") redirect("/")

  const categories = await prisma.category.findMany({
    include: { _count: { select: { expenses: true } } },
    orderBy: { name: 'asc' }
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Gestión de Categorías</h1>
          <p className="text-slate-400 text-sm">Administra las etiquetas para los gastos de Medellín.</p>
        </div>
      </div>

      {/* Card de Formulario con estilo Dark */}
      <div className="bg-[#1e293b] p-6 rounded-xl border border-slate-800 shadow-xl">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Plus size={18} className="text-blue-400" />
          Nueva Categoría
        </h2>
        <form action={createCategory} className="flex flex-col md:flex-row gap-4">
          <Input
            name="name"
            placeholder="Nombre (ej: Gimnasio)"
            className="bg-[#0f172a] border-slate-700 text-white"
            required
          />
          <Input
            name="icon"
            placeholder="Icono (ej: Dumbbell)"
            className="bg-[#0f172a] border-slate-700 text-white"
          />
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white transition-all"
          >
            Guardar Categoría
          </Button>
        </form>
      </div>

      {/* Tabla de Categorías */}
      <div className="bg-[#1e293b] border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <Table>
          <TableHeader className="bg-[#0f172a]">
            <TableRow className="border-slate-800 hover:bg-transparent">
              <TableHead className="text-slate-300">Nombre</TableHead>
              <TableHead className="text-slate-300">Icono</TableHead>
              <TableHead className="text-slate-300">Total Gastos</TableHead>
              <TableHead className="text-right text-slate-300">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-10 text-slate-500">
                  No hay categorías creadas aún.
                </TableCell>
              </TableRow>
            ) : (
              categories.map((cat) => (
                <TableRow key={cat.id} className="border-slate-800 hover:bg-slate-800/50 transition-colors">
                  <TableCell className="font-medium text-white flex items-center gap-2">
                    <Tag size={14} className="text-blue-400" />
                    {cat.name}
                  </TableCell>
                  <TableCell className="text-slate-400 font-mono text-xs">{cat.icon || "—"}</TableCell>
                  <TableCell>
                    <span className="bg-blue-900/30 text-blue-400 px-2 py-1 rounded text-xs">
                      {cat._count.expenses} registros
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    {/* .bind crea una nueva versión de la función con el ID ya 'inyectado' de forma serializable */}
                    <form action={deleteCategory.bind(null, cat.id)}>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-slate-400 hover:text-red-400 hover:bg-red-400/10 transition-colors"
                        type="submit"
                      >
                        <Trash2 size={18} />
                      </Button>
                    </form>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}