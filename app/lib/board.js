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

export function moveAcrossAll(startX, startY) {
  const boardSize = 8;
  const visited = new Set();
  const moves = [];
  const directions = [
    { x: 2, y: 1 },
    { x: 1, y: 2 },
    { x: -1, y: 2 },
    { x: -2, y: 1 },
    { x: -2, y: -1 },
    { x: -1, y: -2 },
    { x: 1, y: -2 },
    { x: 2, y: -1 },
  ];

  const isValidMove = (x, y) =>
    x >= 0 && x < boardSize && y >= 0 && y < boardSize && !visited.has(`${x},${y}`);

  const markVisited = (x, y) => visited.add(`${x},${y}`);

  const countValidMoves = (x, y) => {
    return directions
      .map(({ x: dx, y: dy }) => ({ x: x + dx, y: y + dy }))
      .filter(({ x, y }) => isValidMove(x, y)).length;
  };

  let currentX = startX;
  let currentY = startY;

  while (visited.size < boardSize * boardSize) {
    moves.push({ x: currentX, y: currentY });
    markVisited(currentX, currentY);

    let validNextMoves = directions
      .map(({ x, y }) => ({ x: currentX + x, y: currentY + y }))
      .filter(({ x, y }) => isValidMove(x, y));

    if (validNextMoves.length === 0) {
      // Backtrack if no valid moves
      const lastMove = moves.pop();
      currentX = lastMove.x;
      currentY = lastMove.y;
    } else {
      // Choose the next move based on Warnsdorff's rule
      validNextMoves.sort((a, b) => countValidMoves(a.x, a.y) - countValidMoves(b.x, b.y));
      const nextMove = validNextMoves[0];
      currentX = nextMove.x;
      currentY = nextMove.y;
    }
  }
  moves.push({ x: currentX, y: currentY });
  markVisited(currentX, currentY);

  return moves;
}
