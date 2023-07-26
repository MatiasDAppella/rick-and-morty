const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
   sequelize.define('User', {

    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(10),
      allowNull: false
    }

   }, { timestamps: false });
};
