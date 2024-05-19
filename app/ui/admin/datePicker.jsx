'use client';

import { useState } from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { DateTime } from 'luxon';

export default function DatePicker({ date }) {
  const [selectedDate, setSelectedDate] = useState(DateTime.fromJSDate(date));

  return (
    <div className="bg-primary text-knight-white flex justify-between items-center w-56 m-auto rounded-xl">
      <div className="border-r border-knight-white">
        <button
          className="m-2"
          onClick={() => {
            setSelectedDate(selectedDate.plus({ days: -1 }));
          }}
        >
          <ArrowLeftIcon className="w-6" />
        </button>
      </div>
      <span className="text-xl mx-2">{selectedDate.setLocale('sr-rs').toLocaleString()}</span>
      <div className="border-l border-knight-white">
        <button
          className="m-2"
          onClick={() => {
            setSelectedDate(selectedDate.plus({ days: 1 }));
          }}
        >
          <ArrowRightIcon className="w-6" />
        </button>
      </div>
    </div>
  );
}
