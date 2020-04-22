import React from "react";
import axios from "axios";
import {NavLink} from "react-router-dom";

class LeftNavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        userId: -1
      },
      users: [],
      pic: null,
      picId: -1
    }
  }

  componentDidMount() {
    this.setState({
      userId: this.props.userId
    });
    axios.get('http://localhost:12345/petApp/user/' + this.props.userId + '/')
      .then(response => {
        this.setState({
          pic: response.data.profilePic.pic,
          picId: response.data.profilePic.picId
        })
      }).catch(function (error) {
      console.log("Resource not found");
    });
  }

  handleZipChange = event => {
    const user = {...this.state.user, zip: event.target.value};
    this.setState({user});
  }

  handleAddUser(item) {
    axios.put('http://localhost:12345/petApp/user/friend?userId=' + this.props.userId + "&contactId=" + item.userId)
      .then(response => {
        console.log(response);
      }).catch(function (error) {
      console.log("Resource not found");
    });
  }

  findFriendsNearby() {
    axios.get('http://localhost:12345/petApp/user/zip/' + this.state.user.zip + "/user/" + this.props.userId + "/")
      .then(response => {
        this.setState({
          users: response.data
        });
      }).catch(function (error) {
      console.log(error.data + " Resource not found");
    });
  }

  render() {
    const foundUsers = this.state.users.map((item, key) =>
      <div key={item.userId}>
        <div>
          <div>
            <button type="button" className="btn btn-outline-success"
                    onClick={this.handleAddUser.bind(this, item)}>
              {item.firstName}
            </button>
          </div>
        </div>
      </div>
    );
    return (
      <div id="leftSideBar">
        <div>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <img src={"data:image/jpeg;base64," + this.state.pic}
                   height="150" width="120" alt="some name"
                // onClick={this.showFoodRecipe.bind(this, item)}
              />
            </li>
            <li className="nav-item">
              <input
                type="text"
                id="serachUsers"
                placeholder="Search Users By ZIP"
                onChange={this.handleZipChange}
                onKeyPress={event => {
                  if (event.key === 'Enter') {
                    this.findFriendsNearby()
                  }
                }}
              />
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={{
                pathname: '/UserProfile',
                state: {userId: this.props.userId}
              }}>Complete Profile</NavLink>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Add Pets</a>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-info">Send Friend Request</p>
          {foundUsers}
        </div>
      </div>

    )
  }
}

export default LeftNavBar;