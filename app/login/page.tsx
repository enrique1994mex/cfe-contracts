"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { loginSchema, type LoginInput } from "@/features/auth/schemas";
import { useLogin } from "@/features/auth/hooks";

export default function LoginPage() {
  const { mutate: login, isPending, error } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginInput) => login(data);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md">
        {/* Brand */}
        <div className="flex items-center justify-center gap-2.5 mb-8">
          <div className="w-8 h-8 rounded-md bg-green-700 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13 2 4.09 12.97H11L10 22l9.91-11H13L13 2Z" />
            </svg>
          </div>
          <span className="font-semibold text-gray-900 tracking-tight">Simulador CFE</span>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Accent bar */}
          <div className="h-1 bg-green-700" />

          <div className="p-8">
            <h1 className="text-xl font-bold text-gray-900 mb-1">Iniciar sesión</h1>
            <p className="text-sm text-gray-500 mb-6">
              Ingresa tus credenciales para continuar
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Correo electrónico
                </label>
                <input
                  {...register("email")}
                  type="email"
                  autoComplete="email"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
                  placeholder="correo@ejemplo.com"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contraseña
                </label>
                <input
                  {...register("password")}
                  type="password"
                  autoComplete="current-password"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
                  placeholder="••••••"
                />
                {errors.password && (
                  <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>
                )}
              </div>

              {error && (
                <p className="text-sm text-red-600">
                  Credenciales incorrectas. Intenta de nuevo.
                </p>
              )}

              <button
                type="submit"
                disabled={isPending}
                className="w-full rounded-lg bg-green-700 px-4 py-2 text-sm font-medium text-white hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isPending ? "Ingresando..." : "Ingresar"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-500">
              ¿No tienes cuenta?{" "}
              <Link href="/register" className="text-green-700 hover:underline font-medium">
                Regístrate
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
