import React, { useRef, useCallback, useMemo } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

export interface PaginationRef {
  scrollIntoView: () => void;
  scrollToTop: () => void;
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  scrollToTop?: boolean; // Option to scroll to top when page changes
  onRef?: (ref: PaginationRef) => void; // Callback to get ref methods
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
  scrollToTop = true, // Default to true for better UX
  onRef,
}) => {
  const paginationRef = useRef<HTMLDivElement>(null);

  // Create ref methods with useMemo to prevent recreation on every render
  const refMethods = useMemo(() => ({
    scrollIntoView: () => {
      if (paginationRef.current) {
        paginationRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    },
    scrollToTop: () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }), []);

  // Expose ref methods to parent via callback
  React.useEffect(() => {
    if (onRef) {
      onRef(refMethods);
    }
  }, [onRef, refMethods]);

  // Handle page change with optional scroll (must be before early return)
  const handlePageChange = useCallback((page: number) => {
    onPageChange(page);
    
    // Scroll to top if enabled
    if (scrollToTop) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [onPageChange, scrollToTop]);

  // Don't render pagination if there are no pages or only one page
  if (totalPages <= 1) {
    return null;
  }

  // Ensure currentPage is within valid range
  const validCurrentPage = Math.min(Math.max(1, currentPage), totalPages);

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show smart pagination with ellipsis
      if (validCurrentPage <= 3) {
        // Near start: show 1, 2, 3, ..., last
        for (let i = 1; i <= 3; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (validCurrentPage >= totalPages - 2) {
        // Near end: show 1, ..., last-2, last-1, last
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 2; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Middle: show 1, ..., current-1, current, current+1, ..., last
        pages.push(1);
        pages.push('...');
        pages.push(validCurrentPage - 1);
        pages.push(validCurrentPage);
        pages.push(validCurrentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div 
      ref={paginationRef}
      data-pagination
      className={`flex items-center justify-center space-x-2 text-sm text-gray-700 ${className}`}
    >
      {/* Previous Button */}
      <button
        onClick={() => handlePageChange(validCurrentPage - 1)}
        disabled={validCurrentPage === 1}
        className="flex items-center gap-1 text-[var(--ires-dark-blue)] hover:bg-gray-100 px-3 py-1 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeftIcon className="h-4 w-4" />
            <span>Previous</span>
      </button>

      {/* Page Numbers */}
      <div className="flex items-center space-x-1">
        {pageNumbers.map((page, index) => (
          <React.Fragment key={index}>
            {page === '...' ? (
              <span className="text-gray-500 px-2">...</span>
            ) : (
              <button
                onClick={() => handlePageChange(page as number)}
                className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                  page === validCurrentPage
                    ? 'bg-[#0C0E5D] text-white'
                    : 'hover:bg-gray-200 text-gray-700 hover:text-gray-900'
                }`}
              >
                {page}
              </button>
            )}
          </React.Fragment>
        ))}
          </div>

      {/* Next Button */}
      <button
        onClick={() => handlePageChange(validCurrentPage + 1)}
        disabled={validCurrentPage === totalPages}
        className="flex items-center gap-1 text-[var(--ires-dark-blue)] hover:bg-gray-100 px-3 py-1 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
            <span>Next</span>
        <ChevronRightIcon className="h-4 w-4" />
      </button>
    </div>
  );
};

Pagination.displayName = 'Pagination';

export default Pagination;