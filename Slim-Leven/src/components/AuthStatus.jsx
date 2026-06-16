"use client";

import { useSession } from 'next-auth/react';
import { User, LogOut } from 'lucide-react';

export default function AuthStatus() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-between bg-gray-700 rounded-lg p-3">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 bg-gray-600 rounded-full animate-pulse"></div>
          <div className="space-y-1">
            <div className="h-3 bg-gray-600 rounded w-24 animate-pulse"></div>
            <div className="h-2 bg-gray-600 rounded w-16 animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (session) {
    return (
      <div className="flex items-center justify-between bg-gray-700 rounded-lg p-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
            {session.user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-medium text-white">{session.user.name}</p>
            <p className="text-xs text-gray-400">{session.user.email}</p>
          </div>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: '/auth/login' })}
          className="text-gray-400 hover:text-white transition-colors"
          title="Uitloggen"
        >
          <LogOut className="h-5 w-5" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center bg-gray-700 rounded-lg p-3">
      <p className="text-sm text-gray-400">Niet ingelogd</p>
    </div>
  );
}