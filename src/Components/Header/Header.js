import React, {useEffect, useState} from "react";
import "./header.css";
import Search from "../../image/search.svg";
import User from "../../image/user.svg";
import {profileAPI} from "../../api/Api";

export const Header = (props) => {

    const [photo, setPhoto] = useState(User);
    const [profileInfo, setProfileInfo] = useState(props.profile);
    useEffect(() => {

        profileAPI.getUserProfile(24359)
            .then(response => {
                setProfileInfo(response.data);
            });

    },[props.profile]);


    profileAPI.getUserProfile(24359)
        .then(response => {
            setPhoto(response.data.photos.small)
        })



    return (
        <header>
            <div className="container">
                <div className="header">
                    <form action="" className="search-form">
                        <input type="text" placeholder="Search" className="search-input" />
                        <button type="submit" className="search-btn"><img src={Search} alt="Search" /></button>
                    </form>
                    <div className="nav">
                        { props.isAuth
                            ?
                            <div className="user">
                                <img src={photo} alt="Avatar" className="user-avatar" />
                                <span className="user-name">
                                  {profileInfo && profileInfo.fullName} - <button onClick={props.logout}>Log out</button>
                                </span>
                            </div>
                            :
                            <span className="user-name">
                              Login
                            </span>
                        }

                        <div className="nav-menu">
                            <a href="#" className="nav-link">
                                Home
                            </a>
                            <a href="#" className="nav-link">
                                Create
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
