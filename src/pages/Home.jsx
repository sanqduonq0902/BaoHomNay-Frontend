// src/pages/HomePage.jsx
import React, { useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { fetchArticles } from '../features/articles/articleSlice';
import Loading from '../components/Loading/Loading';

const HomePage = () => {

  const { category } = useParams();

  const dispatch = useDispatch();
  const articles = useSelector(state => state.articles.list)
  const loading = useSelector(state => state.articles.loading)
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchArticles(category));
    console.log(articles);
    
  }, [dispatch, category]);

  const featured = articles?.[0];

  return (
    !loading ?
    <div>
      <HeroSection featuredArticle={featured} />
      {/* <div className="w-[75%] mx-auto px-4">
        <h2 className="text-xl font-bold mb-4">Bài viết mới nhất</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {articles.slice(1).map((article) => (
            <div key={article._id} className="bg-white rounded shadow p-4">
              <img src={article.thumbnail} alt={article.title} className="h-40 w-full object-cover rounded" />
              <h3 className="text-lg font-semibold mt-2">{article.title}</h3>
              <p className="text-sm text-gray-600">{article.summary}</p>
              <Link to={`/article/${article.slug}`} className="text-indigo-600 mt-2 inline-block">
                Xem chi tiết
              </Link>
            </div>
          ))}
        </div>
      </div> */}

      <div
        className='w-[75%] mx-auto flex justify-center items-center gap-4 cursor-pointer
      '>
        <div
          className='flex-6 flex flex-col gap-2
        '>
          <div
            onClick={() => navigate(`/article/${featured.slug}`)}
            className='flex bg-gray-100 gap-2
          '>
            <img src={featured?.thumbnail} alt="" className='flex-6 w-110 object-cover object-center' />
            <div className='flex-4 p-5 flex flex-col items-center gap-3'>
              <span className=' text-xl font-semibold text-ellipsis line-clamp-3'>
                {featured?.title}
              </span>
              <p className='text-slate-600 text-ellipsis line-clamp-5'>
                {featured?.summary}
              </p>
            </div>
          </div>

          <div className='w-full flex items-center gap-3'>
            {
              articles
              .filter((_, index) => index >= 1 && index <= 3)
              .map((article, i) => (
                <div
                  key={article._id}
                  onClick={() => navigate(`/article/${article?.slug}`)} 
                  className='flex-1 p-2 flex flex-col gap-3 rounded cursor-pointer hover:bg-gray-100
                '>
                  <span className='font-semibold text-ellipsis line-clamp-2 text-black/80'>
                    {article.title}
                  </span>
                  <p className='text-slate-600 text-ellipsis line-clamp-4 text-[14px]'>
                    {article.summary}
                  </p>
                </div>
              ))
            }
          </div>
        </div>

        <div className='flex-4'>
          
        </div>
      </div>
    </div>
    :
    (
      <div className='w-full py-60 flex justify-center items-center'>
        <Loading/>
      </div>
    )
  );
};

export default HomePage;
