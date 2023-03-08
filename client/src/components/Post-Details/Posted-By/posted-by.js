import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import defaultPFP from '../../../assets/profile/defaultPFP.png';
import IconButton from '@mui/material/IconButton';
import ButtonUnstyled, { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import { styled } from '@mui/system';
import { getUserPreferredName, getUserFirstName, getUserPFP, getUserLocation, getUserPreferredFullName, getUserBio, getUserContacts, getUserFullName } from '../../../actions/userInfo';
import { findContactLinkImg } from '../../../actions/findUserLinkImgs';
import { Link, useNavigate  } from "react-router-dom";
import { useEffect, useState } from 'react';

import '../styles.css';

import ENV from '../../../config.js';
const API_HOST = ENV.api_host

function PostedBySection(props) {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const MAX_LINKS_PER_POSTER = 3;
  let contactLinkElements = [];
  // Material UI buttons can't be styled with CSS in the usual way, so this is the only option
  const CustomButtonRoot = styled('button')`
  font-family: Noto Sans, sans-serif;
  font-weight: bold;
  font-size: 16px;
  background-color: ${props.postType === "Professional" ? "#49c4b1" : "#ff857b"};
  color: #000;
  padding: 10px 13px;
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
  
  function buildContactLinks() {
    let contactLinkObjs = getUserContacts(userData);
    for (let i = 0; i < Math.min(contactLinkObjs.length, MAX_LINKS_PER_POSTER); i++) {
      buildContactLink(contactLinkObjs[i]);
    }
    return <Stack direction="row">{contactLinkElements}</Stack>
  }

  function buildContactLink(linkObj) {
    let linkImg = findContactLinkImg(linkObj.linkName);
    contactLinkElements.push(
      <IconButton
        onClick={() => {
          window.open(linkObj.link)
        }}
      >
        {linkImg}
      </IconButton>
    );
  }

  function handleContact() {
    // this will require an api call (either to link to something that will fill in the "to" filed of an email with admin emails, 
    // or to an in app messaging service, if we are able to have time to implement that additional feature)
    navigate("/u/"+ props.posterId);
    
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
    <div>
      {isLoading ? <div></div> : <Card variant="outlined" className="rightSectionContainer">
        <div className="rightSectionTitle">Posted By:</div>
        <Link to={"/u/" + props.posterId}>
          <div id="postedByTopContainer">
            <div id="profileImgContainer">
              <img id="profileImg" src={getUserPFP(userData) === "" ? defaultPFP : getUserPFP(userData)} />
            </div>
            <div id="postedByNameLocationContainer">
              <div id="postedByName">{getUserPreferredName(userData) === "" ? getUserFullName(userData): getUserPreferredFullName(userData)}</div>
              <div id="posterLocationContainer">
                <LocationOnIcon id="posterLocationImg" />
                <div id="posterLocationText">{getUserLocation(userData)}</div>
              </div>
            </div>
          </div>
        </Link>
        
        <div id="postedbyBioContainer">{getUserBio(userData).slice(0, 180).concat("...")}</div>
        <div>{buildContactLinks()}</div>
        <Divider variant="middle"/>
        <div id="postedByContactSection">
          <div id="postedByContactText">Need to talk to {getUserPreferredName(userData) =="" ? 
              getUserFirstName(userData) 
            : getUserPreferredName(userData)}?</div>
          <CustomButton variant="contained" color="primary" onClick={() => handleContact()}>SEE PROFILE</CustomButton>
        </div>
      </Card>}
    </div>
  );
}

export default PostedBySection;