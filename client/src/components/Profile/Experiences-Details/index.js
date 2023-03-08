/*
citation: https://mui.com/components/tabs/#basic-tabs 
*/

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PostsTab from './Posts-Tab/posts-tab';
import { styled } from '@mui/material/styles';
import './styles.css';
import './../../Home/add-post-style.css';

import { createTheme } from '@mui/material/styles';

import ENV from '../../../config.js';
const API_HOST = ENV.api_host

const theme = createTheme({
  palette: {
    primary: {
      main: "#49C4B1",
    },
    secondary: {
      main: '#C6C6C6',
    },
  },
});

const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  '& .MuiTabs-indicatorSpan': {
    maxWidth: 100,
    width: '100%',
    backgroundColor: '#49C4B1',
  },
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    '&.Mui-focusVisible': {
      backgroundColor: 'rgba(100, 95, 228, 0.32)',
    },
  }),
);


function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
}
  
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};
  
function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}


  
  
function ExperiencesDetails(props) {
    const [currTab, setCurrTab] = useState(0);
    const [userPosts, setUserPosts] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const changeTab = (event, newTab) => {
        setCurrTab(newTab);
    };

    // fetch posts here
useEffect(() => {
  const url = `${API_HOST}/api/posts/user/` + props.userid;
  fetch(url)
  .then(res => {
    if (res.status === 200) {
      // return a promise that resolves with the JSON body
      return res.json();
    } else {
      throw "could not get user";
    }
  })
  .then(fetchedData => {
    setUserPosts(fetchedData);
    setIsLoading(false);
  })
  .catch(error => {
    console.log(error);
  });
}, [])

    return (
      <div class="tabSection">
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <StyledTabs 
              value={currTab} 
              onChange={changeTab} 
              aria-label="profile tabs"
              textColor="black"
              className="tabs"
              fontWeight= "bold"
              >
                <StyledTab label="Posts" {...a11yProps(0)} className="tab" />
            </StyledTabs>
        </Box>
        <TabPanel value={currTab} index={0}>
            {isLoading ? <div></div> : <PostsTab userid={props.userid} userPosts={userPosts}/>}
        </TabPanel>
      </div>
    );
  }
  
  export default ExperiencesDetails;