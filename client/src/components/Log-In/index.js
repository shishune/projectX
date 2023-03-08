import './styles.css';
import React, { useState, useContext } from "react"
import { Link } from "react-router-dom";
import UserContext from './../../actions/userContext.js';
import { login } from "../../actions/userLoginSignup";

function LogIn() {
  // For storing and changing the fields in the form
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // For updating potential error messages on the web page
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  let [usernameErrorContent, setUsernameErrorContent] = useState("");
  let [passwordErrorContent, setPasswordErrorContent] = useState("");

  // Getting and setting user information through contexts
  let { setIsSignedIn, setIsAdmin, setUser} = useContext(UserContext);

  const handleSubmit = async () => {
    let isSignedIn = false;
    let isAdmin = false;
    let user = null;
    let usernameErrorContent = "";
    let passwordErrorContent = "";
    await login({"username": username, "password": password}).then(json => {
      if (json.currentUser) {
        isSignedIn = true;
        user = json.currentUser
        if (json.currentUser.isAdmin === "true") {
          isAdmin = true;
        }
      } else if (json.usernameError) {
        usernameErrorContent = json.usernameError;
        passwordErrorContent = "";
      } else if (json.passwordError) {
        usernameErrorContent = "";
        passwordErrorContent = json.passwordError;
      }
    })
    setIsAdmin(isAdmin);
    setUser(user);
    setIsSignedIn(isSignedIn);
    (usernameErrorContent !== "") ? setUsernameError(true) : setUsernameError(false);
    setUsernameErrorContent(usernameErrorContent);            
    (passwordErrorContent !== "") ? setPasswordError(true) : setPasswordError(false);
    setPasswordErrorContent(passwordErrorContent);
  }

  return (
    <main>
      <form id="logInForm" onSubmit={(e) => 
        {
          e.preventDefault();
          handleSubmit();
        }}>
        <h3>Hello :)</h3>
        <input id="loginUsername" type="text" placeholder="Username" required onChange={(e) => {setUsername(e.target.value)}}></input>
        {usernameError ? <div className="error">{usernameErrorContent}</div> : <div className="error"></div>}
        <input id="loginPassword" type="password" placeholder="Password" required onChange={(e) => {setPassword(e.target.value)}}></input>
        {passwordError ? <div className="error">{passwordErrorContent}</div> : <div className="error"></div>}
        <input id="logInButton" type="submit" value="LOG IN"></input>
      </form>
      <p>Don't have an account? <Link to="/join" id="signUpLink">Sign Up</Link></p> 
    </main>
  );
}

export default LogIn;