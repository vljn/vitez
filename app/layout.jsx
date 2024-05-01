import './globals.css';
import { glockenspiel, montserrat } from './ui/fonts/fonts';

export const metadata = {
  title: 'Витез',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`bg-background font-main ${glockenspiel.variable} ${montserrat.variable} text-primary`}
      >
        {children}
      </body>
    </html>
  );
}
