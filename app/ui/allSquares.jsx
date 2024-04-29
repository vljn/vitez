'use client';

import { useState, useRef, useEffect } from 'react';
import Board from './board';
import Knight from './Knight';
import Button from './button';
import { moveAcrossAll } from '../lib/board';

export default function AllSquares() {
  const [knightPosition, setKnightPosition] = useState({ x: 0, y: 0 });
  const [visitedSquares, setVisitedSquares] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [inputSpeed, setInputSpeed] = useState(500);
  const timerIdsRef = useRef([]);
  const minSpeed = 100;
  const maxSpeed = 1000;
  const animationSpeed = maxSpeed + minSpeed - inputSpeed;

  const handleButtonClick = () => {
    if (isRunning) {
      timerIdsRef.current.forEach((timerId) => clearTimeout(timerId));
      timerIdsRef.current = [];
      setIsRunning(false);
      setKnightPosition({ x: 0, y: 0 });
      setVisitedSquares([]);
      return;
    }
    setIsRunning(true);
    const moves = moveAcrossAll(knightPosition.x, knightPosition.y);
    const newVisitedSquares = [];
    let delay = 0;
    moves.forEach((move, index) => {
      const timerId = setTimeout(() => {
        setKnightPosition({ x: move.x, y: move.y });
        if (index > 0) {
          newVisitedSquares.push({ x: moves[index - 1].x, y: moves[index - 1].y });
          setVisitedSquares([...newVisitedSquares]);
        }
      }, delay);
      timerIdsRef.current.push(timerId);
      delay += animationSpeed;
    });
    const endingId = setTimeout(() => {
      setIsRunning(false);
      timerIdsRef.current = [];
    }, moves.length * animationSpeed);
    timerIdsRef.current.push(endingId);
  };

  return (
    <div>
      <div className="flex flex-col gap-4">
        <Board visitedSquares={visitedSquares} />
        <Knight position={knightPosition} />
        <Button onClick={handleButtonClick}>
          {isRunning ? 'Креће се... (Стисни да зауставиш)' : 'Почни'}
        </Button>
      </div>
      <div className="flex items-center mt-2">
        <label htmlFor="brzina" className="text-sm lg:text-base">
          Брзина анимације:{' '}
        </label>
        <input
          type="range"
          onChange={(e) => {
            setInputSpeed(parseInt(e.target.value));
          }}
          min={minSpeed}
          max={maxSpeed}
          value={inputSpeed}
          id="brzina"
          disabled={isRunning}
          className="flex-1 ml-4 h-2 bg-primary appearance-none rounded
          [&::-webkit-slider-thumb]:appearance-none 
          [&::-webkit-slider-thumb]:!bg-primary
          [&::-webkit-slider-thumb]:w-4
          [&::-webkit-slider-thumb]:h-4
          [&::-webkit-slider-thumb]:rounded-2xl
          [&::-webkit-slider-thumb]:border-4
          [&::-webkit-slider-thumb]:border-solid
          [&::-webkit-slider-thumb]:border-secondary
          [&::-webkit-slider-thumb]:disabled:!bg-gray-500
          disabled:bg-gray-500
          cursor-pointer"
        />
      </div>
    </div>
  );
}
