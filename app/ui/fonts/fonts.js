import localFont from 'next/font/local';
import { Montserrat } from 'next/font/google';

export const glockenspiel = localFont({
  src: 'Glockenspiel.ttf',
  variable: '--font-glockenspiel',
});

export const montserrat = Montserrat({
  weight: ['100', '300', '500'],
  subsets: ['latin'],
  variable: '--font-montserrat',
});
