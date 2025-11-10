import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials = true;

export default function Posts() {
  const { accessToken, user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // Editing state
  const [editingPostId, setEditingPostId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  // Role permissions
  const canCreate = user?.role === 'Admin';
  const canEdit = user?.role === 'Admin' || user?.role === 'Editor';
  const canDelete = user?.role === 'Admin';

  useEffect(() => {
    if (accessToken) fetchPosts();
  }, [accessToken]);

  async function fetchPosts() {
    try {
      const res = await axios.get('/api/posts', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setPosts(res.data);
    } catch (err) {
      console.error('Fetch posts error:', err.response?.data || err.message);
    }
  }

  async function add() {
    if (!title || !content) return;
    try {
      await axios.post(
        '/api/posts',
        { title, content },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      setTitle('');
      setContent('');
      fetchPosts();
    } catch (err) {
      console.error('Add post error:', err.response?.data || err.message);
    }
  }

  function startEdit(post) {
    setEditingPostId(post._id);
    setEditTitle(post.title);
    setEditContent(post.content);
  }

  async function saveEdit() {
    if (!editTitle || !editContent) return;
    try {
      await axios.put(
        `/api/posts/${editingPostId}`,
        { title: editTitle, content: editContent },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      setEditingPostId(null);
      setEditTitle('');
      setEditContent('');
      fetchPosts();
    } catch (err) {
      console.error('Edit post error:', err.response?.data || err.message);
    }
  }

  async function removePost(id) {
    try {
      await axios.delete(`/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      fetchPosts();
    } catch (err) {
      console.error('Delete post error:', err.response?.data || err.message);
    }
  }

  return (
    <div>
      {/* Add Post */}
      {canCreate && (
        <div className="bg-slate-300 p-4 rounded shadow-xl mb-4 flex gap-2 items-center">
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Title"
            className="p-2 border rounded"
          />
          <input
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Content"
            className="p-2 border rounded"
          />
          <button
            onClick={add}
            className="bg-slate-800 text-white px-3 py-1 rounded hover:bg-green-800"
          >
            Add
          </button>
        </div>
      )}

      {/* Posts List */}
      <div className="grid grid-cols-1 gap-3">
        {posts?.length ? (
          posts.map(post => (
            <div key={post._id} className="bg-slate-100 p-4 rounded shadow-2xl">
              {editingPostId === post._id ? (
                <>
                  <input
                    value={editTitle}
                    onChange={e => setEditTitle(e.target.value)}
                    className="p-2 border rounded w-full mb-2"
                  />
                  <textarea
                    value={editContent}
                    onChange={e => setEditContent(e.target.value)}
                    className="p-2 border rounded w-full mb-2"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={saveEdit}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700
                      active:scale-90 transition-transform active:bg-green-600">
                      Save
                    </button>
                    <button
                      onClick={() => setEditingPostId(null)}
                      className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400
                      active:scale-90 transition-transform active:bg-gray-300">
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="font-semibold">{post.title}</div>
                  <div className="text-sm text-gray-500">
                    by {post.authorId?.name || 'Unknown'}
                  </div>
                  <div className="mt-2">{post.content}</div>

                  {/* Action buttons */}
                  <div className="flex gap-2 mt-2">
                    {canEdit && (
                      <button
                        onClick={() => startEdit(post)}
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-800
                        active:scale-90 transition-transform active:bg-blue-600">
                        Edit
                      </button>
                    )}
                    {canDelete && (
                      <button
                        onClick={() => removePost(post._id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700
                        active:scale-90 transition-transform active:bg-red-600">
                        Delete
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500">No posts to display</p>
        )}
      </div>
    </div>
  );
}
