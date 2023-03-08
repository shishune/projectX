import UserGeneralInfo from './General-Info/index';
import ExperiencesDetails from './Experiences-Details/index';
import { useParams } from "react-router-dom";
import  {getUserData}  from './../../actions/userInfo.js';

import './styles.css';
import { useEffect, useState } from 'react';

function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  let params = useParams();
  let userid = params.userid; // fetch the appropriate info for this post somehow


  useEffect(() => {
    getUserData(userid, setUserData, setIsLoading)
  }, [])

  return (
    <div className='profilePage'>
      {isLoading ? <div></div> : <UserGeneralInfo userid={userid} userData={userData} />}
      {isLoading ? <div></div> : <ExperiencesDetails userid={userid} userData={userData}/> /*<UserGeneralInfo userid={userid} userData={userData} />*/}
    </div>
  );
}

export default ProfilePage;