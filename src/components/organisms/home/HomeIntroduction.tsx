"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SectionTitle from "@/components/atoms/typography/SectionTitle";
import CardIntroduction from "@/components/molecules/card/CardIntroduction";

const data = [
  {
    title: "Hipertensi",
    description:
      "Tekanan darah tinggi yang dapat menyebabkan komplikasi serius jika tidak dikontrol. Cegah dengan pola hidup sehat.",
    href: "/general/hipertensi",
    image: "/illustrations/hipertensi.png",
  },
  {
    title: "Diabetes Melitus",
    description:
      "Penyakit metabolik akibat kadar gula tinggi. Edukasi dan manajemen gaya hidup penting untuk mengatasinya.",
    href: "/general/diabetes-melitus",
    image: "/illustrations/diabetes.png",
  },
  {
    title: "Kesehatan Mental",
    description:
      "Keseimbangan emosional dan psikologis penting untuk kualitas hidup. Kenali dan tangani gejalanya sejak dini.",
    href: "/general/kesehatan-mental",
    image: "/illustrations/mental.png",
  },
];

export default function HomeIntroduction() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<"left" | "right">(
    "right",
  );

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current;
    const scrollAmount = direction === "left" ? -clientWidth : clientWidth;

    scrollRef.current.scrollTo({
      left: scrollLeft + scrollAmount,
      behavior: "smooth",
    });

    if (scrollLeft + clientWidth >= scrollWidth - 20) {
      setScrollDirection("left");
    } else if (scrollLeft <= 20) {
      setScrollDirection("right");
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => scroll("right"),
    onSwipedRight: () => scroll("left"),
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) scroll(scrollDirection);
    }, 4000);
    return () => clearInterval(interval);
  }, [isHovered, scrollDirection]);

  return (
    <section className="relative scroll-mt-24 space-y-6 bg-[oklch(var(--primary)/0.03)] px-4 py-6 sm:px-6 md:px-10 md:py-12 lg:px-20">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <SectionTitle title="Penjelasan Secara Umum" />
      </motion.div>

      <div className="group relative">
        {/* Navigasi tombol hanya muncul di layar md ke atas */}
        <div className="pointer-events-none absolute inset-y-0 right-0 left-0 z-30 hidden items-center justify-between px-2 md:flex">
          <button
            onClick={() => scroll("left")}
            className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-xl border border-green-300 bg-white opacity-0 shadow-md transition-all duration-300 group-hover:opacity-100 hover:bg-green-50 hover:shadow-lg dark:bg-neutral-900"
            aria-label="Scroll kiri"
          >
            <ChevronLeft className="h-5 w-5 text-green-700 dark:text-green-400" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-xl border border-green-300 bg-white opacity-0 shadow-md transition-all duration-300 group-hover:opacity-100 hover:bg-green-50 hover:shadow-lg dark:bg-neutral-900"
            aria-label="Scroll kanan"
          >
            <ChevronRight className="h-5 w-5 text-green-700 dark:text-green-400" />
          </button>
        </div>

        {/* Gradasi sisi kiri dan kanan */}
        <div className="pointer-events-none absolute top-0 left-0 z-10 h-full w-8 bg-gradient-to-r from-white via-white to-transparent dark:from-neutral-900 dark:via-neutral-900" />
        <div className="pointer-events-none absolute top-0 right-0 z-10 h-full w-8 bg-gradient-to-l from-white via-white to-transparent dark:from-neutral-900 dark:via-neutral-900" />

        {/* Scrollable konten */}
        <div
          {...handlers}
          ref={scrollRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="scrollbar-hide snap-x snap-mandatory scroll-px-6 overflow-x-auto scroll-smooth"
        >
          <div className="flex w-max gap-6 px-6 py-4 md:gap-8 lg:mx-auto lg:w-full lg:justify-center">
            {data.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.6 }}
                className="flex-shrink-0 snap-center"
              >
                <CardIntroduction {...item} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
