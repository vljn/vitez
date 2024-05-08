import './globals.css';
import { glockenspiel, montserrat } from './ui/fonts/fonts';

export const metadata = {
  title: 'Витез',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`bg-background bg-no-repeat bg-cover font-main ${glockenspiel.variable} ${montserrat.variable} text-primary min-h-svh`}
      >
        {children}
      </body>
    </html>
  );
}
