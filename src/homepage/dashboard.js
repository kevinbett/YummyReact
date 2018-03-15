import React, { Component } from 'react';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import { ToolbarGroup} from 'material-ui/Toolbar';
import { orange700} from 'material-ui/styles/colors';
import '../css/home.css';
import Navigation from './home';
import LeftDrawer from './drawer';
import CategoryGet from '../categories/GetCategories';
import CategoryPost from '../categories/categories';
import {Route} from "react-router-dom";
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Recipes from '../recipes/recipes';
import Notifications from 'react-notify-toast';



const paperStyle = {
    height: '85%',
    width: "80%",
    marginLeft: '19%',
    textAlign: 'center',
    display: 'inline-block',
    backgroundColor: 'transparent',    
};
const buttonStyle = {
    backgroundColor: 'transparent',
    color: 'white'
  };
const headers = {headers: {"x-access-token": window.localStorage.getItem("token")},Content_Type: "application/json"};    

class Dashboard extends Component {
    constructor(props) {
        super(props);      
        this.state = {open: false, username:'', error:'', message:''}
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this); 
        this.Logout = this.Logout.bind(this);           
    }
    handleLogin(event){
        event.preventDefault();
        this.props.history.push(`/login`);
    }
    handleLogout(event) {
        event.preventDefault();
        this.props.history.push('/');
        window.localStorage.token = '';
    }
    Logout() {
        var apiBaseUrl = "http://localhost:5000/api/auth/logout/";
        axios.delete(apiBaseUrl,headers)
            .then(function (response) {
                console.log(response.data.message)
                this.setState({message:response.data.message, error: ''})
                window.location.reload();
    
            })
            .catch(error => {
                this.setState({
                    error: error.response.data, mess: ''
                })
            })
    }
    
    handleToggle = () => this.setState({open: !this.state.open});

    render() {
        return (
            <MuiThemeProvider>
                <div className="landing">
                        <AppBar
                        onLeftIconButtonClick={this.handleToggle}
                        showMenuIconButton={false}
                        iconElementRight={buttons}
                        style={{backgroundColor: orange700}}>
                        <Notifications options={{zIndex: 5000}}/>
                        </AppBar>
                        <LeftDrawer/>
                    <Paper style={paperStyle} zDepth={5}>                        
                        <div>
                            <Route exact path="/dashboard/categories" component={CategoryGet} />
                            <Route exact path="/dashboard/category/:id/recipes/" component={Recipes} />                        
                            <Route exact path="/dashboard/category" component={CategoryPost} />                         
                        </div>
                    </Paper>              
                    <Navigation/>
            </div>
            </MuiThemeProvider>
        );
    }  
}
const buttons = (
    
    <ToolbarGroup>
      <FlatButton label={window.localStorage.getItem('username')} onClick={(event) => this.Logout()} style={buttonStyle}/>
      <IconMenu
        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
        anchorOrigin={{horizontal: 'left', vertical: 'top'}}
        targetOrigin={{horizontal: 'left', vertical: 'bottom'}}
        >
        <MenuItem primaryText="Change password" />
        <MenuItem primaryText="Sign out" />
    </IconMenu>
    </ToolbarGroup> 
  );

export default Dashboard;