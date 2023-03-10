const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
 
// schema is going define structure of models
const Schema = mongoose.Schema;

// create instance of Schema object
// second argument generates timestamps
const userSchema = new Schema({
    isAdmin: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,
        validate: {
			validator: validator.isEmail,   // custom validator
			message: 'Not valid email'
		}
    },
    password:{
        type: String,
        required: true,
        minlength: 1
    },
    firstName: {
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    preferredName:{
        type: String,
    },
    profileImgLink:{
        type: String,
    },
    location:{
        type: String,
    },
    bio:{
        type: String
    },
    links:[
        {
            linkName: {type: String, required: true},
            link: {type: String, required: true},
        },
        {
            linkName: {type: String, required: true},
            link: {type: String, required: true},
        },
        {
            linkName: {type: String, required: true},
            link: {type: String, required: true},
        }
    ],
    casualProjects:{
        type: String,
    },
    professionalProjects:{
        type: String,
    },
    posts: [
        {
            type: Schema.Types.ObjectId,
        }
    ]
 }, {timestamps: true});
  
// Mongoose middleware.
// This function will run immediately prior to saving the document
// in the database.
userSchema.pre('save', function(next) {
	const user = this; // binds this to User document instance

	// checks to ensure we don't hash password more than once
	if (user.isModified('password')) {
		// generate salt and hash the password
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(user.password, salt, (err, hash) => {
				user.password = hash
				next()
			})
		})
	} else {
		next()
	}
})
 
// A static method on the document model.
// Allows us to find a User document by comparing the hashed password
// to a given one, for example when logging in.
userSchema.statics.findByEmailPassword = function(email, password) {
	const User = this // binds this to the User model

	// First find the user by their email
	return User.findOne({ username: email }).then((user) => {
		if (!user) {
			return Promise.reject("Incorrect Username")  // a rejected promise
		}
		// if the user exists, make sure their password is correct
		return new Promise((resolve, reject) => {
			bcrypt.compare(password, user.password, (err, result) => {
				if (result) {
					resolve(user)
				} else {
					reject("Incorrect Password")
				}
			})
		})
	})
}

// Now, create model.
// typically models are capitalized
// first argument is name of model
const Users = mongoose.model('Users', userSchema)

// now export module so can use it throughout project
module.exports = Users;