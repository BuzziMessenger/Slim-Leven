"use client";

import { useState } from 'react';
import { Home, Users, Briefcase, Lock, Camera, Lightbulb, User, LogIn, LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import AuthStatus from './AuthStatus';

export default function Sidebar() {
  const [activeTab, setActiveTab] = useState('Gezin');

  const navItems = [
    { name: 'Gezin', icon: <Users className="h-5 w-5" /> },
    { name: 'Huis & Veiligheid', icon: <Home className="h-5 w-5" /> },
    { name: 'Werk', icon: <Briefcase className="h-5 w-5" /> },
    { name: 'Privé', icon: <Lock className="h-5 w-5" /> },
  ];

  return (
    <div className="w-64 bg-gray-900 text-white h-screen flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-xl font-bold">Persoonlijk Dashboard</h1>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.name}
            onClick={() => setActiveTab(item.name)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === item.name
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            }`}
          >
            {item.icon}
            <span>{item.name}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-700">
        <div className="space-y-4">
          {/* User Authentication */}
          <div className="flex flex-col gap-2">
            <AuthStatus />
            <div className="flex gap-2">
              <Link href="/auth/login" className="flex-1">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm transition-colors">
                  <LogIn className="h-4 w-4 inline mr-1" /> Inloggen
                </button>
              </Link>
              <Link href="/auth/register" className="flex-1">
                <button className="w-full bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-lg text-sm transition-colors">
                  <User className="h-4 w-4 inline mr-1" /> Registreren
                </button>
              </Link>
            </div>
          </div>

          {/* Smart Home Quick Access */}
          <div className="flex items-center gap-3 text-sm text-gray-400 pt-4 border-t border-gray-700">
            <Lightbulb className="h-4 w-4" />
            <span>Snelle Smart Home Toegang</span>
          </div>
        </div>
      </div>
    </div>
  );
}