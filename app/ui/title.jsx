import { notoSerifDisplay } from './fonts/fonts';

export default function Title({ children }) {
  return (
    <h1
      className={`text-5xl max-lg:text-center text-primary my-5 lg:my-0 md:text-6xl md:mb-3 xl:text-8xl font-title lg:mb-4`}
    >
      {children}
    </h1>
  );
}
