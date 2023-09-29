const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
  // Method to check if the provided login password matches the stored hashed password
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// Define the User model
User.init(
  {
    // User ID, auto-incremented primary key
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // User's name
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // User's email, must be unique and a valid email address
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    // User's hashed password, must be at least 5 characters long
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5],
      },
    },
  },
  {
    // Hooks to hash the password before creating and updating the user
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
      },
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
      },
    },
    // Sequelize instance
    sequelize,
    // Disable timestamps like 'createdAt' and 'updatedAt' columns
    timestamps: false,
    // Freeze the table name (prevent pluralization)
    freezeTableName: true,
    // Use underscores in table column names (e.g., 'created_at' instead of 'createdAt')
    underscored: true,
    // Model name
    modelName: 'user',
  }
);

// Export the User model
module.exports = User;
