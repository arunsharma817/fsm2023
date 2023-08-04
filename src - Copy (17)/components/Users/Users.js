import React , { useContext , useState } from 'react'
import AddUser from './AddUser.js'
import userContext from '../../context/users/usersfsmContext.js'
import { useNavigate, useParams , Link } from "react-router-dom";
import Pagination from '../Products/Pagination';


const Users = () => {
   
  const navigate = useNavigate();
  const params = useParams();
  const userId = params.id;

  const context = useContext(userContext);
  const { users ,  deleteUser , deleteMultipleUsers} = context;
///// Paginationn by Products 

const [searchApiData, setSearchApiData] = useState([]);
const [usersCurrentPage, setUsersCurrentPage] = useState(1);
const [usersPerPage, setUsersPerPage] = useState(15);
const [currentPage, setCurrentPage] = useState(1);
const userPaginate = pageNumber => setUsersCurrentPage(pageNumber);
const [userIds, setUserIds] = useState([]);

// For Multiple Checkboxes

 //// For checkbox multiple deletes 

 const handleCheck = (e) => {
  const { value, checked } = e.target
  
  if (checked) {
    setUserIds([...userIds, value]);
  } else {
    setUserIds(() => userIds.filter((e) => e !== value));
  }
}

  if(userId){
    //console.log("I am here before sending to edit"+users.user_first_name);
    return (
      <div>
          <AddUser userId = {userId} users = {users} /> </div>
          )
  }else{
          
            // Get Current Clients
            const indexOfLastUser = usersCurrentPage * usersPerPage;
            const indexOfFirstUser = indexOfLastUser - usersPerPage;
            const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);


              return (
                <div class="tab-pane fade show active" id="ntarget-1" role="tabpanel" aria-labelledby="ntab-1">
                <h4 class="heading-h4">!! Users List !!</h4> { userIds.length > 1 ? <input type="button" value="Delete ALL " onClick={() => deleteMultipleUsers(userIds)}></input>  :  ''}
                <div class="table-container">
                    <table id="client-list" class="table table-bordered display">  
                        <thead>
                            <tr>                                                                    
                    <th>User Name</th>
                                <th>User Email ID</th>
                                <th>User Password</th>
                                <th>Action</th>                                                                    
                            </tr>
                        </thead>  
                    <tbody>                 
                            
                            {currentUsers.map((user , index) => {
                              return (<tr>
                                <td>{users.length}{user.user_first_name}</td>
                                <td>{user.user_email}</td>
                                <td>{user.user_password}</td>  
                                <td>
                                  <div class="btn-group">
                                  <span  class="btn btn-success btn-xs" onClick={() => navigate("/users/" + user._id)}><i class="bi bi-pencil"></i></span>
                                  <Link  class="btn btn-danger btn-xs" onClick={() => deleteUser(user._id)}><i class="bi bi-trash"></i></Link>
        
                                    <div className="col-sm"> <input type="checkBox" checked={userIds.includes(user._id)} name={user._id} value={user._id} onClick={(e) => handleCheck(e)}></input></div>
                                  </div>
                                </td> 
                            
                            </tr>)
                            })} 
        
              </tbody>
              </table>
                </div>					
                             <Pagination setCurrentPage={setCurrentPage} currentPage={usersCurrentPage} postsPerPage={usersPerPage} totalPosts={users.length} paginate={userPaginate} />
        
        </div>
              )
  }          
}

export default Users
