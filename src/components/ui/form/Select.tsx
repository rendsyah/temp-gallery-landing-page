import type React from 'react';
import type { Options } from '@/types/commons.types';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { cn } from '@/libs/utils/cn';
import ChevronDownIcon from '@/components/icons/ChevronDown';

type SelectProps = {
  id?: string;
  placeholder?: string;
  options: Options[];
  className?: string;
  value: string | number;
  error?: string;
  disabled?: boolean;
  onChange: (value: string | number) => void;
};

const Select: React.FC<SelectProps> = ({
  id,
  placeholder,
  options,
  className,
  value,
  error,
  disabled,
  onChange,
}) => {
  const selected = options.find((opt) => opt.id === value) || null;

  return (
    <div className="w-full">
      {/* SELECT */}
      <Listbox
        value={selected}
        onChange={(option: Options) => onChange(option.id)}
        disabled={disabled}
      >
        {({ open }) => (
          <div className="relative">
            {/* BUTTON */}
            <ListboxButton
              id={id}
              className={cn(
                'flex items-center justify-between gap-2 input text-left',
                error && 'input-error',
                disabled && 'input-disabled',
                className,
              )}
              aria-invalid={!!error}
              aria-describedby={error ? `${id}-error` : undefined}
            >
              <span className={cn(!selected?.name && 'text-primary-black')}>
                {selected?.name ?? placeholder}
              </span>
              <ChevronDownIcon
                className={cn(
                  'w-4 h-4 shrink-0 transition-transform duration-200',
                  open && 'rotate-180',
                )}
                aria-hidden="true"
              />
            </ListboxButton>
            {/* OPTIONS */}
            <ListboxOptions
              anchor="bottom"
              transition
              style={{ maxHeight: '240px' }}
              className={cn(
                'w-(--button-width) rounded-4xl bg-background p-1 shadow-xs [--anchor-gap:--spacing(1)] focus:outline-none',
                'transition duration-100 ease-in data-leave:data-closed:opacity-0',
                '!max-h-60 custom-scrollbar',
                'z-50',
              )}
            >
              {options.length > 0 ? (
                options.map((opt) => (
                  <ListboxOption
                    key={opt.name}
                    value={opt}
                    className="group flex cursor-default items-center gap-2 rounded-lg px-3 py-1.75 select-none data-focus:bg-hover-blue"
                  >
                    <div>{opt.name}</div>
                  </ListboxOption>
                ))
              ) : (
                <div className="px-3 py-1.75 select-none">No options available</div>
              )}
            </ListboxOptions>
            {/* ERROR */}
            {error && (
              <p id={`${id}-error`} className="input-text-error">
                {error}
              </p>
            )}
          </div>
        )}
      </Listbox>
    </div>
  );
};

export default Select;
