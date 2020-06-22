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
    return (
      <div>
        <List component="nav">
          {this.state.data.map((user) => (
            <div key={user._id}>
              <ListItem>
                <Link to={`/users/${user._id}`} replace={true}>
                  <ListItemText primary={`${user.first_name} ${user.last_name}`} />
                </Link>
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      </div>
    );
  }
}

export default UserList;
