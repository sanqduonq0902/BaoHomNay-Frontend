// src/pages/ArticleDetail.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchArticleBySlug } from '../features/articles/articleSlice';
import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { voteArticle } from '../features/auth/authSlice';

const ArticleDetail = () => {

  const API = import.meta.env.VITE_BACK_END_HOST;

  const user = useSelector(state => state.auth)
  const upvotedArticles = useSelector(state => state.auth.user?.upvotedArticles || [])
  const downvotedArticles = useSelector(state => state.auth.user?.downvotedArticles || [])
  const { slug } = useParams();
  const selected = useSelector(state => state.articles.selected)
  const dispatch = useDispatch();
  const [vote, setVote] = useState(null);
  const [votes, setVotes] = useState({ up: 0, down: 0 });

  useEffect(() => {
    dispatch(fetchArticleBySlug(slug));
    console.log(user);
  }, [slug])

  useEffect(() => {
    if (!selected?._id) return;

    if (upvotedArticles.some(aid => aid === selected._id)) {
      setVote('up');
    } else if (downvotedArticles.some(aid => aid === selected._id)) {
      setVote('down');
    } else {
      setVote(null);
    }

    setVotes({
      up: selected?.votes?.up?.length || 0,
      down: selected?.votes?.down?.length || 0,
    });
  }, [selected, upvotedArticles, downvotedArticles]);

  const handleVote = async (type) => {
    try {
      await dispatch(voteArticle({ articleId: selected._id, type }));
      setVote(type); // local UI update
    } catch (err) {
      console.error(err);
    }
  };


  if (!selected) return <p>Đang tải...</p>;

  return (
    <div>
      <div className="flex">
        <div className='flex-1'>

        </div>
        <div className="flex-4 container max-w-[60%] p-6 ">
          <h2 className="text-4xl font-bold mb-2">{selected?.title}</h2>
          <p className="text-sm text-gray-600 mb-4">Tác giả: {selected?.author?.username}</p>
          <div className="article-content text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: selected?.content }} />
          <div className="flex gap-4 px-5 py-2 w-fit items-center text-black">
            <button
              className={`
            h-12 px-4 flex items-center justify-center border rounded-full transition-all cursor-pointer 
            ${vote === 'up' ? 'bg-gray-900 text-white' : 'border-slate-400 hover:scale-115'}
          `}
              onClick={() => handleVote('up')}
            >
              <BiLike />
            </button>
            <button
              className={`
            h-12 px-4 flex items-center justify-center border rounded-full transition-all cursor-pointer
            ${vote === 'down' ? 'bg-red-500 text-white' : 'border-slate-400 hover:scale-115'}
          `}
              onClick={() => handleVote('down')}
            >
              <BiDislike />
            </button>
          </div>
        </div>

        <div className='flex-3'>

        </div>
      </div>
    </div>

  );
};

export default ArticleDetail;
