import React from "react";
import "./signUpPage.css";

function SignUpPage(props) {
    return (
        <div className="container">
            <div className="row">
                <div className="col s12">
                    <div className="card-panel">
                        <div className="row subContainer">
                            <form className="col s12">
                                <div className="row">
                                    <div className="col s12">
                                        <span className="card-title" style={{ fontSize: "3rem" }}>Sign Up</span>
                                        <div className="card-image">
                                            <img src={"https://raw.github.com/ajperkins92/Project-3/master/client/public/images/seattlePark2.jpg"} style={{ width: "100%" }} />
                                        </div>
                                        <div className="card-content">
                                            <div className="row">
                                                <div className="input-field col s6">
                                                    <input id="firstname" type="text" className="validate" name="firstname"
                                                        onChange={props.handleInputChange}

                                                    ></input>
                                                    <label htmlFor="firstname">First Name</label>
                                                </div>
                                                <div className="input-field col s6">
                                                    <input id="lastname" type="text" className="validate" name="lastname"
                                                        onChange={props.handleInputChange}

                                                    ></input>
                                                    <label htmlFor="lastname">Last Name</label>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="input-field col s12">
                                                    <input id="email" type="email" className="validate" name="email"
                                                        onChange={props.handleInputChange}

                                                    ></input>
                                                    <label htmlFor="email">Email</label>
                                                </div>

                                            </div>
                                            <div className="row">
                                                <div className="input-field col s12">
                                                    <input id="username" type="text" className="validate" name="username"
                                                        onChange={props.handleInputChange}

                                                    ></input>
                                                    <label htmlFor="username">Username</label>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="input-field col s12">
                                                    <input id="password" type="password" className="validate" name="password"
                                                        onChange={props.handleInputChange}

                                                    ></input>
                                                    <label htmlFor="password">Password</label>
                                                </div>
                                            </div>
                                            <div className="row fileInput">
                                                <div className="col s12">
                                                    <form action="#">
                                                        <div className="file-field input-field">
                                                            <div className="badge blue">
                                                                <span id="upload">Upload Profile Picture</span>
                                                                <input type="file" name="image" onChange={props.setImage} ></input>
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
                            </form>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUpPage;