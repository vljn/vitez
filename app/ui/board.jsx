export default function Board() {
  function generateCell(color) {
    return (
      <div
        className={`square ${color} w-10 h-10 md:w-14 md:h-14 lg:w-[4.5rem] lg:h-[4.5rem] xl:w-20 xl:h-20`}
      ></div>
    );
  }

  function generateRow(color) {
    const cells = [];
    for (let i = 0; i < 8; i++) {
      cells.push(generateCell(color));
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

  return <div className="border-2 border-primary md:mx-0 mx-auto w-fit h-fit">{rows}</div>;
}
