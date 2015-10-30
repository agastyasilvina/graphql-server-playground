import mongoose from 'mongoose';

var PetSchema = new mongoose.Schema({
	name: {
		type: String
	},
	type: {
		type: String
	}
});

var Pet = mongoose.model('Pet', PetSchema);

export default Pet;