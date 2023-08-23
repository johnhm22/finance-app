import { Combobox } from '@headlessui/react';
import React from 'react';

const ComboBox = () => {
  return (
    <Combobox value={selectedTicker} onChange={setSelectedTicker}>
      <Combobox.Input onChange={(event) => setQuery(event.target.value)} />
      <Combobox.Options>
        {tickerData.map((ticker) => (
          <Combobox.Option key={ticker} value={ticker}>
            {ticker}
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox>
  );
};

export default ComboBox;
