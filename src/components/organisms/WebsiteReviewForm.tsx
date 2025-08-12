'use client';

import * as React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '@/components/ui/card';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useAddWebsiteReview } from '@/http/website-review/submit-website-review';
import { cn } from '@/lib/utils';

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

export function WebsiteReviewForm() {
  const [answers, setAnswers] = React.useState<number[]>(Array(questions.length).fill(0));
  const [suggestion, setSuggestion] = React.useState('');
  const [msg, setMsg] = React.useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

  const { mutate, isPending } = useAddWebsiteReview({
    onSuccess: () => {
      setMsg({ type: 'success', text: 'Terima kasih! Ulasan berhasil dikirim.' });
      setAnswers(Array(questions.length).fill(0));
      setSuggestion('');
    },
    onError: () => {
      setMsg({ type: 'error', text: 'Gagal mengirim. Coba lagi nanti.' });
    },
  });

  const filled = React.useMemo(() => answers.filter(v => v !== 0).length, [answers]);
  const pct = React.useMemo(() => Math.round((filled / questions.length) * 100), [filled]);
  const canSubmit = filled === questions.length && !isPending;

  const setVal = (qi: number, v: number) => {
    setAnswers(prev => {
      const n = [...prev];
      n[qi] = v;
      return n;
    });
  };

  const submit = () => {
    if (!canSubmit) {
      setMsg({ type: 'info', text: 'Lengkapi semua pertanyaan sebelum mengirim.' });
      return;
    }
    mutate({ answers, suggestion });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Form Ulasan</CardTitle>
        <CardDescription>Isi semua pertanyaan berikut dan berikan saran Anda.</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Notifikasi mobile */}
        <p className="text-xs text-muted-foreground sm:hidden">
          💡 Geser tabel ke samping untuk melihat semua pilihan jawaban.
        </p>

        {/* Table Pertanyaan */}
        <div className="overflow-x-auto rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[250px]"></TableHead>
                {cols.map((c) => (
                  <TableHead key={c} className="text-center whitespace-nowrap">
                    {c}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {questions.map((q, qi) => (
                <TableRow key={qi}>
                  <TableCell className="font-medium min-w-[250px]">
                    {qi + 1}. {q}
                  </TableCell>
                  {cols.map((_, idx) => {
                    const value = idx + 1;
                    return (
                      <TableCell key={value} className="text-center">
                        <input
                          type="radio"
                          name={`q${qi}`}
                          value={value}
                          checked={answers[qi] === value}
                          onChange={() => setVal(qi, value)}
                          className="h-4 w-4 cursor-pointer accent-primary"
                        />
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Kotak Saran */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-foreground">Kotak Saran</label>
          <Textarea
            placeholder="Berikan saran untuk website ini!"
            value={suggestion}
            onChange={(e) => setSuggestion(e.target.value)}
          />
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Capaian</span>
            <span>{pct}%</span>
          </div>
          <Progress value={pct} />
        </div>

        {/* Pesan */}
        {msg && (
          <div
            className={cn(
              'rounded-md border p-3 text-sm',
              msg.type === 'success' && 'border-green-200 bg-green-50 text-green-800',
              msg.type === 'error' && 'border-red-200 bg-red-50 text-red-800',
              msg.type === 'info' && 'border-amber-200 bg-amber-50 text-amber-900',
            )}
          >
            {msg.text}
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-end">
        <Button onClick={submit} disabled={!canSubmit}>
          {isPending ? 'Mengirim...' : 'Kirim Ulasan'}
        </Button>
      </CardFooter>
    </Card>
  );
}
