"use client";

import React, { useState, useEffect } from "react";
import { Search, User, X, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";

interface Patient {
  id: string;
  name: string;
  age: number;
  phone?: string;
  email?: string;
  gender?: string;
  heart_disease?: number;
  smoking_history?: number;
  bmi?: number;
}

interface ScreeningData {
  patient_id: string;
  heart_disease: number;
  smoking_history: number;
  bmi: number;
  blood_pressure: string;
  blood_glucose_level: number;
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

  // Form data
  const [formData, setFormData] = useState<ScreeningData>({
    patient_id: "",
    heart_disease: 0,
    smoking_history: 0,
    bmi: 0,
    blood_pressure: "",
    blood_glucose_level: 0,
  });

  // Search patients dengan debounce
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchTerm.length > 2) {
        setIsSearching(true);
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/patients/search?q=${searchTerm}`,
            {
              headers: {
                Authorization: `Bearer ${session?.access_token}`,
                "Content-Type": "application/json",
              },
            },
          );

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
        `${process.env.NEXT_PUBLIC_API_URL}/api/patients/${patientId}`,
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

        // Auto-fill form data with patient's personal information
        setFormData((prev) => ({
          ...prev,
          patient_id: patientData.id,
          heart_disease: patientData.heart_disease || 0,
          smoking_history: patientData.smoking_history || 0,
          bmi: patientData.bmi || 0,
          // Keep manual input fields as they are
          blood_pressure: prev.blood_pressure,
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
    setFormData({
      patient_id: "",
      heart_disease: 0,
      smoking_history: 0,
      bmi: 0,
      blood_pressure: "",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedPatient) {
      alert("Silakan pilih pasien terlebih dahulu");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/screening/diabetes`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      if (response.ok) {
        const result = await response.json();
        alert(
          `Screening berhasil! Hasil prediksi: ${result.data.prediction === 1 ? "Berisiko Diabetes" : "Tidak Berisiko"}`,
        );

        // Reset form
        setFormData({
          patient_id: "",
          heart_disease: 0,
          smoking_history: 0,
          bmi: 0,
          blood_pressure: "",
          blood_glucose_level: 0,
        });
        clearPatient();
      } else {
        const error = await response.json();
        alert(`Error: ${error.message || "Gagal melakukan screening"}`);
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
                {selectedPatient.gender && (
                  <div>
                    <span className="font-medium text-blue-800">
                      Jenis Kelamin:
                    </span>{" "}
                    {selectedPatient.gender}
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
            {/* Auto-filled Fields */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Riwayat Penyakit Jantung
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
                <option value="">Pilih riwayat penyakit jantung</option>
                <option value="1">Ya</option>
                <option value="0">Tidak</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Riwayat Merokok
                <span className="ml-1 text-green-600">✓</span>
                <span className="ml-1 text-xs text-gray-500">(Auto-fill)</span>
              </label>
              <select
                value={formData.smoking_history}
                onChange={(e) =>
                  handleInputChange("smoking_history", parseInt(e.target.value))
                }
                className="w-full rounded-md border border-gray-300 bg-green-50 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
                disabled={isLoadingPatientData}
              >
                <option value="">Pilih riwayat merokok</option>
                <option value="1">Ya</option>
                <option value="0">Tidak</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                BMI
                <span className="ml-1 text-green-600">✓</span>
                <span className="ml-1 text-xs text-gray-500">(Auto-fill)</span>
              </label>
              <input
                type="number"
                step="0.1"
                value={formData.bmi || ""}
                onChange={(e) =>
                  handleInputChange("bmi", parseFloat(e.target.value))
                }
                className="w-full rounded-md border border-gray-300 bg-green-50 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="BMI akan terisi otomatis"
                required
                disabled={isLoadingPatientData}
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Kadar Glukosa Darah (mg/dL)
                <span className="ml-1 text-red-500">*</span>
                <span className="ml-1 text-xs text-gray-500">
                  (Input Manual)
                </span>
              </label>
              <input
                type="number"
                value={formData.blood_glucose_level || ""}
                onChange={(e) =>
                  handleInputChange(
                    "blood_glucose_level",
                    parseFloat(e.target.value),
                  )
                }
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Contoh: 150"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Tekanan Darah (mmHg)
                <span className="ml-1 text-red-500">*</span>
                <span className="ml-1 text-xs text-gray-500">
                  (Input Manual)
                </span>
              </label>
              <input
                type="text"
                value={formData.blood_pressure}
                onChange={(e) =>
                  handleInputChange("blood_pressure", e.target.value)
                }
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Contoh: 120/80"
                required
              />
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
      </div>
    </div>
  );
}
