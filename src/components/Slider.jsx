import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Slider = ({ items }) => {
  const navigate = useNavigate()
  const itemsPerPage = 2;
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(0);

  const goToPage = (index) => {
    if (index >= 0 && index < totalPages) {
      setCurrentPage(index);
    }
  };

  return (
    <div className="py-2 w-full max-w-3xl mx-auto overflow-hidden">
      {/* Slider container */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          width: `${totalPages * 100}%`,
          transform: `translateX(-${(100 / totalPages) * currentPage}%)`,
        }}
      >
        {Array.from({ length: totalPages }).map((_, pageIndex) => {
          const start = pageIndex * itemsPerPage;
          const pageItems = items.slice(start, start + itemsPerPage);

          return (
            <div
              key={pageIndex}
              className="grid grid-cols-2 gap-4"
              style={{ width: `${100 / totalPages}%` }}
            >
              {pageItems.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded text-center cursor-pointer"
                  onClick={() => navigate(`/article/${item?.slug}`)}
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="aspect-video object-cover rounded w-full mb-2"
                  />
                  <p className="text-sm text-black/80 font-semibold text-ellipsis line-clamp-1">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => goToPage(i)}
            className={`w-5 h-1 rounded cursor-pointer ${
              i === currentPage ? 'bg-blue-500' : 'bg-gray-300'
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Slider;
