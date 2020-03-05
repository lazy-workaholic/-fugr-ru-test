import React, { useContext, useEffect } from 'react';
import { DataContext } from '../../controller/data-controller';
import { Easel } from '../components/Easel';
import { Users, UsersItem, UserAddForm } from '../components/Users';
import {filterModel} from '../../model/filter';

export const SmallPage = ({userAddFormSetState=()=>{},userAddFormState = false}) => {

  const {getSmallDataFromServer,getDownloadState,getAllData} = useContext(DataContext);
  
  useEffect(()=>{
    getSmallDataFromServer();
    // eslint-disable-next-line
  },[]);
  
  const userList = filterModel.getFilteredData(getAllData());

  return(
    <Easel downloadState={getDownloadState()} addUserFormState={()=>userAddFormSetState(true)}>
      <UserAddForm show={userAddFormState} setShow={userAddFormSetState}/>
      <Users filter={filterModel.filter} filterSetter={filterModel.setFilter}>
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