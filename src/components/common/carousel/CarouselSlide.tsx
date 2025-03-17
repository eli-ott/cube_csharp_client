import React from 'react';

interface CarouselSlideProps {
	data: {
		img: string;
		name: string;
	};
}

const CarouselSlide: React.FC<CarouselSlideProps> = ({ data }) => {
	return (
		<div className="w-full h-full flex items-center justify-center overflow-hidden">
			<img src={data.img} alt={data.name} className="max-h-full max-w-full object-contain" />
		</div>
	);
};

export default CarouselSlide;
