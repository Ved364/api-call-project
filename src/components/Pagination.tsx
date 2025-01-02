type Pagination = {
  totalPages: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
};

const Pagination = ({ totalPages, currentPage, onPageChange }: Pagination) => {
  const handleChangePage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary m-1"
        onClick={handleChangePage}
        disabled={currentPage === 0}
      >
        Previous Page
      </button>

      <button
        type="button"
        className="btn btn-primary m-1"
        onClick={handleChangePage}
        disabled={currentPage === totalPages}
      >
        Next Page
      </button>
    </div>
  );
};

export default Pagination;
