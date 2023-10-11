const sequelize = require('../config/connection');
const { User, Project, Blog } = require('../models'); // Imports the Blog model
const userData = require('./userData.json');
const projectData = require('./projectData.json');
const blogData = require('./blogData.json'); // Load blog data

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const project of projectData) {
    await Project.create({
      ...project,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  await createBlogs(users); // Calls the createBlogs

  process.exit(0);
};

const createBlogs = async (users) => {
  for (const blog of blogData) {
    await Blog.create({
      ...blog,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }
};

seedDatabase();

