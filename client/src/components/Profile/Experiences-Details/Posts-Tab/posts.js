import React from "react";
import defaultPFP from './../../../../assets/profile/defaultPFP.png';

import { getUserPreferredName, getUserPFP, getUserPreferredFullName, getUserFullName } from './../../../../actions/userInfo';
import Stack from '@mui/material/Stack';

import { Link } from "react-router-dom";
import Post from './post';

import './posts.css';

function createPosts(shownPosts, postsElements) {
  
  for(let i = 0; i < shownPosts.length; i++) {
    // create post from data that goes into each post
    //assignPosterData(shownPosts[i], users)
    createPost(/* post json passed here */ shownPosts[i], i, postsElements);
  }
  return <Stack className="profilePostStack">
            {postsElements}
        </Stack>;
}

// function matches posterID from post with poster first name, last name, and profile photo
function assignPosterData(post, users){
  const posterId = post.posterId
  post.posterName = getUserPreferredName(posterId, users) === "" ? getUserFullName(posterId, users): getUserPreferredFullName(posterId, users)
  post.posterProfilePhoto = getUserPFP(posterId, users) === "" ? defaultPFP: getUserPFP(posterId, users)
}

function createPost(post /* postData is a javascript object with the data for one post */,  postIndex, postsElements) {
  //const postsInfo = setPostInfo(postData);
  
  // use json data to create component and push to posts array
  postsElements.push(
    <div key={postIndex}>
      <Link to={`/posts/${post._id}` /*in phase 2, this should be postData.id, instead of postData*/}>
        <Post
          isFlagged={post.isFlagged}
          title={post.title /* in phase 2 will be title from postData.title, and so on for other props*/ }
          location={post.location /* in phase 2 will be title from postData.title*/ }
          description={post.description /* in phase 2 will be title from postData.title*/ }
          posterProfilePhoto={post.posterProfilePhoto /* in phase 2 will be title from postData.title*/ }
          posterName={post.posterName /* in phase 2 will be title from postData.title*/ }
          posterId={post.posterId}
        />
      </Link>
    </div>
  );
}

const Posts = ({ shownPosts }) => {
  let postsElements = []; // post components after loading
  return (
      createPosts(shownPosts, postsElements)
  );
};
export default Posts;