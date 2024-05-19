'use client';

import DatePicker from './datePicker';
import { useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import Board from '../board/board';
import Figure from '../board/figure';
import { getChallenge, getFigures } from '@/app/lib/actions';

export default function ChallengeEditor({ date }) {
  const [selectedDate, setSelectedDate] = useState(DateTime.fromJSDate(date));
  const [challenge, setChallenge] = useState(null);
  const [figures, setFigures] = useState([]);

  useEffect(() => {
    async function fetchChallenge(date) {
      const challenge = await getChallenge(date);
      return challenge;
    }

    async function fetchFigures(date) {
      const figures = await getFigures(date);
      return figures;
    }

    const formattedDate = selectedDate.toFormat('yyyy-MM-dd');

    fetchChallenge(formattedDate).then((challenge) => setChallenge(challenge));
    fetchFigures(formattedDate).then((figures) => setFigures(figures));
  }, [selectedDate]);

  return (
    <div className="">
      <DatePicker date={selectedDate} setDate={setSelectedDate} />
      <div className="mt-10 flex justify-center">
        <div>
          {challenge && (
            <Figure position={{ x: challenge?.pocetak_x, y: challenge?.pocetak_y }} type="konj" />
          )}
          {figures.map((figure) => (
            <Figure type={figure.figura} key={figure.id} position={{ x: figure.x, y: figure.y }} />
          ))}
          <Board end={{ x: challenge?.kraj_x, y: challenge?.kraj_y }} onClick={() => {}} />
        </div>
      </div>
      {!challenge && (
        <div className="text-center mt-10">
          <h1>За одабрани датум није унет изазов</h1>
        </div>
      )}
    </div>
  );
}
