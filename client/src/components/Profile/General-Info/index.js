import './styles.css';
import PFPMessage from './pfp-message';
import BioSection from './bio-section/bio-section.js';
import LinksSection from './links-section/links-section.js';
import { useContext, useState } from 'react';
import  UserContext  from './../../../actions/userContext';
import EditIcon from '@mui/icons-material/Edit';
import ProfileEditDialogue from "./edit-dialogue/profile-edit-dialogue";

import './../styles.css';

function UserGeneralInfo(props) {
  const {user} = useContext(UserContext);
  // The Top section of the profile page
  const [isOpen, setIsOpen] = useState(false);
 
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }
  
  return (
    <div className='GeneralInfo'>
      {isOpen ? 
        <ProfileEditDialogue 
          toggle={togglePopup}  
          userid={user._id} 
          userData={props.userData}
          />
        : null}
      <div className="row">
        <PFPMessage 
          userid={props.userid}
          userData={props.userData}
        />
          
        <BioSection 
          userid={props.userid}
          userData={props.userData}
        /> 
        <div className='column'>
          {user !== null && user._id == props.userid ? 
          <div className='floatRight'>
            <div className="editButton"> 
              <button className='transparentButton' onClick={togglePopup}>
                <EditIcon />
              </button> 
            </div>
          </div>
          : <div></div>
          }
          <LinksSection 
              userid={props.userid}
              userData={props.userData}
            />
        </div>
      </div>
    </div>
    
  );
}

export default UserGeneralInfo;