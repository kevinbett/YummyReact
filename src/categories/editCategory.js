import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import NavigationDrawer from './MenuDrawer';
import FlatButton from 'material-ui/FlatButton';
import axios from 'axios';
import './css/Editbucketlist.css';

class EditBucketList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            token: '',
            error: ''
        };

        this.getToken = this.getToken.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    getToken() {
        const access_token = window.localStorage.getItem("token");
        if (access_token) {
            this.setState({
                token: access_token,
            });
        }
    }

    componentDidMount() {
        this.getToken();
    }

    handleSave(event, id) {
        event.preventDefault();
        var apiBaseUrl = "http://localhost:5000/api/categories/" + id.toString();
        var payload = {
            "name": this.state.name
        };
        axios({
            method: 'put',
            url: apiBaseUrl,
            data: payload,
            headers: {
                "Content-Type": "application/json",
                "Authorization": this.state.token
            }
        }).then(function (response) {
            window.location.assign('/dashboard/categories')
        }.bind(this))
        this.setState({ name: '' })
    }

    handleCancel(event) {
        event.preventDefault();
        window.location.assign('/dashboard/categories')
    }

    render() {
        return (
            <div className="Edit">
                <MuiThemeProvider>
                    <div>
                        <AppBar title="Edit Category" />
                        <form>
                            <TextField
                                hintText={window.sessionStorage.name + ',' + this.props.match.params.id.toString()}
                                floatingLabelFixed="Category"
                                onChange={(event, newValue) =>
                                    this.setState({ name: newValue })}
                            />
                            <br />
                            <RaisedButton label="Save" primary={true}
                                style={style} onClick={(event) => this.handleSave(event, this.props.match.params.id)} />
                            <FlatButton label="Cancel" onClick={(event) => this.handleCancel(event)} />
                        </form>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

const style = {
    margin: 15,
};

export default EditBucketList;