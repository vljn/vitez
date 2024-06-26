'use client';

import { useState } from 'react';
import FormError from './formError';

export default function FormFieldControlled({ label, type, name, id, error, last, initialValue }) {
  const [value, setValue] = useState(initialValue);

  return (
    <div className={`${last ? 'mb-8' : 'mb-4'}`}>
      <label htmlFor="password" className="block font-bold text-sm mb-2 lg:text-lg">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={id}
        className="appearance-none rounded bg-primary border-none text-knight-white focus: px-3 py-2 w-full leading-tight focus:ring-knight-white"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {error && <FormError text={error} />}
    </div>
  );
}
