// could be moved outside home, if we decide to use in multiple places
import '../styles.css';
import { Link } from "react-router-dom";

function JoinBtn() {
  return (
    <div className = "joinButtonContainer">
      <Link to="/join"><button id = "joinButton">join</button></Link>
    </div>
  );
}

onclick="window.location.href='https://w3docs.com';"

export default JoinBtn;