import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Route, Switch} from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Dashboard from './components/homepage/Dashboard';
import Home from './components/homepage/Homepage';
import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css';

ReactDOM.render(
    <MuiThemeProvider>
    <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={Home} />
          <Route exact path="/login" component={Home} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/dashboard/categories" component={Dashboard} />
          <Route exact path="/dashboard/category" component={Dashboard} />
          <Route exact path="/dashboard/category/:id/recipes/" component={Dashboard} />                                  
        </Switch>
      </Router>
    </MuiThemeProvider>,
    document.getElementById('root')
)
registerServiceWorker();
