export function isValid(x, y, notAllowed) {
  const valid =
    x >= 0 &&
    x <= 7 &&
    y >= 0 &&
    y <= 7 &&
    !notAllowed.some((square) => square.x === x && square.y === y);
  return valid;
}

export function isInRange(x1, y1, x2, y2) {
  return (
    (Math.abs(x1 - x2) === 1 && Math.abs(y1 - y2) === 2) ||
    (Math.abs(x1 - x2) === 2 && Math.abs(y1 - y2) === 1)
  );
}

function isAttacked(x, y, figure) {
  if (figure.figura === 'top') {
    return x === figure.x || y === figure.y;
  }
  if (figure.figura === 'lovac') {
    return Math.abs(figure.x - x) === Math.abs(figure.y - y);
  }
}

export function isSquareAttacked(x, y, figures) {
  return figures.some((figure) => isAttacked(x, y, figure));
}

export const directions = [
  { dx: -2, dy: -1 },
  { dx: -2, dy: 1 },
  { dx: -1, dy: -2 },
  { dx: -1, dy: 2 },
  { dx: 1, dy: -2 },
  { dx: 1, dy: 2 },
  { dx: 2, dy: -1 },
  { dx: 2, dy: 1 },
];

export function countValidMoves(x, y, visited) {
  return directions
    .map(({ dx, dy }) => ({ x: x + dx, y: y + dy }))
    .filter(({ x, y }) => isValid(x, y, visited)).length;
}

export function countValidMovesFigures(x, y, visited, figures) {
  return directions
    .map(({ dx, dy }) => ({ x: x + dx, y: y + dy }))
    .filter(({ x, y }) => isValid(x, y, visited) && !isSquareAttacked(x, y, figures)).length;
}
