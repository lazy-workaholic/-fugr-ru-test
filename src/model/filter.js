export const UP = 'UP';
export const DOWN = 'DOWN';
export const NONE = 'NONE';

export const filterStates = [NONE,UP,DOWN];

export const filterModel = {
  filter: {},
  filterSetter: ()=>{},
  setFilter: (filterKey) => {
    let stateNextIndex = filterStates.indexOf(filterModel.filter[filterKey]) + 1;
    if(stateNextIndex > (filterStates.length-1))stateNextIndex=0;

    let filterBuf = Object.assign({},filterModel.filter);
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
    filterModel.filterSetter(filterBuf);
  },
  getFilteredData:(_data=[])=>{
    let data = [..._data];
    const sortKey = filterModel.filter.currentKey;
    const sortKeyValue = filterModel.filter[sortKey] ||filterModel.filter['id'];

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
  }
}