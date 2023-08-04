import React , { useContext , useState } from 'react'
import AddUserTypeForm from './AddUserTypeForm.js'
import usertypeContext from '../../context/usertype/usertypeContext.js'
import { useNavigate, useParams } from "react-router-dom";
import Pagination from '../Products/Pagination';


const UserType = () => {
   
  const navigate = useNavigate();
  const params = useParams();
  const userTypeId = params.id;

  const context = useContext(usertypeContext);
  const { filteredItems , searchText , handleSearchTextChange , userTypes ,  deleteUserType , deleteMultipleUserType} = context;
///// Paginationn by Products 

const [searchApiData, setSearchApiData] = useState([]);
const [userTypeCurrentPage, setUserTypeCurrentPage] = useState(1);
const [userTypesPerPage, setUserTypePerPage] = useState(15);
const [currentPage, setCurrentPage] = useState(1);
const userPaginate = pageNumber => setUserTypeCurrentPage(pageNumber);
const [userTypeIds, setUserTypeIds] = useState([]);

// For Multiple Checkboxes

 //// For checkbox multiple deletes 

 const handleCheck = (e) => {
  const { value, checked } = e.target
  
  if (checked) {
    setUserTypeIds([...userTypeIds, value]);
  } else {
    setUserTypeIds(() => userTypeIds.filter((e) => e !== value));
  }
}
  if(userTypeId){
    console.log("I am here before sending to edit"+userTypeId);
    return (
      <div>
          <AddUserTypeForm userTypeId = {userTypeId} userTypes= {userTypes} /> </div>
          )
  }else{
          
            // Get Current Clients
            const indexOfLastUserType = userTypeCurrentPage * userTypesPerPage;
            const indexOfFirstUserType = indexOfLastUserType - userTypesPerPage;
            const currentUserTypes = filteredItems.slice(indexOfFirstUserType, indexOfLastUserType);


              return (
                <div>   
                    <input   type="text" placeholder="Search..." value={searchText} onChange={handleSearchTextChange}   />
                 
                    <div className ="row my-3">

                            <h2>Users List { userTypeIds.length > 1 ? <input type="button" value="Delete ALL " onClick={() => deleteMultipleUserType(userTypeIds)}></input>  :  ''} </h2>
                            <div className="container">
                    {currentUserTypes.map((userType , index) => {
                      return (<div className="row align-items-center">
                        <div className="col-sm">{userTypes.length}{userType.user_type_title}</div>
                        <div className="col-sm">{userType.user_type_description}</div>
                        <div className="col-sm">{userType.user_type_module_permission}</div>  

                      <div className="col-sm"><input type="button" id={index} value="Del" onClick={() => deleteUserType(userType._id)} /> <input type="checkBox" name={userType._id} value={userType._id} onClick={(e) => handleCheck(e)}></input></div>
                      <div className="col-sm"><input type="button" id={userType._id} value="Edit" onClick={() => navigate("/usertype/" + userType._id)} /></div>  
                        
                    
                    </div>)
                    })}
                  </div>
                    </div>
                    <Pagination setCurrentPage={setCurrentPage} currentPage={userTypeCurrentPage} postsPerPage={userTypesPerPage} totalPosts={userTypes.length} paginate={userPaginate} />
 
                </div>
              )
  }          
}

export default UserType
