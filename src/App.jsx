import './App.css';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Main from './components/Main';
import Header from './components/Header';
import Create from './components/Create';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path='/' component={Main} />
        <Route path='/create-task' component={Create} />
        <Route path='/login' component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
