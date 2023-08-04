import React , { useContext , useState } from 'react'
import AddUser from './AddUser.js'
import userContext from '../../context/users/usersfsmContext.js'
import { useNavigate, useParams } from "react-router-dom";
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
                <div>                    
                    <div className ="row my-3">
                            <h2>Users List { userIds.length > 1 ? <input type="button" value="Delete ALL " onClick={() => deleteMultipleUsers(userIds)}></input>  :  ''} </h2>
                            <div className="container">
                    {currentUsers.map((user , index) => {
                      return (<div className="row align-items-center">
                        <div className="col-sm">{users.length}{user.user_first_name}</div>
                        <div className="col-sm">{user.user_email}</div>
                        <div className="col-sm">{user.user_password}</div>  

                      <div className="col-sm"><input type="button" id={index} value="Del" onClick={() => deleteUser(user._id)} /> <input type="checkBox" name={user._id} value={user._id} onClick={(e) => handleCheck(e)}></input></div>
                      <div className="col-sm"><input type="button" id={user._id} value="Edit" onClick={() => navigate("/users/" + user._id)} /></div>  
                        
                    
                    </div>)
                    })}
                  </div>
                    </div>
                    <Pagination setCurrentPage={setCurrentPage} currentPage={usersCurrentPage} postsPerPage={usersPerPage} totalPosts={users.length} paginate={userPaginate} />
 
                </div>
              )
  }          
}

export default Users
