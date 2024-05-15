import { isValid } from './knight';
import { directions, countValidMoves } from './knight';

function generateBoard() {
  const arr = [...new Array(8)].map(() => Array(8).fill(''));
  return arr;
}

export function knightMoves(x1, y1, x2, y2) {
  const board = generateBoard();
  const queue = [];
  queue.push({ x: x1, y: y1, moves: [] });
  while (queue.length > 0) {
    const top = queue.shift();
    const [x, y] = [top.x, top.y];
    if (x >= 0 && x <= 7 && y >= 0 && y <= 7 && board[x][y] === '') {
      const arr = [...top.moves];
      arr.push({ x, y });
      if (x === x2 && y === y2) {
        return arr;
      }
      board[x][y] = '1';
      const xMove = [2, 1, -1, -2, -2, -1, 1, 2];
      const yMove = [1, 2, 2, 1, -1, -2, -2, -1];
      for (let index = 0; index < 8; index += 1) {
        const newX = x + xMove[index];
        const newY = y + yMove[index];
        queue.push({ x: newX, y: newY, moves: arr });
      }
    }
  }

  return [];
}

export function knightsTour(x, y) {
  const knightsTourUtil = (x, y, visited) => {
    if (!isValid(x, y, visited)) {
      return;
    }
    visited.push({ x, y });
    if (visited.length === 64) {
      return visited;
    }
    const validMoves = directions
      .map((obj) => ({ x: x + obj.dx, y: y + obj.dy }))
      .filter((obj) => isValid(obj.x, obj.y, visited))
      .map(({ x, y }) => ({ x, y, count: countValidMoves(x, y, visited) }))
      .sort((a, b) => a.count - b.count);

    for (const move of validMoves) {
      const result = knightsTourUtil(move.x, move.y, visited.slice());
      if (result) {
        return result;
      }
    }

    return null;
  };

  return knightsTourUtil(x, y, []);
}
