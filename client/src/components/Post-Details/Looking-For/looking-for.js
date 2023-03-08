import { useContext, useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import  Collapse from '@mui/material/Collapse';
import ButtonUnstyled, { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import { getThemeProps, styled } from '@mui/system';
import { getUserPreferredName, getUserFirstName, getUserEmail } from '../../../actions/userInfo';

import UserContext from '../../../actions/userContext';

import '../styles.css';
import './login-dialogue-style.css';
import LoginDialogue from './login-dialogue';

import ENV from '../../../config.js';
const API_HOST = ENV.api_host

function LookingForSection(props) {
  const {user} = useContext(UserContext);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);


  let positions = [];
  function buildPositions () {
    for (let i = 0; i < props.requiredPeople.length; i++) {
      // only display if valid and non-empty
      if (props.requiredPeople[i].jobTitle !== "") {
        createPosition(i);
      }
    }
    return <div>{positions}</div>
  }

  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  // Material UI buttons can't be styled with CSS in the usual way, so this is the only option
  const CustomButtonRoot = styled('button')`
  font-family: Noto Sans, sans-serif;
  font-weight: bold;
  font-size: 20px;
  background-color: ${props.postType === "Professional" ? "#49c4b1" : "#ff857b"};
  color: #000;
  padding: 15px 18px;
  border-radius: 5px;  
  cursor: pointer;
  border: none;

  &:hover {
    background-color: ${props.postType === "Professional" ? "#41b09f" : "#f07c73"};
  }

  &.${buttonUnstyledClasses.active} {
    background-color: ${props.postType === "Professional" ? "#3ba191" : "#de736a"};
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }`;

  function CustomButton(props) {
    return <ButtonUnstyled {...props} component={CustomButtonRoot} />;
  }

  function handleContact() {
    // this will require an api call (either to link to something that will fill in the "to" filed of an email with admin emails, 
    // or to an in app messaging service, if we are able to have time to implement that additional feature)
    if(user !== null){
      window.location.href = "mailto:"+ getUserEmail(userData);  
    } else {
      togglePopup();
    }
    

  }

  function createPosition (i) {
    positions.push(
      <Stack>
        <div className="jobTitle">// {props.requiredPeople[i].jobTitle}</div>
        <div className="jobDesc">{props.requiredPeople[i].jobDescription}</div>
        <div className="purposeSection">
          <div className="subsectionHeading">Purpose: </div>
          <div className="purpose">{props.requiredPeople[i].purpose}</div>
        </div>
        <div className="requirementsSection">
          <div className="subsectionHeading">Requirements</div>
          <ul className="requirementsList">{props.requiredPeople[i].requirements.map((req) => (
            req.requirement === "" ? null : <li className="requirementsItem">{"- " + req.requirement}</li>))}
          </ul>
        </div>
        <div className="additionalInfoSection">
          <div className="subsectionHeading">Additional Information</div>
          <div className="additionalInfo">{props.requiredPeople[i].additionalInfo}</div>
        </div>
        <Divider variant="middle"/>
      </Stack>
    );
  }

  useEffect(() => {
    const url = `${API_HOST}/api/user/` + props.posterId;
    fetch(url)
    .then(res => {
      if (res.status === 200) {
        // return a promise that resolves with the JSON body
        return res.json();
      } else {
        alert("Could not get user");
        throw "could not get user";
      }
    })
    .then(fetchedData => {
      // the resolved promise with the JSON body
      setUserData(fetchedData);
      setIsLoading(false);
    })
    .catch(error => {
      console.log(error);
    });
  }, [])


  return (
    <Collapse in={true}>
      {isOpen ? 
        <LoginDialogue 
          toggle={togglePopup}
          /> 
          : null}
      <div >
        {isLoading ? <div></div> : <Card variant="outlined" className="rightSectionContainer">
          <div className="rightSectionTitle">{getUserPreferredName(userData) == ""?
            getUserFirstName(userData)
            :getUserPreferredName(userData)
          } is Looking For...</div>
          {buildPositions()}
          <div id="lookingForContactSection">
            <div id="lookingForContactText">See a role you like?...</div>
            <CustomButton variant="contained" color="primary" onClick={() => handleContact()}>CONTACT POSTER</CustomButton>
          </div>
        </Card>}
      </div>
    </Collapse>
  );
}

export default LookingForSection;