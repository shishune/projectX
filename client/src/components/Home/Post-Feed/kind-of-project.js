import { useState } from "react";
import ReactDOM from "react-dom";

function KindOfProjectButton() {
  const [projectKind, setProjectKind] = useState("any kind");

  const handleChange = (event) => {
    setProjectKind(event.target.value)
  }

  return (
    <form id = "projectDropDownMenu">
      <select id = "menuStyles" value={projectKind} onChange={handleChange}>
        <option value="Any Kind">any kind</option>
        <option value="Professional">professional</option>
        <option value="Casual">casual</option>
      </select>
    </form>
  )
}

export default KindOfProjectButton;
