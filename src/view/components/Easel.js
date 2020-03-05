import React from 'react';
import {DownloadSpinner} from '../components/DownloadSpinner';

export const Easel = ({children,downloadState = false,addUserFormState=()=>console.log('show form triggd')}) => {
  
  if(downloadState === true)
  {
    return (<div className='container easel-content-center'>
      <div className='text-center'>
        <DownloadSpinner size='lg' spinnerStyle='primary'/>  
      </div>
    </div>);
  }

  return(
    <div className='main-small'>
      <div className='text-center show-from-event-trigger'>
        <button className='btn btn-sm btn-outline-success' onClick={addUserFormState}>Добавить пользователя</button>
      </div>
      <div className='container'>
        {children}
      </div>
    </div>
  );
}