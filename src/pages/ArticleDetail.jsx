import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { clearSelectedArticle, fetchArticleBySlug } from '../features/articles/articleSlice';
import { BiLike, BiDislike } from 'react-icons/bi';
import { voteArticle } from '../features/auth/authSlice';
import Loading from '../components/Loading/Loading';
import toast from 'react-hot-toast';
import { FaFacebook } from "react-icons/fa";
import { AiFillTwitterCircle } from "react-icons/ai";
import { TiSocialLinkedinCircular } from "react-icons/ti";
import { SiYoutubemusic } from "react-icons/si";
import { TiSocialInstagramCircular } from "react-icons/ti";
import ad2 from '../assets/ad2.png'

const ArticleDetail = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const selected = useSelector((state) => state.articles.selected);

  const [voteState, setVoteState] = useState({
    vote: null,
    up: 0,
    down: 0,
  });

  useEffect(() => {
    dispatch(clearSelectedArticle());
    dispatch(fetchArticleBySlug(slug));
  }, [dispatch, slug]);

  useEffect(() => {
    if (!selected?._id) return;

    let userVote = null;

    if (user) {
      const { upvotedArticles = [], downvotedArticles = [] } = user;
      if (upvotedArticles.includes(selected._id)) userVote = 'up';
      if (downvotedArticles.includes(selected._id)) userVote = 'down';
    }

    setVoteState({
      vote: userVote,
      up: selected.votes?.up?.length || 0,
      down: selected.votes?.down?.length || 0,
    });
  }, [selected?._id, user]);

  const handleVote = async (type) => {
    if (!user) return (
      toast('Bạn phải đăng nhập để bình chọn!', {
        icon: '‼️',
      })
    );

    try {
      await dispatch(voteArticle({ articleId: selected._id, type }));

      setVoteState((prev) => ({
        ...prev,
        vote: type,
        up: type === 'up' ? prev.up + 1 : prev.vote === 'up' ? prev.up - 1 : prev.up,
        down: type === 'down' ? prev.down + 1 : prev.vote === 'down' ? prev.down - 1 : prev.down,
      }));
    } catch (err) {
      console.error(err);
    }
  };

  if (!selected) {
    return (
      <div className='w-full min-h-screen flex justify-center items-center'>
        <Loading />
      </div>
    );
  }

  const { vote, up, down } = voteState;

  return (
    <div className='flex min-h-screen overflow-visible'>
      <div className="flex-2 p-4 py-80">
        <div className="sticky top-20 z-50 flex flex-col items-end gap-4 text-3xl text-gray-600">
          <FaFacebook className="hover:text-blue-600 cursor-pointer transition" onClick={() => window.open('https://www.facebook.com/baodientukienvan')} />
          <AiFillTwitterCircle className="hover:text-sky-500 cursor-pointer transition" />
          <TiSocialLinkedinCircular className="hover:text-blue-700 cursor-pointer transition" />
          <SiYoutubemusic className="hover:text-red-500 cursor-pointer transition" />
          <TiSocialInstagramCircular className="hover:text-orange-600 cursor-pointer transition" />
        </div>
      </div>
      <div className='flex-6 container max-w-[60%] p-6'>
        <h2 className='text-4xl font-bold mb-2'>{selected.title}</h2>
        <p className='text-sm text-gray-600 mb-4'>
          Tác giả: {selected.author?.username || 'Ẩn danh'}
        </p>

        <div
          className='article-content text-base leading-relaxed'
          dangerouslySetInnerHTML={{ __html: selected.content }}
        />

        <div className='flex gap-4 px-5 py-2 w-fit items-center text-black'>
          <button
            onClick={() => handleVote('up')}
            className={`h-12 px-4 flex items-center justify-center border rounded-full transition-all cursor-pointer
              ${vote === 'up' ? 'bg-gray-900 text-white' : 'border-slate-400 hover:scale-105'}`}
          >
            <BiLike />
            <span className='ml-2'>{up}</span>
          </button>

          <button
            onClick={() => handleVote('down')}
            className={`h-12 px-4 flex items-center justify-center border rounded-full transition-all cursor-pointer
              ${vote === 'down' ? 'bg-red-500 text-white' : 'border-slate-400 hover:scale-105'}`}
          >
            <BiDislike />
            <span className='ml-2'>{down}</span>
          </button>
        </div>
      </div>

      <div className='flex-4 py-30'>
        <img 
          src={ad2}
          onClick={() => window.open(`https://actiup.net/vi/event/quang-binh-international-marathon-2025`)} 
          className='
            w-[65%] sticky top-10 self-center cursor-pointer
        '/>
      </div>
    </div>
  );
};

export default ArticleDetail;
