import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import {orange700} from 'material-ui/styles/colors';
import '../../static/css/home.css';
import Navigation from '../homepage/Home';
import Login from '../user/Login';
import Notifications from 'react-notify-toast';

const paperStyle = {
    height: '50%',
    width: "40%",
    marginLeft: '30%',
    marginTop: '10%',    
    textAlign: 'center',
    display: 'inline-block',
    backgroundColor: 'transparent',    
};
const buttonStyle = {
    backgroundColor: 'transparent',
    color: 'white'
  };
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {open: false};
    }
    handleToggle = () => this.setState({open: !this.state.open});
    render() {
        return (
            <MuiThemeProvider>
                <div className="landing">
                    <div>
                        <AppBar
                        title="Yummy Recipes"
                        onLeftIconButtonClick={this.handleToggle}
                        showMenuIconButton={false}
                        style={{backgroundColor: orange700}}
                        zDepth={2}>
                        <Notifications/>
                    </AppBar>
                    </div>
                    <Paper style={paperStyle} zDepth={5}>
                        <div>
                        <Toolbar style={{"justifyContent": "center"}}>
                            <ToolbarTitle text="Welcome to Yummy Recipes."/>
                        </Toolbar>
                        <Login/>                        
                        </div>
                    </Paper>                
                    
                    <Navigation/>
            </div>
            </MuiThemeProvider>
        );
    }
}


export default Home;