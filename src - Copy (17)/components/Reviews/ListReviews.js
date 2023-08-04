import React , { useContext , useState } from 'react'
import AddReviews from './AddReviews.js'
import ReviewsContext from '../../context/reviews/ReviewsContext.js'
import { useNavigate, useParams , Link } from "react-router-dom";
import Pagination from '../Products/Pagination';


const ListReviews = () => {
   
  const navigate = useNavigate();
  const params = useParams();
  const reviewId = params.id;

  const context = useContext(ReviewsContext);
  const { reviews ,  deleteReview , deleteMultipleReviews} = context;
///// Paginationn by Products 

const [searchApiData, setSearchApiData] = useState([]);
const [reviewsCurrentPage, setReviewsCurrentPage] = useState(1);
const [reviewsPerPage, setReviewsPerPage] = useState(15);
const [currentPage, setCurrentPage] = useState(1);
const reviewsPaginate = pageNumber => setReviewsCurrentPage(pageNumber);
const [reviewsIds, setReviewsIds] = useState([]);

// For Multiple Checkboxes

 //// For checkbox multiple deletes 

 const handleCheck = (e) => {
  const { value, checked } = e.target
  
  if (checked) {
    setReviewsIds([...reviewsIds, value]);
  } else {
    setReviewsIds(() => reviewsIds.filter((e) => e !== value));
  }
}

  if(reviewId){
    //console.log("I am here before sending to edit"+users.review_description);
    return (
      <div>
          <AddReviews reviewId = {reviewId} reviews = {reviews} /> </div>
          )
  }else{
          
            // Get Current Clients
            const indexOfLastReviews = reviewsCurrentPage * reviewsPerPage;
            const indexOfFirstReviews = indexOfLastReviews - reviewsPerPage;
            const currentReviews = reviews.slice(indexOfFirstReviews, indexOfLastReviews);


              return (
                <div class="tab-pane fade show active" id="ntarget-1" role="tabpanel" aria-labelledby="ntab-1">
                <h4 class="heading-h4">!! Reviews List !!</h4> { reviewsIds.length > 1 ? <input type="button" value="Delete ALL " onClick={() => deleteMultipleReviews(reviewsIds)}></input>  :  ''}
                <div class="table-container">
                    <table id="client-list" class="table table-bordered display">  
                        <thead>
                            <tr>                                                                    
                    <th> Name</th>
                                <th> Email ID</th>
                                <th> Mobile</th>
                                <th>Action</th>                                                                    
                            </tr>
                        </thead>  
                    <tbody>                 
                            
                            {currentReviews.map((review , index) => {
                              return (<tr>
                                <td>{reviews.length}{review.review_description}</td>
                                <td>{review.review_owner}</td>
                                <td>{review.review_rating}</td>  
                                <td>
                                  <div class="btn-group">
                                  <span  class="btn btn-success btn-xs" onClick={() => navigate("/reviews/" + review._id)}><i class="bi bi-pencil"></i></span>
                                  <Link  class="btn btn-danger btn-xs" onClick={() => deleteReview(review._id)}><i class="bi bi-trash"></i></Link>
        
                                    <div className="col-sm"> <input type="checkBox" checked={reviewsIds.includes(review._id)} name={review._id} value={review._id} onClick={(e) => handleCheck(e)}></input></div>
                                  </div>
                                </td> 
                            
                            </tr>)
                            })} 
        
              </tbody>
              </table>
                </div>					
                             <Pagination setCurrentPage={setCurrentPage} currentPage={reviewsCurrentPage} postsPerPage={reviewsPerPage} totalPosts={reviews.length} paginate={reviewsPaginate} />
        
        </div>
              )
  }          
}

export default ListReviews
