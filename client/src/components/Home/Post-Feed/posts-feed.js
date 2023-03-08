// the part of post-feed where posts are displayed
import { useState, useEffect } from 'react';
import Posts from './posts';
import '../styles.css';


const PostsFeedSection = ({ searchParams, postsData }) => {
  const MAX_POST_INITIAL = 3;

  // global vars for post showing
  const [maxPostIndex, setMaxPostIndex] = useState(MAX_POST_INITIAL);
  const [displayedPosts, setDisplayedPosts] = useState(generateInitialPosts());
  
  const [canShowMore, setCanShowMore] = useState(postsData.length > MAX_POST_INITIAL ? true : false); // whether more posts can still be shown

  function generateInitialPosts() {
    let postsCopy = postsData;
    return postsCopy.slice(0, MAX_POST_INITIAL)
  }

  const loadMorePosts = () => {
    // change the variable that governs the posts
    // posts displayed will be at most this amount
    setMaxPostIndex(maxPostIndex + MAX_POST_INITIAL);

      if (postsData.length <= maxPostIndex) {
        setDisplayedPosts(postsData);
        setCanShowMore(false);
      } else {
        // change displayed posts to add 3 more
        let postsCopy = postsData;
        setDisplayedPosts(postsCopy.slice(0, maxPostIndex));
      }
  }

  useEffect(() =>{
    setDisplayedPosts(generateInitialPosts());
    setCanShowMore(true);
  }, [postsData])

  return (
      <div id="postsFeedSectionContainer" className="centerElement">
          <Posts shownPosts={displayedPosts}/>
          {canShowMore && <button id="showMoreBtn" onClick={() => loadMorePosts()}>Show More</button>}
      </div>
  );
}

export default PostsFeedSection;