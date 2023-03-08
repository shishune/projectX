import './styles.css';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import { useNavigate, useLocation } from "react-router-dom";

function Footer() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <footer>
      <BuildCircleIcon  id="footerCompanyLogo" onClick={(e)=>
        {
          (pathname === "/") ?
          window.scrollTo({top: 0, behavior:"smooth"}) :
          navigate("/");
        }}/>   
      <a className="footerLinks" onClick={(e)=>
        {
          (pathname === "/") ?
          window.scrollTo({top: 0, behavior:"smooth"}) :
          navigate("/");
        }}>Home</a>
      <a className="footerLinks" onClick={(e)=>
        {
          (pathname === "/login") ?
          window.scrollTo({top: 0, behavior:"smooth"}) :
          navigate("/login");
        }}>Login</a>
      <a className="footerLinks" onClick={(e)=>
        {
          (pathname === "/join") ?
          window.scrollTo({top: 0, behavior:"smooth"}) :
          navigate("/join");
        }}>Join</a>  
    </footer>
  );
}

export default Footer;