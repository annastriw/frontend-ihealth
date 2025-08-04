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

    // Update scrollDirection on edge
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
    }, 1700);

    return () => clearInterval(interval);
  }, [isHovered, scrollDirection]);

  return (
    <section className="relative space-y-10 py-12 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <SectionTitle title="Penjelasan Secara Umum" />
      </motion.div>

      <div className="group relative px-4 md:px-8">
        {/* Navigasi Panah */}
        <div className="pointer-events-none absolute inset-y-0 right-0 left-0 z-30 hidden items-center justify-between lg:flex">
          <div
            onClick={() => scroll("left")}
            className="pointer-events-auto flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-green-300 bg-white opacity-0 shadow-sm transition-opacity duration-300 group-hover:opacity-100"
            aria-label="Scroll kiri"
          >
            <ChevronLeft className="h-4 w-4 text-green-600" />
          </div>

          <div
            onClick={() => scroll("right")}
            className="pointer-events-auto flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-green-300 bg-white opacity-0 shadow-sm transition-opacity duration-300 group-hover:opacity-100"
            aria-label="Scroll kanan"
          >
            <ChevronRight className="h-4 w-4 text-green-600" />
          </div>
        </div>

        {/* Gradasi */}
        <div className="pointer-events-none absolute top-0 left-0 z-10 h-full w-10 bg-gradient-to-r from-white via-white to-transparent" />
        <div className="pointer-events-none absolute top-0 right-0 z-10 h-full w-10 bg-gradient-to-l from-white via-white to-transparent" />

        {/* Wrapper */}
        <div
          {...handlers}
          ref={scrollRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="scrollbar-hide snap-x snap-mandatory scroll-px-6 overflow-x-auto scroll-smooth"
        >
          <div className="flex min-w-full gap-6 pt-2 pr-6 pb-2 pl-6 md:gap-8">
            {data.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.6 }}
                className="w-[260px] flex-shrink-0 snap-center sm:w-[300px] md:w-[340px] lg:w-[360px] xl:w-[380px]"
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
