import React from 'react';
import NavBar from '../navigation/NavBar';
import axios from 'axios';
import LeftNavBar from "../navigation/LeftNavBar";

class UserActivities extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: -1000,
            userTimeline: [],
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
                console.log(response);
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

    postComment = event => {
        event.preventDefault();
        axios({
            method: 'post',
            url: 'http://localhost:12345/petApp/post/userId/' + this.state.userId + "/",
            data: this.state.post,
        })
            .then((response) => {
                console.log("SUCCESS : " + response);
            })
            .catch(function (response) {
                console.log(response);
            });
    }

    render() {
        const userID = this.state.userId;
        const timeline = this.state.userTimeline.map((item, key) =>
            <div key={item.postId}>
                <div className="card border-primary mb-3">
                    <div className="card-header">{item.user.firstName}</div>
                    <div className="card-body">
                        <p className="card-text">{item.postText}</p>
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
    }
}

export default UserActivities;