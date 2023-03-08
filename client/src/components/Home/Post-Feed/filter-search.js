// the part of post feed section where filtering and searching happens
// probably should have a separate CSS file associated with this one 
import '../styles.css';
import { useState } from "react";
import { filter } from "../../../actions/filter";

const FilterSearchSection = ({ searchParams, setSearchParams, setFetchedPosts}) => {
  const [projectKind, setProjectKind] = useState("any");
  const [projectLoc, setProjectLoc] = useState("any");

  const handleFilter = async () => {
    await filter(projectKind, projectLoc).then(json => {
      if (json.filteredPosts) {
        setFetchedPosts(json.filteredPosts);
      }
    })
  }

  return (
    <div id = "filterContainer">
      <form id = "LookingToFilter"
        onSubmit={(e) => {
          e.preventDefault(); 
          const params = {
            kind: projectKind,
            loc: projectLoc
          }
          setSearchParams(params);
          handleFilter();
        }}
      >
        <div className = "filterTitle"><strong>Kind of project: </strong></div>
        <div id = "projectDropDownMenu">
          <select id = "menuStyles" value={projectKind}  onChange={(e) => {setProjectKind(e.target.value)}}>
            <option value="any">any kind</option>
            <option value="professional">professional</option>
            <option value="casual">casual</option>
          </select>
        </div>
        <div className = "filterTitle notFirst"><strong>Location: </strong></div>
        <div id = "LocationTextBox"><input id = "locationTextBox" type = "text" name = "location" placeholder = "anywhere" onChange={(e) => {e.target.value == "" ? setProjectLoc("any") : setProjectLoc(e.target.value)}}/></div>
        <div>
          <input id="applyFilterBtn" type="submit" value="Apply Filters"></input>
        </div>
        
      </form>
    </div>
  );


}

export default FilterSearchSection;