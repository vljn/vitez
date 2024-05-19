'use client';

import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import FormError from './formError';
import { useState } from 'react';

export default function FormField({ label, type, name, id, error, last }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`${last ? 'mb-8' : 'mb-4'} relative`}>
      <label htmlFor="password" className="block font-bold text-sm mb-2 lg:text-lg">
        {label}
      </label>
      <input
        type={showPassword ? 'text' : type}
        name={name}
        id={id}
        className="appearance-none rounded bg-primary border-none text-knight-white px-3 py-2 w-full leading-tight focus:ring-knight-white"
      />
      {type === 'password' && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-2 top-11 text-knight-white w-5"
        >
          {showPassword ? <EyeSlashIcon /> : <EyeIcon className="" />}
        </button>
      )}
      {error && <FormError text={error} />}
    </div>
  );
}
