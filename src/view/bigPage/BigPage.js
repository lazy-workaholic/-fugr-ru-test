import React, { useEffect, useContext } from 'react';
import { DataContext } from '../../controller/data-controller';
import { Easel } from '../components/Easel';
import { Users } from '../components/Users';

const NONE = 'NONE';

export const BigPage = ({filter={
  id:NONE,
  firstName:NONE,
  lastName:NONE,
  email:NONE,
  phone:NONE
}}) => {
  const {getBigDataFromServer,getDownloadState} = useContext(DataContext);

  useEffect(()=>{
    getBigDataFromServer();
    // eslint-disable-next-line
  },[]);

  return(
    <Easel downloadState={getDownloadState()}>
      <Users>big page</Users>
    </Easel>
  );
}