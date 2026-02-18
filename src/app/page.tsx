import { auth } from "@/auth"
import { LoginButton } from "@/components/ui/login-button"


export default async function Home() {
  // Obtenemos la sesión del lado del servidor
  const session = await auth()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-slate-50">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm flex flex-col">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4 text-slate-900">
          Smart Expense AI
        </h1>
        <p className="text-xl text-slate-600 mb-8 text-center">
          La forma inteligente de gestionar tus finanzas en Medellín.
        </p>

        {!session ? (
          <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200 w-full max-w-sm">
            <h2 className="text-lg font-semibold mb-4 text-center">Bienvenida, Jenniffer</h2>
            <p className="text-sm text-slate-500 mb-6 text-center">
              Inicia sesión para empezar a trackear tus gastos.
            </p>
            {/* AQUÍ LLAMAMOS A TU COMPONENTE */}
            <LoginButton />
          </div>
        ) : (
          <div className="text-center p-8 bg-green-50 border border-green-200 rounded-lg">
            <h2 className="text-2xl font-bold text-green-700">
              ¡Hola, {session.user?.name}! 👋
            </h2>
            <p className="text-green-600 mt-2">Ya estás conectada a Neon y Google.</p>
            <div className="mt-6 flex gap-4 justify-center">
              {/* Aquí pondremos pronto los links al Dashboard y al Admin */}
              <button className="px-4 py-2 bg-slate-900 text-white rounded-md">Ver Gastos</button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}