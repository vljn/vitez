import './globals.css';
import { glockenspiel, montserrat } from './ui/fonts/fonts';

export const metadata = {
  title: 'Витез',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`bg-glavna bg-no-repeat bg-cover backdrop-blur-sm lg:backdrop-blur-md font-main ${glockenspiel.variable} ${montserrat.variable} text-primary h-svh`}
      >
        {children}
      </body>
    </html>
  );
}
