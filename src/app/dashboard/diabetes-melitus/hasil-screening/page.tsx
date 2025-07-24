'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface ScreeningData {
  id: number;
  user_id?: number;
  patient_name?: string;
  age?: number;
  gender?: string;
  bmi?: number;
  high_blood_pressure?: number;
  blood_glucose_level?: number;
  smoking_history?: string;
  prediction_result?: string;
  prediction_score?: number;
  recommendation?: string;
  created_at?: string;
}

export default function HasilScreeningPage() {
  const [screeningData, setScreeningData] = useState<ScreeningData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchScreeningData();
  }, []);

  const fetchScreeningData = async () => {
    try {
      setLoading(true);
      console.log('🔄 Fetching screening data...');
      
      const response = await fetch('/api/diabetes-screenings');
      console.log(`📡 Response status: ${response.status}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('✅ Data received:', result);
      
      setScreeningData(Array.isArray(result.data) ? result.data : []);
      
    } catch (err) {
      console.error('❌ Error:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      setScreeningData([]);
    } finally {
      setLoading(false);
    }
  };

  const getRiskInfo = (result?: string, score?: number) => {
    const level = result?.toLowerCase() || 'rendah';
    
    switch (level) {
      case 'tinggi':
        return { 
          text: 'Berisiko Diabetes', 
          emoji: '🚨',
          bgColor: 'bg-red-50',
          textColor: 'text-red-600',
          borderColor: 'border-red-200'
        };
      case 'sedang':
        return { 
          text: 'Risiko Sedang', 
          emoji: '⚠️',
          bgColor: 'bg-yellow-50',
          textColor: 'text-yellow-600',
          borderColor: 'border-yellow-200'
        };
      default:
        return { 
          text: 'Tidak Berisiko Diabetes', 
          emoji: '✅',
          bgColor: 'bg-green-50',
          textColor: 'text-green-600',
          borderColor: 'border-green-200'
        };
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data screening...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <h2 className="text-xl font-semibold text-red-900 mb-2">❌ Error Loading Data</h2>
            <p className="text-red-700 mb-4">{error}</p>
            <div className="flex gap-3 justify-center">
              <button 
                onClick={fetchScreeningData}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                🔄 Coba Lagi
              </button>
              <Link
                href="/dashboard/diabetes-melitus"
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200"
              >
                ← Kembali
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (screeningData.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              📋
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Belum Ada Data Screening</h2>
            <p className="text-gray-600 mb-6">
              Anda belum melakukan screening diabetes. Silakan lakukan screening terlebih dahulu.
            </p>
            <div className="flex gap-3 justify-center">
              <Link
                href="/dashboard/diabetes-melitus"
                className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200"
              >
                ← Kembali
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const sortedScreeningData = screeningData.sort((a, b) => {
  const dateA = new Date(a.created_at || 0).getTime();
  const dateB = new Date(b.created_at || 0).getTime();
  return dateB - dateA; // Sort descending (terbaru dulu)
});

  const latestScreening = sortedScreeningData[0];
  const riskInfo = getRiskInfo(latestScreening.prediction_result, latestScreening.prediction_score);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              📊 Hasil Screening Diabetes Melitus
            </h1>
            <p className="text-gray-600">Dashboard hasil screening dan riwayat pemeriksaan</p>
          </div>
          <Link
            href="/dashboard/diabetes-melitus"
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200"
          >
            ← Kembali
          </Link>
        </div>

        {/* Latest Result */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-lg mb-6">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
              📈
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Hasil Screening Terbaru</h2>
              <p className="text-sm text-gray-500">
                {formatDate(latestScreening.created_at)}
              </p>
            </div>
          </div>

          {/*Risk Status*/}
          <div className={`${riskInfo.bgColor} ${riskInfo.borderColor} border rounded-lg p-4 mb-6`}>
            <div className="flex items-center">
              <span className="text-2xl mr-3">{riskInfo.emoji}</span>
              <div>
                <h3 className={`text-lg font-medium ${riskInfo.textColor}`}>
                  {riskInfo.text}
                </h3>
                <p className={`text-sm ${riskInfo.textColor}`}>
                  Skor: {latestScreening.prediction_score || 'N/A'}%
                </p>
              </div>
            </div>
          </div>

          {/* Data Display */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div>
              <p className="text-sm text-gray-500">Pasien</p>
              <p className="font-medium">{latestScreening.patient_name || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Usia</p>
              <p className="font-medium">{latestScreening.age || 'N/A'} tahun</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">BMI</p>
              <p className="font-medium">{latestScreening.bmi || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Gula Darah</p>
              <p className="font-medium">{latestScreening.blood_glucose_level || 'N/A'} mg/dL</p>
            </div>
          </div>

          {/* Recommendation */}
          {latestScreening.recommendation && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <h4 className="text-sm font-medium text-blue-800 mb-2">💡 Rekomendasi:</h4>
              <p className="text-sm text-blue-700">{latestScreening.recommendation}</p>
            </div>
          )}

          {/* Disclaimer */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-sm text-amber-700">
              <strong>⚠️ Disclaimer:</strong> Hasil ini hanya prediksi dan tidak menggantikan diagnosis medis profesional.
            </p>
          </div>
        </div>

        {/* History Table */}
        {screeningData.length > 1 && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">📈 Riwayat Screening</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tanggal</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">BMI</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Gula Darah</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hasil</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Skor</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {screeningData.map((screening) => {
                    const risk = getRiskInfo(screening.prediction_result, screening.prediction_score);
                    return (
                      <tr key={screening.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">
                          {formatDate(screening.created_at)}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900">
                          {screening.bmi || 'N/A'}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900">
                          {screening.blood_glucose_level || 'N/A'} mg/dL
                        </td>
                        <td className="px-4 py-4">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${risk.bgColor} ${risk.textColor}`}>
                            {risk.emoji} {screening.prediction_result || 'N/A'}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900">
                          {screening.prediction_score || 'N/A'}%
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}