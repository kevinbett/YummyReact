import React from 'react';
import Drawer from 'material-ui/Drawer';
import {List, ListItem} from 'material-ui/List';
import AppBar from 'material-ui/AppBar';
import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';
import Divider from 'material-ui/Divider';
import {orange700} from 'material-ui/styles/colors';
import {BrowserRouter} from "react-router-dom";

class RecipeDrawer extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        open: false
      };
    }
    handleViewcategories(event){
        event.preventDefault();
        window.location.assign('/dashboard/categories');
    }
  
    render() {
      return (
        <BrowserRouter>
        <div>
          <Drawer open={this.props.open} zDepth={0} containerStyle={{overflowX: 'hidden'}}>
          <AppBar title="Yummy Recipes" style={{backgroundColor: orange700}} showMenuIconButton={false} />
            <List>
            <ListItem key={7} primaryText="Back to categories" initiallyOpen={true}
                  onClick={this.handleViewcategories}
                  leftIcon={<RemoveRedEye />}
                />
            </List>
            <Divider />
          </Drawer>
        </div>
        </BrowserRouter>
      );
    }
  }
  export default RecipeDrawer;