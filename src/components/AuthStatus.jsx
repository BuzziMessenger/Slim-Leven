"use client";

import { useSession, signOut } from 'next-auth/react';
import { LogOut, User } from 'lucide-react';

export default function AuthStatus() {
  // Veilige check vooruseSession zodat Render niet crasht tijdens de build
  const sessionRes = useSession();
  const session = sessionRes ? sessionRes.data : null;
  const status = sessionRes ? sessionRes.status : "loading";

  if (status === "loading") {
    return <div className="text-sm text-gray-400">Laden...</div>;
  }

  if (session) {
    return (
      <div className="flex flex-col gap-2 p-2 bg-gray-800 rounded-lg">
        <div className="flex items-center gap-2 text-sm text-gray-200">
          <User className="h-4 w-4 text-blue-400" />
          <span className="truncate">Hi, {session?.user?.email}</span>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="w-full bg-red-600/20 hover:bg-red-600/40 text-red-400 text-xs py-1 px-2 rounded transition-colors flex items-center justify-center gap-1"
        >
          <LogOut className="h-3 w-3" /> Uitloggen
        </button>
      </div>
    );
  }

  return <div className="text-sm text-gray-400">Niet ingelogd</div>;
}
