import './styles.css';
import  defaultPFP  from './../../../assets/profile/defaultPFP.png';
import EmailIcon from '@mui/icons-material/Email';
import  {getUserPFP, getUserEmail}  from '../../../actions/userInfo.js';

function PFPMessage(props){

    function messageUser(){
        window.location.href = "mailto:"+ getUserEmail(props.userData);  
      };
    
    return(
    <div className='imageInfo'>
        {getUserPFP(props.userid, props.userData) == "" ? 
            <img src={defaultPFP} alt="Profile Picture" className="pfp"/>
        : <img src={getUserPFP(props.userData)} alt="Profile Picture" className="pfp"/>
        }      
        <div>
        <button className="transparentButton" onClick={messageUser}>       
            <EmailIcon className="icon" />
                <span className="buttonText">Message</span>
        </button>  
        </div>
    </div>      

    )
}

export default PFPMessage;


