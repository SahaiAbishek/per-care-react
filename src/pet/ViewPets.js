import React from 'react';
import NavBar from '../navigation/NavBar';

class ViewPets extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: -1
        }
    }
    componentDidMount() {
        this.setState({
            userId: this.props.location.state.userId
        })
    }
    render() {
        return (
            <div>
                <div className="card border-secondary mb-3">
                    <NavBar />
                </div>
                <div class="form-group" >
                    <div className="divPadding">
                        <input
                            type="text"
                            class="form-control"
                            id="userPost"
                            placeholder="Post your updates here" />
                    </div>
                    <div className="divPadding">
                        <button type="button" class="btn btn-primary btn-sm">Post</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ViewPets;