import React from 'react';
import {Link, NavLink, Redirect} from "react-router-dom";

class NavBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userId: -200
    }
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <a className="navbar-brand" href="#">Pet Care</a>
          <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <NavLink className="nav-link" to={{
                  pathname: '/UserActivities',
                  state: {userId: this.props.userId}
                }}>Home </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to={{
                  pathname: '/UserProfile',
                  state: {
                    userId: this.props.userId,
                    picId: this.props.picId
                  }
                }}>My Profile</NavLink>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
              <input className="form-control mr-sm-2" type="text" placeholder="Search"/>
              <button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
            </form>
          </div>
        </nav>
      </div>
    );
  }
}

export default NavBar;