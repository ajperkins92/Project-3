import React from "react";
import "./myAccount.css";

function MyAccountComponent(props) {
    return (
        <div className="container center" style={{}}>
            <div className="row subContainer">
                <form className="col s12">
                    <div className="row">
                        <div className="col s12">
                            
                                <span className="card-title">My Account</span>
                                
                                <div className="card-image">
                                    <img src={props.image} style={{ width: "200px" }} />
                                </div>
                                <div className="card-content">
                                <p>Welcome, {props.username}!</p>
                                <br></br>
                                <p>Your current Account Details are populated below.  You can input new values to update your account.</p>
                                <div className="row">
                                    <ul>
                                        <li><b>First Name:</b> {props.firstname}</li>
                                        <li><b>Last Name:</b> {props.lastname}</li>
                                        <li><b>Email:</b> {props.email}</li>
                                        <li>Password (In production we probably should not show this): {props.password}</li>
                                    </ul>
                                </div>
                                    <div className="row">
                                        <div className="input-field col s6">
                                            <input id="firstname" type="text" className="validate" 
                                            name="newfirstname"

                                            onChange={props.handleInputChange}
                                            
                                            />
                                            <label htmlFor="firstname">New First Name</label>
                                        </div>
                                        <div className="input-field col s6">
                                            <input id="lastname" type="text" className="validate" 
                                            name="newlastname"

                                            onChange={props.handleInputChange}
                                            
                                            />
                                            <label htmlFor="lastname">New Last Name</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s6">
                                            <input id="email" type="email" className="validate" 
                                            
                                            name="newemail"

                                            onChange={props.handleInputChange}
                                            
                                            />
                                            <label htmlFor="email">New Email</label>
                                        </div>
                                        
                                    </div>
                                    <div className="row">
                                        {/* <div className="input-field col s6">
                                            <input id="username" type="text" className="validate" 
                                            name="newusername"

                                            onChange={props.handleInputChange}
                                            />
                                            <label htmlFor="username">{props.username}</label>
                                        </div> */}
                                        <div className="input-field col s6">
                                            <input id="newPassword" type="password" className="validate" 
                                            name="newpassword"

                                            onChange={props.handleInputChange}
                                            />
                                            <label htmlFor="newPassword">New Password</label>
                                        </div>
                                    </div>
                                    <div className="row fileInput">
                                        <div className="col s12">
                                            
                                                <div className="file-field input-field">
                                                    <div className="badge blue">
                                                        <span id="upload">Upload Profile Picture</span>
                                                        <input type="file" />
                                                    </div>
                                                    <input className="file-path validate" type="text" />
                                                </div>
                                            
                                        </div>
                                    </div>
                                    <a className="waves-effect waves-light btn pink pulse" id="updateAccount" onClick={props.handleFormSubmit}>Update</a>
                                </div>
                            
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default MyAccountComponent;