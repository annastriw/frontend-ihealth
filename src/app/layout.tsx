import type { Metadata } from "next";
import { Geist, Geist_Mono, Paytone_One } from "next/font/google";
import "./globals.css";
import GlobalProvider from "@/components/organisms/GlobalProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const paytoneOne = Paytone_One({
  variable: "--font-paytone-one",
  weight: "400",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "iHealth Edu",
  description:
    "iHealth Edu adalah website yang menyediakan informasi terpercaya tentang edukasi Hipertensi, Diabetes Melitus, dan Kesehatan Mental. Dengan konten berbasis ilmu keperawatan dan psikologi yang mudah dipahami, website ini bertujuan untuk meningkatkan kesadaran, pengetahuan, dan kepatuhan masyarakat terhadap pencegahan dan pengelolaan kondisi kesehatan tersebut.",
  keywords:
    "iHealth Edu, edukasi hipertensi, edukasi diabetes melitus, edukasi kesehatan mental, tekanan darah tinggi, manajemen stres, kesehatan jiwa, edukasi keperawatan, edukasi psikologi, pengendalian gula darah, gaya hidup sehat, edukasi pasien, edukasi keluarga, perawatan mandiri, informasi kesehatan terpercaya",
  icons: [
    { rel: "icon", url: "/images/icons/favicon.ico", sizes: "16x16" },
    { rel: "icon", url: "/images/icons/favicon-32x32.png", sizes: "32x32" },
    {
      rel: "apple-touch-icon",
      url: "/images/icons/apple-touch-icon.png",
      sizes: "180x180",
    },
    {
      rel: "icon",
      url: "/images/icons/android-chrome-192x192.png",
      sizes: "192x192",
    },
    {
      rel: "icon",
      url: "/images/icons/android-chrome-512x512.png",
      sizes: "512x512",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${paytoneOne.variable} antialiased`}
      >
        <GlobalProvider>
          <main>{children}</main>
        </GlobalProvider>
      </body>
    </html>
  );
}
