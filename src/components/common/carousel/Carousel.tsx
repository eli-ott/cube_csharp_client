import React, { useState } from 'react';
import CarouselSlide from './CarouselSlide';
import placeholder from '../../../assets/images/placeholder.png';

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
    setSlideIndex(slideIndex === 0 ? carouselDataProps.length - 1 : slideIndex - 1);
  };

  const handleNextSlide = () => {
    setSlideIndex(slideIndex === carouselDataProps.length - 1 ? 0 : slideIndex + 1);
  };

  const slides = carouselDataProps.length > 0 ? carouselDataProps : [{ img: placeholder, name: 'placeholder' }];

  return (
    <div className="relative w-full max-w-3xl mx-auto bg-[#EEE7C7] rounded-md shadow-md overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${slideIndex * 100}%)` }}
      >
        {slides.map((data, idx) => (
          <div key={idx} className="flex-shrink-0 w-full h-[300px] md:h-[400px] flex items-center justify-center">
            <CarouselSlide data={data} />
          </div>
        ))}
      </div>

      {carouselDataProps.length > 1 && (
        <>
          <button
            className="absolute top-1/2 -translate-y-1/2 left-2 md:left-4 w-8 h-8 md:w-12 md:h-12 text-xl font-bold flex items-center justify-center rounded-full bg-white/70 shadow hover:bg-white/90 transition-transform hover:scale-105"
            onClick={handlePreviousSlide}
          >
            &lsaquo;
          </button>
          <button
            className="absolute top-1/2 -translate-y-1/2 right-2 md:right-4 w-8 h-8 md:w-12 md:h-12 text-xl font-bold flex items-center justify-center rounded-full bg-white/70 shadow hover:bg-white/90 transition-transform hover:scale-105"
            onClick={handleNextSlide}
          >
            &rsaquo;
          </button>
        </>
      )}
    </div>
  );
};

export default Carousel;
