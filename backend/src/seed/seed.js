require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Post = require('../models/Post');

async function seed() {
  // Connect to MongoDB
  await mongoose.connect(process.env.MONGO_URI);
  console.log('MongoDB connected for seeding');

  // Clear existing users and posts
  await User.deleteMany({});
  await Post.deleteMany({});

  // Hash passwords
  const adminHash = await bcrypt.hash('AdminPass123', 10);
  const editorHash = await bcrypt.hash('EditorPass123', 10);
  const viewerHash = await bcrypt.hash('ViewerPass123', 10);

  // Create users
  const admin = await User.create({
    name: 'Admin User',
    email: 'admin@example.com',
    passwordHash: adminHash,
    role: 'Admin'
  });

  const editor = await User.create({
    name: 'Editor User',
    email: 'editor@example.com',
    passwordHash: editorHash,
    role: 'Editor'
  });

  const viewer = await User.create({
    name: 'Viewer User',
    email: 'viewer@example.com',
    passwordHash: viewerHash,
    role: 'Viewer'
  });

  // Optional: create a sample post
  await Post.create({
    title: 'Welcome Post',
    content: 'This is the first post by Admin.',
    authorId: admin._id
  });

  console.log('Seeded users:');
  console.log('Admin -> admin@example.com / AdminPass123');
  console.log('Editor -> editor@example.com / EditorPass123');
  console.log('Viewer -> viewer@example.com / ViewerPass123');

  console.log('Sample post created by Admin.');
  process.exit();
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
