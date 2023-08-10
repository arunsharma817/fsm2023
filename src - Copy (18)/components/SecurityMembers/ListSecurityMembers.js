import React , { useContext , useState , useEffect } from 'react'
import AddSecurityMembers from './AddSecurityMembers.js'
import SecurityMembersContext from '../../context/securityMembers/SecurityMembersContext.js'
import { useNavigate, useParams , Link } from "react-router-dom";
import Pagination from '../Products/Pagination';
import Papa from 'papaparse';

const ListSecurityMembers = () => {
   
  const navigate = useNavigate();
  const params = useParams();
  const securityMemberId = params.id;

  const context = useContext(SecurityMembersContext);
  const { securityMembers , setSecurityMembers ,  deleteSecurityMembers , deleteMultipleSecurityMembers} = context;

 /// For Sorting Each Columns in list 

  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  const handleSort = (columnName) => {
    if (sortColumn === columnName) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnName);
      setSortOrder('asc');
    }
  };


///// Paginationn by Products 

const [searchApiData, setSearchApiData] = useState([]);
const [securityMembersCurrentPage, setSecurityMembersCurrentPage] = useState(1);
const [securityMembersPerPage, SetSecurityMembersPerPage] = useState(15);
const [currentPage, setCurrentPage] = useState(1);
const securityMembersPaginate = pageNumber => setSecurityMembersCurrentPage(pageNumber);
const [securityMembersIds, setSecurityMembersIds] = useState([]);

////For Search 
 //// For Search
const [searchSecurityMembers, setSearchSecurityMembers] = useState('');
const [searchOldSecurityMembers, setSearchOldSecurityMembers] = useState("");
useEffect(() => {
    //inputEvent();
  }, [searchSecurityMembers]);
  
const inputEvent = (e) => {
    const data = e.target.value;
    console.log(data);  
    setSearchSecurityMembers(data);
    setSearchOldSecurityMembers(securityMembers);
    if(data == '') {
      console.log("I am here in data blank"+searchSecurityMembers);
      {securityMembers.map((searchSecurityMember , index) => { console.log(searchSecurityMembers.length +' here'+searchSecurityMember.security_member_fname) } 
     
      )}
      setSecurityMembers([...securityMembers]);
    } else {
      //alert("I am here for search"+data);
      //const filterResult = data.length > 0 ? mainProducts.filter((product) => product.security_members_name.toLowerCase().includes(data.toLowerCase())) : setMainProducts(searchSecurityMembers) ;
      
      const filterResult = data.length === 0
      ? null 
      : securityMembers.filter((securityMember) => securityMember.security_member_fname.toLowerCase().includes(data.toLowerCase()));
  
      setSecurityMembers(filterResult);
    }
  };



/// For Export  CSV 
//const [csvData, setCsvData] = useState('');

  const handleExportCSV = () => {
    // Convert the items to CSV format using papaparse
    const csv = Papa.unparse(securityMembers, {
      header: true,
    });

    // Create a Blob and URL for the CSV data
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    // Create a link and click it to trigger the download
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'securityMembers.csv');
    document.body.appendChild(link);
    link.click();

    // Clean up by removing the link and revoking the URL
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };


////// For Each Column Search 

const [searchText, setSearchText] = useState({
    security_member_fname: '',
    security_member_lname: '',
    security_member_mobile: '',
  });

const handleSearch = (column, value) => {
    setSearchText({ ...searchText, [column]: value });
};

/// For Multiple Delete
const handleCheck = (e) => {
  const { value, checked } = e.target
  
  if (checked) {
    setSecurityMembersIds([...securityMembersIds, value]);
  } else {
    setSecurityMembersIds(() => securityMembersIds.filter((e) => e !== value));
  }
}

  if(securityMemberId){
    //console.log("I am here before sending to edit"+users.security_member_fname);
    return (
      <div>
          <AddSecurityMembers securityMemberId = {securityMemberId} securityMembers = {securityMembers} /> </div>
          )
  }else{
          
            // Get Current Clients
            const indexOfLastSecurityMembers = securityMembersCurrentPage * securityMembersPerPage;
            const indexOfFirstSecurityMembers = indexOfLastSecurityMembers - securityMembersPerPage;
            const currentSecurityMembers = securityMembers.slice(indexOfFirstSecurityMembers, indexOfLastSecurityMembers);

            const sortedData = currentSecurityMembers.slice().sort((a, b) => {
                
                if(sortColumn) {
                  const aValue = a[sortColumn];
                  const bValue = b[sortColumn];
            
                  if (sortOrder === 'asc') {
                    return aValue > bValue ? 1 : -1;
                  } else {
                    return aValue < bValue ? 1 : -1;
                  }
                } else {
                  return 0;
               }
               
            });


            const filteredData = sortedData.filter((item) => {
                return (
                  item.security_member_fname.toLowerCase().includes(searchText.security_member_fname.toLowerCase()) &&
                  item.security_member_lname.toString().includes(searchText.security_member_lname) &&
                  item.security_member_mobile.toLowerCase().includes(searchText.security_member_mobile.toLowerCase())
                );
              });




              return (
                <div class="tab-pane fade show active" id="ntarget-1" role="tabpanel" aria-labelledby="ntab-1">
                <p><h4 class="heading-h4">!! Security Members List !!</h4> { securityMembersIds.length > 1 ? <input type="button" value="Delete ALL " onClick={() => deleteMultipleSecurityMembers(securityMembersIds)}></input>  :  ''} <button onClick={handleExportCSV}>Export CSV</button></p>
                <input type="search" name="searchbox" value= { searchSecurityMembers} placeholder='Search Here' onChange={(e) => inputEvent(e)} />

                <div class="table-container">
                    <table id="client-list" class="table table-bordered display">  
                        <thead>
                            <tr>                                                                    
                                <th onClick={() => handleSort('security_member_fname')}>  Name
                                {sortColumn === 'security_member_fname' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('security_member_lname')}>  Email Id
                                {sortColumn === 'security_member_lname' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('security_member_mobile')}> Mobile
                                {sortColumn === 'security_member_mobile' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
                                <th>Action</th>                                                                    
                            </tr>
                            <tr>
                                <td><input
              type="text"
              value={searchText.security_member_fname}
              onChange={(e) => handleSearch('security_member_fname', e.target.value)}
            /></td>
                                <td><input
              type="text"
              value={searchText.security_member_lname}
              onChange={(e) => handleSearch('security_member_lname', e.target.value)}
            /></td>
                                <td> <input
              type="text"
              value={searchText.security_member_mobile}
              onChange={(e) => handleSearch('security_member_mobile', e.target.value)}
            /></td>
                                <td></td>
                            
                            </tr>
                        </thead>  
                    <tbody>                 
                            
                            {filteredData.map((securityMember , index) => {
                              return (<tr>
                                <td>{securityMembers.length}{securityMember.security_member_fname}</td>
                                <td>{securityMember.security_member_lname}</td>
                                <td>{securityMember.security_member_mobile}</td>  
                                <td>
                                  <div class="btn-group">
                                  <span  class="btn btn-success btn-xs" onClick={() => navigate("/securitymembers/" + securityMember._id)}><i class="bi bi-pencil"></i></span>
                                  <Link  class="btn btn-danger btn-xs" onClick={() => deleteSecurityMembers(securityMember._id)}><i class="bi bi-trash"></i></Link>
        
                                    <div className="col-sm"> <input type="checkBox" checked={securityMembersIds.includes(securityMember._id)} name={securityMember._id} value={securityMember._id} onClick={(e) => handleCheck(e)}></input></div>
                                  </div>
                                </td> 
                            
                            </tr>)
                            })} 
        
              </tbody>
              </table>
                </div>					
                             <Pagination setCurrentPage={setCurrentPage} currentPage={securityMembersCurrentPage} postsPerPage={securityMembersPerPage} totalPosts={securityMembers.length} paginate={securityMembersPaginate} />
        
        </div>
              )
  }          
}

export default ListSecurityMembers
