import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticles, deleteArticle, fetchArticlesByAuthor } from '../features/articles/articleSlice';
import { useNavigate } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';

const ArticleManager = () => {
  const user = useSelector(state => state.auth.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const articles = useSelector(state => state.articles.list)
  const loading = useSelector(state => state.articles.loading)
  const error = useSelector(state => state.articles.error)

  useEffect(() => {
    if(user.role === 'admin'){
      dispatch(fetchArticles());
    } else {
      dispatch(fetchArticlesByAuthor(user.id))
    }
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa bài viết này?')) {
      dispatch(deleteArticle(id));
    }
  };

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Quản lý bài viết</h1>
        <div className='flex gap-5 items-center'>
            <button
                onClick={() => navigate('/articles/new')}
                className="bg-indigo-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-indigo-700"
            >
                Tạo bài viết mới
            </button>
            <button
              onClick={handleLogout}
              className='bg-red-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-red-600
             '>
                Đăng xuất
            </button>
        </div>
      </div>

      {loading && <p>Đang tải...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2 text-left">Tiêu đề</th>
            <th className="border border-gray-300 p-2 text-left">Tác giả</th>
            <th className="border border-gray-300 p-2 text-left">Ngày tạo</th>
            <th className="border border-gray-300 p-2 text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {articles?.map((article) => (
            <tr key={article._id} className="hover:bg-gray-50">
              <td className="border border-gray-300 p-2">{article.title}</td>
              <td className="border border-gray-300 p-2">{article.author?.username || 'N/A'}</td>
              <td className="border border-gray-300 p-2">{new Date(article.createdAt).toLocaleDateString()}</td>
              <td className="border border-gray-300 p-2 text-center space-x-2">
                <button
                  onClick={() => navigate(`/articles/edit/${article._id}`)}
                  className="text-indigo-600 cursor-pointer hover:underline"
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(article._id)}
                  className="text-red-600 cursor-pointer hover:underline"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}

          {articles?.length === 0 && !loading && (
            <tr>
              <td colSpan="4" className="p-4 text-center text-gray-500">
                Chưa có bài viết nào
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ArticleManager;
