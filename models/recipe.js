'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Recipe extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Recipe.belongsTo(models.Author);
			Recipe.belongsTo(models.Category);
		}
	}
	Recipe.init({
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		title: {
			type: DataTypes.STRING(200),
			allowNull: false,
		},
		ingredients: {
			type: DataTypes.JSONB,
			allowNull: false,
		},
		directions: {
			type: DataTypes.JSONB,
			allowNull: false,
		},
		image: {
			type: DataTypes.STRING(1000),
			allowNull: false,
		},
		shortDescription: {
			type: DataTypes.STRING(500),
			allowNull: false,
		},
		cookingTime: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 10,
		},
		preparationTime: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 10,
		},
		nutritionInformation: {
			type: DataTypes.JSONB,
			allowNull: false,
		},
		nutritionDetails: {
			type: DataTypes.STRING(200),
			allowNull: false,
		}
	}, {
		sequelize,
		freezeTableName: true,
	});
	return Recipe;
};