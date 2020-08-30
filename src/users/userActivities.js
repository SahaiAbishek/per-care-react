import React from 'react';
import NavBar from '../navigation/NavBar';
import axios from 'axios';
import LeftNavBar from "../navigation/LeftNavBar";
import like from '../images/like.jpg'
import {NavLink} from "react-router-dom";

class UserActivities extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: -1000,
      userTimeline: [],
      text: "",
      pic: null,
      picName: "",
      isProfilePic: false,
      picSize: 0,
      picType: "",
      post: {
        text: ""
      }
    }
  }

  componentDidMount() {
    this.setState({
      userId: this.props.location.state.userId
    })
    axios.get('http://localhost:12345/petApp/user/timeline/' + this.props.location.state.userId + '/')
      .then(response => {
        // console.log(response);
        this.setState({
          userTimeline: response.data
        })
      }).catch(function (error) {
      console.log("Resource not found");
    });
  }

  handleUserPost = event => {
    const post = {...this.state.post, text: event.target.value};
    this.setState({post});
  }

  handlePostPicChange = event => {
    this.setState({
      pic: event.target.files[0],
      picName: event.target.files[0].name,
      isProfilePic: false,
      picSize: event.target.files[0].size,
      picType: event.target.files[0].type
    });
  }

  handleLike = (item, event) => {
    event.preventDefault();
    axios({
      method: 'post',
      url: 'http://localhost:12345/petApp/post/favorite/' + item.postId + "/" + this.state.userId + "/",
    })
      .then((response) => {
        console.log("SUCCESS : " + response);
      })
      .catch(function (response) {
        console.log(response);
      });
  }

  postComment = event => {
    event.preventDefault();
    if (this.state.pic) {
      alert("adding post pic");
      let formData = new FormData();
      formData.set('userId',1);
      formData.set('postText','asd');
      formData.set('files',this.state.pic);
      axios({
        method: 'post',
        url: 'http://localhost:12345/petApp/post/pic/userId/',
        data: formData,
      })
        .then((response) => {
          console.log("SUCCESS : " + response);
          window.location.reload(true);
        })
        .catch(function (response) {
          console.log(response);
        });
    } else {
      axios({
        method: 'post',
        url: 'http://localhost:12345/petApp/post/userId/' + this.state.userId + "/",
        data: this.state.post,
      })
        .then((response) => {
          console.log("SUCCESS : " + response);
          window.location.reload(true);
        })
        .catch(function (response) {
          console.log(response);
        });
    }
  }

  postCommentReply = item => event => {
    if (event.key === 'Enter') {
      axios({
        method: 'post',
        url: 'http://localhost:12345/petApp/post/comment/' + item.postId + "/" + this.state.userId + "/",
        data: this.state.post.text,
      })
        .then((response) => {
          console.log("SUCCESS : " + response);
          window.location.reload(true);
        })
        .catch(function (response) {
          console.log(response);
        });
    }
  }

  render() {
    if (this.state.userId !== -1000) {
      const userID = this.state.userId;
      const timeline = this.state.userTimeline.map((item, key) =>
        <div key={item.postId}>
          <div className="card border-primary mb-3">
            <div className="card-header">
              <img className="logo" src={"data:image/jpeg;base64," + item.user.pic}
                   height="40" width="40" alt={item.user.userId}
              />
              <NavLink className="nav-link" to={{
                pathname: '/PostDetails',
                state: {postId: item.postId, userId: this.state.userId, postText: item.postText}
              }}>{item.user.firstName}</NavLink>
            </div>
            <div className="card-body">
              <p className="card-text">{item.postText}</p>
              { item.picture.pic &&
                <img src={"data:image/jpeg;base64," + item.picture.pic}
                     height="200" width="160" alt="some name"
                />
              }
            </div>
            <div>
              <button type="button" class="btn btn-info" onClick={this.handleLike.bind(this, item)}>
                Like
              </button>
            </div>
            <div>
              <input
                type="text"
                className="form-control"
                id="userPost"
                placeholder="reply"
                onChange={this.handleUserPost}
                onKeyPress={this.postCommentReply(item)}
              />
            </div>
          </div>
        </div>
      );
      return (
        <div>
          <div className="card border-secondary mb-3">
            <NavBar userId={userID}/>
          </div>
          <div className="sideBar">
            <LeftNavBar userId={userID}/>
          </div>
          <div className="timeline">
            <div className="divPadding">
              <input
                type="text"
                className="form-control"
                id="userPost"
                placeholder="Post your updates here"
                onChange={this.handleUserPost}
              />
              <div className="form-group">
                <input
                  type="file"
                  placeholder="Add profile Pic"
                  onChange={this.handlePostPicChange}
                />
              </div>
            </div>
            <div className="divPadding">
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={this.postComment}
              >
                Post
              </button>
            </div>
            {timeline}
          </div>
        </div>
      );
    } else {
      return (<h1>Loading</h1>);
    }
  }
}

export default UserActivities;