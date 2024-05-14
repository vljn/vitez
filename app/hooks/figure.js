import { useState, useEffect } from 'react';

export default function useChessFigure(position, selected) {
  const [style, setStyle] = useState({
    transition: 'transform 0.25s',
    position: 'absolute',
  });

  useEffect(() => {
    const updateSize = () => {
      if (position) {
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

    updateSize();

    window.addEventListener('resize', updateSize);

    return () => {
      window.removeEventListener('resize', updateSize);
    };
  }, [position, selected]);

  return style;
}
