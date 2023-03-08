import './App.css';
import { useEffect, useState } from 'react';
import NavBar from './components/Nav/index';
import Home from './components/Home/index';
import SignUp from './components/Sign-Up/index';
import LogIn from './components/Log-In/index';
import Footer from './components/Footer/index';
import Profile from './components/Profile/index';
import PostDetails from './components/Post-Details/index';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import PostsContext from './actions/postsContext';
import UserContext from './actions/userContext';
import ScrollToTop from './actions/ScrollToTop';
import { checkSession } from "./actions/userLoginSignup";

function App() {
  let [isSignedIn, setIsSignedIn] = useState(false);
  let [isAdmin, setIsAdmin] = useState(false);
  let [user, setUser] = useState(null); // currentUser
  let [posts, setPosts] = useState([]);

  // checkSession call
  const handleSession = async () => {
    let isSignedIn = false;
    let isAdmin = false;
    let user = null;
    await checkSession()
    .then(json => {
      if (json && json.currentUser) {
        isSignedIn = true;
        user = json.currentUser
        if (json.currentUser.isAdmin === "true") {
          isAdmin = true;
        }
      } 
    })
    setIsAdmin(isAdmin);
    setUser(user);
    setIsSignedIn(isSignedIn);
  }

  useEffect(() =>{
    handleSession();
  }, [])

  return (
    <div className="App">
        <UserContext.Provider value={{ isSignedIn, setIsSignedIn, isAdmin, setIsAdmin, user, setUser}}>
          <PostsContext.Provider value={{posts, setPosts}}>
            <BrowserRouter>
              <ScrollToTop />
              <NavBar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/join" element={isSignedIn ? <main><Navigate to="/"/></main> : <SignUp />} />
                <Route path="/u/:userid" element={<Profile />} />
                <Route path="/login" element={isSignedIn ? <main><Navigate to="/"/></main> : <LogIn />}/>
                <Route path="/posts/:postId" element={<PostDetails />}/>
                <Route path="*" element={isSignedIn ? <Home/> : <SignUp />} />
              </Routes>
              <Footer/>
            </BrowserRouter>
          </PostsContext.Provider>
        </UserContext.Provider>
    </div>
  );
}

export default App;
