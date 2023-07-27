require('dotenv').config();
const { Sequelize } = require('sequelize');
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

// Models
const CharacterModel = require('./models/Character');
const UserModel = require('./models/User');

// Sequelize instance
const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/rickandmorty`,
  { logging: false, native: false }
);

// Executed models
CharacterModel(sequelize);
UserModel(sequelize);

// Associations
const { User, Character } = sequelize.models;

// user_favorite
User.belongsToMany(Character, { through: "user_favorite" });
Character.belongsToMany(User, { through: "user_favorite" });

module.exports = {
  ...sequelize.models,
  conn: sequelize
};