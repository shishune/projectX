import './../styles.css';
import './link-style.css';
import {getUserContacts}  from '../../../../actions/userInfo.js';
import { findContactLinkImg } from '../../../../actions/findUserLinkImgs';
import Icon from '@mui/material/Icon';


function LinksSection(props) {
  const MAX_LINKS_PER_POSTER = 3;
  let contactLinkElements = [];

  function buildContactLinks() {
    let contactLinkObjs = getUserContacts(props.userData);
    for (let i = 0; i < Math.min(contactLinkObjs.length, MAX_LINKS_PER_POSTER); i++) {
      if(contactLinkObjs[i].link !== " "){
        buildContactLink(contactLinkObjs[i]);
      }
      
    }
    return <li>{contactLinkElements}</li>
  }

  function buildContactLink(linkObj) {
    let linkImg = findContactLinkImg(linkObj.linkName);
    contactLinkElements.push(
      <div className="linkList">      
      <button className="transparentButton" 
        onClick={() => {
          window.open(linkObj.link)
        }}>       
        <Icon className="icon">
        {linkImg}
      </Icon>
        <span className="buttonText">{linkObj.linkName == "OtherWebsite"?
        "Website" : linkObj.linkName} <div className='link'>{linkObj.link.slice(0, 65)}{linkObj.link.slice(65)==""? "": "..."}</div></span>
      </button>  
      </div>

    );
  }

  //Right side of the top section of the profile page, with user's contact link and stuff
  return (
    <div>
      <div className='links'><ul className='linksList'>{buildContactLinks()}</ul></div>
    </div>
  );
}

export default LinksSection;