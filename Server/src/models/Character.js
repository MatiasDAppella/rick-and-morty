const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
   sequelize.define('Character', {

    id: {
      type: DataTypes.STRING(4),
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    status: {
      type: DataTypes.STRING(8),
      allowNull: false,
      defaultValue: "unknown"
    },
    species: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    gender: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "unknown"
    },
    origin: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    image: {
      type: DataTypes.STRING
    }

   }, { timestamps: false });
};
