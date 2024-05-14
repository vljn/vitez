'use client';

import Image from 'next/image';
import useChessFigure from '../hooks/figure';
import RookImage from '../../public/rook.svg';

export default function Rook({ position }) {
  const style = useChessFigure(position);

  if (!position) return null;

  return (
    <Image
      className={`z-20`}
      src={RookImage}
      alt="Rook"
      style={{
        ...style,
      }}
    />
  );
}
