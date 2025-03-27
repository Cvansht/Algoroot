'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/Auth';
import Navbar from '@/app/components/Navbar';
import Sidebar from '@/app/components/Sidebar';
import Table from '@/app/components/Table';

export default function Dashboard() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
    <Navbar />
    <Sidebar />
    <main className="lg:pl-64 pt-16">
      <div className="max-w-7xl mx-auto p-6">
        <Table />
      </div>
    </main>
  </div>
  );
}
