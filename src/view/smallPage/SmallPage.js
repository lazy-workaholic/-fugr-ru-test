import React, { useContext, useEffect } from 'react';
import { DataContext } from '../../controller/data-controller';
import { Easel } from '../components/Easel';
import { Users, UsersItem } from '../components/Users';

const UP = 'UP';
const DOWN = 'DOWN';
const NONE = 'NONE';

export const SmallPage = ({
  filter={
    id:NONE,
    firstName:NONE,
    lastName:NONE,
    email:NONE,
    phone:NONE,
    currentKey:'id'
  },
  filterSetter=()=>{},
  filterStates=[NONE]
}) => {

  const {getSmallDataFromServer,getDownloadState,getAllData} = useContext(DataContext);
  
  useEffect(()=>{
    getSmallDataFromServer();
    // eslint-disable-next-line
  },[]);

  const _filterSetter = (filterKey) => {
    let stateNextIndex = filterStates.indexOf(filter[filterKey]) + 1;
    if(stateNextIndex > (filterStates.length-1))stateNextIndex=0;

    let filterBuf = Object.assign({},filter);
    const stateName = filterStates[stateNextIndex];

    filterBuf.currentKey = filterKey;
    
    Object.keys(filterBuf).forEach(filtKey => {
      if(filterKey === filtKey)
      {
        filterBuf[filtKey] = stateName;
      }
      else if(filtKey !== 'currentKey')
      {
        filterBuf[filtKey] = NONE;
      }
    });

    filterSetter(filterBuf);
  }


  
  const userList = (()=>{
    let data = [...getAllData()];
    const sortKey = filter.currentKey;
    const sortKeyValue = filter[sortKey] || filter['id'];

    switch(sortKeyValue)
    {
      case UP:
        return data.sort((a,b)=>{
          if(a[sortKey]>b[sortKey]) return 1;
          return -1;
        });
      case DOWN:
        return data.sort((a,b)=>{
          if(a[sortKey]<b[sortKey]) return 1;
          return -1;
        });
      default:
        return data;
    }
    
  })();

  return(
    <Easel downloadState={getDownloadState()}>
      <Users filter={filter} filterSetter={_filterSetter} filter={filter}>
        {
          userList.map(((userItem, index) => 
            (
              <UsersItem key={`User-${userItem.id}-${index}`} usersItem={userItem}/>
            )
          ))
        }
      </Users>
    </Easel>
  );
}