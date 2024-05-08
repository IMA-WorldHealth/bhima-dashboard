/* eslint-disable @typescript-eslint/no-explicit-any */
import Flatpickr from 'react-flatpickr';
import { French } from 'flatpickr/dist/l10n/fr.js';
import "flatpickr/dist/themes/material_blue.css";

interface PropsRanger {
  className?: string;
  id?: string;
  placeholder?: string;
  onChange: (value: any) => void;
  value?: any;
  mode: 'single' | 'range';
  required?: boolean;
  disabled?: boolean;
}

const EDateRange: React.FC<PropsRanger> =
  ({ className, id, placeholder, onChange, value, mode, required, disabled }) => {
  const options: any = {
    locale: {
      ...French,
      months: {
        ...French.months,
        longhand: [
          'Janvier',
          'Février',
          'Mars',
          'Avril',
          'Mai',
          'Juin',
          'Juillet',
          'Aôut',
          'Septembre',
          'Octobre',
          'Novembre',
          'Décembre',
        ],
      },
    },
    altInput: true,
    altFormat: 'F j, Y',
    mode,
    dateFormat: 'd.m.y',
  };
    return (
      <div className={className}>
        <Flatpickr
          className={`appearance-none flex border rounded w-full py-2 px-3 text-blue-400 leading-tight focus:outline-none focus:shadow-outline`}
          id={id}
          placeholder={placeholder}
          options={options}
          onChange={onChange}
          value={value}
          required={required}
          disabled={disabled}
        />
      </div>
    );
};

export default EDateRange;
