"use client";

import { useUsers } from "@/features/users/hooks";
import { Spinner } from "@/components/ui/Spinner";

export function UserList() {
  const { data: users, isLoading, isError } = useUsers();

  if (isLoading) {
    return (
      <div className="flex justify-center py-24">
        <Spinner size="lg" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-24 text-sm text-red-500">
        No se pudieron cargar los usuarios.
      </div>
    );
  }

  return (
    <>
      <div className="mb-4">
        <h2 className="text-base font-semibold text-gray-900">Usuarios</h2>
        <p className="text-xs text-gray-400 mt-0.5">
          {users?.length ?? 0} {users?.length === 1 ? "usuario registrado" : "usuarios registrados"}
        </p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">
                ID
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">
                Email
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users?.map((user) => (
              <tr key={user.id}>
                <td className="px-4 py-3 text-gray-400 tabular-nums">{user.id}</td>
                <td className="px-4 py-3 text-gray-700">{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
