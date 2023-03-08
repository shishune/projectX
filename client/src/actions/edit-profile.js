
import {patchUserData, setUserPreferredName, setUserPFP, setUserFirstName, setUserLastName,  setUserLocation, setUserBio, 
        setUserContacts, setUserProfessionalProjectInterest, setUserCasualProjectInterest} from  './userInfo.js';

function editProfile (user, pfpLink, preferredName, firstName, lastName, 
    location, bio, professionialProjects, casualProjects, links, password, 
    setUserData, changes, setChanges) {  
    let editError = false;
    if (editError) {
        return editError;
    }

    setUserPreferredName(user, preferredName, changes, setChanges)
    setUserFirstName(user, firstName, changes, setChanges)
    setUserLastName(user,  lastName, changes, setChanges)
    setUserPFP(user,  pfpLink, changes, setChanges)
    // setUserPassword(user, password, changes, setChanges)
    setUserLocation(user, location, changes, setChanges)
    setUserBio(user,  bio, changes, setChanges)
    setUserContacts(user,  links, changes, setChanges)
    setUserProfessionalProjectInterest(user, professionialProjects, changes, setChanges)
    setUserCasualProjectInterest(user,  casualProjects, changes, setChanges)
    patchUserData(user._id, changes, setUserData)
}

export default editProfile;