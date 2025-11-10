const router = require('express').Router();
const posts = require('../controllers/posts.controller');
const { authenticate } = require('../middleware/auth.middleware');

router.get('/', authenticate, posts.list);
router.post('/', authenticate, posts.create);
router.put('/:id', authenticate, posts.update);
router.delete('/:id', authenticate, posts.remove);

module.exports = router;
