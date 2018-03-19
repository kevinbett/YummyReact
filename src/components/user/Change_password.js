import React, {Component} from 'react';
import {notify} from 'react-notify-toast';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axiosInstance from '../../Axios';


class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      old_password: '',
      new_password: '',
      error: '',
  }
  
}

handleChangePassword(event){
  event.preventDefault();     
        var payload = {
            "new_password": this.state.new_password
        }
        axiosInstance.post('/auth/change-password/', payload)
            .then(response => {
                window.location.assign('/login')
                notify.show("Password changed!", 'success', 4000);
            })
            .catch(error => {
                notify.show(error.response.data.error, 'error', 4000)
            })
}


  render() {
    return (
      <div>
    <h3 style={{marginTop: 20}}> Change Password</h3>
    <form>
        <TextField
            hintText="Enter your new password"
            type='password'
            floatingLabelText="New password"
            onChange={(event, newValue) =>
                this.setState({ new_password: newValue })} />
        <br />
        <RaisedButton type='submit' label="Submit" secondary={true}
        onClick={(event) => this.handleChangePassword(event)} />
    </form>
    </div>
    );
  }
}
export default ChangePassword;