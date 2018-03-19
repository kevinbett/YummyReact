import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import {notify} from 'react-notify-toast';
import axiosInstance from '../../Axios';
import Register from './Register';
import { Link } from 'react-router-dom';
import red500 from 'material-ui/styles/colors';
import LinearProgress from 'material-ui/LinearProgress';

const styles = {
    headline: {
      fontSize: 24,
      paddingTop: 16,
      marginBottom: 12,
      fontWeight: 600,
    },
    slide: {
      padding: 10,
    },
    tabItemContainer: {
		background: 'none'
	},
  };


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            error: '',
            slideIndex: 0,
            open: false,
        }
        this.handleCancel = this.handleCancel.bind(this);
        this.handleResetPassword = this.handleResetPassword.bind(this);        
    }
    handleCancel(event) {
        event.preventDefault();
        this.props.history.push('/');
    };
    handleOpen = () => {
        this.setState({open: true});
    };
    handleChange = (value) => {
        this.setState({
          slideIndex: value,
        });
      };
    handleResetChange = event => {
        this.setState({ username: event.target.value , email: event.target.value});       
    }
    handleClose = () => {
        this.setState({open: false, error: '', message:''});
    };
    handleResetPassword(event){ 
        event.preventDefault();  
        var payload = {
            "username": this.state.username,
            "email": this.state.email
        }
        axiosInstance.post('/auth/reset-password/', payload)
            .then(response => {
                this.setState({message: response.data.message});
            })
            .catch(error => {
                this.setState({error: error.response.data.message})
            })
      }

    render() {
        const actions = [
            <FlatButton
              label="Submit"
              primary={true}
              keyboardFocused={true}
              onClick={(event) => {
                  this.handleResetPassword(event);
                  <LinearProgress mode="indeterminate" />
                  }}
            />,
            <FlatButton
              label="Close"
              primary={false}
              keyboardFocused={false}
              onClick={this.handleClose}
            />,
          ];
        return (

            <div className="Login">
                <MuiThemeProvider>
                <Dialog
                    title="Reset Password"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                    >
                    { this.state.error?
                    <label color={red500}> {this.state.error}</label>: ''}
                    { this.state.message?
                    <label color={red500}> {this.state.message}</label>: ''}
                    <form onSubmit={this.handleSubmit}>
                        <TextField
                        hintText="Enter Username"
                        floatingLabelText="Username"
                        fullWidth={true}
                        onChange={(event, newValue) =>
                                            this.setState({ username: newValue })} />
                        <br/>
                        <TextField
                        hintText="Enter Email"
                        floatingLabelText="Enter Email"
                        fullWidth={true}                        
                        onChange={(event, newValue) =>
                                            this.setState({ email: newValue })} />
                    </form>
                </Dialog> 
                    <div>
                        <Tabs
                        onChange={this.handleChange}
                        tabItemContainerStyle={styles.tabItemContainer}
                        value={this.state.slideIndex}
                        >
                        <Tab label="Login" style={{ color: 'black' }} value={0} />
                        <Tab label="Register" style={{ color: 'black' }} value={1} />
                        </Tabs>
                        <SwipeableViews
                        index={this.state.slideIndex}
                        onChangeIndex={this.handleChange}
                        >
                        <div>
                            <form>
                            <TextField
                                hintText="Enter your Username"
                                floatingLabelText="Username"
                                onChange={(event, newValue) =>
                                    this.setState({ username: newValue })} />
                            <br />
                            <TextField
                                type="Enter password"
                                hintText="Enter your Password"
                                floatingLabelText="Password"
                                type='password'
                                onChange={(event, newValue) =>
                                    this.setState({ password: newValue })} />
                            <br />
                            <RaisedButton type='submit' label="Submit" secondary={true}
                                style={style} onClick={(event) => this.handleClick(event)} />
                            <br/><br/> 
                            <p>Forgot password? <FlatButton onClick={(event) => this.handleOpen()}>Reset</FlatButton></p>
                        </form>
                        </div>
                        <div style={styles.slide}>
                            <Register/>
                        </div>
                        </SwipeableViews>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
    handleClick(event) {
        event.preventDefault();
        var payload = {
            "username": this.state.username,
            "password": this.state.password
        }
        axiosInstance.post('auth/login/', payload)
            .then(response => {
                window.localStorage.setItem("token", response.data.token)
                window.localStorage.setItem("username", response.data.username)
                window.localStorage.setItem("logged_in", true)
                window.location.assign('/dashboard/categories')
                }
            )
            .catch(error => {
                window.location.assign("/login");                
                notify.show(error.response.data.message, 'error', 4000)
            })
    }

}

const style = {
    marginBottom: 0,
};
export default Login;