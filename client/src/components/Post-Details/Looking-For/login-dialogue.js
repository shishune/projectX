import './login-dialogue-style.css';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from "react-router-dom";

function LoginDialogue(props){

    function handleClick(){
        props.toggle();
    };

    return(
        <div className='dialogueBackgroundBlur'>
            <div className="loginDialogue">
                <div className='dialogueHeader'>
                    <span className="close" onClick={handleClick}>
                    <CloseIcon/>
                    </span>
                </div>
                <div className='dialogueContent'>
                <div className="dialogueText">
                    To contact the poster you must be loggedin. 
                </div>
                <div className="accountLink">
                    <Link to="/login" className="accountLinks">Login</Link>
               
                    <Link to="/join" className="accountLinks">Join</Link>  
                </div>
                </div>
                

            </div>
        </div>
    )
}

export default  LoginDialogue;

