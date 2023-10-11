const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utilities/auth');

router.get('/blogs', (req, res) => {
  const { id, name, description } = req.params;
  const blogData = {
    id,
    name,
    description,
  };
  res.render('blogs', blogData);
});

router.get('/blogs/:blogId', async (req, res) => {
  const blogId = req.params.blogId;

  try {
    const blog = await Blog.findByPk(blogId);

    if (blog) {
      res.render('blog', { blog });
    } else {
      res.status(404).send('Blog not found');
    }
  } catch (error) {
    console.error('Error', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/homepage', withAuth, async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['name', 'ASC']],
    });

    const users = userData.map((user) => user.get({ plain: true }));

    res.render('homepage', {
      users,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/homepage');
    return;
  }
  res.render('login');
});

router.get('/blogs', (req, res) => {
  res.send('Blogs page');
});

module.exports = router;
