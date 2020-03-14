 
const express = require('express')
const Datahubs = require('../db/db.js')
const router = express.Router()

//POST	/api/posts	Creates a post using the information sent inside the request body.
router.post('/', (req, res) =>{
    const {title, contents} = req.body
    !title || !contents ? res.status(400).json({success: false, errorMessage: "Please provide title and contents for the post."}):
    console.log('title', title);
    Datahubs.insert({title, contents})
            .then(data =>{
                console.log('post test')
                res.status(201).json(data);
            })
            .catch(error =>{
                console.log(error);
                res.status(500).json({
                  errorMessage:
                    "There was an error while saving the post to the database",error
                });
            })
})
//POST /api/posts/:id/ comments	Creates a comment for the post with the specified id using information sent inside of the request body.
router.post('/:id', (req, res)=>{
    Datahubs.insertComment(req.body.id)
            .then(data =>{
                res.status(201)
            })
})

//GET /api/posts Returns an array of all the post objects contained in the database.

//GET /api/posts/:id	Returns the post object with the specified id.

//GET /api/posts/:id/ comments	Returns an array of all the comment objects associated with the post with the specified id.

//DELETE /api/posts/:id	Removes the post with the specified id and returns the deleted post object.You may need to make additional calls to the database in order to satisfy this requirement.

//PUT /api/posts/:id


module.exports = router;