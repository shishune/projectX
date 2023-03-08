import { useContext, useEffect, useState } from 'react';
import ProjectDetailsSection from './Project-Details/project-details';
import LookingForSection from './Looking-For/looking-for';
import PostedBySection from './Posted-By/posted-by';
import Grid from '@mui/material/Grid';
import { useParams } from "react-router-dom";
import PostsContext from '../../actions/postsContext';
import './styles.css';

// environment configutations
import ENV from '../../config.js'
const API_HOST = ENV.api_host

const log = console.log

function PostDetails() {
  const [postData, setPostData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  let params = useParams();
  let postId = params.postId; // fetch post id

  useEffect(() => {
    const url = `${API_HOST}/api/posts/${postId}`;
    fetch(url)
    .then(res => {
      if (res.status === 200) {
        // return a promise that resolves with the JSON body
        return res.json();
      } 
      else {
          //alert("Could not get post");
          throw "could not get post";
      }
    })
    .then((json) => {  // the resolved promise with the JSON body    
      setPostData(json);
      setIsLoading(false);
    }).catch((error) => {
        log(error)
    })
  }, [])

  return (
    <div>
      {isLoading? <div></div> : <Grid container>
        <Grid item sm={7} id="leftSection">
          <ProjectDetailsSection 
            postId={postId}
            title={postData.title}
            isFlagged={postData.isFlagged}
            postType={postData.postType}
            postLocation={postData.postLocation}
            tags={postData.tags}
            numViews={postData.numViews}
            targetUsers={postData.targetUsers}
            description={postData.description}
            materialVideos={postData.materials.videos}
            materialOtherLinks={postData.materials.otherlinks}
            possibleCostEstimates={postData.possibleCostEstimates}
            inspirationVideos={postData.inspirations.videos}
            inspirationOtherLinks={postData.inspirations.otherlinks}
            requiredPeople={postData.requiredPeople}
            posterId={postData.posterId}
          />
        </Grid>
        <Grid item sm={5} id="rightSection">
          <div id="sectionMargin">
            <LookingForSection
              postType={postData.postType}
              posterId={postData.posterId}
              postSearchState={postData.postSearchState}
              requiredPeople={postData.requiredPeople}
            />
            <br/>
            <PostedBySection
              postType={postData.postType}
              posterId={postData.posterId}
            />
          </div>
        </Grid>
      </Grid>}
  </div>
  );
}

export default PostDetails;