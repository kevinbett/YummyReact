import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import {notify} from 'react-notify-toast';
import axios from 'axios';
import Register from './register';

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
            slideIndex: 0
        }
        this.handleCancel = this.handleCancel.bind(this);
    }
    handleCancel(event) {
        event.preventDefault();
        this.props.history.push('/');
    }
    handleChange = (value) => {
        this.setState({
          slideIndex: value,
        });
      };
    render() {
        return (

            <div className="Login">
                <MuiThemeProvider>
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
                                type="password"
                                hintText="Enter your Password"
                                floatingLabelText="Password"
                                onChange={(event, newValue) =>
                                    this.setState({ password: newValue })} />
                            <br />
                            <RaisedButton type='submit' label="Submit" secondary={true}
                                style={style} onClick={(event) => this.handleClick(event)} />
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
        var apiBaseUrl = "http://localhost:5000/api/auth/";
        var payload = {
            "username": this.state.username,
            "password": this.state.password
        }
        axios.post(apiBaseUrl + 'login/', payload)
            .then(response => {
                window.localStorage.setItem("token", response.data.token)
                window.localStorage.setItem("username", response.data.username)
                if (response.status === 200) {
                    window.location.assign('/dashboard/categories')
                }
                else {
                    window.location.assign("/login");
                }
            })
            .catch(error => {
                notify.show(error.response.data.message, 'error', 4000)
            })
    }

}

const style = {
    marginBottom: 0,
};
export default Login;