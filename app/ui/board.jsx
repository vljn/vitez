import React from 'react';
import Square from './Square';

export default function Board() {
  const renderRow = (rowIndex) => {
    const cells = [];
    for (let i = 0; i < 8; i++) {
      cells.push(
        <Square key={i} color={(rowIndex + i) % 2 === 0 ? 'bg-primary' : 'bg-secondary'} />
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
