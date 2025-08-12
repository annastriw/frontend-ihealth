'use client';

import DashboardTitle from '@/components/atoms/typography/DashboardTitle';
import { WebsiteReviewForm } from '@/components/organisms/WebsiteReviewForm';

export default function WebsiteReviewPage() {
  return (
    <div className="mx-auto w-full px-4 py-10">
      <DashboardTitle
        head="Ulasan Website"
        body="Silakan berikan ulasan Anda terhadap website ini. Jawaban Anda akan membantu kami untuk meningkatkan kualitas layanan."
      />

      <WebsiteReviewForm />
    </div>
  );
}
