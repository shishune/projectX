import './styles.css';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import { useContext } from 'react';
import { Link } from "react-router-dom";
import  UserContext  from './../../actions/userContext';
import  LoginSignup  from './loginSignup';
import  ProfileLogout  from './profileLogout';

  /* This is the navigation bar
      need to check if user is signed in or navigation
      if signed in, link to profile page
      if not signed in, link to login and sign up buttons */
      

function NavBar() {
  const {isSignedIn, isAdmin} = useContext(UserContext);
  return (
    <nav id="header">
      <div id="left">
        <Link to="/"><BuildCircleIcon  id="companyLogo" /></Link>
      </div>
      <div id="right">
        { isAdmin ? <div id="admin">You are signed in as an admin</div> : <div></div> }  
        { isSignedIn ? <ProfileLogout /> : <LoginSignup /> }
      </div>
    </nav>
  );
}

export default NavBar;