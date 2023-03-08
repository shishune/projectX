/* 
Functions to help with user actions. 

login checks whether a user's login is acceptable through API calls. Returns the user if the user's login is acceptable.

signup checks whether the user can sign up with the given email (i.e. in use or not). If they can sign up then we add the user's information to our database and returns the user.
*/

// environment configutations
import ENV from '../config.js'
const API_HOST = ENV.api_host

// Send a request to check if a user is logged in through the session cookie
export const checkSession = async () => {
    const url = `${API_HOST}/users/check-session`;

    return fetch(url)
    .then(res => {
        if (res.status === 200) {
            return res.json();
        }
    })
    .catch(error => {
        console.log(error);
    });    
};

// A function to send a POST request with the user to be logged in
export const login = async (loginComp) => {
    // Create our request constructor with all the parameters we need
    const request = new Request(`${API_HOST}/users/login`, {
        method: "post",
        body: JSON.stringify(loginComp),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    // Send the request with fetch()
    return fetch(request)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .catch(error => {
            console.log(error);
        });
};

// A function to send a POST request with the user to be logged in
export const signup = async (signupComp) => {
    // Create our request constructor with all the parameters we need
    const requestOptions =  {
        method: 'POST',
        body: JSON.stringify(signupComp),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    };

    // Send the request with fetch()
    return fetch(`${API_HOST}/api/user`, requestOptions)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .catch(error => {
            console.log(error);
        });
};

// A function to send a GET request to logout the current user
export const logout = async () => {
    const url = `${API_HOST}/users/logout`;

    return fetch(url)
    .then(res => {
        return res.send();
    })
    .catch(error => {
        console.log(error);
    });
};
