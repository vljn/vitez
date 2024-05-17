import { isValid } from './knight';
import { directions, countValidMoves } from './knight';

export function knightMoves(x1, y1, x2, y2) {
  const queue = [{ x: x1, y: y1, moves: [] }];
  const visited = [];

  while (queue.length > 0) {
    const top = queue.shift();
    const { x, y, moves } = top;
    visited.push({ x, y });

    if (x === x2 && y === y2) {
      return [...moves, { x, y }];
    }

    directions
      .map((d) => ({ x: x + d.dx, y: y + d.dy }))
      .filter((move) => isValid(move.x, move.y, visited))
      .forEach((move) => {
        visited.push({ x: move.x, y: move.y });
        queue.push({ x: move.x, y: move.y, moves: [...moves, { x, y }] });
      });
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
