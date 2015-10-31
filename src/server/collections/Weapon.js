import mongoose from 'mongoose';
import Hero from './hero';


var WeaponSchema = new mongoose.Schema({
	name: {
		type: String
	},
	power: {
		type: Number
	},
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref:'Hero'
	}
});

var Weapon = mongoose.model('Weapon', WeaponSchema);

export default Weapon;