const jwt = require("jsonwebtoken");

const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

// const getTokenFrom = (request) => {
//   const authorization = request.get("authorization");
//   if (authorization && authorization.startsWith("Bearer ")) {
//     return authorization.replace("Bearer ", "");
//   }
//   return null;
// };

blogRouter.get("/", async (request, response, next) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogRouter.post("/", async (request, response, next) => {
  // const blog = new Blog(request.body);
  const body = request.body;
  const { title, author, url } = body;

  // const decodedToken = jwt.verify(request.token, process.env.SECRET);
  // if (!decodedToken.id) {
  //   return response.status(401).json({ error: "token invalid" });
  // }
  // const user = await User.findById(decodedToken.id);

  const user = request.user;

  if (!title || !url) {
    return response.status(400).json({ error: "Title or URL is missing" });
  }

  // const user = await User.findById(body.userId);

  const blog = new Blog({
    title,
    author,
    url,
    likes: request.body.likes || 0, // Set likes to 0 if it's missing in the request
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.status(201).json(savedBlog);
});

// blogRouter.delete("/:id", async (request, response, next) => {
//   await Blog.findByIdAndDelete(request.params.id);
//   response.status(204).end();
// });

blogRouter.delete("/:id", async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "Token missing or invalid" });
  }

  const blog = await Blog.findById(request.params.id);
  if (!blog) {
    return response.status(404).json({ error: "Blog not found" });
  }

  // Check if the user ID from the token matches the ID of the blog's creator
  if (blog.user.toString() !== decodedToken.id) {
    return response
      .status(403)
      .json({ error: "Unauthorized to delete this blog" });
  }

  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

blogRouter.put("/:id", async (request, response, next) => {
  const { title, author, url, likes } = request.body;

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,

    { title, author, url, likes },
    { new: true, runValidators: true, context: "query" }
  );
  response.status(201).json(updatedBlog);
});

module.exports = blogRouter;
