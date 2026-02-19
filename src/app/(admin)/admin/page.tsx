import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table"

export default async function AdminPage() {
  const session = await auth()

  // 🛡️ Seguridad: Si no es ADMIN, para afuera
  if (session?.user?.role !== "ADMIN") {
    redirect("/")
  }

  // 📊 Traemos toda la data de Neon en paralelo
  const [users, expenses, categories] = await Promise.all([
    prisma.user.findMany({ include: { _count: { select: { expenses: true } } } }),
    prisma.expense.findMany({ include: { user: true, category: true } }),
    prisma.category.findMany({ include: { _count: { select: { expenses: true } } } }),
  ])

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-10">
      <h1 className="text-3xl font-bold">Panel de Administración 👑</h1>

      {/* Sección de Usuarios */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Usuarios Registrados</h2>
        <div className="border rounded-lg bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead>Gastos</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${user.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' : 'bg-slate-100'}`}>
                      {user.role}
                    </span>
                  </TableCell>
                  <TableCell>{user._count.expenses}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      {/* Aquí podemos agregar más tablas para Categorías y Gastos Globales */}
    </div>
  )
}