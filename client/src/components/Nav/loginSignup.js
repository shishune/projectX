import './styles.css';
import { Link } from "react-router-dom";

function LoginSignup() {
    return (
        <div >
            <Link to="/login" className="accountLinks">Login</Link>
            <Link to="/join" className="accountLinks">Join</Link>  
        </div>
    );
  }
  
  export default LoginSignup;

