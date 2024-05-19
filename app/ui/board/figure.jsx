'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import RookImage from '../../../public/rook.svg';
import KnightImage from '../../../public/knight-board.svg';

const images = {
  konj: {
    image: KnightImage,
    alt: 'Knight',
  },
  top: {
    image: RookImage,
    alt: 'Rook',
  },
};

export default function Figure({ type, position, selected }) {
  const [loading, setLoading] = useState(true);
  const [style, setStyle] = useState({
    transition: 'transform 0.25s',
    position: 'absolute',
  });

  useEffect(() => {
    const updateSize = () => {
      if (position && !isNaN(position.x) && !isNaN(position.y)) {
        const { x, y } = position;
        const squareWidth = parseFloat(getComputedStyle(document.querySelector('.square')).width);
        const margin = 2;
        const diff = 10;
        const knightSize = squareWidth - diff;
        const xPosition = x * squareWidth + (diff + margin) / 2;
        const yPosition = y * squareWidth + (diff + margin) / 2;
        setStyle((style) => ({
          ...style,
          transform: `translate(${xPosition}px, ${yPosition}px) ${
            selected ? 'scale(1.4)' : 'scale(1)'
          }`,
          width: `${knightSize}px`,
        }));
      }
    };

    setLoading(true);

    updateSize();

    window.addEventListener('resize', updateSize);

    setLoading(false);

    return () => {
      window.removeEventListener('resize', updateSize);
    };
  }, [position, selected]);

  if (position === null || isNaN(position.x) || isNaN(position.y)) return null;

  if (loading) return null;

  return (
    <Image
      className={`${selected && 'drop-shadow-xl'} z-20`}
      src={images[type].image}
      alt={images[type].alt}
      style={{
        ...style,
      }}
    />
  );
}
