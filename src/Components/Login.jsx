import Logo from "../assets/logo.png";
import React, { useState } from "react";
import { withRouter, Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faSearch, faHome, faBook, faHeart, faPlusCircle, faArrowCircleDown } from '@fortawesome/free-solid-svg-icons'
import "bootstrap/dist/css/bootstrap.min.css";
import "./CSS/Login.css";
import { setUserDetails, isLoggedIn } from "../store/user/action";
import { useDispatch } from "react-redux";


function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    dispatch(setUserDetails(username, password));
    dispatch(isLoggedIn(true));
  };

  const updateLogin = async (e) => {
    const currentId = e.currentTarget.id;
    if (currentId == "password") setPassword(e.currentTarget.value);
    else setUsername(e.currentTarget.value);
  };

  return (
    <body className="login-body justify-content-center">
      <section>
        <div className="login-logo">
          <a href="index.html">
            <img src={Logo} />
          </a>
        </div>
        <div className="login-container">
          <span> To continue, log in to Spotify.</span>
          <div className="login-button login-facebook">
            <i className="fa fa-facebook"></i>
            <span>CONTINUE WITH FACEBOOK</span>
          </div>
          <a href ={`${process.env.REACT_APP_BE_URL}/spotifyLogin`}><div className="login-button login-apple">
            <i className="fa fa-apple"></i>
            <span>CONTINUE WITH SPOTIFY</span>
          </div></a>
          <a href ={`${process.env.REACT_APP_BE_URL}/googleLogin`}>
          <div className="login-button login-google">
            <i className="fa fa-google"></i>
            <span>CONTINUE WITH GOOGLE</span>
          </div> </a>
          <div className="d-flex flex-row">
            <hr />
            OR
            <hr />
          </div>
          <Form>
            <Form.Group>
              <Form.Label className="mt-3">
                Email address or Username
              </Form.Label>
              <Form.Control
                type="username"
                placeholder="Email address or username"
                id="username"
                value={username}
                onChange={updateLogin}
              />
              <Form.Label className="mt-3">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                id="password"
                value={password}
                onChange={updateLogin}
              />
              <Form.Text className="text-muted">
                Don't share your log-in details with others
              </Form.Text>
            </Form.Group>
            {/* <Form.Group >
    <Form.Check className="custom-checkbox" type="checkbox" label="Remember Me" id="rememberUser"/>
  </Form.Group> */}
            <div className="login-btn">
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customCheck1"
                />
                <label className="custom-control-label" for="customCheck1">
                  Remember Me
                </label>
              </div>
              <Link to="/home">
                <Button
                  className="login-button login-spotify"
                  type="submit"
                  onClick={() => handleLogin()}
                >
                  LOG IN
                </Button>
              </Link>
            </div>
          </Form>

          <hr />
          <div className="login-footer">
            <span>Don't have an account?</span>
            <div className="login-button login-signup">
              <span>SIGN UP ON SPOTIFY</span>
            </div>
          </div>
        </div>
      </section>
    </body>
  );
}

export default withRouter(Login);
