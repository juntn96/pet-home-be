const mongoose = require('mongoose');

const petSchema = mongoose.Schema({
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
  favoritePet: [{
    type: String
  }],
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

let Location = module.exports = mongoose.model('Pet', petSchema);

petSchema.pre('save', async function (next) {
	const currTime = new Date().getTime();
	this.updatedAt = currTime;
	if (this.isNew) {
		this.createdAt = currTime;
	}
	next();
});