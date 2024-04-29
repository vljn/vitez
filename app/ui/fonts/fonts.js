import localFont from 'next/font/local';
import { Montserrat, Noto_Serif_Display } from 'next/font/google';

export const glockenspiel = localFont({
  src: 'Glockenspiel.ttf',
  variable: '--font-glockenspiel',
});

export const notoSerifDisplay = Noto_Serif_Display({
  weight: ['400', '600'],
  subsets: ['cyrillic'],
});

export const montserrat = Montserrat({
  weight: ['100', '300', '500'],
  subsets: ['latin'],
  variable: '--font-montserrat',
});
