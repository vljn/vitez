'use client';

import { useState } from 'react';
import Board from './board';
import Knight from './Knight';
import Button from './button';

export default function AllSquares() {
  const [knightPosition, setKnightPosition] = useState({ x: 0, y: 0 });

  const moveKnight = () => {
    setTimeout(() => {
      setKnightPosition({ x: knightPosition.x + 1, y: knightPosition.y + 1 });
    }, 100);
  };

  return (
    <div className="flex flex-col gap-4">
      <Board />
      <Knight position={knightPosition} />
      <Button onClick={moveKnight}>Počni</Button>
    </div>
  );
}
