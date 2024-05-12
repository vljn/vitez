export function isValid(x, y, visited) {
  const valid =
    x >= 0 &&
    x <= 7 &&
    y >= 0 &&
    y <= 7 &&
    !visited.some((square) => square.x === x && square.y === y);
  return valid;
}

export function isInRange(x1, y1, x2, y2) {
  return (
    (Math.abs(x1 - x2) === 1 && Math.abs(y1 - y2) === 2) ||
    (Math.abs(x1 - x2) === 2 && Math.abs(y1 - y2) === 1)
  );
}
