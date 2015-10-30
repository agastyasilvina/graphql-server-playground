import mongoose from 'mongoose';
import Hero from '../src/server/hero';
import Pet from '../src/server/pet';
import Weapon from '../src/server/weapon';


//connect to mongo
mongoose.connect('mongodb://localhost/graphql');

//Weapon ID:
var oblivionId ='5633ccf43970cd5028256621';
var oathkeeperId = '5633ccf43970cd5028256622';

//seed the pet:
var pets = [
	{
		_id: '559645cd1a38532d14349240',
		name: 'Jin',
		type: 'Unicorn'
	},
	{
		_id: '559645cd1a38532d14349241',
		name: 'Vicky',
		type: 'Cat'
	}
];

var heros = [
	{
		_id: '559645cd1a38532d14349243',
		name: 'Luca',
		friends: ['559645cd1a38532d14349244','559645cd1a38532d14349245'],
		pets: ['559645cd1a38532d14349240','559645cd1a38532d14349241'],
		weapon: [oblivionId]
	},
	{
		_id: '559645cd1a38532d14349244',
		name: 'Juliana',
		friends: ['559645cd1a38532d14349243'],
		pets: ['559645cd1a38532d14349241']
	},
	{
		_id: '559645cd1a38532d14349245',
		name: 'Andrii',
		weapon: [oathkeeperId]
	}

];

var weapons = [
	{
		_id: oblivionId,
		name: 'Oblivion',
		power: 5000,
		owner: '559645cd1a38532d14349243'
	}, 
	{
		_id: oathkeeperId,
		name: 'OathKeeper',
		power: 7777,
		owner: '559645cd1a38532d14349245'
	}
]

mongoose.connection.collections['pets'].drop(function(err) {

	Pet.create(pets, function(err, res){
		if(err) {
			console.log(err);
		} else {
			console.log('Pets data created');
		}

		process.exit();

	});

});


mongoose.connection.collections['heros'].drop(function(err) {

	Hero.create(heros, function(err, res){
		if(err) {
			console.log(err);
		} else {
			console.log('Heroes data created');
		}

		process.exit();

	});

});

mongoose.connection.collections['weapons'].drop(function(err) {

	Weapon.create(weapons, function(err, res){
		if(err) {
			console.log(err);
		} else {
			console.log('Weapon data created');
		}

		process.exit();

	});

});
