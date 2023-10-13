const sequelize = require('../../config/connection');
const { User, Blog, Comment } = require('../../models'); // Import your Sequelize models
const userData = require('./userData.json');
const commentData = require('./commentData.json');
const blogData = require('./blogData.json');

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });

    await createBlogs(users);
    await seedComments();

    process.exit(0);
  } catch (error) {
    console.error('Error seeding the database', error);
  }
};

const createBlogs = async (users) => {
  try {
    for (const blog of blogData) {
      await Blog.create({
        ...blog,
        user_id: users[Math.floor(Math.random() * users.length)].id,
      });
    }
  } catch (error) {
    console.error('Error creating blogs', error);
  }
};

const seedComments = async () => {
  try {
    for (const comment of commentData) {
      await Comment.create({
        text: comment.text,
        name: comment.name,
        user_id: comment.user_id,
      });
    }

    console.log('Database seeded with comments.');
  } catch (error) {
    console.error('Error seeding comments', error);
  }

  process.exit(0);
};

seedDatabase();
