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
			'question1': {
				"ans": "answer1",
				"image": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fessential%2Fphoto%2Ffresh-fruits-and-vegetables-gm589415708-101211749&psig=AOvVaw2fPxr9E7GkswmxMChz7Ct4&ust=1694252517033000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCODDj8_cmoEDFQAAAAAdAAAAABAJ",
			},
			'question2': {
				"ans": "answer2",
				"image": null,
			}
		};
		await queryInterface.bulkInsert('Blog', [{
			id: crypto.randomUUID(),
			title: "my first blog",
			content: JSON.stringify(obj),
			image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.dreamstime.com%2Fphotos-images%2Fvegetables.html&psig=AOvVaw2fPxr9E7GkswmxMChz7Ct4&ust=1694252517033000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCODDj8_cmoEDFQAAAAAdAAAAABAR",
			shortDescription: "a very short description",
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
