"use client";

import { useProfile } from "@/features/auth/hooks";
import { useLogout } from "@/features/auth/hooks";

export default function DashboardPage() {
  const { data: user, isLoading } = useProfile();
  const { mutate: logout, isPending } = useLogout();

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-sm">Cargando...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            {user && (
              <p className="text-sm text-gray-500 mt-1">
                {user.email} &mdash; <span className="capitalize">{user.role?.toLowerCase()}</span>
              </p>
            )}
          </div>
          <button
            onClick={() => logout()}
            disabled={isPending}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isPending ? "Cerrando sesión..." : "Cerrar sesión"}
          </button>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <p className="text-gray-500 text-sm">Aquí irá el contenido del dashboard.</p>
        </div>
      </div>
    </main>
  );
}
