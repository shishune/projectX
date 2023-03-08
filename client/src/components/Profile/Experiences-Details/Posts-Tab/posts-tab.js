import { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import  UserContext  from './../../../../actions/userContext';
import CloseIcon from '@mui/icons-material/Close';
import Divider from '@mui/material/Divider';
import { addPost, updateUserPosts } from "../../../../actions/addEditPost";
import Posts from './posts'
import './posts-tab.css';

function PostsTab(props) {
  const POST_FIELDS = 5;

  let navigate = useNavigate();

  const {user, isSignedIn} = useContext(UserContext);
  const [openAddPostDialog, setOpenAddPostDialog] = useState(false);
  let addPostMaterialInspirationSectionVideos = [];
  let addPostMaterialInspirationSectionOtherLinks = [];
  let addPostRequiredPeople = [];
  let addPostRequiredPeopleRequirements = [];

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
                <h1>Your Project</h1>
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
                </div>
                <Divider />
                <div id="addPostSectionMaterialOtherLinksContainer">
                  <h5>Other Links (5 Max)</h5>
                  {buildAddPostSectionOtherLinks("Material")}
                </div>
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
                <Divider />
                <div id="addPostSectionInspirationOtherLinksContainer">
                  <h5>Other Links (5 Max)</h5>
                  {buildAddPostSectionOtherLinks("Inspiration")}
                </div>
              </div>
              <h1>Looking For...</h1>
              <div>
                {buildAddPostRequiredPeople()}
              </div>
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
          );
        }
    } else if (materialOrInspiration == "Inspiration") {
        for (let i = 0; i < POST_FIELDS; i++) {
          addPostMaterialInspirationSectionVideos.push(
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
          );
        }  
    } else if (materialOrInspiration == "Inspiration") {
        for (let i = 0; i < POST_FIELDS; i++) {
          addPostMaterialInspirationSectionOtherLinks.push(
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
  };

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
  
  return (
    <div class="postsTab">
      {/* {isSignedIn && user._id === props.userid && <button id="profileAddPostButton" onClick={() => { setOpenAddPostDialog(true)}}>Add Post</button>}
      {openAddPostDialog && buildAddPostDialog()} */}
      <Posts shownPosts={props.userPosts}/>
    </div>
  );
}
  
export default PostsTab;