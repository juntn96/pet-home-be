const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
	url: { type: String },
	width: {
		type: Number,
		default: 0,
	},
	height: {
		type: Number,
		default: 0,
	},
	publicId: { type: String },
});

const petSchema = mongoose.Schema({
	name: {
		type: String,
	},
	ownerId: {
		type: String,
		ref: 'User'
	},
	typeId: {
		type: String,
		ref: 'LocationCategory'
	},
	favoritePet: [{
		petId: {
			type: String,
		},
		_id: false,
	}],
	gender: {
		type: String,
	},
	branch: {
		type: String,
	},
	images: [imageSchema],
	deletionFlag: {
		type: Boolean,
		default: false,
	},
	createdAt: {
		type: Number,
		default: new Date().getTime(),
	},
	updatedAt: {
		type: Number,
		default: new Date().getTime(),
	},
});

let Pet = module.exports = mongoose.model('Pet', petSchema);

petSchema.pre('save', async function (next) {
	const currTime = new Date().getTime();
	this.updatedAt = currTime;
	if (this.isNew) {
		this.createdAt = currTime;
	}
	next();
});