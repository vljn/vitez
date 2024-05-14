'use client';

import React, { useEffect, useState } from 'react';
import KnightImage from '../../public/knight-board.svg';
import Image from 'next/image';
import useChessFigure from '../hooks/figure';

export default function Knight({ position, selected }) {
  const style = useChessFigure(position, selected);

  if (!position) return null;

  return (
    <Image
      className={`${selected && 'drop-shadow-xl'} z-20`}
      src={KnightImage}
      alt="Knight"
      style={{
        ...style,
      }}
    />
  );
}
