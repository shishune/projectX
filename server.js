const log = console.log;
const path = require('path');
const express = require("express");
const mongoose = require('mongoose')
const { ObjectId } = require('mongodb');
const app = express();
const Post = require('./models/post')
const User = require('./models/user')
const bodyParser = require('body-parser')
app.use(bodyParser.json());



const env = process.env.NODE_ENV 

// to validate object IDs
const { ObjectID } = require('mongodb')

// dURI below represents the link to the MongoDB "team08" remote database.
const dbURI = 'mongodb+srv://otownsend:ng3Sg8wCun7C1VDQ@csc309.cqqta.mongodb.net/team08?retryWrites=true&w=majority' || 'mongodb://localhost:27017'


mongoose.connect(dbURI)
 .then((result) => app.listen(port, () => console.log(`Server started on port  ${port}`)))
 .catch((error) => { 
    console.log('Error connecting to mongodb. Timeout reached.') 
  })
  
/*** Helper functions below **********************************/
function isMongoError(error) { // checks for first error returned by promise rejection if Mongo database suddently disconnects
	return typeof error === 'object' && error !== null && error.name === "MongoNetworkError"
}
/*********************************************************/

// express-session for managing user sessions
const session = require("express-session");
const MongoStore = require('connect-mongo') // to store session information on the database in production

// Middleware for authentication of resources
const authenticate = (req, res, next) => {
  // console.log(JSON.stringify(req.headers));
  if((req.headers.token === "i-am-a-user" || req.headers.token === "i-am-an-admin") 
  && req.headers.userid){
    User.findById(req.headers.userid).then((user) => {
      if (!user) {
        return Promise.reject()
      } else {
        req.user = user
        next()
      }
    }).catch((error) => {
        res.status(401).send("Unauthorized")
    })
  } else if (req.session.user) {
      User.findById(req.session.user._id).then((user) => {
        if (!user) {
          return Promise.reject()
        } else {
          req.user = user
          next()
        }
      }).catch((error) => {
          res.status(401).send("Unauthorized")
      })
  } else {
      res.status(401).send("Unauthorized")
  }
}

const authenticateAdmin = (req, res, next) => {
  // console.log(req.headers.token);

  if(req.headers.token === "i-am-an-admin" && req.headers.userid){
    User.findById(req.headers.userid).then((user) => {
      if (!user) {
        return Promise.reject()
      } else {
        if (user.isAdmin === "false") {
          return Promise.reject()
        }
        req.user = user
        next()
      }
    }).catch((error) => {
        res.status(401).send("Unauthorized")
    })
  } else if (req.session.user) {
      User.findById(req.session.user._id).then((user) => {
        if (!user) {
          return Promise.reject()
        } else {
          if (user.isAdmin === "false") {
            return Promise.reject()
          }
          req.user = user
          next()
        }
      }).catch((error) => {
          res.status(401).send("Unauthorized")
      })
  } else {
      res.status(401).send("Unauthorized")
  }
}


/*** Session handling **************************************/
// Create a session and session cookie
app.use(
  session({
      secret: process.env.SESSION_SECRET || "our hardcoded secret", // make a SESSION_SECRET environment variable when deploying (for example, on heroku)
      resave: false,
      saveUninitialized: false,
      cookie: {
          expires: 600000,
          httpOnly: true
      },
      // store the sessions on the database in production
      store: env === 'production' ? MongoStore.create({ 
        mongoUrl: process.env.MONGODB_URI || dbURI
      }) : null
  })
  
);

// A route to login and create a session
app.post("/users/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // log(email, password);
  // Use the static method on the User model to find a user
  // by their email and password
  try {
    let user = await User.findByEmailPassword(username, password);
    if (!user) {
      res.status(404).send('Resource not found')  // could not find this post
    } else { 
      req.session.user = user;
      res.send({currentUser: user})
    }
  } catch(error) {
    if (error === "Incorrect Username") {
      res.send({usernameError: "Incorrect Username"})
    } else if (error === "Incorrect Password") {
      res.send({passwordError: "Incorrect Password"})
    } else {
      res.status(500).send('Internal Server Error')  // server error
    }
  }
});

// A route to logout a user
app.get("/users/logout", (req, res) => {
  // Remove the session
  req.session.destroy(error => {
      if (error) {
          res.status(500).send(error);
      } else {
          res.send()
      }
  });
});

// A route to check if a user is logged in on the session
app.use("/users/check-session", (req, res) => {
  if (req.session.user) {
      res.send({ currentUser: req.session.user });
  } else {
      res.status(401).send();
  }
});

/*** Post API Routes below ************************************/

// Fetches all posts (ordered by newest to oldest)
app.get('/api/posts', async (req, res)=>{

  // Check mongoose connection established
	if (mongoose.connection.readyState != 1) {
      log('Issue with mongoose connection')
      res.status(500).send('Internal server error')
      return;
	} 
  
  // Fetch all posts 
	try {
      const posts = await Post.find().sort({createdAt: -1})
      res.send(posts) 
	} catch(error) {
      log(error)
      res.status(500).send("Internal Server Error")
	}

})

// Fetch Post by id 
app.get('/api/posts/:id', async (req, res) => {
    
    const id = req.params.id
    
    // Validate id 
    if (!ObjectId.isValid(id)) {
      res.status(404).send() 
      return;  
    }

    // Check mongoose connection established.
    if (mongoose.connection.readyState != 1) {
      log('Issue with mongoose connection')
      res.status(500).send('Internal server error')
      return;
    }

    // If id valid, findById
    try {
      const post = await Post.findById(id)
      if (!post) {
        res.status(404).send('Resource not found')  // could not find this post
      } else { 
        res.send(post)
      }
    } catch(error) {
      log(error)
      res.status(500).send('Internal Server Error')  // server error
    }

})

// Fetches all posts from a single user (ordered by newest to oldest)
app.get('/api/posts/user/:usr_id', async (req, res)=>{

  // Check mongoose connection established
	if (mongoose.connection.readyState != 1) {
      log('Issue with mongoose connection')
      res.status(500).send('Internal server error')
      return;
	} 
  
  // Fetch all posts 
	try {
      const posts = await Post.find({posterId: ObjectId(req.params.usr_id)}).sort({createdAt: -1})
      res.send(posts) 
	} catch(error) {
      log(error)
      res.status(500).send("Internal Server Error")
	}

})

// Fetches subset posts based on filters
app.get('/api/posts/:kind/:location', async (req, res)=>{
  const kindOfProject = req.params.kind;
  const location = req.params.location;
    
  // Check mongoose connection established
	if (mongoose.connection.readyState != 1) {
      log('Issue with mongoose connection')
      res.status(500).send('Internal server error')
      return;
	} 
  
  // Fetch subset of posts
	try {
    let posts;
    if (location === '' || location === 'any'){
      if (kindOfProject === 'any'){
        posts = await Post.find().sort({createdAt: -1})
      } else if (kindOfProject === 'professional') {
        posts = await Post.find({postType: 'Professional'}).sort({createdAt: -1});
      } else if (kindOfProject === 'casual') {
        posts = await Post.find({postType: 'Casual'}).sort({createdAt: -1});
      } else {
        posts = await Post.find().sort({createdAt: -1})
      }
    } else {
      if (kindOfProject === 'any'){
        posts = await Post.find({postLocation: location}).sort({createdAt: -1})
      } else if (kindOfProject === 'professional') {
        posts = await Post.find({postType: 'Professional', postLocation: location}).sort({createdAt: -1});
      } else if (kindOfProject === 'casual') {
        posts = await Post.find({postType: 'Casual', postLocation: location}).sort({createdAt: -1});
      } else {
        posts = await Post.find({postLocation: location}).sort({createdAt: -1})
      }
    }
    res.send({"filteredPosts": posts}) 
	} catch(error) {
    log(error)
    res.status(500).send("Internal Server Error")
	}

})

// Make a post 
app.post('/api/posts', authenticate, async (req, res) => {

    // check mongoose connection established.
    if (mongoose.connection.readyState != 1) {
        log('Issue with mongoose connection')
        res.status(500).send('Internal server error')
        return;
    }  

    const post = new Post({
        title: req.body.title,
        isFlagged: req.body.isFlagged,
        postType: req.body.postType,
        postSearchState: req.body.postSearchState,
        postLocation: req.body.postLocation,
        tags: req.body.tags,
        numViews: req.body.numViews,
        targetUsers: req.body.targetUsers,
        description: req.body.description,
        materials:{
          videos: req.body.materials.videos,
          otherlinks: req.body.materials.otherlinks,
        },
        possibleCostEstimates: req.body.possibleCostEstimates,
        inspirations:{
            videos: req.body.inspirations.videos,
            otherlinks: req.body.inspirations.otherlinks
        },
        requiredPeople: req.body.requiredPeople,
        posterId: req.body.posterId
    });


    // Save post to the database
    try {
        const result = await post.save()	
        res.send(result);
    } 
    catch(error) {
        log(error) // log server error to the console, not to the client.
        if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
            res.status(500).send('Internal server error')
        } else {
            res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
        }
    }


})


/// Delete a post 
app.delete('/api/posts/:id', authenticate, async (req, res) => {
	const id = req.params.id

	// Validate id
	if (!ObjectID.isValid(id)) {
		res.status(404).send('Resource not found')
		return;
	}

	// check mongoose connection established.
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	} 

	// Delete a post by its id
	try {
		const post = await Post.findByIdAndRemove(id)
		if (!post) {
			res.status(404).send()
		} else {   
			res.send(post)
		}
	} catch(error) {
		log(error)
		res.status(500).send() // server error, could not delete.
	}
})



// Edit and update post 
// Follow this format: https://datatracker.ietf.org/doc/html/rfc6902#section-3
app.patch('/api/posts/:id', authenticate, async (req, res) => {
    const id = req.params.id

    if (!ObjectId.isValid(id)) {
        res.status(404).send()
        return;  // so that we don't run the rest of the handler.
    }

    // check mongoose connection established.
    if (mongoose.connection.readyState != 1) {
        log('Issue with mongoose connection')
        res.status(500).send('Internal server error')
        return;
    }

    // Find the fields to update and their values.

    const fieldsToUpdate = {}
    req.body.map((change) => {
        const propertyToChange = change.path.substr(1) // getting rid of the '/' character
        fieldsToUpdate[propertyToChange] = change.value
    })

    // Update the post by their id.
    try {
        const post = await Post.findOneAndUpdate({_id: id}, {$set: fieldsToUpdate}, {new: true, useFindAndModify: false})
        if (!post) {
            res.status(404).send('Resource not found')
        } else {   
            res.send(post)
        }
      } catch (error) {
          log(error)
          if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
            res.status(500).send('Internal server error')
          } 
          else {
            res.status(400).send('Bad Request') // bad request for changing the post.
          }
    }

})


/*** Webpage routes below **********************************/
/**
 * ---- USER METHODS BELOW ----
 */
 
// a GET route to get all users - code base from week 9 lecture material
app.get('/api/user', authenticateAdmin, async (req, res) => {

	// check mongoose connection established.
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	} 

	// Get the users
	try {
		const users = await User.find()

		// res.send(students) // just the array
		res.send({ users }) // can wrap users in object if want to add more properties
	} catch(error) {
		log(error)
		res.status(500).send("Internal Server Error")
	}

})


// Fetch user by id 
app.get('/api/user/:id', async (req, res) => {
    
    const id = req.params.id
    
    // Validate id 
    if (!ObjectID.isValid(id)) {
      res.status(404).send() 
      return;  
    }

    // Check mongoose connection established.
    if (mongoose.connection.readyState != 1) {
      log('Issue with mongoose connection')
      res.status(500).send('Internal server error')
      return;
    }

    // If id valid, findById
    try {
      const user = await User.findById(id)
      if (!user) {
        res.status(404).send('Resource not found')  // could not find this user
      } else { 
        res.send(user)
      }
    } catch(error) {
      log(error)
      res.status(500).send('Internal Server Error')  // server error
    }

})

// PATCH - Edit and update user 
// Follow this format: https://datatracker.ietf.org/doc/html/rfc6902#section-3
// or see here: (put this in the body of the http request - raw + json)
/*
[
  {"op": "replace", "path": "/variable", "value":"value"}
]
ex: 
[
  {"op": "replace", "path": "/lastName", "value":"Patchname"}, 
  {"op": "replace", "path": "/firstName", "value":"Adan"}, 
]
*/
app.patch('/api/user/:id', authenticate, async (req, res) => {
  const id = req.params.id
  // console.log("patch")
  // TODO: authenticate user 

  
  if (!ObjectId.isValid(id)) {
      res.status(404).send()
      return;  // so that we don't run the rest of the handler.
  }

  // check mongoose connection established.
  if (mongoose.connection.readyState != 1) {
      log('Issue with mongoose connection')
      res.status(500).send('Internal server error')
      return;
  }

  // Find the fields to update and their values.

  const fieldsToUpdate = {}
  req.body.map((change) => {
      const propertyToChange = change.path.substr(1) // getting rid of the '/' character
      fieldsToUpdate[propertyToChange] = change.value
  })
  console.log(fieldsToUpdate)

  // Update the post by their id.
  try {
      const user = await User.findOneAndUpdate({_id: id}, {$set: fieldsToUpdate}, {new: true, useFindAndModify: false})
      if (!user) {
          res.status(404).send('Resource not found')
      } else {   
          res.send(user)
      }
    } catch (error) {
        log(error)
        if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
          res.status(500).send('Internal server error')
        } 
        else {
          res.status(400).send('Bad Request') // bad request for changing the post.
        }
  }

})



/// Route for adding new user from sign up.
/* 
Request body expects:
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
  "casualProjects": <user interest in casual projects>
  "professionalProjects": <user interest in professional projects>
}
Returned JSON should be the database document added.
*/
app.post('/api/user', async (req, res) => {
	// Add code here

	// check mongoose connection established.
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	} 

	const user = new User({
    isAdmin: req.body.isAdmin,
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    preferredName: req.body.preferredName,
    profileImgLink: req.body.profileImgLink,
    location: req.body.location,
    bio: req.body.bio,
    links: req.body.links,
    casualProjects: req.body.casualProjects,
    professionalProjects: req.body.professionalProjects,
    posts: []
  })

	// Save user to the database
	try {
    const userExists = await User.findOne({username: req.body.username})
    if (userExists) {
      res.send({signUpError: true})
    } else {
      const result = await user.save()	
      req.session.user = result;
      res.send({currentUser: result})
    }
	} catch(error) {
		if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
		}
	}
})

app.use(express.static(path.join(__dirname, "/client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

/*************************************************/
// Express server listening...

const port = process.env.PORT || 5002;