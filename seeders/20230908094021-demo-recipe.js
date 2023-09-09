'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		*/
		let obj = {
			"for dough": [				
				'refined flour',
				'olive oil',
				'salt',
				'water'
			],
			"for sauce": [
				'tomato',
				'oregano',
				'olive oil',
				'salt',
				'black pepper'
			]
		};
		let obj2 = {
			'step1 name': {
				'description': 'step1 description',
				'image': 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fpizza&psig=AOvVaw1skNBsF3cCCEpyAkSvgnKA&ust=1694253721428000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCOD7xYzhmoEDFQAAAAAdAAAAABAE',
			},
			'step2 name': {
				'description': 'step2 description',
				'image': null,
			}
		};
		let obj3 = {
			"calories": "219.9kcal",
			"total fat": "10.7g",
			"protein": "7.9g",
			"carbohydrate": "22.3g",
			"cholestrol": "27.4mg",
		};
		await queryInterface.bulkInsert('Recipe', [{
			id: crypto.randomUUID(),
			title: "tasty recipe for a dish",
			ingredients: JSON.stringify(obj),
			directions: JSON.stringify(obj2),
			image: "https://media.istockphoto.com/id/938742222/photo/cheesy-pepperoni-pizza.jpg?s=612x612&w=0&k=20&c=D1z4xPCs-qQIZyUqRcHrnsJSJy_YbUD9udOrXpilNpI=",
			cookingTime: 20,
			preparationTime: 20,
			shortDescription: 'very short description',
			nutritionInformation: JSON.stringify(obj3),
			nutritionDetails: "not nutritious",
			CategoryId: 2,
			createdAt: new Date(),
			updatedAt: new Date(),
		}]);
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
	}
};
