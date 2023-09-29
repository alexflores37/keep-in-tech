const blogId = 1;

Blogs.findByPk(blogId, {
  include: Comments, 
})
  .then((blog) => {
    if (!blog) {
      console.log('Blog not found');
      return;
    }

    const comments = blog.Comments; // Access comments

    console.log('Blog Comments:', blog.name);
    comments.forEach((comment) => {
      console.log('Comment:', comment.text);
    });
  })
  .catch((err) => {
    console.error('Error:', err);
  });


