import React from 'react'

const Pagination = ({postsPerPage , totalPosts , paginate ,  currentPage , setCurrentPage }) => {
    const pageNumbers = [];

    for(let i =1; i<=Math.ceil(totalPosts / postsPerPage);i++){
        pageNumbers.push(i);

    }
  return (
    <nav>
        <ul className="pagination">
        <li className={currentPage === 1 ? "page-item disabled" : "page-item"}><span className="page-link" onClick={() => { setCurrentPage(1 === currentPage ? 1 : currentPage - 1); paginate(1 === currentPage ? 1 : currentPage - 1) }}>Previous</span></li>
            {pageNumbers.map(number =>(
                <li key={number} className={number === currentPage ? "page-item active" : "page-item"}>
                    <span  className="page-link" onClick={() => paginate(number)}>
                        {number}
                    </span>
                </li>
            ))}
        <li className={currentPage === pageNumbers.length ? "page-item disabled" : "page-item"}><span className="page-link" onClick={() => { setCurrentPage(pageNumbers.length === currentPage ? pageNumbers.length : currentPage + 1); paginate(pageNumbers.length === currentPage ? pageNumbers.length : currentPage + 1) }}>Next</span></li>
        </ul>
    </nav>
  )
}

export default Pagination
