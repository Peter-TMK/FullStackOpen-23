const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./blog_helper");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const User = require("../models/user");

// const initialBlogs = [
//   {
//     title: "Excel Project",
//     author: "Excel",
//     url: "excel.url",
//     likes: 29,
//   },
//   {
//     title: "DevWithMe",
//     author: "DevMe",
//     url: "devme.url",
//     likes: 39,
//   },
// ];
describe("Blog API tests", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    // let noteObject = new Blog(initialBlogs[0]);
    // await noteObject.save();
    // noteObject = new Blog(initialBlogs[1]);
    // await noteObject.save();
    await Blog.insertMany(helper.initialBlogs);
  });

  describe("GET /api/blogs", () => {
    test("all blogs are returned", async () => {
      const response = await api.get("/api/blogs");

      expect(response.body).toHaveLength(helper.initialBlogs.length);
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
  });

  describe("POST /api/blogs", () => {
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

      // const response = await api.get("/api/blogs");
      // expect(response.body).toHaveLength(helper.initialBlogs.length + 1);
      const blogsAtEnd = await helper.blogsInDb();
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

      const contents = blogsAtEnd.map((r) => r.title);
      expect(contents).toContain("LMS-MERN Project");
    });

    test("missing likes property defaults to 0", async () => {
      const newBlog = {
        title: "Check if likes missing",
        author: "Missing Likes",
        url: "http://test.url",
        // likes property is intentionally omitted
      };

      await api.post("/api/blogs").send(newBlog);

      const response = await helper.blogsInDb();
      // const addedBlog = response.body.find(
      const addedBlog = response.find(
        (blog) => blog.title === "Check if likes missing"
      );

      expect(addedBlog.likes).toBe(0);
    });

    test("returns 400 Bad Request if title is missing", async () => {
      const newBlog = {
        author: "John Doe",
        url: "https://example.com",
        likes: 10,
      };

      await api.post("/api/blogs").send(newBlog).expect(400);
    });

    test("returns 400 Bad Request if url is missing", async () => {
      const newBlog = {
        title: "Test Blog",
        author: "Jane Doe",
        likes: 20,
      };

      await api.post("/api/blogs").send(newBlog).expect(400);
    });
  });

  describe("DELETE /api/blogs/:id", () => {
    test("succeeds with status code 204 if id is valid", async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToDelete = blogsAtStart[0];

      await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

      const blogsAtEnd = await helper.blogsInDb();

      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

      const contents = blogsAtEnd.map((r) => r.title);

      expect(contents).not.toContain(blogToDelete.title);
    });
  });

  describe("PUT /api/blogs/:id", () => {
    test("Updating an existing blog with valid data", async () => {
      const updatedBlogData = {
        title: "Updated Title",
        author: "Updated Author",
        url: "https://updated.url/",
        likes: 10,
      };

      const blogsBeforeUpdate = await Blog.find({});
      const blogToUpdateId = blogsBeforeUpdate[0]._id;

      await api
        .put(`/api/blogs/${blogToUpdateId}`)
        .send(updatedBlogData)
        .expect(201);

      const blogsAfterUpdate = await Blog.find({});
      const updatedBlog = blogsAfterUpdate.find((blog) =>
        blog._id.equals(blogToUpdateId)
      );
      expect(updatedBlog.title).toBe(updatedBlogData.title);
      expect(updatedBlog.author).toBe(updatedBlogData.author);
      expect(updatedBlog.url).toBe(updatedBlogData.url);
      expect(updatedBlog.likes).toBe(updatedBlogData.likes);
    });
  });

  // describe("User API tests", () => {
  //   beforeEach(async () => {
  //     await User.deleteMany({});
  //     await User.insertMany(helper.invalidUser);
  //   });

  // test("creating a new user with invalid data fails", async () => {
  //   const invalidUser = {
  //     username: "us",
  //     password: "pa",
  //   };

  //   const response = await api.post("/api/users").send(invalidUser).expect(400);
  //   expect(response.body.error).toContain(
  //     "username and password must be at least 3 characters long"
  //   );

  // Check if the user was not added to the database
  // const users = await helper.usersInDb();
  // expect(users).toHaveLength(0);
  // });
  // });

  describe("User creation", () => {
    beforeEach(async () => {
      await User.deleteMany({});
    });

    test("fails with status code 400 if username is missing", async () => {
      const newUser = {
        password: "test123",
      };

      await api.post("/api/users").send(newUser).expect(400);
    });

    test("fails with status code 400 if username is too short", async () => {
      const newUser = {
        username: "us",
        password: "test123",
      };

      await api.post("/api/users").send(newUser).expect(400);
    });

    test("fails with status code 400 if password is missing", async () => {
      const newUser = {
        username: "testuser",
      };

      await api.post("/api/users").send(newUser).expect(400);
    });

    test("fails with status code 400 if password is too short", async () => {
      const newUser = {
        username: "testuser",
        password: "pw",
      };

      await api.post("/api/users").send(newUser).expect(400);
    });

    test("fails with status code 400 if username is not unique", async () => {
      const newUser = {
        username: "testuser",
        password: "test123",
      };

      // Create a user with the same username
      await api.post("/api/users").send(newUser);

      // Attempt to create another user with the same username
      await api.post("/api/users").send(newUser).expect(400);
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});
