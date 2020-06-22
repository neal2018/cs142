import React from 'react';
import {
  Link,
  useRouteMatch,
} from 'react-router-dom';
import {
  List,
  ListItem,
  ListItemText,
  Typography
} from '@material-ui/core';
import './userDetail.css';


/**
 * Define UserDetail, a React componment of CS142 project #5
 */
class UserDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let user = window.cs142models.userModel(this.props.match.params.userId);
    return (
      <div>
        <Typography component={'span'} variant="h5">
          <Link to={`/photos/${user._id}`}>To Photos</Link>
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary={`User Id: ${user._id}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary={`User Name: ${user.first_name}, ${user.last_name}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary={`User Location: ${user.location}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary={`User Description: ${user.description}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary={`User Occupation: ${user.occupation}`} />
          </ListItem>
        </List>
      </div>
    );
  }
}

export default UserDetail;
