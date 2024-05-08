export default function SpeedSlider({ setSpeed, speed, min, max, disabled }) {
  return (
    <div className="flex items-center mt-2">
      <label htmlFor="brzina" className="text-sm lg:text-base">
        Брзина анимације:{' '}
      </label>
      <input
        type="range"
        onChange={(e) => {
          setSpeed(parseInt(e.target.value));
        }}
        min={min}
        max={max}
        value={speed}
        id="brzina"
        disabled={disabled}
        className="flex-1 ml-4 h-2 bg-secondary border-2 border-primary appearance-none rounded
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:!bg-secondary
          [&::-webkit-slider-thumb]:w-4
          [&::-webkit-slider-thumb]:h-4
          [&::-webkit-slider-thumb]:rounded-2xl
          [&::-webkit-slider-thumb]:border-4
          [&::-webkit-slider-thumb]:border-solid
          [&::-webkit-slider-thumb]:border-primary
          [&::-webkit-slider-thumb]:transition-transform
          hover:[&::-webkit-slider-thumb]:scale-125
          cursor-pointer
          disabled:bg-gray-500
          [&::-webkit-slider-thumb]:disabled:!bg-gray-500
          hover:[&::-webkit-slider-thumb]:disabled:scale-100
          disabled:cursor-default"
      />
    </div>
  );
}
