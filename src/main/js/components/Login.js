import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
//import Carlist from './Carlist';
import ClippedDrawer from './ClippedDrawer';
import {SERVER_URL} from '../constants.js';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {username: '', password: '', isAuthenticated: false, open: false};
    console.log('start constructing');
  }

  login = () => {
    const user = {username: this.state.username, password: this.state.password};
    fetch('login', {
//        fetch(SERVER_URL + 'login', {
      method: 'POST',
      body: JSON.stringify(user)
    })
    .then(res => {
      const jwtToken = res.headers.get('Authorization');
      console.log('token value %s',jwtToken);
      if (jwtToken !== null) {
    	  console.log('token is valid');
    	  sessionStorage.setItem("jwt", jwtToken);
        this.setState({isAuthenticated: true});
      }
      else {
    	  console.log('token is not valid');

    	  this.setState({open: true});

      }
    })
    .catch(err => console.error(err)) 
  }

  handleChange = (event) => {
    this.setState({[event.target.name] : event.target.value});
  }

  handleClose = (event) => {
    this.setState({ open: false });
  }

  render() {
    if (this.state.isAuthenticated === true) {
        //return (<Carlist />)
        return (<ClippedDrawer />)
    }
    else {
      return (
        <div>
          <br/>
          <TextField tpye="text" name="username" placeholder="Username" 
          onChange={this.handleChange} /><br/>  
          <TextField type="password" name="password" placeholder="Password" 
          onChange={this.handleChange} /><br /><br/>  
          <Button variant="raised" color="primary" onClick={this.login}>Login</Button>
          <Snackbar           
          open={this.state.open}  onClose={this.handleClose} 
          autoHideDuration={1500} message='Check your username and password' />
        </div>
      );
    }
  }
}

export default Login;
