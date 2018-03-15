import React from 'react';
import axios from 'axios';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import {notify} from 'react-notify-toast';

const styles = {
  textAlign: 'center',
}
export default class CategoryPost extends React.Component {
  state = {
    name: '',
    token: '',
    message: '',
    error:'',
    open: true,
  }

  handleChange = event => {
    this.setState({ name: event.target.value });       
  }

  handleSubmit = event => {
    event.preventDefault();

    const category = {
      name: this.state.name        
    };
    const headers = {headers: {"x-access-token": window.localStorage.getItem("token")},Content_Type: "application/json"};    

    axios.post('http://127.0.0.1:5000/api/categories/',category, headers)
      .then(res => {
        console.log(res.data.message);        
        this.setState({message:res.data.message})
        window.location.assign('/dashboard/categories')
        notify.show(this.state.message, 'success', 6000);        
      })
      .catch(error => {
        this.setState({error: error.response.data.message})
      })
  }

  render() {
    return (
      <div>
        <form style={styles} onSubmit={this.handleSubmit}>
        <TextField
          hintText="Enter category name"
          floatingLabelText="Category name"
          onChange={this.handleChange} />
          <br/>
          <FlatButton label="Submit" secondary={true}
                                onClick={this.handleSubmit} />
        </form>
      </div>
    )
  }
}