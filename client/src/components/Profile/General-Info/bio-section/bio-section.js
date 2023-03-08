import './../styles.css';
import './bio-style.css';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import  {getUserPreferredName, getUserPreferredFullName, getUserFullName, getUserProjectInterests, getUserLocation, getUserBio}  from '../../../../actions/userInfo.js';



function BioSection(props) {
  
  return (
    <div className="bio"> 
      <div className="textInfo">
          <h1>{getUserPreferredName(props.userData) ==""? getUserFullName(props.userData):getUserPreferredFullName(props.userData)}</h1>
          <h3 id="projectInterest">Interested in: 
          {getUserProjectInterests(props.userData).length == 2?
              <span>
                <span id="professionalProjectType">
                {" " + getUserProjectInterests(props.userData)[0] + " "}
                </span> 
                and 
                <span id="casualProjectType"> 
                {" " + getUserProjectInterests(props.userData)[1] + " "} 
                </span>
              </span>
            : (getUserProjectInterests(props.userData)[0] == "Professional"?
              <span id="professionalProjectType">
              {" " + getUserProjectInterests(props.userData)[0] + " "}
              </span> 
              : <span id="casualProjectType"> 
                {" " + getUserProjectInterests(props.userData)[0] + " "}
                </span>  )
            }
            projects</h3>
          <h5 id="location"><LocationOnIcon className="icon"/>{getUserLocation(props.userData)}</h5>
          <p id="bioBlurb">{getUserBio(props.userData)}</p>
      </div>
    </div>
  );
}

export default BioSection;