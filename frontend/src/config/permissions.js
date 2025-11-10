export const ROLE_PERMISSIONS = {
  Admin: [
    'posts:create', 'posts:read', 'posts:update', 'posts:delete',
    'users:manage'
  ],
  Editor: [
    'posts:create', 'posts:read', 'posts:update:own', 'posts:delete:own'
  ],
  Viewer: [
    'posts:read'
  ]
}
