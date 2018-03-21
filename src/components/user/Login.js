import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import {notify} from 'react-notify-toast';
import axiosInstance from '../../Axios';
import Register from './Register';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import { Label } from 'semantic-ui-react';

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
            status: 'hide'
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
          error: '',
        });
      };
    handleResetChange = event => {
        this.setState({email: event.target.value});       
    }
    handleClose = () => {
        this.setState({open: false, message:'', error: '', status:'hide'});
    };
    handleResetPassword(event){ 
        event.preventDefault();  
        var payload = {
            "email": this.state.email
        }
        axiosInstance.post('/auth/reset-password/', payload)
            .then(response => {
                this.setState({message: response.data.message, status:'hide'});
            })
            .catch(error => {
                this.setState({'error': error.response.data.error, status:'hide'})
            })
      }
    componentDidMount(){
        notify.show(window.localStorage.getItem('message'), 'success', 4000)        
    }

    render() {
        const actions = [
            <FlatButton
              label="Submit"
              primary={true}
              keyboardFocused={true}
              onClick={(event) => {
                  this.handleResetPassword(event);
                  this.setState({status:'loading'});
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
                <Dialog
                    title="Reset Password"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                    >
                    { this.state.message?
                        <Label color='green' horizontal>{this.state.message}</Label>: ''}
                    <form onSubmit={this.handleSubmit}>
                    <RefreshIndicator
                        size={50}
                        left={360}
                        top={70}
                        loadingColor="#FF9800"
                        status={this.state.status}
                        style={style.refresh}
                        />
                        <TextField
                        hintText="Enter Email"
                        floatingLabelText="Enter Email"
                        errorText={this.state.error}
                        fullWidth={true}                        
                        onChange={(event, newValue) =>
                                            this.setState({ email: newValue, error: ''})} />
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
                                errorText={this.state.error}
                                onChange={(event, newValue) =>
                                    this.setState({ username: newValue, error:'' })} />
                            <br />
                            <TextField
                                hintText="Enter your Password"
                                floatingLabelText="Password"
                                errorText={this.state.error}
                                type='password'
                                onChange={(event, newValue) =>
                                    this.setState({ password: newValue, error: ''})} />
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
                console.log(error.response.data.error);
                if(error.response.data.message){
                    this.setState({error: error.response.data.message})
                } else {
                    notify.show(error.response.data.error, 'error', 4000)    
                }
            })
    }

}

const style = {
    marginBottom: 0,
};
export default Login;