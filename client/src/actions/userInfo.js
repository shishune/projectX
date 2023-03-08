// Note: the parameters in all of these functions are the same, and therefore are defined the same
/* 
  Gets the user's preferred first name
  <posterId> is the unique id of a user
  <usersData> is the list (or in phase 2, most likely hashmap) of user data
*/

// environment configutations
import ENV from './../config.js'
const API_HOST = ENV.api_host

async function getUserData (userid, setUserData, setIsLoading){

  const url = `${API_HOST}/api/user/${userid}`;
    fetch(url)
    .then(res => {
      if (res.status === 200) {
        // return a promise that resolves with the JSON body
        return res.json();
      } else {
          //alert("Could not get user");
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

}


// helper function 
/*
[
  {"op": "replace", "path": "/variable", "value":"value"}
]
*/

function userPatchBody(changes){
  console.log("create body")
  const body = [];
  changes.map(change =>{
    let operation; 
    if(change[0]=="links"){
      const links = JSON.stringify(change[1])
      console.log(links)
      console.log(change[1])
      operation = {
        "op": "replace", 
        "path": `/${change[0]}`, 
        "value": change[1]
        }
    } else {
      operation = {
      "op": "replace", 
      "path": `/${change[0]}`, 
      "value":`${change[1]}`
      }
    }
   
    body.push(operation)
  })

  console.log(body)
  return body

}


async function patchUserData (userid, changes, setUserData){
  console.log("PATCH")
  console.log(JSON.stringify(userPatchBody(changes)))
  // Create our request constructor with all the parameters we need
  const requestOptions = {
    method: 'PATCH',
    body: JSON.stringify(userPatchBody(changes)),
    headers: {
        Accept: "application/json, application/json-patch+json, text/plain, */*",
        "Content-Type": "application/json"
    }
  };
 

    fetch(`${API_HOST}/api/user/${userid}`, requestOptions)
    .then(res => {
      if (res.status === 200) {
        // return a promise that resolves with the JSON body
        return res.json();
      } else {
        alert("Could not edit user");

      }
    })
    .then(fetchedData => {
      // the resolved promise with the JSON body
      setUserData(fetchedData);

    })
    .catch(error => {
      console.log(error);
      // setError
    });

}




function getUserPreferredName(userData) {
  return userData.preferredName;

}

function setUserPreferredName(userData, newName, changes, setChanges) {
  userData.preferredName = newName;
  // post this
  changes.push(["preferredName", newName])
  return changes
}


function getUserPFP(userData) {
  return userData.profileImgLink;
}

function setUserPFP(userData, newImageLink, changes, setChanges) {
  userData.profileImgLink = newImageLink;
  // post this
  changes.push(["profileImgLink", newImageLink])
  return changes
  
}

function getUserName(userData){
  if(userData.preferredName == ""){
    return userData.firstName
  } else {
    return userData.preferredName
  }
}

function getUserFirstName (userData) {
  return userData.firstName;
    
}


function setUserFirstName(userData, newName, changes, setChanges) {
  userData.firstName = newName;
  changes.push(["firstName", newName])
  return changes
}

function getUserLastName (userData) {
  return userData.lastName;

}

function setUserLastName(userData, newName, changes) {
  userData.lastName = newName;
  changes.push(["lastName", newName])
  return changes
}


function getUserFullName (userData) {
  return getUserFirstName(userData).concat(" ").concat(getUserLastName(userData));
}

function getUserPreferredFullName (userData) {
  return getUserPreferredName(userData).concat(" ").concat(getUserLastName(userData));
}

function getUserLocation (userData) {
  return userData.location;
}

function setUserLocation(userData, newLocation, changes, setChanges) {
  userData.location = newLocation;
  changes.push(["location", newLocation])
  setChanges(changes)
}

function getUserBio (userData) {
  return userData.bio;
}

function setUserBio (userData, newBio, changes, setChanges) {
  userData.bio = newBio;
  changes.push(["bio", newBio])
  setChanges(changes)

}


function getUserContacts (userData) {
  return userData.links;
}

function setUserContacts (userData, newLinks, changes, setChanges) {
  userData.links = newLinks;
  changes.push(["links", newLinks])
  setChanges(changes)
 
}

function getUserEmail(userData){
  return userData.username;
}

function setUserEmail(userData, newEmail, changes, setChanges){
  userData.username = newEmail;
  changes.push(["username", newEmail])
  setChanges(changes)

}

function getUserPassword(userData){
  return userData.password;
}

function setUserPassword(userData, newPassword, changes, setChanges){
  userData.password = newPassword;
  changes.push(["password", newPassword])
  setChanges(changes)
}

function getUserProjectInterests(userData){
  if(userData.casualProjects && userData.professionalProjects){
    return ["Professional", "Casual"]
  } else if(userData.casualProjects){
    return ["Casual"]
  } else if (userData.professionalProjects){
    return ["Professional"]
  } else{
    return ["No"]
  }
}

function getUserProfessionalProjectInterest(userData){
  return userData.professionalProjects
}

function setUserProfessionalProjectInterest(userData, professionalInterest, changes, setChanges){
  userData.professionalProjects = professionalInterest;
  changes.push(["professionalProjects", professionalInterest])
  setChanges(changes)

}

function getUserCasualProjectInterest(userData){
  return userData.casualProjects
  
}

function setUserCasualProjectInterest(userData, casualInterest, changes, setChanges){
  userData.casualProjects = casualInterest;
  changes.push(["casualProjects", casualInterest])
  setChanges(changes)
}

export { getUserData, getUserName, patchUserData,
  getUserPreferredName, getUserPFP, getUserFirstName, getUserLastName, getUserFullName, getUserPreferredFullName, getUserLocation, getUserBio, getUserContacts, 
  getUserProfessionalProjectInterest, getUserCasualProjectInterest, getUserProjectInterests, getUserEmail, getUserPassword, 
  setUserPFP, setUserPreferredName, setUserFirstName, setUserLastName,  setUserLocation, setUserBio, 
  setUserContacts, setUserProfessionalProjectInterest, setUserCasualProjectInterest, setUserEmail, setUserPassword };