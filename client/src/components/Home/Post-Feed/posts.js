import React from "react";
import defaultPFP from '../../../assets/profile/defaultPFP.png';
import { useState } from 'react';

import { getUserPreferredName, getUserPFP, getUserPreferredFullName, getUserFullName } from '../../../actions/userInfo';
import Stack from '@mui/material/Stack';

import { Link } from "react-router-dom";
import Post from './post';

function createPosts(shownPosts, postsElements/*, usersData*/) {
  for(let i = 0; i < shownPosts.length; i++) {
    // create post from data that goes into each post
    createPost(/* post json passed here */ shownPosts[i], i, postsElements);
  }
  return <Stack className="postStack">
            {postsElements}
        </Stack>;
}

// function matches posterID from post with poster first name, last name, and profile photo
function assignPosterData(post, usersData){
  // fetch user here
  const userData = usersData.get(post.posterId);
  post.posterName = getUserPreferredName(userData) === "" ? getUserFullName(userData): getUserPreferredFullName(userData)
  post.posterProfilePhoto = getUserPFP(userData) === "" ? defaultPFP: getUserPFP(userData)
}

function createPost(post, postIndex, postsElements) {
  //const postsInfo = setPostInfo(postData);
  
  // use json data to create component and push to posts array
  postsElements.push(
    <div key={postIndex}>
      <Link to={`/posts/${post._id}` /*in phase 2, this should be postData.id, instead of postData*/}>
        <Post
          isFlagged={post.isFlagged}
          title={post.title /* in phase 2 will be title from postData.title, and so on for other props*/ }
          location={post.postLocation /* in phase 2 will be title from postData.title*/ }
          description={post.description /* in phase 2 will be title from postData.title*/ }
          posterProfilePhoto={"poster.posterProfilePhoto" /* in phase 2 will be title from postData.title*/ }
          posterName={"poster.posterName" /* in phase 2 will be title from postData.title*/ }
          posterId={post.posterId}
        />
      </Link>
    </div>
  );
}

const Posts = ({ shownPosts }) => {
  let postsElements = []; // post components after loading
  const [isLoading, setIsLoading] = useState(false);
  return (
    isLoading ? <div></div> : createPosts(shownPosts, postsElements/*, usersData*/)
  );
};
export default Posts;