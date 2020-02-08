import React from "react";
import "./myAccount.css";

function MyAccountComponent() {
    return (
        <div className="container center" style={{}}>
            <div className="row subContainer">
                <form className="col s12">
                    <div className="row">
                        <div className="col s12">
                            <div className="card">
                                <span className="card-title">My Account</span>
                                <div className="card-image">
                                    <img src={"https://raw.github.com/ajperkins92/Project-3/master/client/public/images/profilePictureSample.jpg"} style={{ width: "200px;" }} />
                                </div>
                                <div className="card-content">
                                    <div className="row">
                                        <div className="input-field col s6">
                                            <input id="firstname" type="text" className="validate" />
                                            <label for="firstname">First Name</label>
                                        </div>
                                        <div className="input-field col s6">
                                            <input id="lastname" type="text" className="validate" />
                                            <label for="lastname">Last Name</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s6">
                                            <input id="email" type="email" className="validate" />
                                            <label for="email">Email</label>
                                        </div>
                                        <div className="input-field col s6">
                                            <input id="phone" type="text" className="validate" />
                                            <label for="phone">Phone</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s6">
                                            <input id="username" type="text" className="validate" />
                                            <label for="username">Username</label>
                                        </div>
                                        <div className="input-field col s6">
                                            <input id="newPassword" type="password" className="validate" />
                                            <label for="newPassword">New Password</label>
                                        </div>
                                    </div>
                                    <div className="row fileInput">
                                        <div className="col s12">
                                            <form action="#">
                                                <div className="file-field input-field">
                                                    <div className="badge blue">
                                                        <span id="upload">Upload Profile Picture</span>
                                                        <input type="file" />
                                                    </div>
                                                    <input className="file-path validate" type="text" />
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <a className="waves-effect waves-light btn pink pulse" id="updateAccount">Update</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default MyAccountComponent;