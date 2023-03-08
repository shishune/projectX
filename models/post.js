const mongoose = require('mongoose')
 
// schema is going define structure of models
const Schema = mongoose.Schema;
 
// create instance of Schema object
// second argument generates timestamps
const postSchema = new Schema({
   title: {
       type: String,
       required: true
   },
   isFlagged: {
       type: Boolean,
       required: true
   },
   postType: {
       type: String,
       required: true
   },
   postSearchState: {
       type: String,
       required: true
   },
   postLocation:{
       type: String,
       required: true
   },
   tags: [
       {tagName: {type: String}}
   ],
   numViews:{
       type: String,
       required: true
   },
   targetUsers:{
       type: String,
   },
   description:{
       type: String,
   },
   materials:{
       videos:[
            {
               link: {type:String},
               title: {type:String},
               description: {type:String}
            },
            {
                link: {type:String},
                title: {type:String},
                description: {type:String}
            },
            {
                link: {type:String},
                title: {type:String},
                description: {type:String}
            },
            {
                link: {type:String},
                title: {type:String},
                description: {type:String}
            },
            {
                link: {type:String},
                title: {type:String},
                description: {type:String}
            }
       ],
       otherlinks:[
            {
               linkText: {type:String},
               link: {type:String},
            },
            {
                linkText: {type:String},
                link: {type:String},
            },
            {
                linkText: {type:String},
                link: {type:String},
            },
            {
                linkText: {type:String},
                link: {type:String},
            },
            {
                linkText: {type:String},
                link: {type:String},
            }
       ]
   },
   possibleCostEstimates:{
       type: String
   },
   inspirations:{
       videos:[
            {
               link: {type:String},
               title: {type:String},
               description: {type:String}
            },
            {
                link: {type:String},
                title: {type:String},
                description: {type:String}
            },
            {
                link: {type:String},
                title: {type:String},
                description: {type:String}
            },
            {
                link: {type:String},
                title: {type:String},
                description: {type:String}
            },
            {
                link: {type:String},
                title: {type:String},
                description: {type:String}
            }

       ],
       otherlinks:[
            {
               linkText: {type:String},
               link: {type:String},
            },
            {
                linkText: {type:String},
                link: {type:String},
            },
            {
                linkText: {type:String},
                link: {type:String},
            },
            {
                linkText: {type:String},
                link: {type:String},
            },
            {
                linkText: {type:String},
                link: {type:String},
            }
       ]
   },
   requiredPeople:[
       {
           jobTitle: {type: String},
           jobDescription: {type: String},
           purpose: {type: String},
           requirements: [
               {requirement: {type: String}}, {requirement: {type: String}}, {requirement: {type: String}},{requirement: {type: String}},{requirement: {type: String}}
           ],
           additionalInfo: {type: String}
       },
       {
            jobTitle: {type: String},
            jobDescription: {type: String},
            purpose: {type: String},
            requirements: [
                {requirement: {type: String}}, {requirement: {type: String}}, {requirement: {type: String}},{requirement: {type: String}},{requirement: {type: String}}
            ],
            additionalInfo: {type: String}
        },
        {
            jobTitle: {type: String},
            jobDescription: {type: String},
            purpose: {type: String},
            requirements: [
                {requirement: {type: String}}, {requirement: {type: String}}, {requirement: {type: String}},{requirement: {type: String}},{requirement: {type: String}}
            ],
            additionalInfo: {type: String}
        },
        {
            jobTitle: {type: String},
            jobDescription: {type: String},
            purpose: {type: String},
            requirements: [
                {requirement: {type: String}}, {requirement: {type: String}}, {requirement: {type: String}},{requirement: {type: String}},{requirement: {type: String}}
            ],
            additionalInfo: {type: String}
        },
        {
            jobTitle: {type: String},
            jobDescription: {type: String},
            purpose: {type: String},
            requirements: [
                {requirement: {type: String}}, {requirement: {type: String}}, {requirement: {type: String}},{requirement: {type: String}},{requirement: {type: String}}
            ],
            additionalInfo: {type: String}
        }
   ],
   posterId:{
       type: String,
       required: true
   }
 
}, {timestamps: true});
 
 
// Now, create model.
// typically models are capitalized
// first argument is name of model
const Posts = mongoose.model('Posts', postSchema)
 
// now export module so can use it throughout project
module.exports = Posts;