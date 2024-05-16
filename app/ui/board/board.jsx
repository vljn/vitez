import React from 'react';
import Square from './square';

export default function Board({ visitedSquares, onClick, end }) {
  const renderRow = (rowIndex) => {
    const cells = [];
    for (let i = 0; i < 8; i++) {
      const visited = visitedSquares.find((square) => square.x === i && square.y === rowIndex);
      cells.push(
        <Square
          onClick={() => onClick(i, rowIndex)}
          key={rowIndex + '' + i}
          background={(rowIndex + i) % 2 === 0 ? 'bg-primary' : 'bg-secondary'}
          visited={visited}
          end={end?.x === i && end?.y === rowIndex}
        />
      );
    }
    return cells;
  };

  const renderBoard = () => {
    const rows = [];
    for (let i = 0; i < 8; i++) {
      rows.push(
        <div key={i} className="flex">
          {renderRow(i)}
        </div>
      );
    }
    return rows;
  };

  return <div className="border-2 border-primary w-fit h-fit">{renderBoard()}</div>;
}
