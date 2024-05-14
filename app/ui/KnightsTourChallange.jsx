'use client';

import Board from './board';
import Button from './button';
import { useState } from 'react';
import { useStopwatch } from 'react-timer-hook';
import { isInRange, isValid } from '../lib/knight';
import { addResult, updateResult } from '../lib/actions';
import Figure from './figure';

export default function KnightsTourChallange({ id }) {
  const [knightPosition, setKnightPosition] = useState(null);
  const [visitedSquares, setVisitedSquares] = useState([]);
  const [error, setError] = useState(null);
  const { minutes, seconds, start, reset, isRunning } = useStopwatch();

  function handleBoardClick(x, y) {
    if (!isRunning) {
      setError(null);
      setKnightPosition({ x, y });
      return;
    }
    if (knightPosition.x === x && knightPosition.y === y) return;
    moveKnight(x, y);
  }

  function moveKnight(x, y) {
    if (isValid(x, y, visitedSquares) && isInRange(knightPosition.x, knightPosition.y, x, y)) {
      setVisitedSquares([
        ...visitedSquares,
        { x: knightPosition.x, y: knightPosition.y, index: visitedSquares.length + 1 },
      ]);
      setKnightPosition({ x, y });
    }
  }

  function buttonText() {
    if (isRunning) {
      return 'Заврши';
    } else {
      return 'Почни';
    }
  }

  function handleButtonClick() {
    if (isRunning) {
      if (visitedSquares.length !== 0) {
        updateResult(id, visitedSquares.length + 1, 'zavrsio');
      }
      resetChallenge();
    } else {
      if (knightPosition) {
        addResult(id, 'konjicki skok');
        start();
      } else {
        setError('Постављање коња је обавезно');
      }
    }
  }

  function resetChallenge() {
    const time = new Date();
    time.setSeconds(0);
    reset(time, false);
    setKnightPosition(null);
    setVisitedSquares([]);
  }

  function handleResetButtonClick() {
    if (!isRunning) return;
    updateResult(id, visitedSquares.length + 1, 'odustao');
    resetChallenge();
  }

  return (
    <div className="my-6 w-min">
      <div className="mb-2 text-center flex justify-between">
        {knightPosition ? (
          <>
            <h3>Резултат: {visitedSquares.length}</h3>
            <h3 className="text-left">
              Време: {minutes > 9 ? minutes : '0' + minutes}:{seconds > 9 ? seconds : '0' + seconds}
            </h3>
          </>
        ) : error ? (
          <p className="text-red-800 flex-1">{error}</p>
        ) : (
          <h3 className="flex-1">Кликом на жељено поље, постави коња</h3>
        )}
      </div>
      <div className="flex flex-col gap-4 w-min">
        <Board visitedSquares={visitedSquares} onClick={handleBoardClick} />
        <Figure type="knight" position={knightPosition} />
        <div className="flex gap-4">
          <Button onClick={handleResetButtonClick} className="flex-1" disabled={!isRunning}>
            Почни поново
          </Button>
          <Button className="flex-1" onClick={handleButtonClick}>
            {buttonText()}
          </Button>
        </div>
      </div>
    </div>
  );
}
