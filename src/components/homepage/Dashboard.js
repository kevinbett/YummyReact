import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import { orange700} from 'material-ui/styles/colors';
import '../../static/css/home.css';
import Navigation from '../homepage/Home';
import ChangePassword from '../user/Change_password';
import CategoryGet from '../categories/Categories';
import { Route } from "react-router-dom";
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Recipes from '../recipes/Recipes';
import Notifications from 'react-notify-toast';
import {notify} from 'react-notify-toast';



const paperStyle = {
    height: '85%',
    width: "80%",
    marginLeft: '19%',
    textAlign: 'center',
    display: 'inline-block',
    backgroundColor: 'transparent',    
};

class Dashboard extends Component {
    constructor(props) {
        super(props);      
        this.state = {open: false, username:'', error:'', message:''}
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);                          
    }
    handleLogin(event){
        event.preventDefault();
        this.props.history.push(`/login`);
    }
    handleLogout = () => {
        window.localStorage.removeItem('token');
        window.localStorage.setItem('logged_in', false)
        window.localStorage.setItem('message', "Successfully logged out")
        window.location.assign('/login');
        notify.show("Successfully logged out", 'success', 4000);                
    }
    handleChangePassword = (event) => {
        event.preventDefault();
        window.location.assign('/change-password');                
    }
    
    handleToggle = () => this.setState({open: !this.state.open});

    componentWillMount(){
        if (!window.localStorage.getItem('token')) {
            window.location.assign('/login');
        };
    }
    render() {
        if (!window.localStorage.getItem('token')) {
            window.location.assign('/login');
        };
        const rightButtons = (
            <div className="appBarIcons">
            <IconMenu
                iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                targetOrigin={{horizontal: 'left', vertical: 'top'}}
                >
                <MenuItem primaryText="Change Password" onClick={this.handleChangePassword}/>
                <MenuItem primaryText="Sign out" onClick={this.handleLogout}/>
            </IconMenu>
            </div>
        );
        return (
            <MuiThemeProvider>
                <div className="landing">
                        <AppBar
                        onLeftIconButtonClick={this.handleToggle}
                        showMenuIconButton={false}
                        iconElementRight={rightButtons}
                        style={{backgroundColor: orange700}}>
                        <Notifications options={{zIndex: 5000}}/>
                        </AppBar>
                    <Paper style={paperStyle} zDepth={5}>                        
                        <div>                                                                                  
                            <Route exact path="/categories" component={CategoryGet} />
                            <Route exact path="/category/:id/recipes/" component={Recipes} />
                            <Route exact path="/change-password" component={ChangePassword} />                                                                             
                        </div>
                    </Paper>              
                    <Navigation/>
            </div>
            </MuiThemeProvider>
        );
    }  
}

export default Dashboard;