import React from 'react';
import axios from "axios";
import {NavLink} from "react-router-dom";
import like from "../images/like.jpg";
import NavBar from "../navigation/NavBar";
import LeftNavBar from "../navigation/LeftNavBar";

class PostDetails extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      postId: -1,
      userId: -1,
      postText: "",
      reply: "",
      postDetails: []
    }
  }

  componentDidMount() {
    this.setState({
      userId: this.props.location.state.userId,
      postId: this.props.location.state.postId,
      postText: this.props.location.state.postText
    })
    axios.post('http://localhost:12345/petApp/post/comment/5/')
      .then(response => {
        console.log(response.data);
        this.setState({
          postDetails: response.data
        })
      }).catch(function (error) {
      console.log("Resource not found");
    });
  }

  render() {
    const userID = this.state.userId;
    const postTimeLine = this.state.postDetails.map((item, key) =>
      <div key={item.postId}>
        <div className="card-body">
          <p className="card-text">{item.commentText}</p>
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
          </div>
          {postTimeLine}
        </div>
      </div>
    )
  }
}

export default PostDetails;