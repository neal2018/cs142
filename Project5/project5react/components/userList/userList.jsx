import React from 'react';
import { Link } from 'react-router-dom';
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@material-ui/core';
import './userList.css';

/**
 * Define UserList, a React componment of CS142 project #5
 */
class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: window.cs142models.userListModel()
    };
  }

  render() {
    const listLink = [];
    for (const user of this.state.data) {
      listLink.push(<ListItem><Link to={{ pathname: `/users/:${user._id}` }}>{user.first_name} {user.last_name}</Link></ListItem>)
      listLink.push(<Divider />);
    }
    return (
      <div>
        <List component="nav">
          {listLink}
        </List>
      </div>
    );
  }
}

export default UserList;
