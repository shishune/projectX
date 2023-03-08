
Demo note: Although we completed the "Add Video" button to the Add Post dialogue before the deadline, we also implemented the "Add Link" and "Add Job" button after the deadline, and for the demo. 

# team08
 URL: https://team8projectx.herokuapp.com
 // note: this link no longer works as heroku no longer supports free projects

## Set up 
    # install server dependencies in the root directory
    $ npm install

    # install frontend dependencies in the client directory
    $ cd client
    $ npm install

    # build the React app
    $ npm run build

    # go back to the root directory
    $ cd ..

    # run the server
    $ node server.js
    
## After editing front end, to have changes reflected when running server.js
    # build the React app
    $ cd client
    $ npm run build
    
    # go back to the root directory
    $ cd ..
    
    # run the server
    $ node server.js
    
- If you make purely front-end changes, do the regular thing with react, but in order for it to show up in the backend, must build, and then start node server


## Creating and Running Local Mongo DB Server 
    # create mongo folder in root directory 
    $ mkdir mongo-data

    # start up database server (in a separate terminal from backend server)
    $ mongod --dbpath mongo-data
    
    # within server.js, make sure the following change is made to dbURI, const dbURI = 'mongodb+srv://otownsend:ng3Sg8wCun7C1VDQ@csc309.cqqta.mongodb.net/team08?retryWrites=true&w=majority' || 'mongodb://localhost:27017/team08'

    # intructions once on MongoDB compass
    - start a new connection using the string: mongodb://localhost:27017
    - within this connection, create a new database called team08, with a default collection called "posts" with the default settings.
    - within the team08 database, create another collection called "users" with default settings. 
    - to populate the user and post collections with the default data, you can refer to json files that can be found within the localdb_json folder. 
    
## Features
- Users can create an account and profile and detail personal information and contact information (i.e., name, location, a bio, and website links), as well as edit that information.
- Users can make a post to detail potential projects (ie description, location, estimated costs, materials, etc) and roles that need to be filled (i.e. their purpose and requirements)
    - NOTES: 
        - Tags must be comma seperated eg. tag1, tag2, tag3 in post creating/editing.
        - There is a maximum of 5 material and inspiration videos and links allowed per post, as well as a maximum of 5 required roles/position per post, with 5 requirements per role.   
        - Created posts will go to the end of the homepage feed. To view them, press the show more button at the end of the page.  
        - Links added to the project posts must be embedded Youtube links.
- Users can view other peoples’ posts from the home page feed. 
- Users can view posts in their own pages and can contact other users with interesting posts if they are interested in working with them 
- Admin Users can flag posts, see flagged posts and remove posts if they are inappropriate on the post page.


## Instructions
- Not Logged In:
    - A user who has not logged in can only view the home page (where they can learn more about our website, and browse professional and casual projects), the login page, the signup page, project post pages, and profile pages (through the “see profile” button for project posts). They can also report users' posts by clicking the kebob menu icon (![image](https://user-images.githubusercontent.com/38295184/156950072-9eca7ad3-52f9-4183-aafd-f2b53a7d3a16.png)) on that post [this is currently non functional. Please see remaining features for details]. Plus, they can see more posts by double clicking the Show More button (![image](https://user-images.githubusercontent.com/38295184/156957649-d0c1c13f-081f-452b-aca9-645a981823fe.png)) on the home page (NOTE: The show more button on the home page may need two button clicks to show. This will be fixed for phase 2).
        - If  a user is not logged in and tries to contact a poster through the “contact poster” button, they will see a popup that will allow them to be redirected to the login or signup page.  
- User 
    - Login the application with the username “user@user.com” and password “user”.
    - Alternatively, you can sign up as a user by filling in the first name, last name, email, and password on the sign up page. After signing up, you are automatically logged in. If you log out, you can log back in with your new account where the username is the email you signed up with and the password is the password you signed up with.
    - A regular user who has logged in can view the home page (where they can learn more about our website, and browse professional and casual projects), the login page, the signup page, project post pages, and profile pages (through the “see profile” button for project posts). They can also report users posts by clicking the kebob menu icon (![image](https://user-images.githubusercontent.com/38295184/156950072-9eca7ad3-52f9-4183-aafd-f2b53a7d3a16.png)) on that post  (they will be able to explain why). Plus, they can see more posts by double clicking the Show More button (![image](https://user-images.githubusercontent.com/38295184/156957649-d0c1c13f-081f-452b-aca9-645a981823fe.png)) on the home page (NOTE: The show more button on the home page may need two button clicks to show. This will be fixed for phase 2).
        - Regular users can view their profile page by clicking the profile icon (![image](https://user-images.githubusercontent.com/38295184/156950204-682b8a24-183a-4168-9989-cb6f0e4f89b4.png)) in the upper right hand corner of the screen.
        - Regular users can edit their profile details (such as their profile picture, first name, last name, location, biography, their interest in professional or casual projects and personal links) by clicking the edit icon (![image](https://user-images.githubusercontent.com/38295184/156950269-101c7e65-f41b-4875-a732-32b8cf8662d3.png)) on the profile page. Note that their email is not editable, but still visible. 
          - Please note: sometimes editing users may take a little bit of time to load. If your change is not visible right away, please wait a moment and then refresh the page. 
        - Regular users can click on a link on the profile pages and it will open that link in a new tab.
        - Regular users can edit or delete their own posts by clicking the kebob menu icon (![image](https://user-images.githubusercontent.com/38295184/156950297-067e7e38-df6c-42a1-b014-df2f486ac833.png)) on that post. Editable post information includes the project title, project location, tags, target users, descriptions, resources for the project, possible costs associated with joining the project, and project inspiration.
        - Regular users can see more information about a post from the home page by clicking on the post’s title or body. This will link the user to the “Post Details” page. 
        - Regular users can see more information about another user by clicking on that user’s icon on their associated post and it will link them to the poster’s profile dashboard. This happens on both the home page and the project details page. 
        - Regular users can create and post a posting looking for members to join their professional or casual project by clicking the Add Post button (![image](https://user-images.githubusercontent.com/38295184/156957459-953bf1a7-6e3f-4143-85f1-34ef28cee55c.png)) on the home page. This post will be added to the post feed. 
        - Regular users can report posts by pressing the kabob icon to email the admin about the post. 
        - Regular users can see flagged posts.
        - Regular users can filter posts by choosing the type of project they want (i.e. Professional, Casual, or both), and where the location of the project. 
          - To test the filter function, go to the Home Page and choose the kind of project you want to find using the drop-down menu (professional, casual, or both) and specify the location by typing in the location field. Then click apply users to get the filtered results. Note that the location must precisely match the post's location in order to get the result (e.g., "Remote (Toronto, ON, Canada)" 
        - If a user is logged in and tries to contact a poster through the “contact poster” button, a new window will open their mail application and draft a new email to send to the poster’s email.  
        - Regular users can log out by clicking the logout button (![image](https://user-images.githubusercontent.com/38295184/156950337-2815b00b-c29f-4e72-aa96-b064f4c256cf.png)) in the upper right hand corner of the screen.
- Admin
    - Login to the application with the username “admin@admin.com” and password “admin”.
    - An admin user who has logged in can view the home page (where they can learn more about our website, and browse professional and casual projects), the login page, the signup page, project post pages, and profile pages (through the “see profile” button for project posts). They can also report users posts by clicking the kebob menu icon (![image](https://user-images.githubusercontent.com/38295184/156950072-9eca7ad3-52f9-4183-aafd-f2b53a7d3a16.png)) on that post [this is currently non functional]. Plus, they can see more posts by double clicking the Show More button (![image](https://user-images.githubusercontent.com/38295184/156957649-d0c1c13f-081f-452b-aca9-645a981823fe.png)) on the home page (NOTE: The show more button on the home page may need two button clicks to show. This will be fixed for phase 2).
        - Admin users can view their profile page by click the profile icon (![image](https://user-images.githubusercontent.com/38295184/156950204-682b8a24-183a-4168-9989-cb6f0e4f89b4.png)) in the upper right hand corner of the screen.
        - Admin users can edit their profile details (such as their profile picture, first name, last name, location, biography, their interest in professional or casual projects and personal links) by clicking the edit icon (![image](https://user-images.githubusercontent.com/38295184/156950269-101c7e65-f41b-4875-a732-32b8cf8662d3.png)) on the profile page. Note that their email is not editable, but still visible. 
          - Please note: sometimes editing users may take a little bit of time to load. If your change is not visible right away, please wait a moment and then refresh the page. 
        - Admin users can click on a link from the links section on a profile page and it will open that link in a new tab.
        - Admin users can edit or delete their own posts by clicking the kebob menu icon (![image](https://user-images.githubusercontent.com/38295184/156950297-067e7e38-df6c-42a1-b014-df2f486ac833.png)) on that post. Editable post information includes the project title, project location, tags, target users, descriptions, resources for the project, possible costs associated with joining the project, and project inspiration.
        - Admin users can see more information about a post from the home page by clicking on the post’s title or body. This will link the user to the “Post Details” page
        - Admin users can see more information about another user by clicking on that user’s icon on their associated post and it will link them to the other user’s profile dashboard. This happens on both the home page and the project details page. 
        - Admin users can filter posts by choosing the type of project they want (i.e. Professional, Casual, or both), and where the location of the project. 
          - To test the filter function, go to the Home Page and choose the kind of project you want to find using the drop-down menu (professional, casual, or both) and specify the location by typing in the location field. Then click apply users to get the filtered results. Note that the location must precisely match the post's location in order to get the result (e.g., "Remote (Toronto, ON, Canada)" 
        - Admin users can create and post a posting looking for members to join their professional or casual project by clicking the Add Post button (![image](https://user-images.githubusercontent.com/38295184/156957459-953bf1a7-6e3f-4143-85f1-34ef28cee55c.png)) on the home page. This post will be added to the post feed.
If an admin user is logged in and tries to contact a poster through the “contact poster” button, they will be redirected to log into their email account through their mail app and then it will create a draft of an email to the poster (or go directly to the draft if they already logged into their email).
        - Admin users can log out by clicking the logout button (![image](https://user-images.githubusercontent.com/38295184/156950337-2815b00b-c29f-4e72-aa96-b064f4c256cf.png)) in the upper right-hand corner of the screen.
    - ### Moderation:
        - Additionally, admin users can flag anyone’s posts (which marks them as fraudulent or inappropriate on the home page’s post feed (![image](https://user-images.githubusercontent.com/38295184/156950473-747dcb90-0de3-4362-8631-154b48a1d0f2.png)) and on the project details page (![image](https://user-images.githubusercontent.com/38295184/156950529-09f6faf4-751d-498f-b04a-3b9e4dc59284.png))) by clicking the flag post button (![image](https://user-images.githubusercontent.com/38295184/156950568-40a53b2e-cefb-41e8-844f-a0b934a181a5.png)) on a user’s post. 
        - Admin users will see flagged posts.
        - Additionally, admin users can delete anyone’s posts by clicking the remove post button (![image](https://user-images.githubusercontent.com/38295184/156950604-eaf81a65-9783-4c8d-873f-6e271f53414b.png)) on a user’s post.

## Routes
Note: All route bodies require raw JSON input
Authentication note: Certain requests need session cookies in order to authenticate the user
I order to test via postman for requests that require authentication: 
- Please include a variable named “token” in your header with the value “```i-am-an-admin```” in order to test any request that requires authentication. 
- Please include the variable name “token” in your header with the value “```i-am-a-user```” in order to test just the user available requests such as creating and editing a user and a post. 
- Please also include a variable named “userid” and a valid user id such as "``` 624c8093824276706ee9f327```" for both admin and user request. This will allow the server to check that the user exists, but will not change the profile or posts of that user. 
These tokens are only for testing purposes. 


### Users
#### Login 
- Route: "/users/login" 
- Method: Post
- Usage: Used to log in users and create a session
- Body: send the username and password 
    - Example: 
    ```
      {
        "username": "user@user.com", 
        "password": "user"
      }
     ```
- Return: the loggedin user object 

#### Logout 
- Route: "/users/logout" 
- Method: Get
- Usage: Used to log out users
- Body: none
- Return: none

#### Get User by ID
- Route: "/api/user/:id" 
- Method: Get 
- Usage: Get user information. Used to fetch information for a user's profile and the profile information on a post.
- Parameter: userid 
    - Example: "/api/user/624c8093824276706ee9f327"
- Return: user data object information 
    - Example: 
    ```
      {
        "_id": "624c8093824276706ee9f327",
        "isAdmin": "true",
        "username": "admin@admin.com",
        "password": "$2a$10$I77Bh8gYtLVcUf50nWvJtuc7OAcAClME5hNjJHEaP0RO1tgQfzY1K",
        "firstName": "Adam",
        "lastName": "Manman",
        "preferredName": "",
        "profileImgLink": "https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg",
        "location": "Ottawa, On",
        "bio": "My name is Adam, though I prefer to be called Ad the man. I am an admin for this platform, but I also believe in the serious business of creating satisfying videos. If you have similar interests, or would like to contact me regarding site admin related issues, please message me and I will do my best to respond within 24 hours.",
        "links": [
            {
                "linkName": "OtherWebsite",
                "link": " facebook.com",
                "_id": "624c8093824276706ee9f328"
            },
            {
                "linkName": "OtherWebsite",
                "link": " linkedin.com",
                "_id": "624c8093824276706ee9f329"
            },
            {
                "linkName": "OtherWebsite",
                "link": " google.com",
                "_id": "624c8093824276706ee9f32a"
            }
        ],
        "casualProjects": "false",
        "professionalProjects": "false",
        "posts": [],
        "createdAt": "2022-04-05T17:46:59.572Z",
        "updatedAt": "2022-04-05T18:36:40.954Z",
        "__v": 0
    }  
    ```
#### Patch user by id
- Route: "/api/user/:id" 
- Method: Patch
- Usage: Used to update a user's profile information 
- Note: Users must be logged in order to edit their profile as there is authentication required
- Parameter: userid 
    - Example: "/api/user/624c8093824276706ee9f327"
- Body: Array of changes. See https://datatracker.ietf.org/doc/html/rfc6902#section-3 for documentation. 
    - Structure: ```[{"op": "replace", "path": "/variable", "value":"value"}]   ```
    - Example: 
    ```
          [
              {"op": "replace", "path": "/lastName", "value":"Patchname"}, 
              {"op": "replace", "path": "/firstName", "value":"Adan"}, 
            ]
            ```
- Return: Updated user object
    - Example: 
    ```
      {
        "_id": "624c8093824276706ee9f327",
        "isAdmin": "true",
        "username": "admin@admin.com",
        "password": "$2a$10$I77Bh8gYtLVcUf50nWvJtuc7OAcAClME5hNjJHEaP0RO1tgQfzY1K",
        "firstName": "Adan",
        "lastName": "Patchname",
        "preferredName": "",
        "profileImgLink": "https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg",
        "location": "Ottawa, On",
        "bio": "My name is Adam, though I prefer to be called Ad the man. I am an admin for this platform, but I also believe in the serious business of creating satisfying videos. If you have similar interests, or would like to contact me regarding site admin related issues, please message me and I will do my best to respond within 24 hours.",
        "links": [
            {
                "linkName": "OtherWebsite",
                "link": " facebook.com",
                "_id": "624c8093824276706ee9f328"
            },
            {
                "linkName": "OtherWebsite",
                "link": " linkedin.com",
                "_id": "624c8093824276706ee9f329"
            },
            {
                "linkName": "OtherWebsite",
                "link": " google.com",
                "_id": "624c8093824276706ee9f32a"
            }
        ],
        "casualProjects": "false",
        "professionalProjects": "false",
        "posts": [],
        "createdAt": "2022-04-05T17:46:59.572Z",
        "updatedAt": "2022-04-05T18:36:40.954Z",
        "__v": 0
    }   
    ```
#### Create user
- Route: "/api/user" 
- Method: Post
- Usage: Used to create a user account
- Body:
    - All details of a user 
        ```
        // Request body expects:
        {
          "isAdmin": <bool of whether the user is an admin or not>
          "username": <user username>
          "password": <user password>
          "firstName": <user first name>
          "lastName": <user last name>
          "preferredName": <user preferred name>
          "profileImgLink": <user profile picture>
          "location": <user location>
          "bio": <user bio>
          "links": <user list of links>
          "interestedInCasual": <user interest in casual projects>
          "interestedInProfessional": <user interest in professional projects>
        }

        ```
    - Example:
        ```
       {
            "isAdmin": "false",
            "username": "testuser@mail.com",
            "password": "test",
            "firstName": "Test",
            "lastName": "User",
            "preferredName": "",
            "profileImgLink": "",
            "location": "",
            "bio": "",
            "links": [
                {
                    "linkName": "OtherWebsite",
                    "link": " "
                },
                {
                    "linkName": "OtherWebsite",
                    "link": " "
                },
                {
                    "linkName": "OtherWebsite",
                    "link": " "
                }
            ],
            "interestedInCasual": "false",
            "interestedInProfessional": "false"
        }
        ```

- Return: the created user object 
    - Example: 
    ```
      {
        "currentUser": {
            "isAdmin": "false",
            "username": "testuser@mail.com",
            "password": "$2a$10$M7K1nTGO.uCSaPSic5TB5e1LfK8oh7k7BUERSa3K.nM2BJr.gL0Cy",
            "firstName": "Test",
            "lastName": "User",
            "preferredName": "",
            "profileImgLink": "",
            "location": "",
            "bio": "",
            "links": [
                {
                    "linkName": "OtherWebsite",
                    "link": " ",
                    "_id": "624cd41dbc6b7c87e51bc21f"
                },
                {
                    "linkName": "OtherWebsite",
                    "link": " ",
                    "_id": "624cd41dbc6b7c87e51bc220"
                },
                {
                    "linkName": "OtherWebsite",
                    "link": " ",
                    "_id": "624cd41dbc6b7c87e51bc221"
                }
            ],
            "posts": [],
            "_id": "624cd41dbc6b7c87e51bc21e",
            "createdAt": "2022-04-05T23:43:25.965Z",
            "updatedAt": "2022-04-05T23:43:25.965Z",
            "__v": 0
        }
    } 
    ```
    
#### Create admin user
- Route: "/api/user" 
- Method: Post
- Usage: Used to create an admin user account
- Body:
    - All details of a user 
        ```
        // Request body expects:
        {
          "isAdmin": "true" // in order to determine that the user is an admin
          "username": <user username>
          "password": <user password>
          "firstName": <user first name>
          "lastName": <user last name>
          "preferredName": <user preferred name>
          "profileImgLink": <user profile picture>
          "location": <user location>
          "bio": <user bio>
          "links": <user list of links>
          "interestedInCasual": <user interest in casual projects>
          "interestedInProfessional": <user interest in professional projects>
        }

        ```
    - Example:
        ```
       {
            "isAdmin": "true",
            "username": "testuadmin@mail.com",
            "password": "test",
            "firstName": "Test",
            "lastName": "User",
            "preferredName": "",
            "profileImgLink": "",
            "location": "",
            "bio": "",
            "links": [
                {
                    "linkName": "OtherWebsite",
                    "link": " "
                },
                {
                    "linkName": "OtherWebsite",
                    "link": " "
                },
                {
                    "linkName": "OtherWebsite",
                    "link": " "
                }
            ],
            "interestedInCasual": "false",
            "interestedInProfessional": "false"
        }
        ```

- Return: the created user object 
    - Example: 
    ```
      {
        "currentUser": {
            "isAdmin": "true",
            "username": "testadmin@mail.com",
            "password": "$2a$10$M7K1nTGO.uCSaPSic5TB5e1LfK8oh7k7BUERSa3K.nM2BJr.gL0Cy",
            "firstName": "Test",
            "lastName": "User",
            "preferredName": "",
            "profileImgLink": "",
            "location": "",
            "bio": "",
            "links": [
                {
                    "linkName": "OtherWebsite",
                    "link": " ",
                    "_id": "624cd41dbc6b7c87e51bc21f"
                },
                {
                    "linkName": "OtherWebsite",
                    "link": " ",
                    "_id": "624cd41dbc6b7c87e51bc220"
                },
                {
                    "linkName": "OtherWebsite",
                    "link": " ",
                    "_id": "624cd41dbc6b7c87e51bc221"
                }
            ],
            "posts": [],
            "_id": "624cd41dbc6b7c87e51bc21e",
            "createdAt": "2022-04-05T23:43:25.965Z",
            "updatedAt": "2022-04-05T23:43:25.965Z",
            "__v": 0
        }
    } 
    ```
    
### Posts
#### Get all posts
- Route: "/api/posts" 
- Method: Get
- Usage: get all posts
- Return: Will return an array of all the post objects in the database. To see an example of a post object, see "Get Post by ID" below

#### Get post by ID
- Route: "/api/posts/:id" 
- Method: Get
- Usage: Get a post by its id
- Parameters: postid
    - Example: "/api/posts/62465f29ca407378cbcb069a"  
- Body: none
- Return: The post object
      <details>
    
      - <summary> Example: Post object </summary> 
    
        ``` {
            "materials": {
                "videos": [
                    {
                        "link": "https://www.youtube.com/embed/bHX4GcxrUgY",
                        "title": "Clay cracking video",
                        "description": "This is a video a friend of mine created with a fidget object: clay cracking.",
                        "_id": "62465f29ca407378cbcb069e"
                    },
                    {
                        "link": "https://youtube.com/embed/WsG_3NdAmkk",
                        "title": "Slime video",
                        "description": "This is the most prevelant and possible product to sell, as they are easy to make and package. However, as you can see, there are already products like this out there (though not targeted towards the elderly, so there could be something to work with there).",
                        "_id": "62465f29ca407378cbcb069f"
                    },
                    {
                        "link": "https://youtube.com/embed/aCKtkvFvXa8",
                        "title": "Paint making",
                        "description": "Although more time intensive (perhaps a good thing), paint making from pigments is another source Id like to look into for this business.",
                        "_id": "62465f29ca407378cbcb06a0"
                    },
                    {
                        "link": "",
                        "title": "",
                        "description": "",
                        "_id": "62465f29ca407378cbcb06a1"
                    },
                    {
                        "link": "",
                        "title": "",
                        "description": "",
                        "_id": "62465f29ca407378cbcb06a2"
                    }
                ],
                "otherlinks": []
            },
            "inspirations": {
                "videos": [
                    {
                        "link": "https://youtube.com/embed/k6vb9Eb-Ufc",
                        "title": "Soap cutting",
                        "description": "I started thinking about this business idea because of this soap making video.",
                        "_id": "62465f29ca407378cbcb06a8"
                    },
                    {
                        "link": "https://youtube.com/embed/VHB3_W8cTto",
                        "title": "Satisfying video",
                        "description": "I looked into more satisfying videos, but concluded that most of the items here were either too inaccessible for most, or too dangerous.",
                        "_id": "62465f29ca407378cbcb06a9"
                    },
                    {
                        "link": "",
                        "title": "",
                        "description": "",
                        "_id": "62465f29ca407378cbcb06aa"
                    },
                    {
                        "link": "",
                        "title": "",
                        "description": "",
                        "_id": "62465f29ca407378cbcb06ab"
                    },
                    {
                        "link": "",
                        "title": "",
                        "description": "",
                        "_id": "62465f29ca407378cbcb06ac"
                    }
                ],
                "otherlinks": []
            },
            "_id": "62465f29ca407378cbcb069a",
            "title": "Satisfying Things",
            "postType": "Professional",
            "postSearchState": "In progress",
            "postLocation": "Semi-Remote  (Toronto, ON)",
            "tags": [
                {
                    "tagName": "Technology",
                    "_id": "624c6e6dce29454719c28876"
                },
                {
                    "tagName": "Health",
                    "_id": "624c6e6dce29454719c28877"
                },
                {
                    "tagName": "Physical Product",
                    "_id": "624c6e6dce29454719c28878"
                }
            ],
            "numViews": "0",
            "targetUsers": "Elderly, Abled, Medical Workers",
            "description": "I want to create a company that sells fidget objects to elder citizens. Satisfying fidget objects, like the ones you will see below, have been used as entertainment and a mental health booster for mostly children for the past fet decades. But amidst the pandemic, I've come to the realization that elders could gain huge benefits from these products. Where as elder citizens pre-pandemic had the ability to exercise their brain through social activities such as talking, or social games, this has been made extremely difficult or impossible for most people. Playing with fidget objects were shown to be extremely beneficial to brain activity and mental health. Therefore, I would like to see if these would be able to help elder citizens.",
            "possibleCostEstimates": "",
            "requiredPeople": [
                {
                    "jobTitle": "A Coder",
                    "jobDescription": "You will create a website with multiple pages, some way to list my products, tell people the company mission, plus the ability to purchase items",
                    "purpose": "I need an experienced coder to first create a website for this business so I can fundraise and present products to investors. Figure out if this is a good idea. I'm happy with any sort of website, as long as it has good accessability for elderly viewers",
                    "requirements": [
                        {
                            "requirement": "have website coding experience",
                            "_id": "62465f29ca407378cbcb06b3"
                        },
                        {
                            "requirement": "be willing to work part-time",
                            "_id": "62465f29ca407378cbcb06b4"
                        },
                        {
                            "requirement": "",
                            "_id": "62465f29ca407378cbcb06b5"
                        },
                        {
                            "requirement": "",
                            "_id": "62465f29ca407378cbcb06b6"
                        },
                        {
                            "requirement": "",
                            "_id": "62465f29ca407378cbcb06b7"
                        }
                    ],
                    "additionalInfo": "I don't know much about web coding, so it would be great if you can explain to me anything I would need to know in order to have a website.",
                    "_id": "62465f29ca407378cbcb06b2"
                },
                {
                    "jobTitle": "A Medical Professional",
                    "jobDescription": "You will help me look at research studies on neurology and existing solutions on solutions for mental issues elderly people are prone to.",
                    "purpose": "I need someone who is well versed in research to find and read through credible, peer reviewed studies that relate to the areas I want to target.",
                    "requirements": [
                        {
                            "requirement": "Have a medical doctorate or phD in Neurology.",
                            "_id": "62465f29ca407378cbcb06b9"
                        },
                        {
                            "requirement": "Have experience reading and summarizing info from research studies.",
                            "_id": "62465f29ca407378cbcb06ba"
                        },
                        {
                            "requirement": "Be willing to work part-time.",
                            "_id": "62465f29ca407378cbcb06bb"
                        },
                        {
                            "requirement": "",
                            "_id": "62465f29ca407378cbcb06bc"
                        },
                        {
                            "requirement": "",
                            "_id": "62465f29ca407378cbcb06bd"
                        },
                        {
                            "requirement": "",
                            "_id": "62465f29ca407378cbcb06be"
                        }
                    ],
                    "additionalInfo": "I think it might be an interesting idea to do some user tests on the fidget toys, and test their effects on senior citizens eventually. I would be great to talk with you about how viable this is and how I can go about doing this.",
                    "_id": "62465f29ca407378cbcb06b8"
                },
                {
                    "jobTitle": "",
                    "jobDescription": "",
                    "purpose": "",
                    "requirements": [
                        {
                            "requirement": "",
                            "_id": "62465f29ca407378cbcb06c0"
                        },
                        {
                            "requirement": "",
                            "_id": "62465f29ca407378cbcb06c1"
                        },
                        {
                            "requirement": "",
                            "_id": "62465f29ca407378cbcb06c2"
                        },
                        {
                            "requirement": "",
                            "_id": "62465f29ca407378cbcb06c3"
                        },
                        {
                            "requirement": "",
                            "_id": "62465f29ca407378cbcb06c4"
                        },
                        {
                            "requirement": "",
                            "_id": "62465f29ca407378cbcb06c5"
                        }
                    ],
                    "additionalInfo": "",
                    "_id": "62465f29ca407378cbcb06bf"
                },
                {
                    "jobTitle": "",
                    "jobDescription": "",
                    "purpose": "",
                    "requirements": [
                        {
                            "requirement": "",
                            "_id": "62465f29ca407378cbcb06c7"
                        },
                        {
                            "requirement": "",
                            "_id": "62465f29ca407378cbcb06c8"
                        },
                        {
                            "requirement": "",
                            "_id": "62465f29ca407378cbcb06c9"
                        },
                        {
                            "requirement": "",
                            "_id": "62465f29ca407378cbcb06ca"
                        },
                        {
                            "requirement": "",
                            "_id": "62465f29ca407378cbcb06cb"
                        },
                        {
                            "requirement": "",
                            "_id": "62465f29ca407378cbcb06cc"
                        }
                    ],
                    "additionalInfo": "",
                    "_id": "62465f29ca407378cbcb06c6"
                },
                {
                    "jobTitle": "",
                    "jobDescription": "",
                    "purpose": "",
                    "requirements": [
                        {
                            "requirement": "",
                            "_id": "62465f29ca407378cbcb06ce"
                        },
                        {
                            "requirement": "",
                            "_id": "62465f29ca407378cbcb06cf"
                        },
                        {
                            "requirement": "",
                            "_id": "62465f29ca407378cbcb06d0"
                        },
                        {
                            "requirement": "",
                            "_id": "62465f29ca407378cbcb06d1"
                        },
                        {
                            "requirement": "",
                            "_id": "62465f29ca407378cbcb06d2"
                        },
                        {
                            "requirement": "",
                            "_id": "62465f29ca407378cbcb06d3"
                        }
                    ],
                    "additionalInfo": "",
                    "_id": "62465f29ca407378cbcb06cd"
                },
                {
                    "jobTitle": "",
                    "jobDescription": "",
                    "purpose": "",
                    "requirements": [
                        {
                            "requirement": "",
                            "_id": "62465f29ca407378cbcb06d5"
                        },
                        {
                            "requirement": "",
                            "_id": "62465f29ca407378cbcb06d6"
                        },
                        {
                            "requirement": "",
                            "_id": "62465f29ca407378cbcb06d7"
                        },
                        {
                            "requirement": "",
                            "_id": "62465f29ca407378cbcb06d8"
                        },
                        {
                            "requirement": "",
                            "_id": "62465f29ca407378cbcb06d9"
                        },
                        {
                            "requirement": "",
                            "_id": "62465f29ca407378cbcb06da"
                        }
                    ],
                    "additionalInfo": "",
                    "_id": "62465f29ca407378cbcb06d4"
                }
            ],
            "posterId": "624a5db22d69abfed335e61f",
            "createdAt": "2022-04-01T02:11:08.208Z",
            "updatedAt": "2022-04-05T16:29:33.411Z",
            "__v": 0,
            "isFlagged": false
        } 
    ```
    
    </details>

#### Get a user's posts
- Route: "/api/posts/user/:usr_id" 
- Method: Get
- Usage: Used in the user profile to get all the posts by a given user
- Parameter: usr_id - the ID of a user
    - example: "/api/posts/user/624c8093824276706ee9f327 "  
- Body: none
- Return: an array of all the posts a user has made. Please see an example of a post object above. 


#### Create a post
- Route: "/api/posts" 
- Method: Post
- Usage: Create a post. Used in the "Add a post" Button that can be found in the homepage or a user's own profile page 
- Note: Users must be logged in order to create posts as there is authentication that checks if the user is logged in
- Body: All details of a post
    - Example: Tap to see expanded post view 
        
        ```
        {
          "title": "postTitle",
          "isFlagged": "false",
          "postType": "postType",
          "postSearchState": "In Progress",
          "postLocation": "postLocation",
          "tags": [{"tagName": "tags"}],
          "numViews": "0",
          "targetUsers": "postTargetUsers",
          "description": "postDesc",
          "materials": {
              "videos" : [
                  {"link":"",
                  "title":"",
                  "description":""},
                  {"link":"",
                  "title":"",
                  "description":""},
                  {"link":"",
                  "title":"",
                  "description":""},
                  {"link":"",
                  "title":"",
                  "description":""},
                  {"link":"",
                  "title":"",
                  "description":""}
              ],
                "otherLinks" : [
                    {"linkText":"", 
                    "link":""},
                    {"linkText":"", 
                    "link":""},
                    {"linkText":"", 
                    "link":""},
                    {"linkText":"", 
                    "link":""},
                    {"linkText":"", 
                    "link":""}
                ]
          },
          "possibleCostEstimates": "postPCE",
          "inspirations": {
              "videos" : [
                  {"link":"",
                  "title":"",
                  "description":""},
                  {"link":"",
                  "title":"",
                  "description":""},
                  {"link":"",
                  "title":"",
                  "description":""},
                  {"link":"",
                  "title":"",
                  "description":""},
                  {"link":"",
                  "title":"",
                  "description":""}
              ],
              "otherLinks" : [
                  {"linkText":"", 
                    "link":""},
                    {"linkText":"", 
                    "link":""},
                    {"linkText":"", 
                    "link":""},
                    {"linkText":"", 
                    "link":""},
                    {"linkText":"", 
                    "link":""}
              ]
          },
          "requiredPeople": [
              {
                  "jobTitle":"Full stack developer",
                    "jobDescription":"Looking for a full-stack developer, using whatever software stack you'...",
                    "purpose":"I graduated with an Arts degree, so I don't know how to code! Would re...",
                    "requirements": [
                        {"requirement":"Has >1.5 experience coding."},
                        {"requirement":"Has >1.5 experience coding."},
                        {"requirement":"Has >1.5 experience coding."},
                        {"requirement":"Has >1.5 experience coding."},
                        {"requirement":"Has >1.5 experience coding."}
                    ],
                    "additionalInfo":"Will likely be looking for 3-4 people for this role."
              },
              {
                  "jobTitle":"Full stack developer",
                    "jobDescription":"Looking for a full-stack developer, using whatever software stack you'...",
                    "purpose":"I graduated with an Arts degree, so I don't know how to code! Would re...",
                    "requirements": [
                        {"requirement":"Has >1.5 experience coding."},
                        {"requirement":"Has >1.5 experience coding."},
                        {"requirement":"Has >1.5 experience coding."},
                        {"requirement":"Has >1.5 experience coding."},
                        {"requirement":"Has >1.5 experience coding."}
                    ],
                    "additionalInfo":"Will likely be looking for 3-4 people for this role."
              },
              {
                  "jobTitle":"Full stack developer",
                    "jobDescription":"Looking for a full-stack developer, using whatever software stack you'...",
                    "purpose":"I graduated with an Arts degree, so I don't know how to code! Would re...",
                    "requirements": [
                        {"requirement":"Has >1.5 experience coding."},
                        {"requirement":"Has >1.5 experience coding."},
                        {"requirement":"Has >1.5 experience coding."},
                        {"requirement":"Has >1.5 experience coding."},
                        {"requirement":"Has >1.5 experience coding."}
                    ],
                    "additionalInfo":"Will likely be looking for 3-4 people for this role."
              },
              {
                  "jobTitle":"Full stack developer",
                    "jobDescription":"Looking for a full-stack developer, using whatever software stack you'...",
                    "purpose":"I graduated with an Arts degree, so I don't know how to code! Would re...",
                    "requirements": [
                        {"requirement":"Has >1.5 experience coding."},
                        {"requirement":"Has >1.5 experience coding."},
                        {"requirement":"Has >1.5 experience coding."},
                        {"requirement":"Has >1.5 experience coding."},
                        {"requirement":"Has >1.5 experience coding."}
                    ],
                    "additionalInfo":"Will likely be looking for 3-4 people for this role."
              },
              {
                  "jobTitle":"Full stack developer",
                    "jobDescription":"Looking for a full-stack developer, using whatever software stack you'...",
                    "purpose":"I graduated with an Arts degree, so I don't know how to code! Would re...",
                    "requirements": [
                        {"requirement":"Has >1.5 experience coding."},
                        {"requirement":"Has >1.5 experience coding."},
                        {"requirement":"Has >1.5 experience coding."},
                        {"requirement":"Has >1.5 experience coding."},
                        {"requirement":"Has >1.5 experience coding."}
                    ],
                    "additionalInfo":"Will likely be looking for 3-4 people for this role."
              }
          ],
          "posterId": "posterId"
        }
        
        ```
        
        
- Return: the created post object. See get post by ID for details

#### Edit a post 
- Route: "/api/posts/:id"
- Method: Patch
- Usage: Allows users to edit their posts
- Note: Users must be logged in order to edit posts as there is authentication that checks if the user is able to edit a given post
- Parameter: postid 
    - Example: "/api/posts/62465f29ca407378cbcb069a"
- Body: Array of changes. See https://datatracker.ietf.org/doc/html/rfc6902#section-3 for documentation. 
    - Structure: ```[{"op": "replace", "path": "/variable", "value":"value"}]   ```
    - Example:
        ```
          [
              {"op": "replace", "path": "/title", "value":"New project!"}
           ]
        ```

- Return: The updated post object
   
        
#### Delete post
- Route: "/api/posts/:id"
- Method: Delete
- Usage: Used to delete posts 
- Note: Users must be logged in order to delete posts as there is authentication that checks if the user is able to delete a given post
- Parameter: postid 
    - Example: "/api/posts/62465f29ca407378cbcb069a"
- Return: the deleted post object 


## Third-Party Libraries:
- MaterialUI
- react-router-dom
- react-multi-carousel

## Citations:
- Entirety of ScrollToTop.js. Allows scrolling to the top functionality on navigation to different page with https://v5.reactrouter.com/web/guides/scroll-restoration  
- Code used in profile-edit-dialogue.js. Creates popup
https://medium.com/@daniela.sandoval/creating-a-popup-window-using-js-and-react-4c4bd125da57 

