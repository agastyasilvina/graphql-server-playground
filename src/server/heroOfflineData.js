/*
	This defines the set of data used in the schema 
	(Hard coded just for the demo)
*/
//Hero:
var luke = {
	id: '100',
	name: 'Alex Lumierre',
	friends: ['101', '103','201'],
	skills: [1,2],
	job: 1
}

var jin = {
	id: '101',
	name: 'Anezka Lee',
	friends: ['100','103','200','201'],
	skills: [1,3],
	job: 2
}

var han = {
	id: '103',
	name: 'Hordio Hans',
	friends: ['100','101','200'],
	skills: [2,3],
	job: 4
}

var ventus = {
	id: '104',
	name: 'Ventura Brandon',
	friends: ['105'],
	skills: [1,2,3,4],
	job: 0 
}

var terra = {
	id: '105',
	name: 'Terra Dimeline', 
	friends: ['104'],
	skills: [1,3],
	job: 3
}

var humanData = {
	100: luke,
	101: jin,
	103: han,
	104: ventus,
	105: terra
}

//Monster:
var vicky = {
	id: '200',
	name: 'Victoria Endanga',
	friends: ['201','101','103'],
	skills: [3,4],
	primaryFunction: 'Pet'
}

var mika = {
	id: '201',
	name: 'Mikhail Juliarus',
	friends: ['200','100','101'],
	skills: [1,2,3,4],
	primaryFunction: 'Fighting'
}

var summonData = {
	200: vicky,
	201: mika
}

//HELPER FUNCTION:
//get the character based on ID:
function getCharacter(id) {
	return Promise.resolve(humanData[id] || summonData[id]);
}
//character is an interface (I guess)
export function getFriends(character) {
	return character.friends.map(id => getCharacter(id));
}

//Allows us to fetch the hero(based on the best skill):
export function getHero(skill) {
	if(skill === 1) {
		return jin;
	} else if(skill === 2) {
		return luke;
	} else if(skill === 3) {
		return vicky;
	} else {
		return mika;
	}
}

//get the human given ID:
export function getHuman(id) {
	return humanData[id];
}

//get the summon given ID:
export function getSummon(id) {
	return summonData[id];
}