'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Debug component sederhana untuk test
// function DebugInfo() {
//   return (
//     <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
//       <h3 className="text-yellow-800 font-semibold">Debug Info</h3>
//       <p className="text-yellow-700 text-sm">
//         Page loaded successfully at {new Date().toLocaleTimeString()}
//       </p>
//     </div>
//   );
// }

function ScreeningCard() {
  return (
    <div className="mb-6">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg transition-shadow hover:shadow-xl">
        <div className="mb-4 flex items-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-500">
            <svg
              className="h-6 w-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <div className="ml-4">
            <span className="text-sm font-medium text-green-600">
              Screening
            </span>
            <h3 className="text-lg font-semibold text-gray-900">
              Screening Hipertensi
            </h3>
          </div>
        </div>
        <p className="mb-4 text-sm text-gray-600">
          Lihat hasil screening dan riwayat Hipertensi Anda
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/dashboard/hipertensi/hasil-screening"
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            <svg
              className="mr-2 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 00-2-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            Lihat Hasil Screening
          </Link>
        </div>
      </div>
    </div>
  );
}

// Fallback component jika DashboardSubModulesByTypeWrapper error
function ModulePlaceholder() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Modul Edukasi Hipertensi</h2>
      <p className="text-gray-600 mb-6">
        Pembelajaran Hipertensi terdiri dari beberapa tahapan penting, yaitu screening 
        untuk mengetahui kondisi awal, pre test untuk mengukur pemahaman awal, materi 
        edukasi, dan post test sebagai evaluasi akhir.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((module) => (
          <div key={module} className="bg-gray-100 rounded-lg p-4 h-24">
            <div className="w-full h-full bg-green-100 rounded opacity-50"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HipertensiPage() {
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Show loading state sebelum component mounted
  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  try {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-7xl mx-auto">
          {/* <DebugInfo /> */}
          <ScreeningCard />
          
          {/* Try to load DashboardSubModulesByTypeWrapper, fallback to placeholder */}
          <ErrorBoundary fallback={<ModulePlaceholder />}>
            <DynamicModuleWrapper />
          </ErrorBoundary>
        </div>
      </div>
    );
  } catch (err) {
    console.error('Page render error:', err);
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-red-600 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Something went wrong</h2>
          <p className="text-gray-600 mb-4">There was an error loading this page.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }
}

// Dynamic import untuk DashboardSubModulesByTypeWrapper
function DynamicModuleWrapper() {
  const [ModuleComponent, setModuleComponent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Try to import the component dynamically
    import('@/components/organisms/dashboard/modules/DashboardSubModulesByTypeWrapper')
      .then((module) => {
        setModuleComponent(() => module.default);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load DashboardSubModulesByTypeWrapper:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !ModuleComponent) {
    return <ModulePlaceholder />;
  }

  return <ModuleComponent type="hipertensi" withScreening />;
}

// Simple Error Boundary for React
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

// Import React untuk ErrorBoundary
import React from 'react';