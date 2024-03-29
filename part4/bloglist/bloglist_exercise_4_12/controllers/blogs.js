const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogRouter.post("/", async (request, response) => {
  // const blog = new Blog(request.body);
  const { title, author, url } = request.body;

  if (!title || !url) {
    return response.status(400).json({ error: "Title or URL is missing" });
  }

  const blog = new Blog({
    title,
    author,
    url,
    likes: request.body.likes || 0, // Set likes to 0 if it's missing in the request
  });

  const savedBlog = await blog.save();
  response.status(201).json(savedBlog);
});

module.exports = blogRouter;
