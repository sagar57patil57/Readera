const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { Story } = require('../models/story');
const {User} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

//GET ALL STORIES
router.get('/all', async (req, res) => {
  const stories = await Story.find();
  res.status(200).send({ stories });
});

//GET A STORY
router.get('/:storyid', auth, async (req, res) => {
  let id = mongoose.Types.ObjectId(req.params.storyid)
  const stories = await Story.find({ _id : id });
  res.status(200).send({ stories });
});

//ADD STORY
router.post('/add', auth, async (req, res) => {
  //const { error } = validate(req.body); 
  //if (error) return res.status(400).send(error.details[0].message);

  let story = new Story(req.body);
  story = await story.save();
  
  res.send(story);
});

//ADD PART
router.post('/:storyid', auth, async (req, res) => {

  let id = mongoose.Types.ObjectId(req.params.storyid)
  Story.findOneAndUpdate({ _id : id },{ $push : { parts: req.body } },(err,story)=>{
    if(err){
      return res.send(err)
    }
    else {
      return res.send("success");
    }
  });
});

//COMMENT ADDED
router.post('/comment/:storyid', auth, async (req, res) => {

  let id = mongoose.Types.ObjectId(req.params.storyid)

  Story.findOneAndUpdate({ _id : id },{ $push : { comments: req.body } },(err,story)=>{
    if(err){
      return res.status(401).send(err)
    }
    else {
      return res.status(200).send("success");
    }
  });
});

//RETURNS INDIVIDUAL PARTS
router.get('/:storyid/:partid', auth, async (req, res) => {
  let partid = mongoose.Types.ObjectId(req.params.partid)
  let storyid = mongoose.Types.ObjectId(req.params.storyid)
  try{
    let stories = await Story.find({ "parts._id" : partid },
                                  { "parts" : {$elemMatch: {_id: partid}}});
  } catch(e){
    console.log(e)
  }
  stories = stories[0].parts[0]
  console.log(stories)
  res.status(200).send({ stories });
});

//DELETE STORY
router.delete('/:id', auth, async (req, res) => {
  let id = mongoose.Types.ObjectId(req.params.id)
  try{
    const story = await Story.findByIdAndRemove(id);
  }
  catch(e){
    console.log(e)
  }

  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  res.send(story);
});

//LIKE
router.post('/like/:storyid', auth, async (req, res) => {

  try{
    let id = mongoose.Types.ObjectId(req.params.storyid)
    let userId = mongoose.Types.ObjectId(req.body.uID)
    let numberOfLikes
    resultUser = await Story.find({'likes': mongoose.Types.ObjectId(req.body.uID), _id:id})

    let liked = await Story.find({ '_id': id }).select('numberOfLikes')
    numberOfLikes = liked[0].numberOfLikes
    let y = parseInt(numberOfLikes) + 1
    console.log(resultUser,"po")
    if(resultUser.length<1) {
      await Story.updateOne({ '_id': id }, { $set: { 'numberOfLikes': y } })

      await Story.findOneAndUpdate({ _id : id },{ $push : { likes: mongoose.Types.ObjectId(req.body.uID) } })
      return res.send({ numberOfLikes: y, mssg: 'INC' })
    }
    res.send({ numberOfLikes, mssg: 'NO' })
  }
  catch(e){
    console.log(e)
  }
  
})

//ADD STORY
/*router.post('/upload/:storyid',(req, res)=>{
  const { image } = req.files;  //just like req.body but for files
  image.mv(path.resolve(__dirname,'..' ,'public/storyimages', image.name), (err)=>{

    console.log(err);

    Story.updateOne({_id: req.params.storyid}, {
      profilepic: '/storyimages/' + image.name,
    },(err,post)=>{
      console.log('Ye',post);
    return res.send({ "successs" })
  });

  }); //move this file to other location
});*/

module.exports = router;