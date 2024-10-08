import React from 'react';
import { useNavigate } from 'react-router-dom';

// Importing diamond shape images
import roundImg from '../../assets/diamondShapes/round.png';
import princessImg from '../../assets/diamondShapes/princess.png';
import emeraldImg from '../../assets/diamondShapes/emerald.png';
import cushionImg from '../../assets/diamondShapes/cushionSquare.png';
import marquiseImg from '../../assets/diamondShapes/marquise.png';
import radiantImg from '../../assets/diamondShapes/radiant.png';
import ovalImg from '../../assets/diamondShapes/oval.png';
import pearImg from '../../assets/diamondShapes/pear.png';

const diamondShapes = [
  { label: 'Round', value: 'round', image: roundImg },
  { label: 'Princess', value: 'princess', image: princessImg },
  { label: 'Emerald', value: 'emerald', image: emeraldImg },
  { label: 'Cushion', value: 'cushion', image: cushionImg },
  { label: 'Marquise', value: 'marquise', image: marquiseImg },
  { label: 'Radiant', value: 'radiant', image: radiantImg },
  { label: 'Oval', value: 'oval', image: ovalImg },
  { label: 'Pear', value: 'pear', image: pearImg },
];

const BannerShape = () => {
  const navigate = useNavigate();

  const handleShapeClick = (shape) => {
    localStorage.setItem('selected', shape);
    navigate(`/diamond/search?shape=${shape}`);
  };

  return (
    <div className="diamond-banner-container py-10 bg-gray-50 px-4 md:px-10 lg:px-20 mt-8 pt-8"> {/* Added top margin and padding */}
      <h2 className="text-center text-3xl font-bold m-5 text-gray-800">Explore Diamonds</h2> {/* Increased margin-bottom */}
      <div className="flex justify-around gap-6"> {/* Use gap for consistent spacing */}
        {diamondShapes.map((shape) => (
          <div
            key={shape.value}
            className="diamond-shape-box cursor-pointer transition-transform duration-300 transform hover:scale-105"
            onClick={() => handleShapeClick(shape.value)}
          >
            <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center"> {/* Increased padding inside box */}
              <div className="shape-image-placeholder h-28 w-28 flex items-center justify-center mb-4"> {/* Increased size and added margin-bottom */}
                <img src={shape.image} alt={shape.label} className="w-full h-full object-contain" />
              </div>
              <p className="text-center text-lg font-medium text-gray-700">{shape.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BannerShape;

