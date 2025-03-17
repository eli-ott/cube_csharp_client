import React from 'react';
import LoadingSpinner from './LoadingSpinner';

const ItemStateLoader = () => {
    return (
        <div className="absolute flex items-center justify-center rounded-lg left-0 top-0 bg-black/50 backdrop-blur-sm w-full h-full">
          <div className="flex items-center justify-center bg-white/90 border-1 border-gray-500/50  rounded-sm p-2">
            <LoadingSpinner />
          </div>
        </div>
    );
};

export default ItemStateLoader;