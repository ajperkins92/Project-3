import React from "react";
import "./myAccount.css";
import ProfileSample from "./profileSample.png";

function MyAccountComponent(props) {
    return (
        <div className="container">
            <div className="row">
                <div className="col s12">
                    <div className="card-panel">
                        <div className="row subContainer">
                            <form className="col s12">
                                <div className="row">
                                    <div className="col s12">
                                        <span className="card-title" style={{ fontSize: "3rem" }}>My Account</span>
                                        <div className="card-image">
                                                < img src={props.image} style={{ width: "200px" }} alt={"profile Image"} /> 
                                        </div>
                                        <div className="card-content">
                                            {props.username ?
                                                <p style={{ fontSize: "1.5rem" }}><i>Welcome, {props.username}!</i></p> :
                                                <p style={{ fontSize: "1.5rem" }}><i>Welcome, Volunteer!</i></p>
                                            }
                                            <p>Your current Account Details are populated below.  You can input new values to update your account.</p>
                                            <div class="collection">
                                                <a className="collection-item"><span class=""></span><b>First Name :</b> {props.firstname}</a>
                                                <a className="collection-item"><span class=""></span><b>Last Name :</b> {props.lastname}</a>
                                                <a className="collection-item"><span class=""></span><b>Email :</b> {props.email}</a>
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
                                                            <input type="file" onChange={props.setImage}/>
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
                </div>
            </div>
        </div>
    )
}
export default MyAccountComponent;