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
		await queryInterface.bulkInsert('Category', [{
			value: "Vegan",
			image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fstock.adobe.com%2Fsearch%3Fk%3Dvegetable&psig=AOvVaw2fPxr9E7GkswmxMChz7Ct4&ust=1694252517033000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCODDj8_cmoEDFQAAAAAdAAAAABAE",
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
