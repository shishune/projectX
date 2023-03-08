import * as React from "react";
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/MenuList';
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CloseIcon from '@mui/icons-material/Close';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import UserContext from '../../../actions/userContext';
import PostContext from '../../../actions/postsContext';
import flagImg from '../../../assets/post-details/flag.png';
import { editPost, flagPost, deletePost, updateUserPosts } from "../../../actions/addEditPost";

import '../styles.css';
import '../../Home/add-post-style.css';

function ProjectDetailsSection(props) {
  let navigate = useNavigate();
  const { user, isSignedIn, isAdmin } = React.useContext(UserContext);
  const { posts, setPosts } = React.useContext(PostContext);

  // states for editing (project details section)
  const [postTitle, setPostTitle] = React.useState(props.title);
  const [postType, setPostType] = React.useState(props.postType); 
  const [postLocationText, setPostLocationText] = React.useState(props.postLocation.slice(props.postLocation.indexOf('(') + 1, props.postLocation.lastIndexOf(')'))); // The actual location
  const [postLocationType, setPostLocationType] = React.useState(props.postLocation.slice(0, props.postLocation.indexOf('('))); // the form of work, either semi-remote, remote, or in person
  const [postTargetUsers, setPostTargetUsers] = React.useState(props.targetUsers);
  const [postDesc, setPostDesc] = React.useState(props.description);
  const [postMaterialVideos, setPostMaterialVideos] = React.useState(props.materialVideos);
  const [postMaterialOtherLinks, setPostMaterialOtherLinks] = React.useState(props.materialOtherLinks);
  const [postPCE, setPostPCE] = React.useState(props.possibleCostEstimates); // possible cost estimates
  const [postInspirationVideos, setPostInspirationVideos] = React.useState(props.inspirationVideos);
  const [postInspirationOtherLinks, setPostInspirationOtherLinks] = React.useState(props.inspirationOtherLinks);
  const [postTags, setPostTags] = React.useState(fetchTagText()); // TODO: in handle edit, comma seperate & turn each to js object

  // states for editing (looking for section)
  const [postRequiredPeople, setPostRequiredPeople] = React.useState(props.requiredPeople);

  // some arrays that functions will load html tags into for display
  let menuItems = [];
  let materialSectionVideos = [];
  let editMaterialInspirationSectionVideos = [];
  let editMaterialInspirationSectionOtherLinks = [];
  let editRequiredPeople = [];
  let editRequiredPeopleRequirements = [];
  let inspirationSectionVideos = [];
  let materialSectionOtherLinks = [];
  let inspirationSectionOtherLinks = [];

  const [moreMenu, setMoreMenu] = React.useState(false); // open/close state for the menu when more (3 dots) button is pressed
  const [openEditDialog, setOpenEditDialog] = React.useState(false); // open/close state for the edit post dialog

  /* handles closing edit dialog */
  const handleClose = () => {
    setOpenEditDialog(false);
  };

  // responsive customization for Carousel component (required by library)
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  /* takes tags object from the post, and puts it in a comma seperated string for the edit dialog */
  function buildTags () {
    const tags = props.tags.map((tagElement) => (
      <li id={tagElement.tagName === "Physical Product" ? "tagItemStandOut" : ""} className="tagItem" >
        {tagElement.tagName}
      </li>
    ));

    return <ul id="tagList">{tags}</ul>
  }
  
  /* builds the video sections in project details for Materials and Inspirations sections */
  function buildSectionVideos (videoObjectArray, materialOrInspiration) {
    if (videoObjectArray != undefined && videoObjectArray.length > 0) {
      for (let i = 0; i < videoObjectArray.length; i++) {
        // only build video if it is valid and not empty
        if (videoObjectArray[i].link !== "") {
          createVideo(materialOrInspiration, i);
        }
      }
      if (materialOrInspiration === "Material") {
        return <div className="subsectionVideos"><Carousel responsive={responsive}>{materialSectionVideos}</Carousel></div>;
      } else if (materialOrInspiration === "Inspiration") {
        return <div className="subsectionVideos"><Carousel responsive={responsive}>{inspirationSectionVideos}</Carousel></div>;
      }
    }
  }

  /* creates one video, title, description set to be inserted into video carousel */
  function createVideo (materialOrInspiration, i) {
    if (materialOrInspiration === "Material") {
      materialSectionVideos.push(
        <Stack className="videoContainer" key={i}>
          <iframe 
          src={props.materialVideos[i].link} 
          title={props.materialVideos[i].title} 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
          className="videoSectionVideo"></iframe>
          <div className="videoSectionTitle">{props.materialVideos[i].title}</div>
          <div className="videoSectionDesc">{props.materialVideos[i].description}</div>
        </Stack>
      );
    } else if (materialOrInspiration === "Inspiration") {
      inspirationSectionVideos.push(
        <Stack className="videoContainer" key={i}>
          <iframe 
          src={props.inspirationVideos[i].link} 
          title={props.inspirationVideos[i].title} 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
          className="videoSectionVideo"></iframe>
          <div className="videoSectionTitle">{props.inspirationVideos[i].title}</div>
          <div className="videoSectionDesc">{props.inspirationVideos[i].description}</div>
        </Stack>
      );
    }
  }

  /* builds the other links sections in project details for Materials and Inspirations sections */
  function buildSectionOtherLinks (linkObjectArray, materialOrInspiration) {
      for (let i = 0; i < linkObjectArray.length; i++) {
        // only create link if it is valid and not empty
        if (linkObjectArray[i].link !== "") {
          createLinks(materialOrInspiration, i);
        }
      }
      if (materialOrInspiration === "Material") {
        return <div className="subsectionOtherLinks"><ul className="otherLinksList">{materialSectionOtherLinks}</ul></div>
      } else if (materialOrInspiration === "Inspiration") {
        return <div className="subsectionOtherLinks"><ul className="otherLinksList">{inspirationSectionOtherLinks}</ul></div>
      }
  }

  /* creates one link to be inserted into other links section */
  function createLinks (materialOrInspiration, i) {
    if (materialOrInspiration === "Material") {
      materialSectionOtherLinks.push(
        <li className="otherLinkListItem">- <a className={props.postType === "Professional" ? "otherLinksLinkPro otherLinksLink" : "otherLinksLinkCasual otherLinksLink"} href={props.materialOtherLinks[i].link} target="_blank">{props.materialOtherLinks[i].linkText}</a></li>
      );
    } else if (materialOrInspiration === "Inspiration") {
      inspirationSectionOtherLinks.push(
        <li className="otherLinkListItem">- <a className={props.postType === "Professional" ? "otherLinksLinkPro otherLinksLink" : "otherLinksLinkCasual otherLinksLink"} href={props.inspirationOtherLinks[i].link} target="_blank">{props.inspirationOtherLinks[i].linkText}</a></li>
      );
    }
  }

  /* Creates the more options menu (when the 3 dots is clicked) */
  function buildMenuItems() {    
    // check if poster id is same as user id
    if (isSignedIn && user._id === props.posterId) {
      // if same, edit and delete buttons in menu
      menuItems.push(
        <Paper id="menu">
          <Menu >
            <MenuItem onClick={() => {setMoreMenu(!moreMenu); setOpenEditDialog(true);}}>Edit</MenuItem>
            <MenuItem onClick={() => {setMoreMenu(!moreMenu); handleDelete();}}>Delete</MenuItem>
          </Menu>
        </Paper>
        
      );
    } else {
      // if different, report button in menu
      menuItems.push(
        <Paper id="menu">
          <Menu >
            <MenuItem onClick={() => {setMoreMenu(!moreMenu); handleReport();}}>Report</MenuItem>
          </Menu>
        </Paper>
      );
    }
    return menuItems;
  }

  /* Reports a post to admin(s) */
  function handleReport() {
    if (!isSignedIn) {
      navigate('/login');
    }
    // send report to all admin user emails (usernames)
    // requires API call to send email (add in phase 2)
    else {
      window.location.href = "mailto:admin@admin.com";
    }
    // close more menu 
  }

  /* Deletes a post */
  const handleDelete = async () => {
    await deletePost(props.postId);

    let posterPosts = user.posts;
    let delIndex;
    for (let i = 0; i < posterPosts.length; i++) {
      if (posterPosts[i] === props.postId) {
        delIndex = i
        break;
      }
    }
    posterPosts.splice(delIndex, 1);
    await updateUserPosts(props.posterId, posterPosts);
    // go back to home page
    navigate('/');
  }

  /* Edits the post with changes made from the edit dialog */
  const handleEdit = async (postTitle, postType, postLocationText, postLocationType, postTargetUsers, postDesc, postMaterialVideos, postMaterialOtherLinks, postPCE, postInspirationVideos, postInspirationOtherLinks, postTags, postRequiredPeople) => {
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
    

    // create new post object
    //let editedPost = new Post(props.postId, postTitle, postType, "In progress", postLocation, tags, props.numViews, postTargetUsers, postDesc, materials, postPCE, inspirations, [], props.posterId);
    await editPost(props.postId, [{"op": "replace", "path": "/title", "value": postTitle},
    {"op": "replace", "path": "/postType", "value": postType},
    {"op": "replace", "path": "/postLocation", "value": postLocation},
    {"op": "replace", "path": "/tags", "value": tags},
    {"op": "replace", "path": "/targetUsers", "value": postTargetUsers},
    {"op": "replace", "path": "/materials", "value": materials},
    {"op": "replace", "path": "/possibleCostEstimates", "value": postPCE},
    {"op": "replace", "path": "/inspirations", "value": inspirations},
    {"op": "replace", "path": "/requiredPeople", "value": postRequiredPeople}])

    // navigate to home to have change reflect
    navigate('/');
    //return false;
  }

  /* sets the post's isFlagged attribute to true, and takes admin back to home */
  const handleFlag = async () => {
    await flagPost(props.postId, !props.isFlagged);
    // create a copy of posts to delete from for safety
    let postsCopy = posts;
    for (let i = 0; i < postsCopy.length; i++) {
      if (postsCopy[i].postId === props.postId) {
        postsCopy[i].isFlagged = !postsCopy[i].isFlagged;
      }
    }

    // delete the post from posts
    setPosts(postsCopy);
    // note that in phase 2, there may or may not need to be something here to store the new post to database, 
    // depending on implementation
    
    // go back to home page
    navigate('/');
  }

  /* Creates the edit post dialog */
  function buildEditDialog() {
    return <div>
      <div className="dialogueBackgroundBlur">
        <div className="editDialogue">
          <div className='dialogueHeader'>
            
            <span className="close" onClick={() => handleClose()}>
              <CloseIcon/>
            </span>
          </div>
          <p><span id="editDialogueTitle" >Edit Post</span></p>
          <form id="editForm"
            onSubmit={(e) => {
              e.preventDefault(); 
              setOpenEditDialog(!openEditDialog); 
              handleEdit(postTitle, postType, postLocationText, 
                postLocationType, postTargetUsers, postDesc, 
                postMaterialVideos, postMaterialOtherLinks, 
                postPCE, postInspirationVideos, 
                postInspirationOtherLinks, postTags, postRequiredPeople);
              
            }}
          >
            <div id="editFormContentContainer">
                <h1 className="centered-text">Your Project</h1>
                <div className="editTitleContainer editSectionContainer">
                  <label className="editLabel">Title</label>
                  <input defaultValue={props.title} placeholder="Title" type="text" required onChange={(e) => {setPostTitle(e.target.value)}}></input>
                </div>
                <div className="editTitleContainer editSectionContainer">
                  <label className="editLabel">Post Type</label>
                  <div className="editPostTypeContainer">
                    <select className='selectPostType dropDownSelect' 
                      onChange={(e) => {setPostType(e.target.value)}}
                    >
                      <option value="Professional" selected={postLocationType == "Professional"} className="locationTypeOption" >Professional</option>
                      <option value="Casual" selected={postLocationType == "Casual" } className="locationTypeOption" >Casual</option>
                    </select>
                  </div>
                </div>
                <div className="editLocationContainer editSectionContainer">
                    <label class="editLabel">Location</label>
                    <input defaultValue={props.postLocation.slice(props.postLocation.indexOf('(') + 1, props.postLocation.lastIndexOf(')'))} placeholder="Location" type="text" required onChange={(e) => {setPostLocationText(e.target.value)}}></input>
                    <select className='selectLocationType dropDownSelect' 
                      onChange={(e) => {setPostLocationType(e.target.value)}}
                    >
                      <option value="Semi-Remote" selected={postLocationType == "Semi-Remote"} className="locationTypeOption" >Semi-Remote</option>
                      <option value="Remote" selected={postLocationType == "Remote" } className="locationTypeOption" >Remote</option>
                      <option value="In Person" selected={postLocationType == "In Person"} className="locationTypeOption" >In Person</option>
                    </select>
                </div>                
                <div class="editTagsContainer editSectionContainer">
                  <label class="editLabel">Tags</label>
                  <input defaultValue={fetchTagText()} placeholder="Tags" type="text" required onChange={(e) => {setPostTags(e.target.value)}}></input>
                </div>
                <div class="editTargetUsersContainer editSectionContainer">
                  <label class="editLabel">Target Users</label>
                  <input defaultValue={props.targetUsers} placeholder="Target Users" type="text" required onChange={(e) => {setPostTargetUsers(e.target.value)}}></input>
                </div>
                <div class="editDescContainer editSectionContainer">
                  <label class="editLabel">Description</label>
                  <textarea defaultValue={props.description} placeholder="Description" type="text" required onChange={(e) => {setPostDesc(e.target.value)}}></textarea>
                </div>

                <Divider />
              <div>
                <h3 className="dialogueSubtitle">Materials</h3>
                <div id="editSectionMaterialVideoContainer">
                  <h5>Videos (5 Max)</h5>
                  <div id="editSectionMaterialVideoInputsContainer">{buildEditSectionVideos("Material")}</div>
                </div>
                <Divider />
                <div id="editSectionMaterialOtherLinksContainer">
                  <h5>Other Links (5 Max)</h5>
                  {buildEditSectionOtherLinks("Material")}
                </div>
              </div>
              <Divider />
                <div class="editPossibleCostEstimatesContainer editSectionContainer">
                  <label class="editLabel">Possible Cost Estimates</label>
                  <input defaultValue={props.possibleCostEstimates} placeholder="Possible Cost Estimates" type="text" onChange={(e) => {setPostPCE(e.target.value)}}></input>
                </div>
              <Divider />
              <div>
                <h3>Inspirations</h3>
                <div id="editSectionInspirationVideoContainer">
                  <h5>Videos (5 Max)</h5>
                  {buildEditSectionVideos("Inspiration")}
                </div>
                <Divider />
                <div id="editSectionInspirationOtherLinksContainer">
                  <h5>Other Links (5 Max)</h5>
                  {buildEditSectionOtherLinks("Inspiration")}
                </div>
              </div>
              <h1 className="centered-text">Looking For...</h1>
              <div>
                {buildEditRequiredPeople()}
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

  /* Takes objects from the post's tag object and translates into comma seperated strings for the edit dialog */
  function fetchTagText() {
    let tagsString = "";

    for (let i = 0; i < props.tags.length; i++) {
      if (i < props.tags.length - 1) {
        tagsString += props.tags[i].tagName + ", ";
      } else {
        tagsString += props.tags[i].tagName;
      }
    }
    return tagsString;
  }

  /* builds the inputs for editing videos sections (for material and inspiration sections) */
  function buildEditSectionVideos(materialOrInspiration) {
    editMaterialInspirationSectionVideos = [];
    if (materialOrInspiration == "Material") {
        for (let i = 0; i < props.materialVideos.length; i++) {
          editMaterialInspirationSectionVideos.push(
            <div className="editVideoContainer editSectionBorder">
              <div className="editVideoLinkContainer editSectionContainer">
                <label className="editLabel">Video Link </label>
                <input defaultValue={props.materialVideos[i].link} placeholder="Video Link" type="url" onChange={(e) => {
                  let videosCopy = postMaterialVideos;
                  videosCopy[i].link = e.target.value;
                  setPostMaterialVideos(videosCopy)}
                }></input>
              </div>
              <div className="editVideoTitleContainer editSectionContainer">
                <label className="editLabel">Video Title </label>
                <input defaultValue={props.materialVideos[i].title} placeholder="Video Title" type="text" onChange={(e) => {
                  let videosCopy = postMaterialVideos;
                  videosCopy[i].title = e.target.value;
                  setPostMaterialVideos(videosCopy)}
                }></input>
              </div>
              <div className="editVideoDescContainer editSectionContainer">
                <label className="editLabel">Video Description </label>
                <textarea defaultValue={props.materialVideos[i].description} placeholder="Video Description" type="text" onChange={(e) => {
                  let videosCopy = postMaterialVideos;
                  videosCopy[i].description = e.target.value;
                  setPostMaterialVideos(videosCopy)}
                }></textarea>
              </div>
            </div>
          );
        }
    } else if (materialOrInspiration == "Inspiration") {
        for (let i = 0; i < props.inspirationVideos.length; i++) {
          editMaterialInspirationSectionVideos.push(
            <div className="editVideoContainer editSectionBorder">
              <div className="editVideoLinkContainer editSectionContainer">
                <label className="editLabel">Video Link </label>
                <input defaultValue={props.inspirationVideos[i].link} placeholder="Video Link" type="url" onChange={(e) => {
                  let videosCopy = postInspirationVideos;
                  videosCopy[i].link = e.target.value;
                  setPostInspirationVideos(videosCopy)}
                }></input>
              </div>
              <div className="editVideoTitleContainer editSectionContainer">
                <label className="editLabel">Video Title </label>
                <input defaultValue={props.inspirationVideos[i].title} placeholder="Video Title" type="text" onChange={(e) => {
                  let videosCopy = postInspirationVideos;
                  videosCopy[i].title = e.target.value;
                  setPostInspirationVideos(videosCopy)}
                }></input>
              </div>
              <div className="editVideoDescContainer editSectionContainer">
                <label className="editLabel">Video Description </label>
                <textarea defaultValue={props.inspirationVideos[i].description} placeholder="Video Description" type="text" onChange={(e) => {
                  let videosCopy = postInspirationVideos;
                  videosCopy[i].description = e.target.value;
                  setPostInspirationVideos(videosCopy)}
                }></textarea>
              </div>
            </div>
          );
        }
    }
    return editMaterialInspirationSectionVideos;
  }

  /* builds the inputs for editing other links sections (for material and inspiration sections) */
  function buildEditSectionOtherLinks(materialOrInspiration) {
    editMaterialInspirationSectionOtherLinks = [];
    if (materialOrInspiration == "Material") {
        for (let i = 0; i < props.materialOtherLinks.length; i++) {
          editMaterialInspirationSectionOtherLinks.push(
            <div className="editOtherLinksContainer editSectionBorder">
              <div className="editOtherLinksLinkContainer editSectionContainer">
                <label className="editLabel">Your Link </label>
                <input defaultValue={props.materialOtherLinks[i].link} placeholder="Your Link" type="url" onChange={(e) => {
                  let videosCopy = postMaterialOtherLinks;
                  videosCopy[i].link = e.target.value;
                  setPostMaterialOtherLinks(videosCopy)}
                }></input>
              </div>
              <div className="editOtherLinksDescContainer editSectionContainer">
                <label className="editLabel">Link Description</label>
                <textarea defaultValue={props.materialOtherLinks[i].linkText} placeholder="Link Description" type="text" onChange={(e) => {
                  let videosCopy = postMaterialOtherLinks;
                  videosCopy[i].linkText = e.target.value;
                  setPostMaterialOtherLinks(videosCopy)}
                }></textarea>
              </div>
            </div>
          );
        }  
    } else if (materialOrInspiration == "Inspiration") {
        for (let i = 0; i < props.inspirationOtherLinks.length; i++) {
          editMaterialInspirationSectionOtherLinks.push(
            <div className="editOtherLinksContainer editSectionBorder">
              <div className="editOtherLinksLinkContainer editSectionContainer">
                <label className="editLabel">Your Link </label>
                <input defaultValue={props.inspirationOtherLinks[i].link} placeholder="Your Link" type="url" onChange={(e) => {
                  let videosCopy = postInspirationOtherLinks;
                  videosCopy[i].link = e.target.value;
                  setPostInspirationOtherLinks(videosCopy)}
                }></input>
              </div>
              <div className="editOtherLinksDescContainer editSectionContainer">
                <label className="editLabel">Link Description</label>
                <textarea defaultValue={props.inspirationOtherLinks[i].linkText} placeholder="Link Description" type="text" onChange={(e) => {
                  let videosCopy = postInspirationOtherLinks;
                  videosCopy[i].linkText = e.target.value;
                  setPostInspirationOtherLinks(videosCopy)}
                }></textarea>
              </div>
            </div>
          );
        }
    }
    return editMaterialInspirationSectionOtherLinks;
  }

  /* builds the inputs for required people section */
  function buildEditRequiredPeople() {
    editRequiredPeople = [];
      for (let i = 0; i < props.requiredPeople.length; i++) {
        editRequiredPeople.push(
          <div className="editRequiredPeopleContainer editSectionBorder">
            <div className="editRequiredPeopleTitleContainer editSectionContainer">
              <label className="editLabel">Job Title </label>
              <input defaultValue={props.requiredPeople[i].jobTitle} placeholder="Job Title" type="text" onChange={(e) => {
                let requiredPeopleCopy = postRequiredPeople;
                requiredPeopleCopy[i].jobTitle = e.target.value;
                setPostMaterialVideos(requiredPeopleCopy)}
              }></input>
            </div>
            <div className="editRequiredPeopleDescContainer editSectionContainer">
              <label className="editLabel">Job Description </label>
              <textarea defaultValue={props.requiredPeople[i].jobDescription} placeholder="Job Description" type="text" onChange={(e) => {
                let requiredPeopleCopy = postRequiredPeople;
                requiredPeopleCopy[i].jobDescription = e.target.value;
                setPostMaterialVideos(requiredPeopleCopy)}
              }></textarea>
            </div>
            <div className="editRequiredPeoplePurposeContainer editSectionContainer">
              <label className="editLabel">Purpose </label>
              <input defaultValue={props.requiredPeople[i].purpose} placeholder="Purpose" type="text" onChange={(e) => {
                let requiredPeopleCopy = postRequiredPeople;
                requiredPeopleCopy[i].purpose = e.target.value;
                setPostMaterialVideos(requiredPeopleCopy)}
              }></input>
            </div>
            <div className="editRequiredPeopleRequirementsContainer editSectionContainer">
              <div>Requirements</div>
              {buildEditRequiredRequirements(props.requiredPeople[i].requirements, i)}
            </div>
            <div className="editRequiredPeopleAdditionaleContainer">
              <label className="editLabel">Additional Information </label>
              <input defaultValue={props.requiredPeople[i].additionalInfo} placeholder="Additional Information" type="text" onChange={(e) => {
                let requiredPeopleCopy = postRequiredPeople;
                requiredPeopleCopy[i].additionalInfo = e.target.value;
                setPostMaterialVideos(requiredPeopleCopy)}
              }></input>
            </div>
          </div>
        );
      }
    return editRequiredPeople;
  }

  /* builds the requirements for a required people section */
  function buildEditRequiredRequirements(requirementsList, index) {
    editRequiredPeopleRequirements = [];
    for (let i = 0; i < requirementsList.length; i++) {
      editRequiredPeopleRequirements.push(
        <div className="editRequiredPeopleRequirementsRequirementContainer">
          <label className="editLabel">Requirement </label>
          <input defaultValue={requirementsList[i].requirement} placeholder="Requirement" type="text" onChange={(e) => {
            let requiredPeopleCopy = postRequiredPeople;
            requiredPeopleCopy[index].requirements[i] = { requirement: e.target.value };
            setPostMaterialVideos(requiredPeopleCopy)}
          }></input>
        </div>
      );
    }

    return editRequiredPeopleRequirements;
  }

  /* builds the this post is flagged tag for a post that has been flagged */
  function buildIsFlagged() {
    if (props.isFlagged) {
      return <div id="postIsFlaggedContainer">
        <img src={flagImg} id="postIsFlaggedIcon"/>
        <span id="postIsFlaggedText">Flagged as Inappropriate By Admin</span>
      </div>
    } else {
      return <div></div>
    }
  }

  /* Add buttons for admins */
  function buildAdminBtns() {
   if (isAdmin) {
    return <div id="adminBtnContainer">
      <button id="adminRemovePostBtn" className="adminBtn" onClick={() => handleDelete()}>Remove Post</button>
      <button id="adminFlagPostBtn" className="adminBtn" onClick={() => handleFlag()}>{props.isFlagged ? "Unflag Post": "Flag Post"}</button>
    </div>
   }
  }

  return (
    <Stack>
      <Stack id="titleSection">
        <div id="moreBtn">
          <IconButton onClick={() => setMoreMenu(!moreMenu)}>
            <MoreVertIcon />
          </IconButton>
          {moreMenu && buildMenuItems()}
          {openEditDialog && buildEditDialog()}
        </div>
        <div id="title">{props.title}<span id={props.postType === "Professional" ? "postTypeProfessional" : "postTypeCasual"} className="postType">{props.postType}</span></div>
        
        <div id="postLocation">
          <LocationOnIcon id="locationIcon"/>
          <div id="locationText">{props.postLocation}</div>
        </div>
        <div id="tags">
          {buildTags()}
        </div>
        <div id="titleSectionBottomBar">
          {buildIsFlagged()}
          {buildAdminBtns()}
          <div id="postViews">
            <VisibilityIcon id="viewsIcon" />
            <div id="viewsText" >{props.numViews}</div>
          </div>
        </div>        
      </Stack>

      <Stack id="infoSection">
        <div id="targetUsers"><span className="subsectionHeading">Target users: </span>{props.targetUsers}</div>
        <div id="description">
          <span className="subsectionHeading">Description: </span> 
          {/*<Collapse in={false}>*/}
          {props.description}
          {/*</Collapse>*/}
          
        </div>
        <div id="materials">
          <div id="materialsHeading" className="subsectionHeading">Materials: </div>
          {buildSectionVideos(props.materialVideos, "Material")}
          <Divider variant="middle"/>
          {buildSectionOtherLinks(props.materialOtherLinks, "Material")}
        </div>
        <div id="possibleConstEstimates" className="subsectionHeading"><span>Possible Cost Estimates: </span>{props.possibleCostEstimates}</div>
        <div id="inspirations">
          <div id="inspirationsHeading" className="subsectionHeading">Inspirations: </div>
          {buildSectionVideos(props.inspirationVideos, "Inspiration")}
          <Divider variant="middle"/>
          {buildSectionOtherLinks(props.inspirationOtherLinks, "Inspiration")}
        </div>
      </Stack>
    </Stack>
  );
}

export default ProjectDetailsSection;