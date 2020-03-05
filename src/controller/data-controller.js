import { createContext } from 'react';


export const ADD_DATA = 'ADD_DATA';

export const BIG_DATA = 'BIG_DATA';
  export const big_data_link = 'http://www.filltext.com/?rows=1000&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&delay=3&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D';

export const SMALL_DATA = 'SMALL_DATA';
  export const small_data_link = 'http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D';

export const CLEAR_ERROR = 'CLEAR_ERROR';
export const _ERROR = 'ERROR';

const handlers = 
{
  DEFAULT: state => state,
  [BIG_DATA]:    (state,{payload}) => ({...state,...payload}),
  [SMALL_DATA]:  (state,{payload}) => ({...state,...payload}),
  [ADD_DATA]:   (state,{payload}) => ({...state,...payload}),
  [_ERROR]: (state,{payload}) => ({...state,...payload}),
  [CLEAR_ERROR]: (state,{payload}) => ({...state,...payload})
}

export const dataReducer = ( state, action ) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action)
}

export const DataContext = createContext();

