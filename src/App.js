import React, { useState } from 'react';
import {BrowserRouter,Route,Switch,Redirect} from 'react-router-dom';
import { SmallPage } from './view/smallPage/SmallPage.js';
import { BigPage } from './view/bigPage/BigPage.js';
import { DataModel } from './model/dataModel.js';

const HOME_PAGE = require('../package.json').homepage || '/';

const BIG_ITEMS_LINK = '/big';
const SMALL_ITEMS_LINK = '/small'

const UP = 'UP';
const DOWN = 'DOWN';
const NONE = 'NONE';

const filterStates = [NONE,UP,DOWN];

function App() {

  const [filter,setFilter] = useState({
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
          <Route path={SMALL_ITEMS_LINK}><SmallPage filter={filter} filterStates={filterStates} filterSetter={setFilter}/></Route>
          <Route path={BIG_ITEMS_LINK}><BigPage filter={filter} filterStates={filterStates} filterSetter={setFilter}/></Route>
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
