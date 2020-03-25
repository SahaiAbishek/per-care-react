import React from 'react';
import NavBar from '../navigation/NavBar';
import axios from 'axios';

class UserActivities extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: -1,
            userTimeline: []
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
    render() {
        const timeline = this.state.userTimeline.map((item, key) =>
            <div key={item.postId}>
                <div class="card border-primary mb-3">
                    <div class="card-header">{item.user.email}</div>
                    <div class="card-body">
                        <p class="card-text">{item.postText}</p>
                    </div>
                </div>
            </div>
        );
        return (
            <div>
                <div className="card border-secondary mb-3">
                    <NavBar />
                </div>
                <div className="form-group" >
                    <div className="divPadding">
                        <input
                            type="text"
                            className="form-control"
                            id="userPost"
                            placeholder="Post your updates here" />
                    </div>
                    <div className="divPadding">
                        <button type="button" className="btn btn-primary btn-sm">Post</button>
                    </div>
                    {timeline}
                </div>
            </div>
        );
    }
}

export default UserActivities;