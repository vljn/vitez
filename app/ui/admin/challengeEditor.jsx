'use client';

import DatePicker from './datePicker';
import { useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import Board from '../board/board';
import Figure from '../board/figure';
import { getChallenge, getFigures, addChallenge } from '@/app/lib/actions';
import Button from '../button';
import CoordinateInputControlled from '../forms/coordinateInputControlled';

export default function ChallengeEditor({ date }) {
  const [selectedDate, setSelectedDate] = useState(DateTime.fromJSDate(date));
  const [challenge, setChallenge] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [figures, setFigures] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [knightPosition, setKnightPosition] = useState(null);
  const [endPosition, setEndPosition] = useState(null);
  const [otherFigures, setOtherFigures] = useState([]);

  useEffect(() => {
    async function fetchChallenge(date) {
      const challenge = await getChallenge(date);
      return challenge;
    }

    async function fetchFigures(date) {
      const figures = await getFigures(date);
      return figures;
    }

    setIsLoading(true);

    const formattedDate = selectedDate.toFormat('yyyy-MM-dd');
    Promise.all([fetchChallenge(formattedDate), fetchFigures(formattedDate)]).then(
      ([challenge, figures]) => {
        setChallenge(challenge);
        setFigures(figures);

        setIsLoading(false);
      }
    );
  }, [selectedDate]);

  function updateDate(date) {
    setSelectedDate(date);
    setIsEditing(false);
  }

  function renderFigures() {
    if (!isLoading) {
      return figures.length ? (
        <div>
          {challenge && (
            <Figure position={{ x: challenge?.pocetak_x, y: challenge?.pocetak_y }} type="konj" />
          )}
          {figures &&
            figures.map((figure) => (
              <Figure
                type={figure.figura}
                key={figure.id}
                position={{ x: figure.x, y: figure.y }}
              />
            ))}
        </div>
      ) : null;
    }
  }

  function renderEditing() {
    if (!isEditing) return null;
    return (
      <div>
        <Figure type="konj" position={knightPosition} />
        {otherFigures &&
          otherFigures.map((figure) => (
            <Figure type={figure.figure} key={figure.id} position={{ x: figure.x, y: figure.y }} />
          ))}
      </div>
    );
  }

  function updateOtherFigurePosition(index, newCoordinates) {
    setOtherFigures((figures) =>
      figures.map((figure, i) => (i === index ? { ...figure, ...newCoordinates } : figure))
    );
  }

  function removeFigure(index) {
    setOtherFigures((figures) => figures.filter((_, i) => i !== index));
  }

  function saveChallenge() {
    addChallenge(knightPosition, endPosition, selectedDate.toFormat('yyyy-MM-dd'), otherFigures);
    setIsEditing(false);
    setSelectedDate(selectedDate.plus({ days: 1 }));
  }

  return (
    <div className="mb-10">
      <DatePicker date={selectedDate} setDate={updateDate} />
      <div className="mt-10 flex flex-col items-center gap-6">
        <div>
          {renderFigures()}
          {renderEditing()}
          <Board
            end={
              isEditing
                ? { x: endPosition?.x, y: endPosition?.y }
                : { x: challenge?.kraj_x, y: challenge?.kraj_y }
            }
          />
        </div>
        {isEditing && (
          <div>
            <CoordinateInputControlled
              coordinates={knightPosition}
              setCoordinates={setKnightPosition}
              label="Коњ"
              nameX="konj_x"
              nameY="konj_y"
            />
            <CoordinateInputControlled
              coordinates={endPosition}
              setCoordinates={setEndPosition}
              label="Крај"
              nameX="kraj_x"
              nameY="kraj_y"
            />
            {otherFigures.map((figure, index) => (
              <div
                key={index}
                className={`flex justify-between gap-8 ${
                  index === otherFigures.length - 1 ? 'mt-2' : 'my-2'
                }`}
              >
                <CoordinateInputControlled
                  coordinates={figure}
                  setCoordinates={(newCoordinates) =>
                    updateOtherFigurePosition(index, newCoordinates)
                  }
                  label={`Топ ${index + 1}`}
                  nameX={`top_${index}_x`}
                  nameY={`top_${index}_y`}
                />
                <button
                  onClick={() => removeFigure(index)}
                  className="bg-red-700 text-white rounded px-2 py-1 hover:bg-red-800 transition-colors text-sm"
                >
                  Уклони
                </button>
              </div>
            ))}
            <button
              onClick={() => setOtherFigures([...otherFigures, { figure: 'top' }])}
              className="bg-secondary border-2 border-primary rounded px-2 py-1 hover:bg-primary hover:text-knight-white transition-colors my-4 text-sm"
            >
              Додај топа
            </button>
            <Button className="block mt-2" onClick={saveChallenge}>
              Сачувај
            </Button>
          </div>
        )}
      </div>
      {!challenge && !isEditing && (
        <div className="text-center my-10">
          <h1 className="mb-2">За одабрани датум није унет изазов</h1>
          <Button onClick={() => setIsEditing(true)}>Додај</Button>
        </div>
      )}
    </div>
  );
}
