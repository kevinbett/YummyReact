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
import axiosInstance from '../../Axios';

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
      this.setState({ name: event.target.value, error: '' });       
    }
    handleSubmit(event){
      event.preventDefault();
      var category = {
        name: this.state.name        
      };  
  
      axiosInstance.post('categories/',category)
        .then(res => {
          notify.show(res.data.message, 'success', 4000);          
          window.location.assign('/dashboard/categories');
        })
        .catch(error => {
          if(error.response.data.message.name){
            this.setState({error: error.response.data.message.name[0]})
          } else {
            this.setState({error: error.response.data.message});
          }
        })
    }
  
    render() {
      const actions = [
        <FlatButton
          label="submit"
          primary={true}
          keyboardFocused={true}
          onClick={(event) => this.handleSubmit(event)}
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
        <form>
        <TextField
          hintText="Enter category name"
          floatingLabelText="Category name"
          errorText={this.state.error}
          onChange={this.handleChange} />
        </form>
        </Dialog>
          <Drawer open={this.props.open} zDepth={0} containerStyle={{overflowX: 'hidden'}}>
          <AppBar title="Yummy Recipes" style={{backgroundColor: orange700}} showMenuIconButton={false} />
            <List>
                <ListItem key={0} primaryText="Categories" initiallyOpen={true}
                primaryTogglesNestedList={true}  nestedItems={[ 
                  <ListItem
                  key={1}
                  onClick={this.handleOpen}
                  primaryText="Add category"
                  leftIcon={<Add />}
                />,
                <ListItem
                  key={1}
                  onClick={this.handleViewcategories}
                  primaryText="View all categories"
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