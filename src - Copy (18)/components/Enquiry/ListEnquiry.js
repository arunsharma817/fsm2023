import React , { useContext , useState } from 'react'
import AddEnquiry from './AddEnquiry.js'
import enquiryContext from '../../context/enquiry/enquiryContext.js'
import { useNavigate, useParams , Link } from "react-router-dom";
import Pagination from '../Products/Pagination';


const ListEnquiries = () => {
   
  const navigate = useNavigate();
  const params = useParams();
  const enquiryId = params.id;

  const context = useContext(enquiryContext);
  const { enquiries ,  deleteEnquiry , deleteMultipleEnquiry} = context;
///// Paginationn by Products 

const [searchApiData, setSearchApiData] = useState([]);
const [enquiryCurrentPage, setEnquiriesCurrentPage] = useState(1);
const [enquiryPerPage, setEnquiriesPerPage] = useState(15);
const [currentPage, setCurrentPage] = useState(1);
const enquiryPaginate = pageNumber => setEnquiriesCurrentPage(pageNumber);
const [enquiryIds, setEnquiryIds] = useState([]);

// For Multiple Checkboxes

 //// For checkbox multiple deletes 

 const handleCheck = (e) => {
  const { value, checked } = e.target
  
  if (checked) {
    setEnquiryIds([...enquiryIds, value]);
  } else {
    setEnquiryIds(() => enquiryIds.filter((e) => e !== value));
  }
}

  if(enquiryId){
    //console.log("I am here before sending to edit"+users.enquiry_name);
    return (
      <div>
          <AddEnquiry enquiryId = {enquiryId} enquiries = {enquiries} /> </div>
          )
  }else{
          
            // Get Current Clients
            const indexOfLastEnquiry = enquiryCurrentPage * enquiryPerPage;
            const indexOfFirstEnquiry = indexOfLastEnquiry - enquiryPerPage;
            const currentEnquiries = enquiries.slice(indexOfFirstEnquiry, indexOfLastEnquiry);


              return (
                <div class="tab-pane fade show active" id="ntarget-1" role="tabpanel" aria-labelledby="ntab-1">
                <h4 class="heading-h4">!! Enquiry List !!</h4> { enquiryIds.length > 1 ? <input type="button" value="Delete ALL " onClick={() => deleteMultipleEnquiry(enquiryIds)}></input>  :  ''}
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
                            
                            {currentEnquiries.map((enquiry , index) => {
                              return (<tr>
                                <td>{enquiries.length}{enquiry.enquiry_name}</td>
                                <td>{enquiry.enquiry_email}</td>
                                <td>{enquiry.enquiry_mobile}</td>  
                                <td>
                                  <div class="btn-group">
                                  <span  class="btn btn-success btn-xs" onClick={() => navigate("/enquiry/" + enquiry._id)}><i class="bi bi-pencil"></i></span>
                                  <Link  class="btn btn-danger btn-xs" onClick={() => deleteEnquiry(enquiry._id)}><i class="bi bi-trash"></i></Link>
        
                                    <div className="col-sm"> <input type="checkBox" checked={enquiryIds.includes(enquiry._id)} name={enquiry._id} value={enquiry._id} onClick={(e) => handleCheck(e)}></input></div>
                                  </div>
                                </td> 
                            
                            </tr>)
                            })} 
        
              </tbody>
              </table>
                </div>					
                             <Pagination setCurrentPage={setCurrentPage} currentPage={enquiryCurrentPage} postsPerPage={enquiryPerPage} totalPosts={enquiries.length} paginate={enquiryPaginate} />
        
        </div>
              )
  }          
}

export default ListEnquiries
