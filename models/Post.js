const mongoose = require('mongoose');

let childRecords = mongoose.Schema({
	userCommentId: {type: String, ref: 'User'},
	content: {type: String},
	createdAt: {
		type: Number,
		default: new Date().getTime()
	}
});

let postSchema = mongoose.Schema({
	title: {type: String},
  ownerId: {type: String, ref: 'User'},
  upVote: {
    type: Number,
    default: 0
  },
  downVote: {
    type: Number,
    default: 0
  },
  typeId: { type: String, ref: 'PostCategory'},
  status: {type: Number },
  comments: [childRecords],
  images: [{
    type: String
  }],
	createdAt: {
		type: Number,
		default: new Date().getTime()
	},
	updatedAt: {
		type: Number,
		default: new Date().getTime()
	},
	deletionFlag: {type: Number, default: 1}
});

let Post = module.exports = mongoose.model('Post', postSchema);

postSchema.pre('save', async function (next) {
	const currTime = new Date().getTime();
	this.updatedAt = currTime;
	if (this.isNew) {
		this.createdAt = currTime;
	}
	next();
});

childRecords.pre('save', async function (next) {
	const currTime = new Date().getTime();
	if (this.isNew) {
		this.createdAt = currTime;
	}
	next();
});