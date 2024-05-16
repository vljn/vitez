'use client';

import Board from '../board/board';
import Button from '../button';
import { knightMoves } from '../../lib/board';
import { useState, useRef } from 'react';
import SpeedSlider from './speedSlider';
import Figure from '../board/figure';

export default function KnightMoves() {
  const [knightPosition, setKnightPosition] = useState({ x: 0, y: 0 });
  const [end, setEnd] = useState(null);
  const [errorEnd, setErrorEnd] = useState(null);
  const [visitedSquares, setVisitedSquares] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [inputSpeed, setInputSpeed] = useState(500);
  const [isFinished, setIsFinished] = useState(false);
  const [choosingStart, setChoosingStart] = useState(false);
  const [choosingEnd, setChoosingEnd] = useState(false);
  const timerIdsRef = useRef([]);
  const minSpeed = 100;
  const maxSpeed = 1000;
  const animationSpeed = maxSpeed + minSpeed - inputSpeed;

  const reset = (x, y) => {
    setKnightPosition({ x, y });
    setEnd(null);
    setVisitedSquares([]);
    setIsFinished(false);
    setIsRunning(false);
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
    if (isRunning) {
      return;
    }
    if (choosingStart) {
      reset(x, y);
      setChoosingStart(false);
    } else if (choosingEnd) {
      reset(knightPosition.x, knightPosition.y);
      setEnd({ x, y });
      setChoosingEnd(false);
      setErrorEnd(null);
    }
  }

  function handleButtonClick() {
    console.log(end);
    if (!end) {
      setErrorEnd('Циљ је обавезан');
      return;
    }
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
    const moves = knightMoves(knightPosition.x, knightPosition.y, end.x, end.y);
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
  }

  return (
    <div className="max-lg:mb-6 w-min">
      <div className="flex justify-between mb-4 gap-4">
        <Button
          onClick={() => {
            setChoosingStart((prev) => !prev);
            setChoosingEnd(false);
          }}
          className="flex-1"
          active={choosingStart}
        >
          Постави коња
        </Button>
        <Button
          onClick={() => {
            setChoosingEnd((prev) => !prev);
            setChoosingStart(false);
          }}
          className="flex-1"
          active={choosingEnd}
        >
          Постави циљ
        </Button>
      </div>
      <div className="flex flex-col gap-4 w-min">
        <Board visitedSquares={visitedSquares} onClick={handleBoardClick} end={end} />
        <Figure type="konj" position={knightPosition} selected={choosingStart} />
        <Button onClick={handleButtonClick}>{buttonText()}</Button>
      </div>
      <SpeedSlider
        min={minSpeed}
        max={maxSpeed}
        disabled={isRunning}
        speed={inputSpeed}
        setSpeed={setInputSpeed}
      />
      {errorEnd && <p className="absolute my-1 text-base text-red-800">{errorEnd}</p>}
    </div>
  );
}
