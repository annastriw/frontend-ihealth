"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  User,
  X,
  Loader2,
  CheckCircle,
  AlertCircle,
  TrendingUp,
} from "lucide-react";
import { useSession } from "next-auth/react";

interface Patient {
  id: string;
  name: string;
  age: number;
  phone?: string;
  email?: string;
  gender?: number; // 0=Laki-laki, 1=Perempuan
  heart_disease?: number;
  smoking_history?: string; // String langsung dari database
  bmi?: number;
  hypertension?: number;
}

interface ScreeningData {
  patient_id: string;
  gender: number; // 0=Laki-laki, 1=Perempuan
  age: number;
  heart_disease: number;
  smoking_history: string; // String langsung untuk ML API
  bmi: number;
  hypertension: number;
  blood_glucose_level: number;
}

interface PredictionResult {
  prediction: number;
  risk_level: string;
  risk_score: number;
  recommendation: string;
  screening_id?: string;
}

export default function MedicalDiabetesMelitusScreeningPage() {
  const { data: session } = useSession();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingPatientData, setIsLoadingPatientData] = useState(false);

  // State untuk hasil prediksi
  const [showResult, setShowResult] = useState(false);
  const [predictionResult, setPredictionResult] =
    useState<PredictionResult | null>(null);

  // Form data dengan nilai default yang benar
  const [formData, setFormData] = useState<ScreeningData>({
    patient_id: "",
    gender: 0,
    age: 0,
    heart_disease: 0,
    smoking_history: "tidak pernah merokok", // Default string value
    bmi: 0,
    hypertension: 0,
    blood_glucose_level: 0,
  });

  // Search patients dengan debounce
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchTerm.length > 2) {
        setIsSearching(true);
        // DEBUG: Log values
        console.log("Search term:", searchTerm);
        console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);
        console.log("Session:", session);
        console.log("Access token:", session?.access_token);
        
        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/patients/search?q=${searchTerm}`;
        console.log("Full API URL:", apiUrl);
        
        try {
          const response = await fetch(apiUrl, {
            headers: {
              Authorization: `Bearer ${session?.access_token}`,
              "Content-Type": "application/json",
            },
          });

          if (response.ok) {
            const data = await response.json();
            setFilteredPatients(data.data || []);
            setShowSuggestions(true);
          } else {
            setFilteredPatients([]);
          }
        } catch (error) {
          console.error("Error searching patients:", error);
          setFilteredPatients([]);
        }
        setIsSearching(false);
      } else {
        setFilteredPatients([]);
        setShowSuggestions(false);
      }
    }, 300); // Debounce 300ms

    return () => clearTimeout(timeoutId);
  }, [searchTerm, session?.access_token]);

  // Fetch detailed patient data including personal information
  const fetchPatientDetails = async (patientId: string) => {
    setIsLoadingPatientData(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/patients/${patientId}`,
        {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (response.ok) {
        const data = await response.json();
        const patientData = data.data;

        // Auto-fill form data dengan semua field
        setFormData((prev) => ({
          ...prev,
          patient_id: patientData.id,
          gender: patientData.gender || 0,
          age: patientData.age || 0,
          heart_disease: patientData.heart_disease || 0,
          smoking_history:
            patientData.smoking_history || "tidak pernah merokok", // String langsung
          bmi: patientData.bmi || 0,
          // Keep manual input fields
          hypertension: prev.hypertension,
          blood_glucose_level: prev.blood_glucose_level,
        }));

        return patientData;
      } else {
        console.error("Failed to fetch patient details");
        return null;
      }
    } catch (error) {
      console.error("Error fetching patient details:", error);
      return null;
    } finally {
      setIsLoadingPatientData(false);
    }
  };

  const handlePatientSelect = async (patient: Patient) => {
    setSelectedPatient(patient);
    setSearchTerm(patient.name);
    setShowSuggestions(false);
    setShowResult(false); // Hide previous results

    // Fetch detailed patient data and auto-fill form
    const detailedPatient = await fetchPatientDetails(patient.id);
    if (detailedPatient) {
      setSelectedPatient(detailedPatient);
    }
  };

  const clearPatient = () => {
    setSelectedPatient(null);
    setSearchTerm("");
    setShowSuggestions(false);
    setShowResult(false);
    setPredictionResult(null);
    setFormData({
      patient_id: "",
      gender: 0,
      age: 0,
      heart_disease: 0,
      smoking_history: "tidak pernah merokok",
      bmi: 0,
      hypertension: 0,
      blood_glucose_level: 0,
    });
  };

  const handleInputChange = (
    field: keyof ScreeningData,
    value: string | number,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const getDefaultRecommendation = (prediction: number): string => {
    if (prediction === 1) {
      return "Hasil screening menunjukkan risiko diabetes. Disarankan untuk segera konsultasi dengan dokter untuk pemeriksaan lebih lanjut dan mulai menerapkan pola hidup sehat.";
    } else {
      return "Hasil screening menunjukkan risiko diabetes rendah. Tetap pertahankan pola hidup sehat dengan diet seimbang dan olahraga teratur.";
    }
  };

  const getRiskColor = (prediction: number, riskLevel: string) => {
    if (prediction === 1 || riskLevel?.toLowerCase() === "tinggi") {
      return "bg-red-100 border-red-200 text-red-800";
    } else {
      return "bg-green-100 border-green-200 text-green-800";
    }
  };

  const getRiskIcon = (prediction: number, riskLevel: string) => {
    if (prediction === 1 || riskLevel?.toLowerCase() === "tinggi") {
      return <AlertCircle className="h-6 w-6 text-red-600" />;
    } else {
      return <CheckCircle className="h-6 w-6 text-green-600" />;
    }
  };

  const viewDashboard = () => {
    // Redirect ke dashboard atau buka di tab baru
    window.open("/dashboard/diabetes", "_blank");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedPatient) {
      alert("Silakan pilih pasien terlebih dahulu");
      return;
    }

    // Validasi form data
    if (!formData.age || formData.age <= 0) {
      alert("Umur harus diisi dengan benar");
      return;
    }

    if (!formData.bmi || formData.bmi <= 0) {
      alert("BMI harus diisi dengan benar");
      return;
    }

    if (!formData.blood_glucose_level || formData.blood_glucose_level <= 0) {
      alert("Kadar glukosa darah harus diisi dengan benar");
      return;
    }

    setIsSubmitting(true);
    setShowResult(false);

    try {
      console.log("Sending data:", formData); // Debug log

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/screening/diabetes`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      const result = await response.json();
      console.log("Response:", result); // Debug log

      if (response.ok) {
        // Simpan hasil prediksi ke state
        setPredictionResult({
          prediction: result.data.prediction,
          risk_level:
            result.data.risk_level ||
            (result.data.prediction === 1 ? "Tinggi" : "Rendah"),
          risk_score:
            result.data.risk_score || (result.data.prediction === 1 ? 75 : 25),
          recommendation:
            result.data.recommendation ||
            getDefaultRecommendation(result.data.prediction),
          screening_id: result.data.screening_id || result.data.id,
        });

        // Tampilkan hasil
        setShowResult(true);

        // Scroll ke hasil
        setTimeout(() => {
          const resultElement = document.getElementById("prediction-result");
          if (resultElement) {
            resultElement.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      } else {
        alert(
          `Error: ${result.meta?.message || result.message || "Gagal melakukan screening"}`,
        );
      }
    } catch (error) {
      console.error("Error submitting screening:", error);
      alert("Terjadi kesalahan saat mengirim data");
    }

    setIsSubmitting(false);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Screening Diabetes Melitus
        </h1>
        <p className="mt-2 text-gray-600">
          Panel screening diabetes untuk tenaga medis
        </p>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-xl font-semibold">Form Screening Diabetes</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Patient Search */}
          <div className="relative">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Cari Pasien
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                {isSearching ? (
                  <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
                ) : (
                  <Search className="h-5 w-5 text-gray-400" />
                )}
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-md border border-gray-300 py-2 pr-10 pl-10 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Ketik nama atau ID pasien (min. 3 karakter)..."
              />
              {selectedPatient && (
                <button
                  type="button"
                  onClick={clearPatient}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>

            {/* Suggestions Dropdown */}
            {showSuggestions && filteredPatients.length > 0 && (
              <div className="absolute z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-md border border-gray-300 bg-white shadow-lg">
                {filteredPatients.map((patient) => (
                  <div
                    key={patient.id}
                    onClick={() => handlePatientSelect(patient)}
                    className="cursor-pointer border-b border-gray-100 px-4 py-2 last:border-b-0 hover:bg-gray-100"
                  >
                    <div className="flex items-center">
                      <User className="mr-3 h-4 w-4 text-gray-400" />
                      <div>
                        <div className="font-medium text-gray-900">
                          {patient.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          ID: {patient.id} • Usia: {patient.age} tahun
                          {patient.phone && ` • ${patient.phone}`}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {showSuggestions &&
              filteredPatients.length === 0 &&
              searchTerm.length > 2 &&
              !isSearching && (
                <div className="absolute z-10 mt-1 w-full rounded-md border border-gray-300 bg-white shadow-lg">
                  <div className="px-4 py-3 text-center text-gray-500">
                    Pasien tidak ditemukan
                  </div>
                </div>
              )}
          </div>

          {/* Patient Info Display */}
          {selectedPatient && (
            <div className="rounded-md border border-blue-200 bg-blue-50 p-4">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="font-medium text-blue-900">
                  Data Pasien Terpilih:
                </h3>
                {isLoadingPatientData && (
                  <div className="flex items-center text-blue-600">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <span className="text-sm">Memuat data pasien...</span>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-1 gap-2 text-sm md:grid-cols-3">
                <div>
                  <span className="font-medium text-blue-800">ID:</span>{" "}
                  {selectedPatient.id}
                </div>
                <div>
                  <span className="font-medium text-blue-800">Nama:</span>{" "}
                  {selectedPatient.name}
                </div>
                <div>
                  <span className="font-medium text-blue-800">Usia:</span>{" "}
                  {selectedPatient.age} tahun
                </div>
                {selectedPatient.gender !== undefined && (
                  <div>
                    <span className="font-medium text-blue-800">
                      Jenis Kelamin:
                    </span>{" "}
                    {selectedPatient.gender === 1 ? "Perempuan" : "Laki-laki"}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Loading indicator for patient data */}
          {isLoadingPatientData && (
            <div className="rounded-md border border-yellow-200 bg-yellow-50 p-4">
              <div className="flex items-center">
                <Loader2 className="mr-2 h-5 w-5 animate-spin text-yellow-600" />
                <span className="text-yellow-800">
                  Sedang memuat data personal pasien...
                </span>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Gender Field */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Jenis Kelamin
                <span className="ml-1 text-red-500">*</span>
                <span className="ml-1 text-green-600">✓</span>
                <span className="ml-1 text-xs text-gray-500">(Auto-fill)</span>
              </label>
              <select
                value={formData.gender}
                onChange={(e) =>
                  handleInputChange("gender", parseInt(e.target.value))
                }
                className="w-full rounded-md border border-gray-300 bg-green-50 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
                disabled={isLoadingPatientData}
              >
                <option value="0">Laki-laki</option>
                <option value="1">Perempuan</option>
              </select>
            </div>

            {/* Age Field */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Umur (tahun)
                <span className="ml-1 text-red-500">*</span>
                <span className="ml-1 text-green-600">✓</span>
                <span className="ml-1 text-xs text-gray-500">(Auto-fill)</span>
              </label>
              <input
                type="number"
                min="1"
                max="120"
                value={formData.age || ""}
                onChange={(e) =>
                  handleInputChange("age", parseInt(e.target.value))
                }
                className="w-full rounded-md border border-gray-300 bg-green-50 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Contoh: 24"
                required
                disabled={isLoadingPatientData}
              />
              <p className="mt-1 text-xs text-gray-500">
                Masukkan angka saja, contoh: 24
              </p>
            </div>

            {/* Hypertension - Manual Input */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Tekanan Darah
                <span className="ml-1 text-red-500">*</span>
                <span className="ml-1 text-xs text-gray-500">
                  (Input Manual)
                </span>
              </label>
              <select
                value={formData.hypertension}
                onChange={(e) =>
                  handleInputChange("hypertension", parseInt(e.target.value))
                }
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              >
                <option value="0">Rendah</option>
                <option value="1">Tinggi</option>
              </select>
            </div>

            {/* Heart Disease */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Riwayat Penyakit Jantung
                <span className="ml-1 text-red-500">*</span>
                <span className="ml-1 text-green-600">✓</span>
                <span className="ml-1 text-xs text-gray-500">(Auto-fill)</span>
              </label>
              <select
                value={formData.heart_disease}
                onChange={(e) =>
                  handleInputChange("heart_disease", parseInt(e.target.value))
                }
                className="w-full rounded-md border border-gray-300 bg-green-50 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
                disabled={isLoadingPatientData}
              >
                <option value="0">Tidak</option>
                <option value="1">Ya</option>
              </select>
            </div>

            {/* Smoking History */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Riwayat Merokok
                <span className="ml-1 text-red-500">*</span>
                <span className="ml-1 text-green-600">✓</span>
                <span className="ml-1 text-xs text-gray-500">(Auto-fill)</span>
              </label>
              <select
                value={formData.smoking_history}
                onChange={(e) =>
                  handleInputChange("smoking_history", e.target.value)
                }
                className="w-full rounded-md border border-gray-300 bg-green-50 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
                disabled={isLoadingPatientData}
              >
                <option value="tidak pernah merokok">
                  Tidak Pernah Merokok
                </option>
                <option value="perokok aktif">Perokok Aktif</option>
                <option value="mantan perokok">Mantan Perokok</option>
                <option value="tidak ada informasi">Tidak Ada Informasi</option>
              </select>
            </div>

            {/* BMI */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                BMI
                <span className="ml-1 text-red-500">*</span>
                <span className="ml-1 text-green-600">✓</span>
                <span className="ml-1 text-xs text-gray-500">(Auto-fill)</span>
              </label>
              <input
                type="number"
                step="0.1"
                min="10"
                max="50"
                value={formData.bmi || ""}
                onChange={(e) =>
                  handleInputChange("bmi", parseFloat(e.target.value))
                }
                className="w-full rounded-md border border-gray-300 bg-green-50 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="BMI akan terisi otomatis"
                required
                disabled={isLoadingPatientData}
              />
              <p className="mt-1 text-xs text-gray-500">
                Contoh: 22.3, 20.8, 18.5
              </p>
            </div>

            {/* Blood Glucose Level - Manual Input */}
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Gula Darah Sewaktu (mg/dL)
                <span className="ml-1 text-red-500">*</span>
                <span className="ml-1 text-xs text-gray-500">
                  (Input Manual)
                </span>
              </label>
              <input
                type="number"
                min="50"
                max="400"
                value={formData.blood_glucose_level || ""}
                onChange={(e) =>
                  handleInputChange(
                    "blood_glucose_level",
                    parseFloat(e.target.value),
                  )
                }
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Contoh: 116"
                required
              />
              <p className="mt-1 text-xs text-gray-500">
                Contoh: 116, 220, 178
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={clearPatient}
              className="rounded-md bg-gray-500 px-6 py-2 text-white hover:bg-gray-600 focus:ring-2 focus:ring-gray-400 focus:outline-none"
            >
              Reset
            </button>
            <button
              type="submit"
              disabled={
                !selectedPatient || isSubmitting || isLoadingPatientData
              }
              className="flex items-center gap-2 rounded-md bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
              {isSubmitting ? "Memproses..." : "Lakukan Screening"}
            </button>
          </div>
        </form>

        {/* Hasil Prediksi */}
        {showResult && predictionResult && (
          <div
            id="prediction-result"
            className="mt-8 rounded-lg border border-gray-200 bg-gray-50 p-6"
          >
            <h3 className="mb-4 text-xl font-semibold text-gray-900">
              🏥 Hasil Screening Diabetes
            </h3>

            {/* Hasil Utama */}
            <div
              className={`mb-4 rounded-md border p-4 ${getRiskColor(predictionResult.prediction, predictionResult.risk_level)}`}
            >
              <div className="flex items-center">
                {getRiskIcon(
                  predictionResult.prediction,
                  predictionResult.risk_level,
                )}
                <div className="ml-3">
                  <h4 className="text-lg font-medium">
                    {predictionResult.prediction === 1
                      ? "Berisiko Diabetes"
                      : "Tidak Berisiko Diabetes"}
                  </h4>
                  <p className="text-sm">
                    Tingkat Risiko:{" "}
                    <span className="font-semibold">
                      {predictionResult.risk_level}
                    </span>
                    {predictionResult.risk_score && (
                      <span className="ml-2">
                        ({predictionResult.risk_score}%)
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Data Pasien yang di-screening */}
            <div className="mb-4 rounded-md border bg-white p-4">
              <h5 className="mb-2 font-medium text-gray-900">
                Data Screening:
              </h5>
              <div className="grid grid-cols-2 gap-3 text-sm md:grid-cols-4">
                <div>
                  <span className="text-gray-600">Pasien:</span>
                  <p className="font-medium">{selectedPatient?.name}</p>
                </div>
                <div>
                  <span className="text-gray-600">Usia:</span>
                  <p className="font-medium">{formData.age} tahun</p>
                </div>
                <div>
                  <span className="text-gray-600">BMI:</span>
                  <p className="font-medium">{formData.bmi}</p>
                </div>
                <div>
                  <span className="text-gray-600">Gula Darah:</span>
                  <p className="font-medium">
                    {formData.blood_glucose_level} mg/dL
                  </p>
                </div>
              </div>
            </div>

            {/* Rekomendasi */}
            <div className="mb-4 rounded-md border border-blue-200 bg-blue-50 p-4">
              <h5 className="mb-2 font-medium text-blue-900">
                💡 Rekomendasi:
              </h5>
              <p className="text-sm text-blue-800">
                {predictionResult.recommendation}
              </p>
            </div>

            {/* Disclaimer */}
            <div className="mb-4 rounded-md border border-yellow-200 bg-yellow-50 p-3">
              <p className="text-xs text-yellow-800">
                ⚠ <strong>Disclaimer:</strong> Hasil ini hanya prediksi dan
                tidak menggantikan diagnosis medis profesional. Konsultasikan
                dengan dokter untuk pemeriksaan lebih lanjut.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={viewDashboard}
                className="flex items-center gap-2 rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:outline-none"
              >
                <TrendingUp className="h-4 w-4" />
                Lihat Dashboard
              </button>
              <button
                type="button"
                onClick={clearPatient}
                className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                Screening Pasien Lain
              </button>
            </div>

            {/* Success Message */}
            <div className="mt-4 text-center">
              <p className="text-sm font-medium text-green-600">
                ✅ Data screening berhasil disimpan ke database
                {predictionResult.screening_id && (
                  <span className="text-gray-500">
                    {" "}
                    (ID: {predictionResult.screening_id})
                  </span>
                )}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}