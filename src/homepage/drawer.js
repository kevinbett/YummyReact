import React from 'react';
import Drawer from 'material-ui/Drawer';
import {List, ListItem} from 'material-ui/List';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';
import Add from 'material-ui/svg-icons/image/add-to-photos'
import Divider from 'material-ui/Divider';
import {orange700} from 'material-ui/styles/colors';
import Dialog from 'material-ui/Dialog';
import {BrowserRouter} from "react-router-dom";
import {notify} from 'react-notify-toast';
import axios from 'axios';

class LeftDrawer extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        open: false,
        error: '',
        invalid:'',
        name: ''
      };
      this.handleViewcategories = this.handleViewcategories.bind(this);
    }
    handleViewcategories(event){
        event.preventDefault();
        window.location.assign('/dashboard/categories');
    }
    handleOpen = () => {
      this.setState({open: true});
    };

    handleClose = () => {
      this.setState({open: false});
    };
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
          this.setState({message:res.data.message})
          window.location.assign('/dashboard/categories');
        })
        .catch(error => {
          this.setState({error: error.response.data.message})
          notify.show(this.state.error, 'error', 6000);
        })
    }
  
    render() {
      const actions = [
        <FlatButton
          label="submit"
          primary={true}
          keyboardFocused={true}
          onClick={this.handleSubmit}
        />,
        <FlatButton
          label="close"
          primary={false}
          keyboardFocused={false}
          onClick={this.handleClose}
        />,
      ];
      return (
        <BrowserRouter>
        <div>
        <Dialog
          title="Add a new category"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
        <form onSubmit={this.handleSubmit}>
        <TextField
          hintText="Enter category name"
          floatingLabelText="Category name"
          required
          errorText={this.state.error}
          onChange={this.handleChange} />
        </form>
        </Dialog>
          <Drawer open={this.props.open} zDepth={0} containerStyle={{overflowX: 'hidden'}}>
          <AppBar title="Yummy Recipes" style={{backgroundColor: orange700}} showMenuIconButton={false} />
            <List>
                <ListItem primaryText="Categories" initiallyOpen={true}
                primaryTogglesNestedList={true}  nestedItems={[ 
                  <ListItem
                  key={1}
                  onClick={this.handleOpen}
                  primaryText="Add"
                  leftIcon={<Add />}
                />,
                <ListItem
                  key={1}
                  onClick={this.handleViewcategories}
                  primaryText="View All"
                  leftIcon={<RemoveRedEye />}
                />
                ]}/>
            </List>
            <Divider />
          </Drawer>
        </div>
        </BrowserRouter>
      );
    }
  }
  export default LeftDrawer;