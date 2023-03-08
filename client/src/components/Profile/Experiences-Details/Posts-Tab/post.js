// each post in the post feed section
import Card from '@mui/material/Card';
import flagImg from "./../../../../assets/post-details/flag.png";

import './post.css';

// the post component
function Post(props) {
  function buildIsFlagged() {
    if (props.isFlagged) {
      return <div id="profilePostIsFlaggedContainer">
        <img src={flagImg} id="profilePostIsFlaggedIcon"/>
        <span id="profilePostIsFlaggedText">NSFW</span>
      </div>
    } else {
      return <div></div>
    }
  }

  return (
    <div className = "profilePostContainer">
        <Card className="profilePostCard" variant="outlined">
          <div className = "profileSubHeadingsContainer">
            <div className = "profilePostTitle">
              <div className = "profileCardTitle">{props.title}</div> 
              {buildIsFlagged()}
            </div>
            <div className = "profileCardLocation">{props.location}</div>
            <div className = "profileCardDescription">{props.description.slice(0, 150) + "..."}</div>
          </div>
        </Card>
    </div>
  );
}

export default Post;