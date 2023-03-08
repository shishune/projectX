// each post in the post feed section
import '../styles.css';
import Card from '@mui/material/Card';
import { Link } from "react-router-dom";
import flagImg from "../../../assets/post-details/flag.png";
import { getUserPreferredName, getUserPFP, getUserPreferredFullName, getUserFullName } from '../../../actions/userInfo';
import { useState, useEffect } from 'react';
import defaultPFP from '../../../assets/profile/defaultPFP.png';

import ENV from '../../../config.js';
const API_HOST = ENV.api_host;

// the post component
function Post(props) {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const url = `${API_HOST}/api/user/` + props.posterId;
    fetch(url)
    .then(res => {
      if (res.status === 200) {
        // return a promise that resolves with the JSON body
        return res.json();
      } else {
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

  function buildIsFlagged() {
    if (props.isFlagged) {
      return <div id="homePostIsFlaggedContainer">
        <img src={flagImg} id="homePostIsFlaggedIcon"/>
        <span id="homePostIsFlaggedText">NSFW</span>
      </div>
    } else {
      return <div></div>
    }
  }

  return (
    <div className = "postContainer">
        <Card className="postCard" variant="outlined">
          {isLoading? <div></div> : <div className = "userInfoContainer">
            <Link to={"/u/"+ props.posterId}>
              <img id="profileImg" src= {getUserPFP(userData) === "" ? defaultPFP : getUserPFP(userData)/*userData.profileImgLink*/}/>
              <div id = "posterName">{getUserPreferredName(userData) === "" ? getUserFullName(userData): getUserPreferredFullName(userData) /*userData.firstName*/}</div>
            </Link>
            {buildIsFlagged()}
          </div>}
          <div className = "subHeadingsContainer">
            <div className = "cardTitle">{props.title}</div>
            <div className = "cardLocation">{props.location}</div>
            <div className = "cardDescription">{props.description.slice(0, 150) + "..."}</div>
          </div>
        </Card>
    </div>
  );
}

export default Post;