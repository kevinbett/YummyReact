import React, {Component} from 'react';
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import '../css/home.css'
import {
  Link
} from "react-router-dom";

const recentsIcon = <FontIcon className="muidocs-icon-action-home"></FontIcon>;
const favoritesIcon = <FontIcon className="material-icons"></FontIcon>;
const nearbyIcon = <FontIcon className="material-icons"></FontIcon>;

class Navigation extends Component {
  state = {
    selectedIndex: 0,
  };

  select = (index) => this.setState({selectedIndex: index});

  render() {
    return (
      <Paper zDepth={1} className='footer'>
        <BottomNavigation selectedIndex={this.state.selectedIndex}>
          <BottomNavigationItem
            label="Home"
            icon={recentsIcon}
            onClick={() => this.select(1)}
          />
          <BottomNavigationItem
            label="Heroku"
            icon={favoritesIcon}
            onClick={() => <Link to='/login' ></Link>}
          />
          <BottomNavigationItem
            label="Github"
            icon={nearbyIcon}
            onClick={() => this.select(3)}
          />
        </BottomNavigation>
      </Paper>
    );
  }
}
export default Navigation;