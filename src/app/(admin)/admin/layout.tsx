import Link from "next/link"
import { LayoutDashboard, Tags, Users, Receipt, Settings, LogOut } from "lucide-react"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, href: "/admin" },
    { name: "Categorías", icon: <Tags size={20} />, href: "/admin/categories" },
    { name: "Usuarios", icon: <Users size={20} />, href: "/admin/users" },
    { name: "Gastos Globales", icon: <Receipt size={20} />, href: "/admin/expenses" },
  ]

  return (
    <div className="flex min-h-screen bg-[#0f172a] text-slate-200">
      {/* SIDEBAR */}
      <aside className="w-64 border-r border-slate-800 bg-[#1e293b] flex flex-col">
        <div className="p-6">
          <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            Smart Admin
          </h2>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-700/50 transition-colors text-slate-400 hover:text-white"
            >
              {item.icon}
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button className="flex items-center gap-3 px-4 py-3 w-full text-slate-400 hover:text-red-400 transition-colors">
            <LogOut size={20} />
            <span className="font-medium">Salir</span>
          </button>
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 overflow-y-auto bg-[#0f172a] p-8">
        <header className="mb-8 flex justify-between items-center">
          <div className="relative w-96">
            <input
              type="text"
              placeholder="Buscar..."
              className="w-full bg-[#1e293b] border-none rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-bold">
              J
            </div>
          </div>
        </header>
        {children}
      </main>
    </div>
  )
}