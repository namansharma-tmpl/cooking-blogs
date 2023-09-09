'use strict';
const {
	Model, UUIDV4
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Blog extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Blog.belongsTo(models.Author);			
		}
	}
	Blog.init({
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		title: {
			type: DataTypes.STRING(200),
			allowNull: false,
		},
		content: {
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
		}
	}, {
		sequelize,
		freezeTableName: true,
	});
	return Blog;
};