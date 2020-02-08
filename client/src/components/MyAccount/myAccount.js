import React from "react";
import "./myAccount.css";

function MyAccountComponent() {
    return (
        <div class="container">
            <div class="row subContainer">
                <form class="col s12">
                    <div class="row">
                        <div class="col s12">
                            <div class="card">
                                <span class="card-title">My Account</span>
                                <div class="card-image">
                                    <img src={"../public/images/profilePictureSample.jpg"} style={{ width: "200px;" }} />
                                </div>
                                <div class="card-content">
                                    <div class="row">
                                        <div class="input-field col s6">
                                            <input id="firstname" type="text" class="validate" />
                                            <label for="firstname">First Name</label>
                                        </div>
                                        <div class="input-field col s6">
                                            <input id="lastname" type="text" class="validate" />
                                            <label for="lastname">Last Name</label>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="input-field col s6">
                                            <input id="email" type="email" class="validate" />
                                            <label for="email">Email</label>
                                        </div>
                                        <div class="input-field col s6">
                                            <input id="phone" type="text" class="validate" />
                                            <label for="phone">Phone</label>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="input-field col s6">
                                            <input id="username" type="text" class="validate" />
                                            <label for="username">Username</label>
                                        </div>
                                        <div class="input-field col s6">
                                            <input id="newPassword" type="password" class="validate" />
                                            <label for="newPassword">New Password</label>
                                        </div>
                                    </div>
                                    <div class="row fileInput">
                                        <div class="col s12">
                                            <form action="#">
                                                <div class="file-field input-field">
                                                    <div class="badge blue">
                                                        <span id="upload">Upload Profile Picture</span>
                                                        <input type="file" />
                                                    </div>
                                                    <input class="file-path validate" type="text" />
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <a class="waves-effect waves-light btn pink pulse" id="updateAccount">Update</a>
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