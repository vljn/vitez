'use client';

import { useState, useRef } from 'react';
import Board from './board';
import Button from './button';
import { knightsTour } from '../lib/board';
import SpeedSlider from './speedSlider';
import Figure from './figure';

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
    const moves = knightsTour(knightPosition.x, knightPosition.y);
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
        <Figure type="konj" position={knightPosition} />
        <Button onClick={handleButtonClick}>{buttonText()}</Button>
      </div>
      <SpeedSlider
        min={minSpeed}
        max={maxSpeed}
        disabled={isRunning}
        speed={inputSpeed}
        setSpeed={setInputSpeed}
      />
    </div>
  );
}
