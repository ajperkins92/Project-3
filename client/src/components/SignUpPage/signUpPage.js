import React from "react";
import "./signUpPage.css";

function SignUpPage(props) {
    return (
        <div className="container">
            <div className="row subContainer">
                <form className="col s12">
                    <div className="row">
                        <div className="col s12">
                            <div className="card">
                                <span className="card-title">Sign Up</span>
                                <div className="card-image">
                                    <img src="../public/images/seattlePark1.jpg" style={{width:"90%"}}></img>
                                </div>
                                <div className="card-content">
                                    <div className="row">
                                        <div className="input-field col s6">
                                            <input id="firstname" type="text" className="validate" name="firstname"
                                                onChange={props.handleInputChange}
                                                value={props.value}
                                            ></input>
                                            <label for="firstname">First Name</label>
                                        </div>
                                        <div className="input-field col s6">
                                            <input id="lastname" type="text" className="validate" name="lastname"
                                            onChange={props.handleInputChange}
                                            value={props.value}
                                            ></input>
                                            <label for="lastname">Last Name</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s6">
                                            <input id="email" type="email" className="validate" name="email"
                                            onChange={props.handleInputChange}
                                            value={props.value}
                                            ></input>
                                            <label for="email">Email</label>
                                        </div>
                                        
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input id="username" type="text" className="validate" name="username"
                                            onChange={props.handleInputChange}
                                            value={props.value}
                                            ></input>
                                            <label for="username">Username</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s6">
                                            <input id="password" type="password" className="validate" name="password"
                                            onChange={props.handleInputChange}
                                            value={props.value}
                                            ></input>
                                            <label for="password">Password</label>
                                        </div>
                                        <div className="input-field col s6">
                                            <input id="confirmPW" type="password" className="validate" name="confirmPassword"
                                            onChange={props.handleInputChange}
                                            value={props.value}
                                            ></input>
                                            <label for="confirmPW">Confirm Password</label>
                                        </div>
                                    </div>
                                    <div className="row fileInput">
                                        <div className="col s12">
                                            <form action="#">
                                                <div className="file-field input-field">
                                                    <div className="badge blue">
                                                        <span id="upload">Upload Profile Picture</span>
                                                        <input type="file"></input>
                                                    </div>
                                                    <input className="file-path validate" type="text"></input>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <a className="waves-effect waves-light btn orange pulse" id="signup" onClick={props.handleFormSubmit}>Sign Up</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUpPage;