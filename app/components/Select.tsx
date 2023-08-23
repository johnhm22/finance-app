import React from 'react';

interface IProps {
  options: { value: string; label: string }[];
  label: string;
  name: string;
}

const Select = ({ options, label, name }: IProps) => {
  return (
    <>
      {/* <ul>
        {options.map((option, idx) => (
          <li key={idx}>
            {option.label} {option.value}
          </li>
        ))}
      </ul> */}
    </>
  );
};

export default Select;
