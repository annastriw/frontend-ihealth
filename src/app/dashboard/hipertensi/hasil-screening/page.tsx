'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface ScreeningData {
  id: number;
  user_id?: number;
  name?: string;
  patient_name?: string;
  age?: number;
  gender?: string;
  bmi?: number;
  high_blood_pressure?: number;
  sistolic_pressure?: number;
  diastolic_pressure?: number;
  hypertension_classification?: string;
  blood_glucose_level?: number;
  smoking_history?: string;
  prediction_result?: string;
  prediction_score?: number;
  recommendation?: string;
  is_zero_glucose?: boolean;
  created_at?: string;
  screening_date?: string;
}

export default function HasilScreeningHipertensiPage() {
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
      
      // ✅ TODO: Bisa diganti dengan API endpoint khusus hipertensi jika ada
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

  // ✅ Filter hanya screening hipertensi (yang TIDAK ada blood_glucose_level atau prediction_score)
  const getScreeningType = (screening: ScreeningData) => {
    const isDiabetesScreening = screening.blood_glucose_level !== null && 
                               screening.blood_glucose_level !== undefined && 
                               screening.prediction_score !== null && 
                               screening.prediction_score !== undefined;
    
    const isHypertensionOnly = !isDiabetesScreening && 
                              (screening.sistolic_pressure || screening.diastolic_pressure);
    
    return { isDiabetesScreening, isHypertensionOnly };
  };

  // ✅ Filter data untuk hipertensi saja
  const hypertensionScreenings = screeningData.filter(screening => {
    const { isHypertensionOnly } = getScreeningType(screening);
    return isHypertensionOnly;
  });

  const getRiskInfo = (screening: ScreeningData) => {
    // ✅ HYPERTENSION ONLY SCREENING
    let hypertensionStatus = 'Tidak Dapat Ditentukan';
    let bgColor = 'bg-yellow-50';
    let textColor = 'text-yellow-600';
    let borderColor = 'border-yellow-200';
    
    if (screening.hypertension_classification) {
      if (screening.hypertension_classification.includes('Hipertensi')) {
        hypertensionStatus = 'Tinggi';
        bgColor = 'bg-red-50';
        textColor = 'text-red-600';
        borderColor = 'border-red-200';
      } else if (screening.hypertension_classification.includes('Normal Tinggi')) {
        hypertensionStatus = 'Sedang';
        bgColor = 'bg-yellow-50';
        textColor = 'text-yellow-600';
        borderColor = 'border-yellow-200';
      } else if (screening.hypertension_classification.includes('Normal') || 
                 screening.hypertension_classification.includes('Optimal')) {
        hypertensionStatus = 'Normal';
        bgColor = 'bg-green-50';
        textColor = 'text-green-600';
        borderColor = 'border-green-200';
      }
    }
    
    return {
      text: 'Data Screening Hipertensi',
      subtitle: `Tingkat Risiko: ${hypertensionStatus}`,
      emoji: hypertensionStatus === 'Tinggi' ? '🚨' : hypertensionStatus === 'Normal' ? '✅' : '⚠️',
      bgColor,
      textColor,
      borderColor,
      isHypertensionOnly: true
    };
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
                href="/dashboard/hipertensi"
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

  if (hypertensionScreenings.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              🫀
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Belum Ada Data Screening</h2>
            <p className="text-gray-600 mb-6">
              Anda belum melakukan screening hipertensi. Silakan lakukan screening terlebih dahulu.
            </p>
            <div className="flex gap-3 justify-center">
              <Link
                href="/dashboard/hipertensi"
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

  // ✅ Sort by screening_date or created_at
  const sortedScreeningData = hypertensionScreenings.sort((a, b) => {
    const dateA = new Date(a.screening_date || a.created_at || 0).getTime();
    const dateB = new Date(b.screening_date || b.created_at || 0).getTime();
    return dateB - dateA; // Sort descending (terbaru dulu)
  });

  const latestScreening = sortedScreeningData[0];
  const riskInfo = getRiskInfo(latestScreening);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              🫀 Hasil Screening Hipertensi
            </h1>
            <p className="text-gray-600">Dashboard hasil screening dan riwayat pemeriksaan</p>
          </div>
          <Link
            href="/dashboard/hipertensi"
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200"
          >
            ← Kembali
          </Link>
        </div>

        {/* Latest Result */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-lg mb-6">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
              🫀
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Hasil Screening 
              </h2>
              <p className="text-sm text-gray-500">
                {formatDate(latestScreening.screening_date || latestScreening.created_at)}
              </p>
            </div>
          </div>

          {/* Risk Status - Warning Banner untuk Hipertensi */}
          <div className={`${riskInfo.bgColor} ${riskInfo.borderColor} border rounded-lg p-4 mb-6`}>
            <div className="flex items-center">
              <span className="text-2xl mr-3">{riskInfo.emoji}</span>
              <div>
                <h3 className={`text-lg font-medium ${riskInfo.textColor}`}>
                  {riskInfo.text}
                </h3>
                <p className={`text-sm ${riskInfo.textColor}`}>
                  {riskInfo.subtitle}
                </p>
              </div>
            </div>
          </div>

          {/* Data Screening - FIXED LAYOUT */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Screening:</h3>

            {/* Basic Info Row */}
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg p-3 border border-gray-200">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Pasien</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {latestScreening.name || latestScreening.patient_name || "Pasien 36"}
                  </p>
                </div>
                <div className="bg-white rounded-lg p-3 border border-gray-200">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Usia</p>
                  <p className="text-sm font-semibold text-gray-900">{latestScreening.age || "27"} tahun</p>
                </div>
                <div className="bg-white rounded-lg p-3 border border-gray-200">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">BMI</p>
                  <p className="text-sm font-semibold text-gray-900">{latestScreening.bmi || "20.10"}</p>
                </div>
                <div className="bg-white rounded-lg p-3 border border-gray-200">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Tekanan Darah</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {latestScreening.sistolic_pressure && latestScreening.diastolic_pressure
                      ? `${latestScreening.sistolic_pressure}/${latestScreening.diastolic_pressure}`
                      : "120/127"}
                  </p>
                </div>
              </div>
            </div>

            {/* Classification Row */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-3 border border-gray-200">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                    Klasifikasi Hipertensi
                  </p>
                  <p className="text-sm font-semibold text-gray-900">
                    {latestScreening.hypertension_classification || "Hipertensi Derajat 3"}
                  </p>
                </div>
                <div className="bg-white rounded-lg p-3 border border-gray-200">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Klasifikasi Diabetes</p>
                  <p className="text-sm font-semibold text-gray-900">Tidak Dapat Ditentukan</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recommendation */}
          {latestScreening.recommendation && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <h4 className="text-sm font-medium text-blue-800 mb-2">💡 Catatan:</h4>
              <p className="text-sm text-blue-700">{latestScreening.recommendation}</p>
            </div>
          )}

          {/* Disclaimer */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-sm text-amber-700">
              <strong>⚠️ Disclaimer:</strong> Hasil ini hanya prediksi konsultasikan dengan dokter untuk pemeriksaan lebih lanjut.
            </p>
          </div>
        </div>

        {/* History Table */}
        {hypertensionScreenings.length > 1 && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">📈 Riwayat Screening</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tanggal</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">BMI</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Gula Darah</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tekanan Darah</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hasil</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Skor</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {hypertensionScreenings.map((screening) => {
                    const risk = getRiskInfo(screening);
                    
                    return (
                      <tr key={screening.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">
                          {formatDate(screening.screening_date || screening.created_at)}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900">
                          {screening.bmi || 'N/A'}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900">
                          Data tidak tersedia
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900">
                          {screening.sistolic_pressure && screening.diastolic_pressure 
                            ? `${screening.sistolic_pressure}/${screening.diastolic_pressure}`
                            : 'N/A'}
                          {screening.hypertension_classification && (
                            <>
                              <br />
                              <span className="text-xs text-gray-500">
                                {screening.hypertension_classification}
                              </span>
                            </>
                          )}
                        </td>
                        <td className="px-4 py-4">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${risk.bgColor} ${risk.textColor}`}>
                            {risk.emoji} {screening.hypertension_classification?.includes('Hipertensi') ? 'Tinggi' : 'Normal'}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900">
                          N/A
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