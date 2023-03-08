import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import LanguageIcon from '@mui/icons-material/Language';

function findContactLinkImg(linkName) {
  if (linkName === "Github") {
    return <GitHubIcon />
  } else if (linkName === "LinkedIn") {
    return <LinkedInIcon />
  } else if (linkName === "Email") {
    return <EmailIcon />
  } else if (linkName === "OtherWebsite") {
    return <LanguageIcon />
  }
}

export { findContactLinkImg };