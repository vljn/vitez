export default function CoordinateInputControlled({
  coordinates,
  setCoordinates,
  label,
  nameX,
  nameY,
}) {
  return (
    <div className="mt-2">
      <label htmlFor={nameX} className="text-primary text-sm mr-6">
        {label}:
      </label>
      <span>
        <label htmlFor={nameX} className="text-primary text-sm mr-2">
          x:
        </label>
        <input
          type="number"
          min={0}
          max={7}
          id={nameX}
          name={nameX}
          className="rounded bg-primary text-knight-white text-sm w-12 h-6 p-1 text-center ring-0 border-0 focus:ring-knight-white"
          value={coordinates?.x}
          onChange={(e) => {
            setCoordinates({ ...coordinates, x: parseInt(e.target.value) });
          }}
        />
      </span>
      <span>
        <label htmlFor={nameY} className="text-primary text-sm mx-2">
          y:
        </label>
        <input
          type="number"
          min={0}
          max={7}
          id={nameY}
          name={nameY}
          className="rounded bg-primary text-knight-white text-sm w-12 h-6 p-1 text-center ring-0 border-0 focus:ring-knight-white"
          value={coordinates?.y}
          onChange={(e) => {
            setCoordinates({ ...coordinates, y: parseInt(e.target.value) });
          }}
        />
      </span>
    </div>
  );
}
