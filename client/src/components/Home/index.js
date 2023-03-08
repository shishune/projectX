// home page where the components for join info and post feed section go
import JoinSection from './Join-Info-Section/join-info-main';
import FilterSearchSection from './Post-Feed/filter-search';
import PostsFeedSection from './Post-Feed/posts-feed';
import { useContext, useState, useEffect } from 'react';
import  UserContext  from './../../actions/userContext';
import Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';
import Collapse from '@mui/material/Collapse';
import "react-multi-carousel/lib/styles.css";
import { useNavigate } from "react-router-dom";
import { addPost, updateUserPosts } from "../../actions/addEditPost";


import './styles.css';
import './add-post-style.css';
import ENV from '../../config.js';
const API_HOST = ENV.api_host

function Home() {
  const POST_FIELDS = 5;

  let navigate = useNavigate();

  const {user, isSignedIn, isAdmin} = useContext(UserContext);
  const [openAddPostDialog, setOpenAddPostDialog] = useState(false);
  const [searchParams, setSearchParams] = useState({kind: 'any', loc: 'any'});
  let addPostMaterialInspirationSectionVideos = [];
  let addPostMaterialInspirationSectionOtherLinks = [];
  let addPostRequiredPeople = [];
  let addPostRequiredPeopleRequirements = [];

  // Collapsing Videos:
  const [videoShow1, setVideoShow1] = useState(false);
  const [videoShow2, setVideoShow2] = useState(false);
  const [videoShow3, setVideoShow3] = useState(false);
  const [videoShow4, setVideoShow4] = useState(false);

  function getChecked(){
    if (!videoShow1){
      setVideoShow1(true);
    } else if (!videoShow2) {
      setVideoShow2(true);
    } else if (!videoShow3) {
      setVideoShow3(true);
    } else if (!videoShow4){
      setVideoShow4(true);
    }
  }

  function getVideoShow(i){
    if (i === 0) {
      return true;
    } else if (i === 1){
      return videoShow1
    } else if (i === 2){
      return videoShow2
    } else if (i === 3){
      return videoShow3
    } else if ( i === 4){
      return videoShow4
    }
  }

  // Collapsing Videos for Inspiration:
  const [inspoVideoShow1, setInspoVideoShow1] = useState(false);
  const [inspoVideoShow2, setInspoVideoShow2] = useState(false);
  const [inspoVideoShow3, setInspoVideoShow3] = useState(false);  
  const [inspoVideoShow4, setInspoVideoShow4] = useState(false);

  function getCheckedInspo(){
    if (!inspoVideoShow1){
      setInspoVideoShow1(true);
    } else if (!inspoVideoShow2) {
      setInspoVideoShow2(true);
    } else if (!inspoVideoShow3) {
      setInspoVideoShow3(true);
    } else if (!inspoVideoShow4){
      setInspoVideoShow4(true);
    }
  }

  function getVideoShowInspo(i){
    if (i === 0) {
      return true;
    } else if (i === 1){
      return inspoVideoShow1
    } else if (i === 2){
      return inspoVideoShow2
    } else if (i === 3){
      return inspoVideoShow3
    } else if ( i === 4){
      return inspoVideoShow4
    }
  }

// Collapsing Links:
const [linkShow1, setLinkShow1] = useState(false);
const [linkShow2, setLinkShow2] = useState(false);
const [linkShow3, setLinkShow3] = useState(false);
const [linkShow4, setLinkShow4] = useState(false);

function getCheckedLink(){
  if (!linkShow1){
    setLinkShow1(true);
  } else if (!linkShow2) {
    setLinkShow2(true);
  } else if (!linkShow3) {
    setLinkShow3(true);
  } else if (!linkShow4){
    setLinkShow4(true);
  }
}

function getLinkShow(i){
  if (i === 0) {
    return true;
  } else if (i === 1){
    return linkShow1
  } else if (i === 2){
    return linkShow2
  } else if (i === 3){
    return linkShow3
  } else if ( i === 4){
    return linkShow4
  }
}

// Collapsing Links for Inspiration:
const [inspoLinkShow1, setInspoLinkShow1] = useState(false);
const [inspoLinkShow2, setInspoLinkShow2] = useState(false);
const [inspoLinkShow3, setInspoLinkShow3] = useState(false);  
const [inspoLinkShow4, setInspoLinkShow4] = useState(false);

function getCheckedInspoLink(){
  if (!inspoLinkShow1){
    setInspoLinkShow1(true);
  } else if (!inspoLinkShow2) {
    setInspoLinkShow2(true);
  } else if (!inspoLinkShow3) {
    setInspoLinkShow3(true);
  } else if (!inspoLinkShow4){
    setInspoLinkShow4(true);
  }
}

function getLinkShowInspo(i){
  if (i === 0) {
    return true;
  } else if (i === 1){
    return inspoLinkShow1
  } else if (i === 2){
    return inspoLinkShow2
  } else if (i === 3){
    return inspoLinkShow3
  } else if ( i === 4){
    return inspoLinkShow4
  }
}

 // Collapsing Job roles:
 const [jobShow1, setJobShow1] = useState(false);
 const [jobShow2, setJobShow2] = useState(false);
 const [jobShow3, setJobShow3] = useState(false);
 const [jobShow4, setJobShow4] = useState(false);

 function getCheckedJob(){
   if (!jobShow1){
    setJobShow1(true);
   } else if (!jobShow2) {
    setJobShow2(true);
   } else if (!jobShow3) {
    setJobShow3(true);
   } else if (!jobShow4){
    setJobShow4(true);
   }
 }

 function getJobShow(i){
   if (i === 0) {
     return true;
   } else if (i === 1){
     return jobShow1
   } else if (i === 2){
     return jobShow2
   } else if (i === 3){
     return jobShow3
   } else if ( i === 4){
     return jobShow4
   }
 }

  const [isLoading, setIsLoading] = useState(true);
  const [fetchedPosts, setFetchedPosts] = useState(null);

  // states for adding a post (project details section)
  const [postTitle, setPostTitle] = useState("");
  const [postType, setPostType] = useState("Professional"); 
  const [postLocationText, setPostLocationText] = useState(""); // The actual location
  const [postLocationType, setPostLocationType] = useState("Semi-Remote"); // the form of work, either semi-remote, remote, or in person
  const [postTargetUsers, setPostTargetUsers] = useState("");
  const [postDesc, setPostDesc] = useState("");
  const [postMaterialVideos, setPostMaterialVideos] = useState([
    {
      link : "",
      title : "",
      description : ""
    },
    {
      link : "",
      title : "",
      description : ""
    },
    {
      link : "",
      title : "",
      description : ""
    },
    {
      link : "",
      title : "",
      description : ""
    },
    {
      link : "",
      title : "",
      description : ""
    }
  ]);
  const [postMaterialOtherLinks, setPostMaterialOtherLinks] = useState([
    {
      linkText : "",
      link : ""
    },
    {
      linkText : "",
      link : ""
    },
    {
      linkText : "",
      link : ""
    },
    {
      linkText : "",
      link : ""
    },
    {
      linkText : "",
      link : ""
    },
  ]);
  const [postPCE, setPostPCE] = useState(""); // possible cost estimates
  const [postInspirationVideos, setPostInspirationVideos] = useState([
    {
      link : "",
      title : "",
      description : ""
    },
    {
      link : "",
      title : "",
      description : ""
    },
    {
      link : "",
      title : "",
      description : ""
    },
    {
      link : "",
      title : "",
      description : ""
    },
    {
      link : "",
      title : "",
      description : ""
    }
  ]);
  const [postInspirationOtherLinks, setPostInspirationOtherLinks] = useState([
    {
      linkText : "",
      link : ""
    },
    {
      linkText : "",
      link : ""
    },
    {
      linkText : "",
      link : ""
    },
    {
      linkText : "",
      link : ""
    },
    {
      linkText : "",
      link : ""
    },
  ]);
  const [postTags, setPostTags] = useState(""); // TODO: in handle edit, comma seperate & turn each to js object

  // states for adding a post (looking for section)
  const [postRequiredPeople, setPostRequiredPeople] = useState([
    {
      jobTitle : "",
      jobDescription : "",
      purpose : "",
      requirements : [
        {
          requirement : ""
        },
        {
          requirement : ""
        },
        {
          requirement : ""
        },
        {
          requirement : ""
        },
        {
          requirement : ""
        }
      ],
      additionalInfo : ""
    },
    {
      jobTitle : "",
      jobDescription : "",
      purpose : "",
      requirements : [
        {
          requirement : ""
        },
        {
          requirement : ""
        },
        {
          requirement : ""
        },
        {
          requirement : ""
        },
        {
          requirement : ""
        }
      ],
      additionalInfo : ""
    },
    {
      jobTitle : "",
      jobDescription : "",
      purpose : "",
      requirements : [
        {
          requirement : ""
        },
        {
          requirement : ""
        },
        {
          requirement : ""
        },
        {
          requirement : ""
        },
        {
          requirement : ""
        }
      ],
      additionalInfo : ""
    },
    {
      jobTitle : "",
      jobDescription : "",
      purpose : "",
      requirements : [
        {
          requirement : ""
        },
        {
          requirement : ""
        },
        {
          requirement : ""
        },
        {
          requirement : ""
        },
        {
          requirement : ""
        }
      ],
      additionalInfo : ""
    },
    {
      jobTitle : "",
      jobDescription : "",
      purpose : "",
      requirements : [
        {
          requirement : ""
        },
        {
          requirement : ""
        },
        {
          requirement : ""
        },
        {
          requirement : ""
        },
        {
          requirement : ""
        }
      ],
      additionalInfo : ""
    }
  ]);

  /* The add post dialog */
  function buildAddPostDialog() {
    return <div>
      <div className="dialogueBackgroundBlur">
        <div className="addPostDialogue">
          <div className='dialogueHeader'>
            
            <span className="close" onClick={() => handleClose()}>
              <CloseIcon/>
            </span>
          </div>
          <p><span id="addPostDialogueTitle" >Add Post</span></p>
          <form id="addPostForm"
            onSubmit={(e) => {
              e.preventDefault(); 
              setOpenAddPostDialog(!openAddPostDialog); 
              handleAddPost(postTitle, postType, postLocationText, 
                postLocationType, postTargetUsers, postDesc, 
                postMaterialVideos, postMaterialOtherLinks, 
                postPCE, postInspirationVideos, 
                postInspirationOtherLinks, postTags, postRequiredPeople);
              
            }}
          >
            <div id="addPostFormContentContainer">
                <h1 className="centered-text">Your Project</h1>
                <div className="addPostTitleContainer addPostSectionContainer">
                  <label className="addPostLabel">Title</label>
                  <input placeholder="Title" type="text" required onChange={(e) => {setPostTitle(e.target.value)}}></input>
                </div>
                <div className="addPostTitleContainer addPostSectionContainer">
                  <label className="addPostLabel">Post Type</label>
                  <div className="addPostPostTypeContainer">
                    <select className='selectPostType dropDownSelect' 
                      onChange={(e) => {setPostType(e.target.value)}}
                    >
                      <option value="Professional" selected={postLocationType == "Professional"} className="locationTypeOption" >Professional</option>
                      <option value="Casual" selected={postLocationType == "Casual" } className="locationTypeOption" >Casual</option>
                    </select>
                  </div>
                </div>
                <div className="addPostLocationContainer addPostSectionContainer">
                    <label className="addPostLabel">Location</label>
                    <input placeholder="Location" type="text" required onChange={(e) => {setPostLocationText(e.target.value)}}></input>
                    <select className='selectLocationType dropDownSelect' 
                      onChange={(e) => {setPostLocationType(e.target.value)}}
                    >
                      <option value="Semi-Remote" selected={postLocationType == "Semi-Remote"} className="locationTypeOption" >Semi-Remote</option>
                      <option value="Remote" selected={postLocationType == "Remote" } className="locationTypeOption" >Remote</option>
                      <option value="In Person" selected={postLocationType == "In Person"} className="locationTypeOption" >In Person</option>
                    </select>
                </div>                
                <div className="addPostTagsContainer addPostSectionContainer">
                  <label className="addPostLabel">Tags</label>
                  <input placeholder="Tags" type="text" required onChange={(e) => {setPostTags(e.target.value)}}></input>
                </div>
                <div className="addPostTargetUsersContainer addPostSectionContainer">
                  <label className="addPostLabel">Target Users</label>
                  <input placeholder="Target Users" type="text" required onChange={(e) => {setPostTargetUsers(e.target.value)}}></input>
                </div>
                <div className="addPostDescContainer addPostSectionContainer">
                  <label className="addPostLabel">Description</label>
                  <textarea placeholder="Description" type="text" required onChange={(e) => {setPostDesc(e.target.value)}}></textarea>
                </div>

                <Divider />
              <div>
                <h3 className="dialogueSubtitle">Materials</h3>
                <div id="addPostSectionMaterialVideoContainer">
                  <h5>Videos (5 Max)</h5>
                  <div id="addPostSectionMaterialVideoInputsContainer">{buildAddPostSectionVideos("Material")}</div>
                  <Collapse in={!videoShow4}>
                    <button className="addMaterialButton" onClick={ (e) => {e.preventDefault(); getChecked()}}>Add Video</button>
                  </Collapse>
                </div>
                <Divider />
                <div id="addPostSectionMaterialOtherLinksContainer">
                  <h5>Other Links (5 Max)</h5>
                  {buildAddPostSectionOtherLinks("Material")}
                </div>
                <Collapse in={!linkShow4}>
                    <button className="addMaterialButton" onClick={ (e) => {e.preventDefault(); getCheckedLink(); console.log("hi")}}>Add Link</button>
                  </Collapse>
              </div>
              <Divider />
                <div className="addPostPossibleCostEstimatesContainer addPostSectionContainer">
                  <label className="addPostLabel">Possible Cost Estimates</label>
                  <input placeholder="Possible Cost Estimates" type="text" onChange={(e) => {setPostPCE(e.target.value)}}></input>
                </div>
              <Divider />
              <div>
                <h3>Inspirations</h3>
                <div id="addPostSectionInspirationVideoContainer">
                  <h5>Videos (5 Max)</h5>
                  {buildAddPostSectionVideos("Inspiration")}
                </div>
                <Collapse in={!inspoVideoShow4}>
                    <button className="addMaterialButton" onClick={ (e) => {e.preventDefault(); getCheckedInspo()}}>Add Video</button>
                </Collapse>
                <Divider />
                <div id="addPostSectionInspirationOtherLinksContainer">
                  <h5>Other Links (5 Max)</h5>
                  {buildAddPostSectionOtherLinks("Inspiration")}
                </div>
                <Collapse in={!inspoLinkShow4}>
                    <button className="addMaterialButton" onClick={ (e) => {e.preventDefault(); getCheckedInspoLink()}}>Add Link</button>
                </Collapse>
              </div>
              <h1 className="centered-text">Looking For...</h1>
              <div>
                {buildAddPostRequiredPeople()}
              </div>
              <Collapse in={!jobShow4}>
                    <button className="addMaterialButton" onClick={ (e) => {e.preventDefault(); getCheckedJob()}}>Add Job</button>
                </Collapse>
            </div>

            <div className="dialogueFooter">
              <input id="submitButton" type="submit" value="Submit"></input>
            </div>
          </form>
        </div>
      </div>
    </div>
  }

  /* Add form sections for adding materials and inspiration videos*/
  function buildAddPostSectionVideos(materialOrInspiration) {
    addPostMaterialInspirationSectionVideos = [];
    if (materialOrInspiration == "Material") {
        for (let i = 0; i < POST_FIELDS; i++) {
          addPostMaterialInspirationSectionVideos.push(
            <Collapse in={getVideoShow(i)}>
              <div className="addPostVideoContainer addPostSectionBorder">
                <div className="addPostVideoLinkContainer addPostSectionContainer">
                  <label className="addPostLabel">Video Link </label>
                  <input placeholder="Video Link" type="url" onChange={(e) => {
                    let videosCopy = postMaterialVideos;
                    videosCopy[i].link = e.target.value;
                    setPostMaterialVideos(videosCopy)}
                  }></input>
                </div>
                  <div className="addPostVideoTitleContainer addPostSectionContainer">
                    <label className="addPostLabel">Video Title </label>
                    <input placeholder="Video Title" type="text" onChange={(e) => {
                      let videosCopy = postMaterialVideos;
                      videosCopy[i].title = e.target.value;
                      setPostMaterialVideos(videosCopy)}
                    }></input>
                  </div>
                  <div className="addPostVideoDescContainer addPostSectionContainer">
                    <label className="addPostLabel">Video Description </label>
                    <textarea placeholder="Video Description" type="text" onChange={(e) => {
                      let videosCopy = postMaterialVideos;
                      videosCopy[i].description = e.target.value;
                      setPostMaterialVideos(videosCopy)}
                    }></textarea>
                  </div>
              </div>
            </Collapse>
          );
        }
    } else if (materialOrInspiration == "Inspiration") {
        for (let i = 0; i < POST_FIELDS; i++) {
          addPostMaterialInspirationSectionVideos.push(
            <Collapse in={getVideoShowInspo(i)}>
              <div className="addPostVideoContainer addPostSectionBorder">
                <div className="addPostVideoLinkContainer addPostSectionContainer">
                  <label className="addPostLabel">Video Link </label>
                  <input placeholder="Video Link" type="url" onChange={(e) => {
                    let videosCopy = postInspirationVideos;
                    videosCopy[i].link = e.target.value;
                    setPostInspirationVideos(videosCopy)}
                  }></input>
                </div>
                <div className="addPostVideoTitleContainer addPostSectionContainer">
                  <label className="addPostLabel">Video Title </label>
                  <input placeholder="Video Title" type="text" onChange={(e) => {
                    let videosCopy = postInspirationVideos;
                    videosCopy[i].title = e.target.value;
                    setPostInspirationVideos(videosCopy)}
                  }></input>
                </div>
                <div className="addPostVideoDescContainer addPostSectionContainer">
                  <label className="addPostLabel">Video Description </label>
                  <textarea placeholder="Video Description" type="text" onChange={(e) => {
                    let videosCopy = postInspirationVideos;
                    videosCopy[i].description = e.target.value;
                    setPostInspirationVideos(videosCopy)}
                  }></textarea>
                </div>
              </div>
            </Collapse>
          );
        }
    }
    return addPostMaterialInspirationSectionVideos;
  }

  /* Add form sections for adding materials and inspiration other links*/
  function buildAddPostSectionOtherLinks(materialOrInspiration) {
    addPostMaterialInspirationSectionOtherLinks = [];
    if (materialOrInspiration == "Material") {
        for (let i = 0; i < POST_FIELDS; i++) {
          addPostMaterialInspirationSectionOtherLinks.push(
            <Collapse in={getLinkShow(i)}>
              <div className="addPostOtherLinksContainer addPostSectionBorder">
                <div className="addPostOtherLinksLinkContainer addPostSectionContainer">
                  <label className="addPostLabel">Your Link </label>
                  <input placeholder="Your Link" type="url" onChange={(e) => {
                    let videosCopy = postMaterialOtherLinks;
                    videosCopy[i].link = e.target.value;
                    setPostMaterialOtherLinks(videosCopy)}
                  }></input>
                </div>
                <div className="addPostOtherLinksDescContainer addPostSectionContainer">
                  <label className="addPostLabel">Link Description</label>
                  <textarea placeholder="Link Description" type="text" onChange={(e) => {
                    let videosCopy = postMaterialOtherLinks;
                    videosCopy[i].linkText = e.target.value;
                    setPostMaterialOtherLinks(videosCopy)}
                  }></textarea>
                </div>
              </div>
            </Collapse>
            
          );
        }  
    } else if (materialOrInspiration == "Inspiration") {
        for (let i = 0; i < POST_FIELDS; i++) {
          addPostMaterialInspirationSectionOtherLinks.push(
            <Collapse in={getLinkShowInspo(i)}>            
                <div className="addPostOtherLinksContainer addPostSectionBorder">
                  <div className="addPostOtherLinksLinkContainer addPostSectionContainer">
                    <label className="addPostLabel">Your Link </label>
                    <input placeholder="Your Link" type="url" onChange={(e) => {
                      let videosCopy = postInspirationOtherLinks;
                      videosCopy[i].link = e.target.value;
                      setPostInspirationOtherLinks(videosCopy)}
                    }></input>
                  </div>
                  <div className="addPostOtherLinksDescContainer addPostSectionContainer">
                    <label className="addPostLabel">Link Description</label>
                    <textarea placeholder="Link Description" type="text" onChange={(e) => {
                      let videosCopy = postInspirationOtherLinks;
                      videosCopy[i].linkText = e.target.value;
                      setPostInspirationOtherLinks(videosCopy)}
                    }></textarea>
                  </div>
                </div>
              </Collapse>
          );
        }
    }
    return addPostMaterialInspirationSectionOtherLinks;
  }

  /* Add form sections for adding required people*/
  function buildAddPostRequiredPeople() {
    addPostRequiredPeople = [];
      for (let i = 0; i < POST_FIELDS; i++) {
        addPostRequiredPeople.push(
          <Collapse in={getJobShow(i)}>
            <div className="addPostRequiredPeopleContainer addPostSectionBorder">
              <div className="addPostRequiredPeopleTitleContainer addPostSectionContainer">
                <label className="addPostLabel">Job Title </label>
                <input placeholder="Job Title" type="text" onChange={(e) => {
                  let requiredPeopleCopy = postRequiredPeople;
                  requiredPeopleCopy[i].jobTitle = e.target.value;
                  setPostMaterialVideos(requiredPeopleCopy)}
                }></input>
              </div>
              <div className="addPostRequiredPeopleDescContainer addPostSectionContainer">
                <label className="addPostLabel">Job Description </label>
                <textarea placeholder="Job Description" type="text" onChange={(e) => {
                  let requiredPeopleCopy = postRequiredPeople;
                  requiredPeopleCopy[i].jobDescription = e.target.value;
                  setPostMaterialVideos(requiredPeopleCopy)}
                }></textarea>
              </div>
              <div className="addPostRequiredPeoplePurposeContainer addPostSectionContainer">
                <label className="addPostLabel">Purpose </label>
                <input placeholder="Purpose" type="text" onChange={(e) => {
                  let requiredPeopleCopy = postRequiredPeople;
                  requiredPeopleCopy[i].purpose = e.target.value;
                  setPostMaterialVideos(requiredPeopleCopy)}
                }></input>
              </div>
              <div className="addPostRequiredPeopleRequirementsContainer addPostSectionContainer">
                <div>Requirements</div>
                {buildAddPostRequiredRequirements(i)}
              </div>
              <div className="addPostRequiredPeopleAdditionaleContainer">
                <label className="addPostLabel">Additional Information </label>
                <input placeholder="Additional Information" type="text" onChange={(e) => {
                  let requiredPeopleCopy = postRequiredPeople;
                  requiredPeopleCopy[i].additionalInfo = e.target.value;
                  setPostMaterialVideos(requiredPeopleCopy)}
                }></input>
              </div>
            </div>
          </Collapse>
        );
      }
    return addPostRequiredPeople;
  }
  
  /* Add form sections for requirements for each person*/
  function buildAddPostRequiredRequirements(index) {
    addPostRequiredPeopleRequirements = [];
    for (let i = 0; i < POST_FIELDS; i++) {
      addPostRequiredPeopleRequirements.push(
        <div className="addPostRequiredPeopleRequirementsRequirementContainer">
          <label className="addPostLabel">Requirement </label>
          <input placeholder="Requirement" type="text" onChange={(e) => {
            let requiredPeopleCopy = postRequiredPeople;
            requiredPeopleCopy[index].requirements[i] = { requirement: e.target.value };
            setPostMaterialVideos(requiredPeopleCopy)}
          }></input>
        </div>
      );
    }

    return addPostRequiredPeopleRequirements;
  }

  /* closes add post dialog */
  const handleClose = () => {
    setOpenAddPostDialog(false);
    setVideoShow1(false);
    setVideoShow2(false);
    setVideoShow3(false);
    setVideoShow4(false);
    setInspoVideoShow1(false);
    setInspoVideoShow2(false);
    setInspoVideoShow3(false);
    setInspoVideoShow4(false);
    setLinkShow1(false);
    setLinkShow2(false);
    setLinkShow3(false);
    setLinkShow4(false);
    setInspoLinkShow1(false);
    setInspoLinkShow2(false);
    setInspoLinkShow3(false);
    setInspoLinkShow4(false);
    setJobShow1(false);
    setJobShow2(false);
    setJobShow3(false);
    setJobShow4(false);
  };

  /* Adds post to posts context & navigates user to the post details page for the post */
  const handleAddPost = async (postTitle, postType, postLocationText, postLocationType, postTargetUsers, postDesc, postMaterialVideos, postMaterialOtherLinks, postPCE, postInspirationVideos, postInspirationOtherLinks, postTags, postRequiredPeople) => {
    // set location
    let postLocation = postLocationType + " (" + postLocationText + ")"

    // set tags
    let tags = [];
    let tagsArr = postTags.split(', ');
    for (let i = 0; i < tagsArr.length; i++) {
      tags.push(
        {
          tagName: tagsArr[i]
        }
      );
    }

    // set materials
    let materials = {
      videos: postMaterialVideos,
      otherLinks: postMaterialOtherLinks
    };

    // set inspirations
    let inspirations = {
      videos: postInspirationVideos,
      otherLinks: postInspirationOtherLinks
    };

    let posterId;
    if (isSignedIn) {
      posterId = user._id;
    }

    let newPost = await addPost({
      "title": postTitle,
      "isFlagged": "false",
      "postType": postType,
      "postSearchState": "In Progress",
      "postLocation": postLocation,
      "tags": tags,
      "numViews": "0",
      "targetUsers": postTargetUsers,
      "description": postDesc,
      "materials": {
        "videos": postMaterialVideos,
        "otherLinks": postMaterialOtherLinks
      },
      "possibleCostEstimates": postPCE,
      "inspirations": {
        "videos": postInspirationVideos,
        "otherLinks": postInspirationOtherLinks
      },
      "requiredPeople": postRequiredPeople,
      "posterId": posterId,
    })

    let posterPosts = user.posts;
    posterPosts.push(newPost._id);
    await updateUserPosts(posterId, posterPosts)

    // navigate to home to have change reflect
    navigate(`/posts/${newPost._id}`);
  }

  // fetch posts here
  useEffect(() => {
    const url = `${API_HOST}/api/posts`;
    fetch(url)
    .then(res => {
      if (res.status === 200) {
        // return a promise that resolves with the JSON body
        return res.json();
      } else {
        throw "could not get post";
      }
    })
    .then(fetchedData => {
      setFetchedPosts(fetchedData);
      setIsLoading(false);
    })
    .catch(error => {
      console.log(error);
    });
  }, [])

  return (
    <div className = "container">
      {isSignedIn ? 
        <div>
          <div id = "companyDescription">Here at <strong>ProjX</strong>, you can find yourself the perfect team based on filters such as location, interest, or whether you are looking for professional or casual projects. Try it out for yourself. </div>
          <FilterSearchSection searchParams={searchParams} setSearchParams={setSearchParams} setFetchedPosts={setFetchedPosts}/>
          <button id="addPostBtn" onClick={() => {isSignedIn ? setOpenAddPostDialog(true) : navigate('/login')}}>Add Post</button>
          {openAddPostDialog && buildAddPostDialog()}
          {isLoading ? <div></div>: <PostsFeedSection searchParams={searchParams} postsData={fetchedPosts}/>}
          
        </div> 
      :  
        <div>
          <div className="homePageTitle">We are here to help you discover the <span className = "seafoamText">perfect team</span>.</div>
          <JoinSection />
          <div id = "companyDescription">Here at <strong>ProjX</strong>, you can find yourself the perfect team based on filters such as location, interest, or whether you are looking for professional or casual projects. Try it out for yourself. </div>
          <FilterSearchSection searchParams={searchParams} setSearchParams={setSearchParams} setFetchedPosts={setFetchedPosts}/>
          <button id="addPostBtn" onClick={() => {isSignedIn ? setOpenAddPostDialog(true) : navigate('/login')}}>Add Post</button>
          {openAddPostDialog && buildAddPostDialog()}
          {isLoading ? <div></div>: <PostsFeedSection searchParams={searchParams} postsData={fetchedPosts}/>}
        </div>
      }
    </div>
  );
}

export default Home;