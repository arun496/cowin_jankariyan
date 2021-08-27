import logo from './logo.svg';
import './App.css';
import { Switch, Link, Route, Redirect } from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
import { AuthProvider, AuthContext } from './Contexts/AuthProvider';
import { useContext } from 'react';
import Profile from './components/Profile';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <PrivateRoute path="/" privateComponent={Profile} />
        </Switch>
      </AuthProvider>
    </div>
  );
}

function PrivateRoute({privateComponent: Component, ...restProps}) {
  const { currentUser } = useContext(AuthContext);
  // console.log(currentUser);
  return (
    <Route {...restProps} render={(props) => {
      return (currentUser !== null) ? <Component {...props}/> : <Redirect to='/login'></Redirect>
    }}></Route>
  );
}

export default App;
