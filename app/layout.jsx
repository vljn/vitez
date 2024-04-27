import './globals.css';
import { glockenspiel, montserrat } from './ui/fonts/fonts';

export const metadata = {
  title: 'Knight Travails',
};

export default function RootLayout({ children }) {
  console.log(glockenspiel);
  return (
    <html lang="en">
      <body
        className={`bg-background font-main min-h-svh ${glockenspiel.variable} ${montserrat.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
