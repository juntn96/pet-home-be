const mongoose = require('mongoose');

const locationCategorySchema = mongoose.Schema({
	name: {
		type: String,
	},
	hiddenlag: {
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

let LocationCategory = module.exports = mongoose.model('PostCategory', locationCategorySchema);

locationCategorySchema.pre('save', async function (next) {
	const currTime = new Date().getTime();
	this.updatedAt = currTime;
	if (this.isNew) {
		this.createdAt = currTime;
	}
	next();
});