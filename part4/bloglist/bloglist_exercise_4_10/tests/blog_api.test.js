const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "Excel Project",
    author: "Excel",
    url: "excel.url",
    likes: 29,
  },
  {
    title: "DevWithMe",
    author: "DevMe",
    url: "devme.url",
    likes: 39,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  let noteObject = new Blog(initialBlogs[0]);
  await noteObject.save();
  noteObject = new Blog(initialBlogs[1]);
  await noteObject.save();
});

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(initialBlogs.length);
});

test("a specific blog is within the returned blogs", async () => {
  const response = await api.get("/api/blogs");

  const contents = response.body.map((r) => r.title);
  expect(contents).toContain("DevWithMe");
});

test("blog post has 'id' property instead of '_id'", async () => {
  const response = await api.get("/api/blogs");

  const blog = response.body[0];
  expect(blog.id).toBeDefined();
});

test("a valid blog can be added", async () => {
  const newBlog = {
    title: "LMS-MERN Project",
    author: "Excel",
    url: "excel.url",
    likes: 7900,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");

  const contents = response.body.map((r) => r.title);
  expect(response.body).toHaveLength(initialBlogs.length + 1);
  expect(contents).toContain("LMS-MERN Project");
});

afterAll(async () => {
  await mongoose.connection.close();
});
