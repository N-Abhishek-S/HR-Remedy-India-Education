import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { ReactNode } from "react";

import "swiper/css";
import "swiper/css/pagination";

export function Slider({ children }: Readonly<{ children: ReactNode[] }>) {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      slidesPerView={1}
      spaceBetween={24}
      pagination={{ clickable: true }}
      autoplay={{ delay: 4500, disableOnInteraction: false }}
      breakpoints={{ 768: { slidesPerView: 2 }, 1100: { slidesPerView: 3 } }}
      className="pb-12"
    >
      {children.map((child, index) => (
        <SwiperSlide key={index}>{child}</SwiperSlide>
      ))}
    </Swiper>
  );
}
