const Post = require('../models/Post');

// GET /api/posts - list all posts
async function list(req, res) {
  try {
    const posts = await Post.find().populate('authorId', 'name email role');
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

// POST /api/posts - create a new post (Admin only)
async function create(req, res) {
  const { title, content } = req.body;
  if (!title || !content)
    return res.status(400).json({ message: 'Missing fields' });

  if (req.user.role !== 'Admin') {
    return res.status(403).json({ message: 'Forbidden' });
  }

  try {
    const post = await Post.create({
      title,
      content,
      authorId: req.user.id,
    });
    res.status(201).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

// PUT /api/posts/:id - update a post (Admin or Editor)
async function update(req, res) {
  const id = req.params.id;
  const { title, content } = req.body;

  try {
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: 'Not found' });

    // Only Admin or Editor can edit
    if (req.user.role !== 'Admin' && req.user.role !== 'Editor') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    post.title = title || post.title;
    post.content = content || post.content;
    post.updatedAt = new Date();
    await post.save();
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

// DELETE /api/posts/:id - delete a post (Admin only)
async function remove(req, res) {
  const id = req.params.id;

  if (req.user.role !== 'Admin') {
    return res.status(403).json({ message: 'Forbidden' });
  }

  try {
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: 'Not found' });

    await Post.findByIdAndDelete(id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { list, create, update, remove };
