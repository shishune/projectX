import './styles.css';
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from './../../actions/userContext.js';

import { signup } from "../../actions/userLoginSignup";

function SignUp() {
  // For storing and changing the fields in the form on the web page
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // For updating potential error messages on the web page
  let [signUpError, setSignUpError] = useState(false);

  // Getting and setting user information through contexts
  let { setIsSignedIn, setUser } = useContext(UserContext);

  const handleSubmit = async () => {
    let isSignedIn = false;
    let user = null;
    let signUpError = false;

    await signup({"isAdmin": "false", "username": email.toString(), "password": password.toString(), "firstName": firstName.toString(), "lastName": lastName.toString(), "preferredName": "", "profileImgLink": "", "location": "", "bio": "", "links": [
      {
        "linkName": "OtherWebsite",
        "link": " "
      },
      {
        "linkName": "OtherWebsite",
        "link": " "
      },
      {
        "linkName": "OtherWebsite",
        "link": " "
      }
    ], "casualProjects": "false", "professionalProjects": "false"  }).then(json => {
      if (json.currentUser) {
        isSignedIn = true;
        user = json.currentUser
      } else if (json.signUpError) {
        signUpError = true;
      }
    })
    
    setUser(user);
    setIsSignedIn(isSignedIn);
    setSignUpError(signUpError);
  }

  return (
    <main>
      <form id="signUpForm" onSubmit={(e) => 
         {
          e.preventDefault(); 
          handleSubmit();
        }}>
        <h3>Sign Up</h3>
        <input id="signupFirstName" type="text" placeholder="First Name" required onChange={(e) => {setFirstName(e.target.value)}}></input>
        <input id="signupLastName" type="text" placeholder="Last Name" required onChange={(e) => {setLastName(e.target.value)}}></input>
        <input id="signupEmail" type="text" placeholder="Email" required onChange={(e) => {setEmail(e.target.value)}}></input>
        <input id="signupPassword" type="password" placeholder="Password" required onChange={(e) => {setPassword(e.target.value)}}></input>
        {signUpError ? <div className="error">Username Already In Use</div> : <div className="error"></div>}
        <input id="signUpButton" type="submit" value="SIGN UP"></input>
      </form>
      <p>Already have an account? <Link to="/login" id="logInLink">Log In</Link></p> 
    </main>
  );
}

export default SignUp;