import './styles.css';
import FaceIcon from '@mui/icons-material/Face';
import { Link } from "react-router-dom";
import { useContext } from 'react';
import  UserContext  from './../../actions/userContext';
import { logout } from "./../../actions/userLoginSignup";

function ProfileLogout() {
    const {user} = useContext(UserContext); // TODO: make this actual user profile image
    let { setIsSignedIn, setIsAdmin, setUser } = useContext(UserContext);

    let userID = user._id.toString()

    const handleOnClick = async () => {
        await logout()
        .then(res => {
            setIsSignedIn(false);
            setIsAdmin(false);
            setUser(null);
        })
    }

    return (
        <div className="logOut">
            <Link to={"/u/"+ userID} className="accountLinks"><FaceIcon className="profileImg"/></Link>
            <a  className="accountLinks" onClick={(e) => {
                e.preventDefault();
                handleOnClick();
                }}>Logout</a>
        </div> 
    );
  }
  
  export default ProfileLogout;