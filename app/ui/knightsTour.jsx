'use client';

import { useState, useRef } from 'react';
import Board from './board';
import Knight from './knight';
import Button from './button';
import { moveAcrossAll } from '../lib/board';

export default function KnightsTour({ coordinates }) {
  const [knightPosition, setKnightPosition] = useState({ x: 0, y: 0 });
  const [visitedSquares, setVisitedSquares] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [inputSpeed, setInputSpeed] = useState(500);
  const [isFinished, setIsFinished] = useState(false);
  const timerIdsRef = useRef([]);
  const minSpeed = 100;
  const maxSpeed = 1000;
  const animationSpeed = maxSpeed + minSpeed - inputSpeed;

  const reset = (x, y) => {
    setKnightPosition({ x, y });
    setVisitedSquares([]);
    setIsFinished(false);
    setIsRunning(false);
  };

  const handleButtonClick = () => {
    if (isRunning) {
      timerIdsRef.current.forEach((timerId) => clearTimeout(timerId));
      timerIdsRef.current = [];
      reset(0, 0);
      return;
    }
    if (isFinished) {
      reset(0, 0);
      return;
    }
    setIsRunning(true);
    setIsFinished(false);
    const moves = moveAcrossAll(knightPosition.x, knightPosition.y);
    const newVisitedSquares = [];
    let delay = 0;
    moves.forEach((move, index) => {
      const timerId = setTimeout(() => {
        setKnightPosition({ x: move.x, y: move.y });
        if (index > 0) {
          newVisitedSquares.push({
            x: moves[index - 1].x,
            y: moves[index - 1].y,
            index: index,
          });
          setVisitedSquares([...newVisitedSquares]);
        }
      }, delay);
      timerIdsRef.current.push(timerId);
      delay += animationSpeed;
    });
    const endingId = setTimeout(() => {
      setIsRunning(false);
      setIsFinished(true);
      timerIdsRef.current = [];
    }, moves.length * animationSpeed);
    timerIdsRef.current.push(endingId);
  };

  function buttonText() {
    if (isRunning) {
      return 'Креће се... (Стисни да зауставиш)';
    }
    if (isFinished) {
      return 'Врати на почетак';
    }
    return 'Почни';
  }

  function handleBoardClick(x, y) {
    if (!coordinates) return;
    if (isRunning) {
      return;
    }
    if (isFinished) {
      reset(x, y);
    }
    setKnightPosition({ x, y });
  }

  return (
    <div className="max-lg:mb-6 w-min">
      {coordinates && <h3 className="text-center mb-2">Кликом на жељено поље, изабери почетак</h3>}
      <div className="flex flex-col gap-4 w-min">
        <Board visitedSquares={visitedSquares} onClick={handleBoardClick} />
        <Knight position={knightPosition} />
        <Button onClick={handleButtonClick}>{buttonText()}</Button>
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
          className="flex-1 ml-4 h-2 bg-secondary border-2 border-primary appearance-none rounded
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:!bg-secondary
          [&::-webkit-slider-thumb]:w-4
          [&::-webkit-slider-thumb]:h-4
          [&::-webkit-slider-thumb]:rounded-2xl
          [&::-webkit-slider-thumb]:border-4
          [&::-webkit-slider-thumb]:border-solid
          [&::-webkit-slider-thumb]:border-primary
          [&::-webkit-slider-thumb]:transition-transform
          hover:[&::-webkit-slider-thumb]:scale-125
          cursor-pointer
          disabled:bg-gray-500
          [&::-webkit-slider-thumb]:disabled:!bg-gray-500
          hover:[&::-webkit-slider-thumb]:disabled:scale-100
          disabled:cursor-default"
        />
      </div>
    </div>
  );
}
