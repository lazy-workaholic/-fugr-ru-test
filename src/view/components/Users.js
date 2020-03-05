import React, { Fragment, useState } from 'react';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';

const FilterIcon = ({value}) => {
  
  if(value === 'UP')return(<IoIosArrowUp/>);
  if(value === 'DOWN')return(<IoIosArrowDown/>);
  return <>&#8195;</>;
}


export const Users = ({children, filter= {},filterSetter=()=>{}}) => {
  
  return(
    <table className='table'>
      <thead>
        <tr>
          <th scope="col" onClick = {()=>filterSetter('id')}>id <FilterIcon value={filter['id']}/></th>
          <th scope="col" onClick = {()=>filterSetter('firstName')}>firstName <FilterIcon value={filter['firstName']}/></th>
          <th scope="col" onClick = {()=>filterSetter('lastName')}>lastName <FilterIcon value={filter['lastName']}/></th>
          <th scope="col" onClick = {()=>filterSetter('email')}>email <FilterIcon value={filter['email']}/></th>
          <th scope="col" onClick = {()=>filterSetter('phone')}>phone <FilterIcon value={filter['phone']}/></th>
        </tr>
      </thead>
      <tbody>
        {
          children
        }
      </tbody>
    </table>
  )
};

export const UsersItem = ({usersItem={}}) => {
  const [showState, setShowState] = useState(false);

  return (
    <Fragment>
      <tr onClick={()=>{setShowState(!showState)}}>
        <td>{usersItem.id}</td>
        <td>{usersItem.firstName}</td>
        <td>{usersItem.lastName}</td>
        <td>{usersItem.email}</td>
        <td>{usersItem.phone}</td>
      </tr>
      <UserItemInfo showState={showState} userItem={usersItem}/>
    </Fragment>
  );
}

export const UserItemInfo = ({showState = false,userItem = null}) => 
{
  if(userItem === null || typeof userItem !== 'object' || Array.isArray(userItem))return null;

  const shState = showState?'active':'inactive';

  return(
    <tr>
      <td colSpan='5' style={{padding:0}}>
        <div className={`user-item-${shState}`}>
          <div><label>Выбран пользователь <b>{userItem.firstName||''} {userItem.lastName||''}</b></label></div>
          <div className="form-group">
            <label htmlFor={userItem.id}>Описание:</label>
            <textarea className="form-control" id={userItem.id} rows="3" defaultValue={userItem.description||''}/>
          </div>
          <div><label>Адрес проживания: <b>{userItem.address?userItem.address.streetAddress||'':''}</b></label></div>
          <div><label>Город: <b>{userItem.address?userItem.address.city||'':''}</b></label></div>
          <div><label>Провинция: <b>{userItem.address?userItem.address.state||'':''}</b></label></div>
          <div><label>Индекс: <b>{userItem.address?userItem.address.zip||'':''}</b></label></div>
        </div>
      </td>
    </tr>
  );
}