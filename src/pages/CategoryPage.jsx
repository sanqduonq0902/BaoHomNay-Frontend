import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticles } from '../features/articles/articleSlice';
import Loading from '../components/Loading/Loading';
import ad1 from '../assets/ad1.png'

const CategoryPage = () => {
  const { category } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const articles = useSelector(state => state.articles.list);
  const loading = useSelector(state => state.articles.loading);

  useEffect(() => {
    dispatch(fetchArticles(category));
  }, [dispatch, category]);

const formatCategory = (key) => {
  const dict = {
    thoisu: 'Thời sự',
    chinhtri: 'Chính trị',
    xahoi: 'Xã hội',
    khoahoc: 'Khoa học',
    vanhoanghethuat: 'Văn hóa - Nghệ thuật',
    kinhte: 'Kinh tế',
    quocte: 'Quốc tế',
    tingiasuthat: 'Tin giả & Sự thật',
    gioitre: 'Giới trẻ',
    gocnhin: 'Góc nhìn',
    nhanvan: 'Nhân văn',
    thethao: 'Thể thao',
    dulich: 'Du lịch',
    xe: "Xe",
    nghenhin360: "Nghe-Nhìn 360"
  };
  return dict[key] || key;
};

  if (loading) {
    return(
        <div className='w-full min-h-screen flex justify-center items-center'>
            <Loading/>
        </div>
    )
  }

  return (
    <div className='w-[75%] mx-auto py-5'>
      <h2 className="text-2xl font-bold mb-4 capitalize">Chuyên mục "{formatCategory(category)}"</h2>
      <div className='w-full flex justify-between gap-15'>
          <div className='flex-7 flex flex-col gap-3'>
            {
                articles.length === 0 ? (
                    <div className="text-gray-500 italic py-50 text-center">
                    Hiện chưa có bài viết nào trong chuyên mục "{formatCategory(category)}".
                    </div>
                ) : (
                    articles.map(article => (
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
                    ))
                )
                }
          </div>

          <div className='flex-3 flex justify-center'>
            <img 
                src={ad1}
                onClick={() => window.open(`https://www.airasia.com/flight/vi/vn?utm_campaign=Flights_VN_AA_RG%7CSkytrax-GHS%7C18062025%7C03072025%7Cvn-vi&af_xp=custom&pid=partnerize_int&dclid=CjkKEQjw6s7CBhDj566x8uyip9UBEiQAjBi0e3Pu9n-3BToKtOjVwJqGxE1tN6er2nxPsMj1hwJesZvw_wcB&is_retargeting=true&clickref=1100lAwCbWFE&af_click_lookback=30d&gad_source=7&gclid=CjwKCAjw6s7CBhACEiwAuHQckmRMn-A3xZOGxKSYomPINA3zgwpPHGSkEwR1ngmg5hJ5nOk7NfhyEhoCCiEQAvD_BwE&utm_content=1011l41754&utm_source=dv360&utm_medium=display&utm_campaign=indoleads2019&utm_clickref=1100lAwCbWFE&clickid=1100lAwCbWFE&af_reengagement_window=30d&af_siteid=partnerize&utm_term=Comparison%2FReview%7C5b9248587c4b9603af2ba106%7Cd308cc88-e252-420e-9495-3c4eb63c0fe5%7Chttps%3A%2F%2Fmonetoad.com%2FwoqL4W4PB0&c=Affiliate`)} 
                className='
                w-[90%] h-fit sticky top-0 cursor-pointer
            '/>
          </div>
      </div>      
    </div>
  );
};

export default CategoryPage;
