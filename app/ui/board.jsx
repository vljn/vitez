import Square from './square';

export default function Board() {
  function generateRow(color) {
    const cells = [];
    for (let i = 0; i < 8; i++) {
      cells.push(<Square color={color} />);
      color = color === 'bg-primary' ? 'bg-secondary' : 'bg-primary';
    }
    return <div className="flex">{cells}</div>;
  }

  const rows = [];
  let color = 'bg-primary';
  for (let i = 0; i < 8; i++) {
    rows.push(generateRow(color));
    color = color === 'bg-primary' ? 'bg-secondary' : 'bg-primary';
  }

  return <div className="border-2 border-primary w-fit h-fit">{rows}</div>;
}
