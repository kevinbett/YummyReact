import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import { ToolbarGroup} from 'material-ui/Toolbar';
import { orange700} from 'material-ui/styles/colors';
import '../../static/css/home.css';
import Navigation from '../homepage/Home';
import Welcome from '../homepage/Welcome';
import LeftDrawer from '../homepage/Drawer';
import CategoryGet from '../categories/Categories';
import CategoryPost from '../categories/AddCategories';
import {Route} from "react-router-dom";
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Recipes from '../recipes/Recipes';
import Notifications from 'react-notify-toast';
import axios from 'axios';
import {notify} from 'react-notify-toast';



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
const logged_in = window.localStorage.getItem('logged_in');

class Dashboard extends Component {
    constructor(props) {
        super(props);      
        this.state = {open: false, username:'', error:'', message:''}
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);          
    }
    handleLogin(event){
        event.preventDefault();
        this.props.history.push(`/login`);
    }
    handleLogout = () => {
        localStorage.clear();
        window.location.assign('/login');
        notify.show("Successfully logged out", 'success', 4000);                
    }
    
    handleToggle = () => this.setState({open: !this.state.open});

    render() {
        if (!logged_in) {
            window.location.assign('/login');
        };
        return (
            <MuiThemeProvider>
                <div className="landing">
                        <AppBar
                        onLeftIconButtonClick={this.handleToggle}
                        showMenuIconButton={false}
                        iconElementRight={<FlatButton label="Logout" onClick={this.handleLogout} style={buttonStyle}/>}
                        style={{backgroundColor: orange700}}>
                        <Notifications options={{zIndex: 5000}}/>
                        </AppBar>
                        <LeftDrawer/>
                    <Paper style={paperStyle} zDepth={5}>                        
                        <div>
                            <Route exact path="/dashboard/" component={Welcome} />                                                                                  
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

export default Dashboard;