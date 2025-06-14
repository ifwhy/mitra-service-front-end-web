import React, { useState } from 'react';

interface RatingStarProps {
  totalStars?: number;
  initialRating?: number;
  onRatingChange?: (rating: number) => void;
  size?: number; // size in pixels
  className?: string;
}

const Star = ({
  filled,
  onClick,
  onMouseEnter,
  onMouseLeave,
  size = 24,
}: {
  filled: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  size?: number;
}) => {
  return (
    <svg
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      xmlns="http://www.w3.org/2000/svg"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="cursor-pointer text-yellow-400"
      width={size}
      height={size}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
};

const RatingStar: React.FC<RatingStarProps> = ({
  totalStars = 5,
  initialRating = 0,
  onRatingChange,
  size = 24,
  className = '',
}) => {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);

  const handleClick = (index: number) => {
    setRating(index);
    if (onRatingChange) {
      onRatingChange(index);
    }
  };

  const handleMouseEnter = (index: number) => {
    setHoverRating(index);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  return (
    <div className={`flex space-x-1 ${className}`} role="radiogroup" aria-label="Rating Star">
      {Array.from({ length: totalStars }, (_, i) => i + 1).map((index) => (
        <Star
          key={index}
          size={size}
          filled={hoverRating >= index || (!hoverRating && rating >= index)}
          onClick={() => handleClick(index)}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
        />
      ))}
    </div>
  );
};

export default RatingStar;
