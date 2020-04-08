const Joi = require('joi');
const mongoose = require('mongoose')

const storySchema = new mongoose.Schema({

	name: {
		type: String,
		required: true
	},
	category:  String,
	readingTime: String,
	user_id: mongoose.Schema.Types.ObjectId,
	summary: {
		type: String//,
		//required: true
	},
	date: {
		type: Date,
		default: Date.now
	},
	likes: {
		type: [mongoose.Schema.Types.ObjectId]
	},
	numberOfLikes: {
		type: Number,
		default: 0
	},
	profilepic: String,
	comments: [{
		userName: {
			type: String
		},
		comment: {
			type: String
		},
		date: {
			type: Date,
			default: Date.now
		}	
	}],

	parts: [{
		title: {
			type: String
		},
		body: {
			type: String
		},
		date: {
			type: Date,
			default: Date.now
		}
	}]

})

function validateStory(story) {
  const schema = {
    name: Joi.string().min(3).required()
  };

  return Joi.validate(story, schema);
}

const Story = mongoose.model('Story', storySchema);
exports.Story = Story
//exports.validate = validateStory