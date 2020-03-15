 
const express = require('express')
const Datahubs = require('../db/db.js')
const router = express.Router()

//POST	/api/posts	Creates a post using the information sent inside the request body.
router.post('/', (req, res) =>{
    const {title, contents} = req.body;
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
//POST /api/posts/:id/comments	Creates a comment for the post with the specified id using information sent inside of the request body.
router.post('/:id/comments', (req, res)=>{
    const { text, post_id } = req.body;
    !post_id ? res.status(404).json({success: false, errorMessage: "The post with the specified ID does not exist."}):
    Datahubs.insertComment({text, post_id})
            .then(data =>{
                if(data){
                    res.status(201).json({text, post_id})

                }else{
                    null
                }
            })
            .catch(err =>{
                if(!text){
                    res.status(400).json({
                        success: false, errorMessage: "Please provide text for the comment."
                    })
                }else{
                console.log(error);
                res
                  .status(500)
                  .json({
                    success: false,
                    errorMessage:
                      "There was an error while saving the comment to the database", err
                  });
                }
            })
})

//GET /api/posts Returns an array of all the post objects contained in the database.
router.get('/', (req, res)=>{
    Datahubs.find(req.query)
            .then(data =>{
                res.status(200).json(data);
            })
            .catch(err =>{
                res
                  .status(500)
                  .json({
                    success: false,
                    errorMessage:
                      "The posts information could not be retrieved.",err
                  });
            })
})

//GET /api/posts/:id	Returns the post object with the specified id.
router.get('/:id', (req,res) => {
    const {id} = req.params;
    !id ? res.status(404).json({success: false, errorMessage: "The post with the specified ID does not exist."}):
    Datahubs.findById(id)
            .then(data =>{
                res.status(200).json(data)
            })
            .catch(err =>{
                res
                  .status(500)
                  .json({
                    success: false,
                    errorMessage: "The post information could not be retrieved.", err
                  });
            })
})

//GET /api/posts/:id/comments	Returns an array of all the comment objects associated with the post with the specified id.


//DELETE /api/posts/:id	Removes the post with the specified id and returns the deleted post object.You may need to make additional calls to the database in order to satisfy this requirement.

//PUT /api/posts/:id


module.exports = router;