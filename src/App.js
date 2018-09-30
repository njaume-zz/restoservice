import React, { Component } from 'react';
//import logo from './logo.svg';
import { Route, Switch, Redirect } from 'react-router';
import './css/main.css';
import ListViewContainer from './containers/ListViewContainer'
import { BrowserRouter } from 'react-router-dom';
import Loader from './components/Loader'
import OrderContainer from './containers/OrderContainer'
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="mat_list_title">
          <h1>Resto Service</h1>
        </div>
          <Loader isLoading={this.props.isLoading}/>
      <div className='container'>
      <BrowserRouter>
        <Switch>
          <Route exact path="/restaurants" component={ListViewContainer} />
          <Route exact path="/restaurants/order" component={OrderContainer} />
          <Redirect to="/restaurants" />
        </Switch>
        </BrowserRouter>
      </div>
      </React.Fragment>
    );
  }
}

export default App;
