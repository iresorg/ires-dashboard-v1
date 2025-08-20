import React from 'react';
import ReactPaginate from 'react-paginate';
import ArrowLeft from '@/shared/assets/icons/arrowleft.svg';
import ArrowRight from '@/shared/assets/icons/arrowright.svg';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}) => {
  const handlePageClick = (event: { selected: number }) => {
    const newPage = event.selected + 1;
    onPageChange(newPage);
  };

  return (
    <div className={`flex items-center justify-center space-x-2 text-sm text-gray-700 ${className}`}>
      <ReactPaginate
        previousLabel={
          <div className="flex items-center gap-1 text-[var(--ires-dark-blue)] hover:cursor-pointer transition-colors">
            <img src={ArrowLeft} alt="Previous" className="h-2.5 mr-1" />
            <span>Previous</span>
          </div>
        }
        nextLabel={
          <div className="flex items-center gap-1 text-[var(--ires-dark-blue)] hover:cursor-pointer transition-colors">
            <span>Next</span>
            <img src={ArrowRight} alt="Next" className="h-2.5 mr-1" />
          </div>
        }
        breakLabel={<span className="text-gray-500 px-2">...</span>}
        pageCount={totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        forcePage={currentPage - 1}
        containerClassName="flex items-center space-x-2"
        pageClassName="hover:bg-gray-200 px-2.5 py-1 rounded-full transition-colors cursor-pointer"
        pageLinkClassName="text-gray-700 hover:text-gray-900 w-full h-full flex items-center justify-center"
        activeClassName="bg-[#0C0E5D] text-white py-1 rounded-lg"
        activeLinkClassName="text-white"
        previousClassName="hover:bg-gray-100 px-3 py-1 rounded transition-colors"
        nextClassName="hover:bg-gray-100 px-3 py-1 rounded transition-colors"
        disabledClassName="opacity-50 cursor-not-allowed"
        disabledLinkClassName="cursor-not-allowed"
        breakClassName="px-2"
        breakLinkClassName="text-gray-500"
      />
    </div>
  );
};

export default Pagination;