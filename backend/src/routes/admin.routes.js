const router = require('express').Router();
const admin = require('../controllers/admin.controller');
const { authenticate } = require('../middleware/auth.middleware');

router.get('/users', authenticate, admin.listUsers);
router.put('/users/:id/role', authenticate, admin.updateUserRole);

module.exports = router;
