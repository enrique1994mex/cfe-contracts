"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useProfile, useLogout } from "@/features/auth/hooks";
import { Button } from "@/components/ui/Button";

export function DashboardHeader() {
  const pathname = usePathname();
  const { data: user } = useProfile();
  const { mutate: logout, isPending } = useLogout();

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
      <div className="max-w-[1400px] mx-auto px-4 h-14 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="w-7 h-7 rounded-md bg-green-700 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13 2 4.09 12.97H11L10 22l9.91-11H13L13 2Z" />
            </svg>
          </div>
          <span className="font-semibold text-gray-900 text-sm tracking-tight">
            Simulador CFE
          </span>
        </div>

        {/* Nav */}
        <nav className="hidden sm:flex items-center gap-1 flex-1">
          <Link
            href="/dashboard"
            className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
              pathname === "/dashboard"
                ? "bg-green-50 text-green-700 font-medium"
                : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
            }`}
          >
            Contratos
          </Link>
          {user?.role === "ADMIN" && (
            <Link
              href="/dashboard/users"
              className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                pathname === "/dashboard/users"
                  ? "bg-green-50 text-green-700 font-medium"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              Usuarios
            </Link>
          )}
        </nav>

        {/* User + logout */}
        <div className="flex items-center gap-3 shrink-0">
          {user && (
            <div className="hidden md:flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                <span className="text-xs font-semibold text-green-700">
                  {user.email[0].toUpperCase()}
                </span>
              </div>
              <span className="text-xs text-gray-400 max-w-48 truncate">
                {user.email}
              </span>
            </div>
          )}
          <Button
            variant="secondary"
            isLoading={isPending}
            onClick={() => logout()}
            className="text-xs h-8 px-3"
          >
            Salir
          </Button>
        </div>
      </div>
    </header>
  );
}
