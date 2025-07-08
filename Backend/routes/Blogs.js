const { Router } = require("express");
const router = Router();
const Blog = require("../models/Blogs");
const { requireAuth } = require("../middlewares/auth");

// Get all blogs (public)
router.get("/",  async (req, res) => {
  try {
    const blogs = await Blog.find({});
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blogs" });
  }
});

// Get single blog (public)
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blog" });
  }
});

// Create blog (protected)
router.post("/", requireAuth, async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const newBlog = new Blog({
      title,
      content,
      author,
      // user: req.user._id,
    });
    await newBlog.save();
    console.log("POST /api/blogs - Request body:", req.body);

    res.status(201).json({ message: "Blog created successfully", blog: newBlog });
  } catch (error) {
    res.status(500).json({ message: "Error creating blog" });
  }
});

// Update blog (protected)
router.put("/:id", requireAuth, async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, { title, content, author }, { new: true });
    await updatedBlog.save();
    if (!updatedBlog) return res.status(404).json({ message: "Blog not found" });

    res.status(200).json({ message: "Blog updated successfully", blog: updatedBlog });
  } catch (error) {
    res.status(500).json({ message: "Error updating blog" });
  }
}); 

module.exports = router;

   

