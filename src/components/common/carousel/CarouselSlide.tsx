import React from "react";

interface CarouselSlideProps {
  data: {
    img: string;
    name: string;
  };
}

const CarouselSlide: React.FC<CarouselSlideProps> = ({ data }) => {
  return (
    <div className="w-auto h-full flex items-center justify-center overflow-hidden">
      <img
        src={data.img}
        alt={data.name}
        className="h-full w-auto object-contain scale-75"
      />
    </div>
  );
};

export default CarouselSlide;
