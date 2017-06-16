import { AppBar, MenuItem } from 'material-ui';
import axios from 'axios';
import React, { Component } from 'react';
import Menu from 'material-ui-icons/Menu';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MoreVert from 'material-ui-icons/MoreVert';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };

    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleHome = this.handleHome.bind(this);
    this.handleEditProfile = this.handleEditProfile.bind(this);
  }

  toggleDrawer() {
    this.setState({
      open: !this.state.open
    });
  }

  handleClose(event) {
    this.setState({
      open: false
    });
  }

  handleEditProfile() {
    axios.get('/profile');
  }

  handleHome() {
    axios.get('/');
  }

  handleLogout() {
    axios.get('/logout');
  }

  render () {
    return (
        <AppBar
          title="Community"
          style={styles.theme}
          titleStyle={styles.title}
          iconElementLeft={
            <img src='http://icons.iconarchive.com/icons/icons8/christmas-flat-color/512/penguin-icon.png/'
            width='30' height='30' style={{marginTop: 6, marginLeft: 5}}/>
          }
          iconElementRight={
            <IconMenu
              iconButtonElement={
                <IconButton>
                  <MoreVert/>
                </IconButton>}
              anchorOrigin={{horizontal: 'right', vertical: 'top'}}
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
              iconStyle={{ fill: 'rgba(194, 43, 51, 1)' }}
            >
              <MenuItem
                onTouchTap={this.handleClose}
                onTouchTap={this.handleHome}
                primaryText="Home"
                href={'/'}
              />
              <MenuItem
                onTouchTap={this.handleClose}
                onTouchTap={this.handleEditProfile}
                primaryText="My Profile"
                href={'/profile'}
              />
              <MenuItem
                onTouchTap={this.handleClose}
                onTouchTap={this.handleLogout}
                primaryText="Logout"
                href={'/login'}
              />
            </IconMenu>}
        />
    );
  }
}

const styles = {
  title: {
    fontFamily: 'Vibur',
    fontSize: '34px',
    color: '#C22B33',
    height: window.innerHeight * .08
  },
  theme: {
    backgroundColor: 'white',
    borderBottom: '2px solid #31575B',

  },
};

export default Header;
