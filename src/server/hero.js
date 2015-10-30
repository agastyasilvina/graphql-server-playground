import mongoose from 'mongoose';
import Pet from './pet';
import Weapon from './weapon';

var HeroSchema = new mongoose.Schema({
	name : {
		type: String
	},
	friends: [{
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'Hero'
	}],
	pets:[{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Pet'
	}],
	weapon:[{
		type: mongoose.Schema.Types.ObjectId,
		ref:'Weapon'
	}]
});

var Hero = mongoose.model('Hero', HeroSchema);

export default Hero;
