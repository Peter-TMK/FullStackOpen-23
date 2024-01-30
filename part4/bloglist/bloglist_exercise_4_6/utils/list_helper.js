const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => total + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null;

  let maxLikes = -1;
  let favorite = null;

  blogs.forEach((blog) => {
    if (blog.likes > maxLikes) {
      maxLikes = blog.likes;
      favorite = {
        title: blog.title,
        author: blog.author,
        likes: blog.likes,
      };
    }
  });

  return favorite;
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;

  const authorCounts = _.countBy(blogs, "author");

  const maxBlogs = _.max(Object.values(authorCounts));

  const topAuthor = _.findKey(authorCounts, (count) => count === maxBlogs);

  return { author: topAuthor, blogs: maxBlogs };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
