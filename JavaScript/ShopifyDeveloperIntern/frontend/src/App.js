import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Switch, Route, Link} from 'react-router-dom'
import AllInventory from './views/AllInventory';
import OneInventory from './views/OneInventory';
import CreateInventory from './views/CreateInventory';
import UpdateInventory from './views/UpdateInventory';

function App() {
  return (
    <div className="App">
      <h1>Shopify Inventory</h1>
      <Switch>
        <Route exact path="/">
          <AllInventory/>
        </Route>
        <Route  exact path="/inventory/:_id">
          <OneInventory/>
        </Route>
        <Route exact path="/create/inventory">
          <CreateInventory/>
        </Route>
        <Route exact path="/update/inventory/:_id">
          <UpdateInventory/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
