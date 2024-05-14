'use client';

import Board from './board';
import Button from './button';
import { useEffect, useState, useMemo } from 'react';
import Figure from './figure';
import { useStopwatch } from 'react-timer-hook';
import { isValid, isInRange, isSquareAttacked } from '../lib/knight';

export default function KnightMovesChallenge({ challenge, figures }) {
  const [knightPosition, setKnightPosition] = useState({
    x: challenge.pocetak_x,
    y: challenge.pocetak_y,
  });
  const [visitedSquares, setVisitedSquares] = useState([]);
  const [hasFinished, setHasFinished] = useState(false);
  const { minutes, seconds, start, reset, isRunning, pause } = useStopwatch();
  const end = useMemo(
    () => ({ x: challenge.kraj_x, y: challenge.kraj_y }),
    [challenge.kraj_x, challenge.kraj_y]
  );

  useEffect(() => {
    if (knightPosition.x === end.x && knightPosition.y === end.y) {
      setHasFinished(true);
      pause();
    }
  }, [knightPosition, end, pause]);

  function moveKnight(x, y) {
    if (
      isValid(x, y, visitedSquares) &&
      isInRange(knightPosition.x, knightPosition.y, x, y) &&
      !isSquareAttacked(x, y, figures)
    ) {
      setVisitedSquares([
        ...visitedSquares,
        { x: knightPosition.x, y: knightPosition.y, index: visitedSquares.length + 1 },
      ]);
      setKnightPosition({ x, y });
      return true;
    }
    return false;
  }

  function handleBoardClick(x, y) {
    if (hasFinished) return;
    const move = moveKnight(x, y);
    if (!isRunning && move) {
      start();
    }
  }

  function resetChallenge() {
    const time = new Date();
    time.setSeconds(0);
    reset(time, false);
    setKnightPosition({
      x: challenge.pocetak_x,
      y: challenge.pocetak_y,
    });
    setVisitedSquares([]);
    setHasFinished(false);
  }

  function handleResetButtonClick() {
    if (!isRunning && !hasFinished) return;
    resetChallenge();
  }

  return (
    <div className="max-lg:mb-6 w-min">
      {isRunning || hasFinished ? (
        <div className="flex justify-between mb-2">
          <h3>Пређено: {visitedSquares.length}</h3>
          <h3 className="text-left">
            Време: {minutes > 9 ? minutes : '0' + minutes}:{seconds > 9 ? seconds : '0' + seconds}
          </h3>
        </div>
      ) : (
        <h3 className="text-center mb-2">Да би започео, помери коња кликом на поље</h3>
      )}
      <div className="flex flex-col gap-4 w-min">
        <Board visitedSquares={visitedSquares} onClick={handleBoardClick} end={end} />
        <Figure type="konj" position={knightPosition} />
        {figures.map((figure) => (
          <Figure type={figure.figura} key={figure.id} position={{ x: figure.x, y: figure.y }} />
        ))}
        <Button disabled={!isRunning && !hasFinished} onClick={handleResetButtonClick}>
          Почни поново
        </Button>
      </div>
      {/*errorEnd && <p className="absolute my-1 text-base text-red-800">{errorEnd}</p>*/}
    </div>
  );
}
