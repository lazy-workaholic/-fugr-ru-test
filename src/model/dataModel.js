import React, { useReducer } from 'react';
import { DataContext, dataReducer, big_data_link, BIG_DATA, SMALL_DATA, _ERROR, ADD_DATA, small_data_link } from '../controller/data-controller';
import axios from 'axios';
import { errorHandler, errorType } from './errorHandler';

const getData = async (link) => {
  try {
    const result = await axios.get(link);
    return result.data;
  } catch (error) {
    throw errorHandler(error,errorType.CONNECTION);
  }
}

const postData = (params) => {
  return params;
}


export const DataModel = ({children}) => {

  const [state,dispatch] = useReducer(dataReducer,{
    getDataInProcess:false,
    addDataInProcess:false,
    data:[],
    error:null
  });

  const getBigDataFromServer = async () => {
    dispatch({type: BIG_DATA,payload:{getDataInProcess:true}});
    try {
      const data = await getData(big_data_link);
      dispatch({type: BIG_DATA,
        payload:{
          getDataInProcess:false,
          data:data
        }
      });
    } catch (error) {
      dispatch({type: BIG_DATA,payload:{getDataInProcess:false}});
      dispatch({type: _ERROR,payload:{error:error}});
    }
  }

  const getSmallDataFromServer = async () => {
    dispatch({type: SMALL_DATA,payload:{getDataInProcess:true}});
    try {
      const data = await getData(small_data_link);
      dispatch({type: SMALL_DATA,
        payload:{
          getDataInProcess:false,
          data:data
        }
      });
    } catch (error) {
      dispatch({type: SMALL_DATA,payload:{getDataInProcess:false}});
      dispatch({type: _ERROR,payload:{error:error}});
    }
  }

  const addData = async (params) => {
    dispatch({type: ADD_DATA,payload:{addDataInProcess:true}});
    try {
      const result = await postData(params);
      dispatch({type: SMALL_DATA,
        payload:{
          addDataInProcess:false,
          data:[result,...state.data]
        }
      });
    } catch (error) {
      dispatch({type: ADD_DATA,payload:{addDataInProcess:false}});
      dispatch({type: _ERROR,payload:{error:error}});
    }
  }

  const getAllData = () => state.data || [];

  const getDownloadState = () => state.getDataInProcess;

  return(
  <DataContext.Provider value = {{
    vars:state,
    addData,
    getAllData,
    getBigDataFromServer,
    getSmallDataFromServer,
    getDownloadState
  }}>
    {children}
  </DataContext.Provider>
  );
}