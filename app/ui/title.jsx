import { notoSerifDisplay } from './fonts/fonts';

export default function Title({ children }) {
  return (
    <h1
      className={`text-5xl lg:my-0 md:text-6xl xl:text-9xl font-title drop-shadow-2xl select-none lg:hover:scale-105 lg:transition-transform lg:w-min relative z-90`}
    >
      {children}
    </h1>
  );
}
