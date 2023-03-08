import JoinBtn from './join-btn';
import ScrollBtn from './scroll-btn';
import '../styles.css';

function JoinSection() {
  return (
    <div>
      <div className = "infoBoxes">
        <div className = "infoBoxLeft">
            <div className = "subTitle">be professional</div>
            <div className = "subTitleDescriptor">Discover talent for your business venture or join a business.</div>
        </div>
        <div className = "infoBoxRight">
            <div className = "subTitle">be casual</div>
            <div className = "subTitleDescriptor">Discover like-minded individuals to collaborate in a personal hobby.</div>
        </div>
      </div>
      <div className = "subTitleType2">or be both.</div>
      <JoinBtn />
      <ScrollBtn />
    </div>
  );
}

export default JoinSection;