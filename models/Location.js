const mongoose = require('mongoose');

const locationSchema = mongoose.Schema({
  address: {
		type: String
	},
	name: {
			type: String,
	},
	ownerId: {
		type: String,
		ref: 'User'
	},
	location: {
		type: { type: String },
		coordinates: [Number],
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
