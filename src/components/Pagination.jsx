import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const maxVisiblePages = 5;
  let startPage, endPage;

  if (totalPages <= maxVisiblePages) {
    startPage = 1;
    endPage = totalPages;
  } else {
    const maxVisibleBeforeCurrent = Math.floor(maxVisiblePages / 2);
    const maxVisibleAfterCurrent = Math.ceil(maxVisiblePages / 2) - 1;
    
    if (currentPage <= maxVisibleBeforeCurrent) {
      startPage = 1;
      endPage = maxVisiblePages;
    } else if (currentPage + maxVisibleAfterCurrent >= totalPages) {
      startPage = totalPages - maxVisiblePages + 1;
      endPage = totalPages;
    } else {
      startPage = currentPage - maxVisibleBeforeCurrent;
      endPage = currentPage + maxVisibleAfterCurrent;
    }
  }

  const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  return (
    <nav className="flex items-center space-x-1">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg border border-gray-700 bg-gray-800 text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 hover:text-white transition-colors"
      >
        <FiChevronLeft className="h-4 w-4" />
      </button>

      {startPage > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className={`px-3 py-1 rounded-lg border border-gray-700 ${
              1 === currentPage ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            1
          </button>
          {startPage > 2 && <span className="px-2 text-gray-500">...</span>}
        </>
      )}

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded-lg border border-gray-700 ${
            page === currentPage ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          {page}
        </button>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="px-2 text-gray-500">...</span>}
          <button
            onClick={() => onPageChange(totalPages)}
            className={`px-3 py-1 rounded-lg border border-gray-700 ${
              totalPages === currentPage ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg border border-gray-700 bg-gray-800 text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 hover:text-white transition-colors"
      >
        <FiChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
};

export default Pagination;