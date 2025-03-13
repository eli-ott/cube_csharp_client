import React, { useState } from "react";
import CarouselSlide from "./CarouselSlide";

interface SlideData {
  img: string;
  name: string;
}

interface CarouselProps {
  carouselDataProps: SlideData[];
}

const Carousel: React.FC<CarouselProps> = ({ carouselDataProps }) => {
  const [slideIndex, setSlideIndex] = useState(0);

  const handlePreviousSlide = () => {
    setSlideIndex(
      slideIndex === 0 ? carouselDataProps.length - 1 : slideIndex - 1
    );
  };

  const handleNextSlide = () => {
    setSlideIndex(
      slideIndex === carouselDataProps.length - 1 ? 0 : slideIndex + 1
    );
  };

  return (
    <div className="relative overflow-hidden bg-[#EEE7C7] rounded-md shadow-md">
      <div
        className="flex items-center transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${slideIndex * 100}%)` }}
      >
        {carouselDataProps.map((data, idx) => (
          <div className="flex-shrink-0 w-full h-full" key={idx}>
            <CarouselSlide data={data} />
          </div>
        ))}
      </div>

      {carouselDataProps.length === 1 ? null : (
        <>
          <button
            className="absolute top-1/2 transform -translate-y-1/2 left-2 md:left-4 w-10 h-10 md:w-12 md:h-12 text-xl md:text-2xl font-bold cursor-pointer flex items-center justify-center rounded-full bg-white/70 shadow transition-all duration-300 hover:bg-white/90 hover:scale-105"
            onClick={handlePreviousSlide}
          >
            {/* left chevron "<" */}
            &lsaquo;
          </button>
          <button
            className="absolute top-1/2 transform -translate-y-1/2 right-2 md:right-4 w-10 h-10 md:w-12 md:h-12 text-xl md:text-2xl font-bold cursor-pointer flex items-center justify-center rounded-full bg-white/70 shadow transition-all duration-300 hover:bg-white/90 hover:scale-105"
            onClick={handleNextSlide}
          >
            {/* right chevron ">" */}
            &rsaquo;
          </button>
        </>
      )}
    </div>
  );
};

export default Carousel;
