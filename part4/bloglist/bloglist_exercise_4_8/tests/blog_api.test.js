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

test("notes are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

// test("there are two notes", async () => {
//   const response = await api.get("/api/blogs");

//   expect(response.body).toHaveLength(2);
// });

// test("the first note is about HTTP methods", async () => {
//   const response = await api.get("/api/blogs");

//   expect(response.body[0].title).toBe("Excel Project");
//   expect(response.body[1].author).toBe("DevMe");
//   expect(response.body[0].likes).toBe(29);
// });

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(initialBlogs.length);
});

test("a specific blog is within the returned blogs", async () => {
  const response = await api.get("/api/blogs");

  const contents = response.body.map((r) => r.title);
  expect(contents).toContain("DevWithMe");
});

afterAll(async () => {
  await mongoose.connection.close();
});
