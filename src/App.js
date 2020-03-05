import React, { useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { SmallPage } from './view/smallPage/SmallPage.js';
import { BigPage } from './view/bigPage/BigPage.js';
import { DataModel } from './model/dataModel.js';
import { filterModel, NONE } from './model/filter.js';

const HOME_PAGE = require('../package.json').homepage || '/';

const BIG_ITEMS_LINK = '/big';
const SMALL_ITEMS_LINK = '/small'

function App() {
  const [addFormState,setUserAddFormsState] = useState(false);
  [filterModel.filter,filterModel.filterSetter] = useState({
    id:NONE,
    firstName:NONE,
    lastName:NONE,
    email:NONE,
    phone:NONE,
    currentKey:'id'
  });
  
  return (
    <DataModel>
      <BrowserRouter basename={HOME_PAGE}>
        <Switch>
          <Route path={SMALL_ITEMS_LINK}>
            <SmallPage userAddFormState={addFormState} userAddFormSetState={setUserAddFormsState}/>
          </Route>
          <Route path={BIG_ITEMS_LINK}>
            <BigPage/>
          </Route>
        </Switch>

        <Route path='/' exact>
          <Redirect to={SMALL_ITEMS_LINK}/>
        </Route>
        <Route path={`${SMALL_ITEMS_LINK}/*`} exact>
          <Redirect to={SMALL_ITEMS_LINK}/>
        </Route>
        <Route path={`${BIG_ITEMS_LINK}/*`} exact>
          <Redirect to={BIG_ITEMS_LINK}/>
        </Route>
        
      </BrowserRouter>
    </DataModel>
  );
}

export default App;
