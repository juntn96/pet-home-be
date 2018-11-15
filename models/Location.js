const mongoose = require('mongoose');

let childRecords = mongoose.Schema({
	lat: {type: Number},
	lng: {type: Number},
  addressDetail: {type: String}, 
	createdAt: {
		type: Number,
		default: new Date().getTime()
	}
});

const locationSchema = mongoose.Schema({
  address: [childRecords],
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
  systemRating: {
    type: Number
  },
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

let Location = module.exports = mongoose.model('Location', locationSchema);

locationSchema.pre('save', async function (next) {
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