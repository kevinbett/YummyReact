import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import '../../static/css/home.css';
import {notify} from 'react-notify-toast';
import axiosInstance from '../../Axios';


class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
        }
    }
    render() {
        return (

            <div className="Register">
                <MuiThemeProvider>
                    <div>
                        <div>
                        <form>
                            <TextField
                                hintText="Enter your Username"
                                floatingLabelText="Username"
                                errorText={this.state.username_error}
                                onChange={(event, newValue) =>
                                    this.setState({ username: newValue, username_error: ''})} />
                            <br />
                            <TextField
                                hintText="Enter your Email"
                                floatingLabelText="Email"
                                errorText={this.state.email_error}
                                onChange={(event, newValue) =>
                                    this.setState({ email: newValue, email_error: '' })} />
                            <br />
                            <TextField
                                type="password"
                                hintText="Enter your Password"
                                floatingLabelText="Password"
                                onChange={(event, newValue) =>
                                    this.setState({ password: newValue })} />
                            <br />
                            <RaisedButton label="Submit" secondary={true}
                                style={style} onClick={(event) => this.handleClick(event)} />
                            </form>
                        </div>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
    handleClick(event) {
        var payload = {
            "username": this.state.username,
            "password": this.state.password,
            "email": this.state.email
        }
        axiosInstance.post('auth/register/', payload)
            .then(response => {
                window.localStorage.setItem('message', response.data.message);
                window.location.assign(`/login`);                               
            })
            .catch(error => {
                if (error.response.data.error) {
                    this.setState({username_error: error.response.data.error})
                } else if (error.response.data.message.email) {
                   this.setState({email_error: error.response.data.message.email[0]})
                } else if(error.response.data.message.username){
                    this.setState({username_error: error.response.data.message.username[0]})
                } else if (error.response.data.message.error){
                    notify.show(error.response.data.message.error, 'error', 4000);
                }
            })
    }

}

const style = {
    marginRight: 60,
    float: 'center'
};
export default Register;