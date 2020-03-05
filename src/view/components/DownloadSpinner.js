import React from 'react';

export const DownloadSpinner = ({spinnerStyle='dark',size='sm'}) => 
(
  <div className={`spinner-border text-${spinnerStyle} spinner-border-${size}`} aria-hidden="true">
    <span className="sr-only">Загрузка...</span>
  </div>
);