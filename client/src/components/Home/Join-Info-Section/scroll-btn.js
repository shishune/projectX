// could be moved outside home, if we decide to use in multiple places
import '../styles.css';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

function ScrollDownBtn() {
  return (
    <div>
      <a href="#companyDescription"><KeyboardArrowDownIcon id = "keyboardArrow"/></a>
    </div>
  );
}

export default ScrollDownBtn;