// src/pages/HomePage.jsx
import React, { useEffect, useMemo } from 'react';
import HeroSection from '../components/HeroSection';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { fetchArticles } from '../features/articles/articleSlice';
import Loading from '../components/Loading/Loading';
import { GoDot } from "react-icons/go";
import Slider from '../components/Slider';
import { GoDotFill } from "react-icons/go";
import subBanner from '../assets/subBanner.png'
import play from '../assets/play.png'
import ad1 from '../assets/ad1.png'
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

  const randomArticles = useMemo(() => {
    const cloned = [...articles]; 
    const shuffled = cloned.sort(() => 0.5 - Math.random()); 
    return shuffled.slice(0, 10); 
  }, [articles]);

  const iframeArticles = useMemo(() => {
    return articles.filter(article =>
      article.content?.includes('<iframe')
    ).slice(0,4);
  }, [articles]);

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
        className='w-[75%] pb-5 mx-auto flex justify-between items-start gap-4
      '>
        <div
          className='flex-7 flex flex-col gap-2
        '>
          <div
            onClick={() => navigate(`/article/${featured.slug}`)}
            className='flex bg-gray-100 gap-2 cursor-pointer
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

          <div className='w-full flex gap-3'>
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
                  <p className='text-slate-600 text-ellipsis line-clamp-5 text-[14px]'>
                    {article.summary}
                  </p>
                </div>
              ))
            }
          </div>
        </div>

        <div className='flex-4 flex flex-col gap-3'>
          {
            articles
            .filter((_, index) => index >= 4 && index <= 10)
            .map((article, index) => (
              <div key={article._id}>
                <div
                  onClick={() => navigate(`/article/${article?.slug}`)}
                  className='py-2 px-1 flex gap-2 justify-start items-center text-black/80 cursor-pointer hover:text-blue-900 transition-all'
                >
                  <GoDot className='text-slate-500 w-4 h-4 flex-shrink-0' />
                  <span className='text-ellipsis line-clamp-2'>
                    {article.title}
                  </span>
                </div>
                <hr className='w-full self-center text-slate-200' />
              </div>
            ))
          }
        </div>
      </div>

      <div className='w-[75%] mx-auto flex justify-between gap-10 '>
          <div className='flex-6 flex flex-col gap-3'>
            {
              articles
              .filter((_, index) => index >= 10)
              .map(article => (
                <>
                  <div
                    key={article._id}
                    onClick={() => navigate(`/article/${article?.slug}`)} 
                    className='
                      flex gap-3 py-2 cursor-pointer rounded hover:bg-slate-100
                  '>
                    <img 
                      src={article.thumbnail}
                      alt={article.title}
                      className="flex-4 w-[40%] aspect-video object-cover object-center"
                    />
                    <div className='flex-6 p-2 flex flex-col justify-start gap-3'>
                      <span className='font-semibold text-lg text-ellipsis line-clamp-3'>
                        {article.title}
                      </span>
                      <p className='text-ellipsis line-clamp-5 text-slate-600 text-[14px]'>
                        {article.summary}
                      </p>
                    </div>
                  </div>
                  <hr className='w-full self-center text-slate-200' />
                </>
              ))
            }
          </div>
          
          <div className='flex-4 flex flex-col gap-3'>
            <div className='h-fit py-4 px-8 bg-gradient-to-b from-[#D1E8F9] to-white rounded shadow'>
              <p className='flex gap-1 items-center font-semibold py-2 text-black/80'>
                <GoDotFill className='text-red-500 border rounded-full'/> CHỦ ĐỀ NỔI BẬT <span className=' text-red-500'>HÔM NAY</span> 
              </p>
              <hr className='w-full text-slate-300 pb-2'/>
              <Slider items={randomArticles}/>
            </div>

            <img src={subBanner}
              className='
                w-full object-cover object-center rounded 
            '/>

            <div className='h-fit py-3 px-8 shadow'>
              <p className='flex gap-1 items-center font-extrabold py-2 text-black/80'>
                <span className='text-red-500'>|</span> VIDEOS
              </p>
              <hr className='w-full text-slate-300 pb-2'/>
              <div className='grid grid-cols-2 grid-rows-2 gap-3'>
                {
                  iframeArticles.map(article => (
                    <div 
                      key={article._id}
                      onClick={() => navigate(`/article/${article.slug}`)}
                      className='
                        flex flex-col gap-2 cursor-pointer p-1 hover:bg-slate-100 rounded
                      '
                    >
                      <div className="relative w-full h-30">
                        <img 
                          src={article.thumbnail}
                          className='
                            w-full h-full object-cover object-center rounded
                          '
                        />
                        <img 
                          src={play}
                          alt="play"
                          className="absolute bottom-2 left-2 w-12 h-12 text-white opacity-90"
                        />
                      </div>
                      <p className='text-black/80 text-[14px] font-semibold line-clamp-3'>
                        {article.title}
                      </p>
                    </div>
                  ))
                }
              </div>
            </div>

            <img 
              src={ad1}
              onClick={() => window.open(`https://www.airasia.com/flight/vi/vn?utm_campaign=Flights_VN_AA_RG%7CSkytrax-GHS%7C18062025%7C03072025%7Cvn-vi&af_xp=custom&pid=partnerize_int&dclid=CjkKEQjw6s7CBhDj566x8uyip9UBEiQAjBi0e3Pu9n-3BToKtOjVwJqGxE1tN6er2nxPsMj1hwJesZvw_wcB&is_retargeting=true&clickref=1100lAwCbWFE&af_click_lookback=30d&gad_source=7&gclid=CjwKCAjw6s7CBhACEiwAuHQckmRMn-A3xZOGxKSYomPINA3zgwpPHGSkEwR1ngmg5hJ5nOk7NfhyEhoCCiEQAvD_BwE&utm_content=1011l41754&utm_source=dv360&utm_medium=display&utm_campaign=indoleads2019&utm_clickref=1100lAwCbWFE&clickid=1100lAwCbWFE&af_reengagement_window=30d&af_siteid=partnerize&utm_term=Comparison%2FReview%7C5b9248587c4b9603af2ba106%7Cd308cc88-e252-420e-9495-3c4eb63c0fe5%7Chttps%3A%2F%2Fmonetoad.com%2FwoqL4W4PB0&c=Affiliate`)} 
              className='
                w-fit sticky top-0 self-center cursor-pointer
            '/>
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
