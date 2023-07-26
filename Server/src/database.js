require('dotenv').config();
const { Sequelize } = require('sequelize');
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

// Models
const FavoriteModel = require('./models/Favorite');
const UserModel = require('./models/User');

// Sequelize instance
const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/rickandmorty`,
  { logging: false, native: false }
);

// Executed models
FavoriteModel(sequelize);
UserModel(sequelize);

// Associations
const { User, Favorite } = sequelize.models;

// user_favorite
User.belongsToMany(Favorite, { through: "user_favorite" });

module.exports = {
  User,
  Favorite,
  conn: sequelize
};