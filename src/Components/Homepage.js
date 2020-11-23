import React, { useState } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSignedIn,
  selectUserData,
  setUserData,
} from "../features/userSlice";

import { setSignedIn } from "../features/userSlice";
import Navbar from "./Navbar";
import "../styling/home.css";

const Homepage = () => {
  const isSignedIn = useSelector(selectSignedIn);
  const dispatch = useDispatch();

  const login = (response) => {
    console.log(response);
    dispatch(setSignedIn(true));
    dispatch(setUserData(response.profileObj));
  };

  return (
    <div className="home__page" style={{ display: isSignedIn ? "none" : "" }}>
      <div className="buttons">
        {!isSignedIn ? (
          <div className="login__message">
            <h2>📗</h2>
            <h1>A Readers favourite place!</h1>
            <p>
              We provide high quality online resource for reading blogs. Just
              sign up and start reading some quality blogs.
            </p>
            <GoogleLogin
              clientId="340803588750-lh5mo8q8padq0420ull93fnme66e4tcs.apps.googleusercontent.com"
              render={(renderProps) => (
                <button
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  className="login__button"
                >
                  Login with Google
                </button>
              )}
              buttonText="Login"
              onSuccess={login}
              onFailure={login}
              isSignedIn={false}
              cookiePolicy={"single_host_origin"}
            />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Homepage;
