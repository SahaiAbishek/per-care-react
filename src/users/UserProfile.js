import React from 'react';
import NavBar from "../navigation/NavBar";
import axios from "axios";

class UserProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userId: -200,
            users: [],
            pets: [],
            user: {
                userId: -1,
                firstName: "",
                middleName: "",
                lastName: "",
                email: "",
                zip: "",
                breed: "",
                name: "",
                petType: "",
                preferences: "",
                pet: {
                    petId: -1,
                    breed: "",
                    name: "",
                    petType: "",
                    preferences: ""
                }
            }
        }
    }

    componentDidMount() {
        this.setState({
            userId: this.props.location.state.userId
        })
        axios.get('http://localhost:12345/petApp/user/' + this.props.location.state.userId + '/')
            .then(response => {
                console.log(response.data);
                var user = {...this.state.user}
                user.userId = response.data.userId;
                user.email = response.data.email;
                user.firstName = response.data.firstName;
                user.lastName = response.data.lastName;
                user.middleName = response.data.middleName;
                user.zip = response.data.zip;
                if (response.data.pets && response.data.pets.length > 0) {
                    // user.name = response.data.pets[0].name;
                    // user.breed = response.data.pets[0].breed;
                    // user.petType = response.data.pets[0].petType;
                    // user.preferences = response.data.pets[0].preferences;
                    // user.petId = response.data.pets[0].petId;
                    this.setState({
                            pets: response.data.pets
                        }
                    )
                }
                this.setState({user});
            }).catch(function (error) {
            console.log("Resource not found");
        });
    }

    handleEmailChange = event => {
        const user = {...this.state.user, email: event.target.value};
        this.setState({user});
    }

    handleFirstNameChange = event => {
        const user = {...this.state.user, firstName: event.target.value};
        this.setState({user});
    }

    handleMiddleNameChange = event => {
        const user = {...this.state.user, middleName: event.target.value};
        this.setState({user});
    }

    handleLastNameChange = event => {
        const user = {...this.state.user, lastName: event.target.value};
        this.setState({user});
    }

    handleZipChange = event => {
        const user = {...this.state.user, zip: event.target.value};
        this.setState({user});
    }

    handlePetTypeChange = event => {
        const user = {...this.state.user, petType: event.target.value};
        this.setState({user});
    }

    handlePetNameChange = event => {
        const user = {...this.state.user, name: event.target.value};
        this.setState({user});
    }

    handleBreedChange = event => {
        const user = {...this.state.user, breed: event.target.value};
        this.setState({user});
    }

    handlePreferencesChange = event => {
        const user = {...this.state.user, preferences: event.target.value};
        this.setState({user});
    }

    handleAddPet = event => {
        event.preventDefault();
        let payload = {
            breed: this.state.user.breed,
            preferences: this.state.user.preferences,
            name: this.state.user.name,
            petType: this.state.user.petType,
            user: {
                userId: this.state.user.userId
            }
        };

        axios({
            method: 'post',
            url: 'http://localhost:12345/petApp/pet/',
            data: payload,
        })
            .then((response) => {
                console.log("SUCCESS : " + response);
            })
            .catch(function (response) {
                console.log(response);
            });
    }

    render() {
        const myPets = this.state.pets.map((item, key) =>
                <li key={item.petId}>{item.name}</li>
            // <div key={item.petId}>
            //     <div className="card border-primary mb-sm-0" >
            //         <div className="card-header">{item.name}</div>
            //         <div className="card-body">
            //             <p className="card-text">{item.petType}</p>
            //         </div>
            //     </div>
            // </div>
        );
        return (
            <div>
                <NavBar userId={this.props.location.state.userId}/>
                <div>
                    <div className="column">
                        <form>
                            <div className="form-group row" className="column">
                                <div className="form-group">
                                    <input
                                        type="email"
                                        className="form-control-sm"
                                        name="email"
                                        placeholder="Enter email"
                                        value={this.state.user.email}
                                        onChange={this.handleEmailChange}
                                    >
                                    </input>
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control-sm"
                                        name="firstName"
                                        placeholder="First Name"
                                        value={this.state.user.firstName}
                                        onChange={this.handleFirstNameChange}
                                    >
                                    </input>
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control-sm"
                                        name="lastName"
                                        placeholder="Middle Name"
                                        value={this.state.user.middleName}
                                        onChange={this.handleMiddleNameChange}
                                    >
                                    </input>
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control-sm"
                                        name="lastName"
                                        placeholder="Last Name"
                                        value={this.state.user.lastName}
                                        onChange={this.handleLastNameChange}
                                    >
                                    </input>
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control-sm"
                                        name="zip"
                                        placeholder="ZIP code"
                                        value={this.state.user.zip}
                                        onChange={this.handleZipChange}
                                    >
                                    </input>
                                </div>
                                <div>
                                    <button type="button" className="btn btn-primary"
                                            onClick={this.handleRegister}>Update Details
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                {/*---------Pet details below---------------------*/}

                <div className="column">
                    <ul>{myPets}</ul>
                    <div className="column">
                        <form>
                            <div className="form-group row" className="column">
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control-sm"
                                        name="petType"
                                        placeholder="Dog Cat or ..."
                                        value={this.state.user.petType}
                                        onChange={this.handlePetTypeChange}
                                    >
                                    </input>
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control-sm"
                                        name="name"
                                        placeholder="Name"
                                        value={this.state.user.name}
                                        onChange={this.handlePetNameChange}
                                    >
                                    </input>
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control-sm"
                                        name="breed"
                                        placeholder="Breed"
                                        value={this.state.user.breed}
                                        onChange={this.handleBreedChange}
                                    >
                                    </input>
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control-sm"
                                        name="preferences"
                                        placeholder="Preferences"
                                        value={this.state.user.preferences}
                                        onChange={this.handlePreferencesChange}
                                    >
                                    </input>
                                </div>
                                <div>
                                    <button type="button" className="btn btn-primary"
                                            onClick={this.handleAddPet}>Add Pet
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserProfile;