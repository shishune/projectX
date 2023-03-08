import './../styles.css';
import './profile-edit-style.css';
import CloseIcon from '@mui/icons-material/Close';
import { useState, useContext } from "react";
import UserContext from '../../../../actions/userContext.js';
import editProfile from '../../../../actions/edit-profile.js';
import  {getUserPFP, getUserPreferredName, getUserFirstName, getUserLastName, getUserEmail, getUserPassword, 
  getUserProfessionalProjectInterest, getUserCasualProjectInterest, getUserLocation, getUserBio, getUserContacts}  from '../../../../actions/userInfo.js';



function ProfileEditDialogue(props) {
  const {user, setUser} = useContext(UserContext);

  const [pfpLink, setPfpLink] = useState(getUserPFP(props.userData));
  const [preferredName, setPreferredName] = useState(getUserPreferredName(props.userData));
  const [firstName, setFirstName] = useState(getUserFirstName(props.userData));
  const [lastName, setLastName] = useState(getUserLastName(props.userData));
  const [email, setEmail] = useState(getUserEmail(props.userData));
  const [password, setPassword] = useState(getUserPassword(props.userData));
  const [userLocation, setUserLocation] = useState(getUserLocation(props.userData));
  const [bio, setBio] = useState(getUserBio(props.userData));
  const [professionialProjects, setProfessionalProjects] = useState(getUserProfessionalProjectInterest(props.userData));
  const [casualProjects, setCasualProjects] = useState(getUserCasualProjectInterest(props.userData));
  const [links, setLinks] = useState(getUserContacts(props.userData))

  function update(){
    setPfpLink(getUserPFP(props.userData));
    setPreferredName(getUserPreferredName(props.userData));
    setFirstName(getUserFirstName(props.userData));
    setLastName(getUserLastName(props.userData));
    setEmail(getUserEmail(props.userData));
    setPassword(getUserPassword(props.userData));
    setUserLocation(getUserLocation(props.userData));
    setBio(getUserBio(props.userData));
    setProfessionalProjects(getUserProfessionalProjectInterest(props.userData));
    setCasualProjects(getUserCasualProjectInterest(props.userData));
    setLinks(getUserContacts(props.userData))


  }

  // For updating potential error messages on the web page
  let [editError, setEditError] = useState(false);
  const [changes, setChanges] = useState([]);

  function handleClick(){
    props.toggle();
    
   };

  
  function BuildLinkItem(link, index){
    return(
      
      <div>
          <select className='websiteSelect' 
          onChange={ (e) => {
            let newLinks = [...links]; // copying the old datas array
            newLinks[index].linkName = e.target.value; // replace with e.target.value 
            setLinks(newLinks)
            }
          }>
            <option value="Github" selected={link.linkName =="Github"} className="websiteOption" >Github</option>
            <option value="LinkedIn" selected={link.linkName =="LinkedIn" } className="websiteOption" >LinkedIn</option>
            <option value="Email" selected={link.linkName =="Email"} className="websiteOption" >Email</option>
            <option  value="OtherWebsite" selected={link.linkName =="OtherWebsite"} className="websiteOption" >Other Website</option>
          </select>
            <input value={link.link}  type="text" placeholder="Link" className='linkInput'
            onChange={(e) => {
              let newLinks = [...links]; // copying the old datas array
              newLinks[index].link = e.target.value; // replace with e.target.value 
              setLinks(newLinks)
              }}></input>
        </div>
    )
  }


  return (
    <div>
      <div className="dialogueBackgroundBlur">
        <div className="editDialogue">
          <div className='dialogueHeader'>
            <span className="close" onClick={handleClick}>
              <CloseIcon/>
            </span>
          </div>
          
          <form id="editForm" onSubmit={(e) => {
            e.preventDefault(); 
 
            let error = editProfile(user, pfpLink, preferredName, firstName, lastName, 
              userLocation, bio, professionialProjects, casualProjects, links, password, 
              setUser, changes, setChanges)
            update()
            window.location.reload()
    

            setEditError(error);
            if(!editError) {
              handleClick()
            }
            
          }}>
            <h1>Edit Details</h1>

            <h3>Personal Details</h3>
            {/* edit profile picture and perhaps... preferred name?? and message email */}
            <div className='editItem'>
                <label className="editLabel">Profile Photo (link)</label>
                <input value={pfpLink} className="linkInput" type="text" placeholder="Photo link" required onChange={(e) => {setPfpLink(e.target.value)}}></input>
            </div>
            <div className='editItem'>
              <label className="editLabel">Preferred Name </label>
              <input value={preferredName} id="prefName" type="text" placeholder="Preferred Name" onChange={(e) => {setPreferredName(e.target.value)}}></input>
            </div>
            <div className='editItem'>
              <label className="editLabel">First Name </label>
              <input value={firstName} id="firstName" type="text" placeholder="First Name" required onChange={(e) => {setFirstName(e.target.value)}}></input>
            </div>
            <div className='editItem'>
              <label className="editLabel">Last Name </label>
              <input value={lastName} id="lastName" type="text" placeholder="Last Name" required onChange={(e) => {setLastName(e.target.value)}}></input>
            </div>
            <div className='editItem'>
              <label className="editLabel">Location </label>
              <input value={userLocation} id="location" type="text" placeholder="Location" required onChange={(e) => {setUserLocation(e.target.value)}}></input>
            </div>
            <div className='editItem'>
              <label className="editLabel">Bio </label>
              <textarea value={bio} id="bio" type="text" placeholder="Bio" required onChange={(e) => {setBio(e.target.value)}}></textarea>
            </div>

            <h3>Interested in </h3>
            <div className='editItem'>
              <label className="editLabel">Professional Projects </label>
              <input id="professional" type="checkbox" 
                checked={professionialProjects}
                onChange={() => {
                  setProfessionalProjects(!professionialProjects)
                  }} />
            </div>
            <div className='editItem'>
              <label className="editLabel">Casual Projects </label>
              <input  id="casual" type="checkbox"  
              checked={casualProjects}
              onChange={() => {setCasualProjects(!casualProjects)}} />
            </div>

            <h3>Links </h3>
            <div className='editItem'>
              <div className="links"> 
                <ul>
                  { links.map((link, index) => (
                    BuildLinkItem(link, index)
                  ))}
                </ul>
              </div>
            </div>
            <h3>Account Information</h3>
            <div className='editItem'>     
              <label className="editLabel">Email </label>
              <input value={email} id="email" type="text" placeholder="Email" disabled={true} required 
              onChange={(e) => {setEmail(e.target.value)}}/>
            </div>
            {/* <div className='editItem'>
              <label className="editLabel">Password </label>
              <input value={password} id="newPassword" type="password" placeholder="Password" required onChange={(e) => {setPassword(e.target.value)}} />
            </div> */}
            {editError ? <div className="error">There was an error processing your request.</div> : <div className="error"></div>}
            
            <div className="dialogueFooter">
              <input id="saveProfileButton" type="submit" value="SAVE"></input>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProfileEditDialogue;