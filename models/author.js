'use strict';
const {
	Model, UUIDV4
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Author extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Author.hasMany(models.Blog);
			Author.hasMany(models.Recipe);
		}
	}
	Author.init({
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		firstName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		image: {
			type: DataTypes.STRING(1000),
			allowNull: false,
		}
	}, {
		sequelize,
		freezeTableName: true,
	});
	return Author;
};