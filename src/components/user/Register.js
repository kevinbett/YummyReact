import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import '../../static/css/home.css';
import {notify} from 'react-notify-toast';


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
                                onChange={(event, newValue) =>
                                    this.setState({ username: newValue })} />
                            <br />
                            <TextField
                                hintText="Enter your Email"
                                floatingLabelText="Email"
                                onChange={(event, newValue) =>
                                    this.setState({ email: newValue })} />
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
        var apiBaseUrl = "http://localhost:5000/api/auth/";
        var payload = {
            "username": this.state.username,
            "password": this.state.password,
            "email": this.state.email
        }
        axios.post(apiBaseUrl + 'register/', payload)
            .then(response => {
                setTimeout(function(){ window.location.assign(`/login`) }, 2000);
                notify.show(response.data.message, 'success', 4000)                               
            })
            .catch(error => {
                if (error.response.data.message.error) {
                    notify.show(error.response.data.message.error, 'error', 4000);                    
                } else if (error.response.data.message.email) {
                   notify.show(error.response.data.message.email[0], 'error', 4000)
                }
            })
    }

}

const style = {
    marginRight: 60,
    float: 'center'
};
export default Register;