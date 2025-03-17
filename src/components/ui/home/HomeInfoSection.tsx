import React from 'react';
import RedirectionButton from '../../common/RedirectionButton';

const HomeSection = () => {
  return (
    <div className="w-full bg-[#6A1B1A] py-20 px-6 flex flex-col items-center justify-center mb-50">
      <div className="max-w-5xl mx-auto text-center text-white">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-wide leading-tight mb-6">
          Découvrez les meilleurs vins de Gascogne
        </h1>
        <p className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto">
          Des vins authentiques, soigneusement sélectionnés, directement depuis la région de Gascogne pour vous offrir une expérience inoubliable.
        </p>
        <p className="text-base sm:text-lg mb-6 max-w-3xl mx-auto">
          Chez <strong>Negosud</strong>, nous sommes passionnés par l'art de la vinification. Chaque bouteille que nous proposons est une invitation à explorer les saveurs et l'âme de Gascogne. Notre collection de vins, allant des plus fins crus aux meilleures appellations, vous garantit une qualité exceptionnelle et une traçabilité transparente.
        </p>
        <p className="text-base sm:text-lg mb-8 max-w-3xl mx-auto">
          Que vous soyez un amateur ou un connaisseur, notre site vous permet d'acheter facilement vos vins préférés en ligne, avec livraison rapide et sécurisée. Rejoignez notre communauté et vivez une expérience unique à chaque gorgée.
        </p>
      </div>
      <RedirectionButton label="Découvrir nos produits" destination="/search" />
    </div>
  );
};

export default HomeSection;
