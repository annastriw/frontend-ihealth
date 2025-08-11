'use client';

import { useMemo, useState } from 'react';
import { api } from '@/lib/axios';

type Msg = { type: 'success' | 'error' | 'info'; text: string };

const questions = [
  'Saya ingin menggunakan website ini secara rutin.',
  'Website ini terasa tidak perlu rumit.',
  'Website ini mudah digunakan.',
  'Saya merasa membutuhkan bantuan teknis untuk bisa menggunakan website ini.',
  'Fitur-fitur pada website ini terintegrasi dengan baik.',
  'Website ini terasa tidak konsisten.',
  'Saya yakin orang lain dapat belajar menggunakan website ini dengan cepat.',
  'Website ini terasa membingungkan atau canggung.',
  'Saya percaya diri menggunakan website ini.',
  'Saya perlu mempelajari banyak hal sebelum dapat menggunakan website ini.',
];

const cols = ['Sangat Tidak Setuju', 'Tidak Setuju', 'Netral', 'Setuju', 'Sangat Setuju'];

export default function UlasanWebsitePage() {
  const [email, setEmail] = useState('');
  const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(0));
  const [suggestion, setSuggestion] = useState('');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<Msg | null>(null);

  const filled = useMemo(() => answers.filter(v => v !== 0).length, [answers]);
  const pct = useMemo(() => Math.round((filled / questions.length) * 100), [filled]);
  const canSubmit = !!email.trim() && filled === questions.length && !busy;

  const setVal = (qi: number, v: number) =>
    setAnswers(prev => {
      const n = [...prev];
      n[qi] = v;
      return n;
    });

  const submit = async () => {
    if (!canSubmit) {
      setMsg({ type: 'info', text: 'Lengkapi email dan semua pertanyaan sebelum mengirim.' });
      return;
    }
    try {
      setBusy(true);
      setMsg(null);
      const token = localStorage.getItem('token');
      await api.post(
        '/website-reviews',
        { email, answers, suggestion },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMsg({ type: 'success', text: 'Terima kasih! Ulasan berhasil dikirim.' });
    } catch (e) {
      setMsg({ type: 'error', text: 'Gagal mengirim. Coba lagi nanti.' });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div
      className="mx-auto w-full max-w-4xl px-4 py-10"
      style={{ fontFamily: '"Times New Roman", Times, serif', fontSize: '12pt' }}
    >
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="px-6 pt-6">
          <h1 className="text-3xl font-bold">Ulasan Website</h1>
        </div>

        <div className="px-6 pb-8 pt-4">
          {/* Email */}
          <label className="mb-2 block text-sm font-semibold text-gray-800">Email Address</label>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-6 w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 outline-none focus:border-blue-600"
          />

          {/* Judul bagian */}
          <div className="mb-2 text-sm font-semibold text-gray-800">
            Masukkan penilaian anda terhadap website ini
          </div>

          {/* Likert Table */}
          <div className="overflow-hidden rounded-xl border border-gray-200">
            <table className="w-full table-fixed border-collapse">
              <colgroup>
                <col />
                {cols.map((_, i) => (
                  <col key={i} style={{ width: '110px' }} />
                ))}
              </colgroup>
              <thead className="bg-gray-50">
                <tr className="text-sm font-semibold text-gray-700">
                  <th className="h-12 px-4 text-left"></th>
                  {cols.map((c) => (
                    <th key={c} className="h-12 px-2 text-center">{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-[13px]">
                {questions.map((q, qi) => (
                  <tr key={qi} className={qi % 2 === 1 ? 'bg-gray-50/40' : ''}>
                    <td className="px-4 py-4 align-middle text-gray-900">{qi + 1}. {q}</td>
                    {cols.map((_, idx) => {
                      const value = idx + 1;
                      const id = `q${qi}-${value}`;
                      return (
                        <td key={id} className="px-2 py-4 align-middle">
                          <div className="flex items-center justify-center">
                            <input
                              id={id}
                              type="radio"
                              name={`q${qi}`}
                              value={value}
                              checked={answers[qi] === value}
                              onChange={() => setVal(qi, value)}
                              className="h-4 w-4 cursor-pointer accent-blue-600"
                              aria-label={`${q} — ${cols[idx]}`}
                            />
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Suggestion */}
          <div className="mt-6">
            <label className="mb-2 block text-sm font-semibold text-gray-800">Kotak Saran</label>
            <textarea
              rows={3}
              placeholder="Berikan saran untuk website ini!"
              value={suggestion}
              onChange={(e) => setSuggestion(e.target.value)}
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 outline-none focus:border-blue-600"
            />
          </div>

          {/* Progress + Submit */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="w-full sm:w-1/2">
              <div className="mb-1 flex items-center justify-between text-xs text-gray-500">
                <span>Capaian</span>
                <span>{pct}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                <div className="h-full rounded-full bg-blue-600 transition-all" style={{ width: `${pct}%` }} />
              </div>
            </div>

            <button
              type="button"
              onClick={submit}
              disabled={!canSubmit}
              className={[
                'mt-2 inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold transition',
                canSubmit
                  ? 'bg-blue-600 text-white shadow-sm hover:bg-blue-700 active:scale-[0.99]'
                  : 'cursor-not-allowed bg-gray-200 text-gray-500',
              ].join(' ')}
            >
              {busy ? 'Mengirim...' : 'Kirim Ulasan'}
            </button>
          </div>

          {msg && (
            <div
              className={[
                'mt-4 rounded-xl border px-4 py-3 text-sm',
                msg.type === 'success' && 'border-green-200 bg-green-50 text-green-800',
                msg.type === 'error' && 'border-red-200 bg-red-50 text-red-800',
                msg.type === 'info' && 'border-amber-200 bg-amber-50 text-amber-900',
              ].join(' ')}
            >
              {msg.text}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
