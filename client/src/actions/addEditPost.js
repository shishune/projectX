import ENV from '../config.js'
const API_HOST = ENV.api_host

// A function to send a POST request to edit post
export const editPost = async (postId, changedPost) => {
  // Create our request constructor with all the parameters we need
  const requestOptions = {
    method: "PATCH",
    body: JSON.stringify(changedPost),
    headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
    }};
  // Send the request with fetch()
  return fetch(`${API_HOST}/api/posts/`+ postId, requestOptions)
      .then(res => {
          if (res.status === 200) {
              return res.json();
          }
      })
      .catch(error => {
          console.log(error);
      });
};

// A function to DELETE a post
export const deletePost = async (postId) => {
  // Send the request with fetch()
  return fetch(`${API_HOST}/api/posts/`+ postId, { method: 'DELETE'})
      .then(res => {
          if (res.status === 200) {
              return res.json();
          }
      })
      .catch(error => {
          console.log(error);
      });
};

// A function to send a PATCH request to flag a post
export const flagPost = async (postId, flagStatus) => {
  // Create our request constructor with all the parameters we need
  const requestOptions = {
    method: "PATCH",
    body: JSON.stringify([{"op": "replace", "path": "/isFlagged", "value": flagStatus}]),
    headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
    }};
  // Send the request with fetch()
  return fetch(`${API_HOST}/api/posts/`+ postId, requestOptions)
      .then(res => {
          if (res.status === 200) {
              return res.json();
          }
      })
      .catch(error => {
          console.log(error);
      });
};

// A function to send a POST request to edit post
export const addPost = async (postToAdd) => {
  // Create our request constructor with all the parameters we need
  const requestOptions = {
    method: "POST",
    body: JSON.stringify(postToAdd),
    headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
    }};

    // Send the request with fetch()
  return fetch(`${API_HOST}/api/posts`, requestOptions)
      .then(res => {
          if (res.status === 200) {
              return res.json();
          }
      })
      .catch(error => {
          console.log(error);
      });
};

// A function to send a PATCH request to update user posts
export const updateUserPosts = async (posterId, flagStatus) => {
    // Create our request constructor with all the parameters we need
    const requestOptions = {
      method: "PATCH",
      body: JSON.stringify([{"op": "replace", "path": "/posts", "value": flagStatus}]),
      headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
      }};
    // Send the request with fetch()
    return fetch(`${API_HOST}/api/user/`+ posterId, requestOptions)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .catch(error => {
            console.log(error);
        });
  };