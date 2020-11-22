import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSignedIn,
  selectUserData,
  setInput,
  setSignedIn,
  setUserData,
} from "../features/userSlice";
import Avatar from "@material-ui/core/Avatar";

import { GoogleLogout } from "react-google-login";

import "../styling/navbar.css";

const Navbar = () => {
  const isSignedIn = useSelector(selectSignedIn);
  const userData = useSelector(selectUserData);

  const [inputValue, setInputValue] = useState("tech");

  const dispatch = useDispatch();

  const logout = (response) => {
    console.log(response);
    dispatch(setSignedIn(false));
    dispatch(setUserData(null));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setInput(inputValue));

    setInputValue("");
  };

  return (
    <div className="navbar">
      <h1 className="navbar__header">BlogMania 💬</h1>
      {isSignedIn && (
        <div className="blog__search">
          <input
            className="search"
            placeholder="Search for a blog"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button className="submit" onClick={handleSubmit}>
            Search
          </button>
        </div>
      )}
      {isSignedIn ? (
        <div className="navbar__user__data">
          <Avatar
            alt={userData?.name}
            src={userData?.imageUrl}
            className="user"
          />
          <h1 className="signedIn">{userData?.givenName}</h1>
          {isSignedIn ? (
            <GoogleLogout
              clientId="623371016455-bkintijde3ha36pvtjnj98s766lcb2jq.apps.googleusercontent.com"
              render={(renderProps) => (
                <button
                  className=""
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  className="logout__button"
                >
                  Logout 😦
                </button>
              )}
              buttonText="Logout"
              onLogoutSuccess={logout}
            />
          ) : (
            ""
          )}
        </div>
      ) : (
        <h1 className="notSignedIn">User not available 😞</h1>
      )}
    </div>
  );
};

export default Navbar;
