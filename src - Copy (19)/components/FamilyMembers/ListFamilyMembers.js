import React , { useContext , useState , useEffect } from 'react'
import AddFamilyMembers from './AddFamilyMembers.js'
import FamilyMembersContext from '../../context/FamilyMembers/FamilyMembersContext.js'
import { useNavigate, useParams , Link } from "react-router-dom";
import Pagination from '../Products/Pagination';
import Papa from 'papaparse';

const ListFamilyMembers = () => {
   
  const navigate = useNavigate();
  const params = useParams();
  const familyMemberId = params.id;

  const context = useContext(FamilyMembersContext);
  const { familyMembers , setFamilyMembers ,  deleteFamilyMembers , deleteMultipleFamilyMembers} = context;

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
const [familyMembersCurrentPage, setFamilyMembersCurrentPage] = useState(1);
const [familyMembersPerPage, SetFamilyMembersPerPage] = useState(15);
const [currentPage, setCurrentPage] = useState(1);
const familyMembersPaginate = pageNumber => setFamilyMembersCurrentPage(pageNumber);
const [familyMembersIds, setFamilyMembersIds] = useState([]);

////For Search 
 //// For Search
const [searchFamilyMembers, setSearchFamilyMembers] = useState('');
const [searchOldFamilyMembers, setSearchOldFamilyMembers] = useState("");
useEffect(() => {
    //inputEvent();
  }, [searchFamilyMembers]);
  
const inputEvent = (e) => {
    const data = e.target.value;
    console.log(data);  
    setSearchFamilyMembers(data);
    setSearchOldFamilyMembers(familyMembers);
    if(data == '') {
      console.log("I am here in data blank"+searchFamilyMembers);
      {familyMembers.map((searchFamilyMember , index) => { console.log(searchFamilyMembers.length +' here'+searchFamilyMember.family_member_fname) } 
     
      )}
      setFamilyMembers([...familyMembers]);
    } else {
      //alert("I am here for search"+data);
      //const filterResult = data.length > 0 ? mainProducts.filter((product) => product.family_members_name.toLowerCase().includes(data.toLowerCase())) : setMainProducts(searchFamilyMembers) ;
      
      const filterResult = data.length === 0
      ? null 
      : familyMembers.filter((familyMember) => familyMember.family_member_fname.toLowerCase().includes(data.toLowerCase()));
  
      setFamilyMembers(filterResult);
    }
  };



/// For Export  CSV 
//const [csvData, setCsvData] = useState('');

  const handleExportCSV = () => {
    // Convert the items to CSV format using papaparse
    const csv = Papa.unparse(familyMembers, {
      header: true,
    });

    // Create a Blob and URL for the CSV data
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    // Create a link and click it to trigger the download
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'familyMembers.csv');
    document.body.appendChild(link);
    link.click();

    // Clean up by removing the link and revoking the URL
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };


////// For Each Column Search 

const [searchText, setSearchText] = useState({
    family_member_fname: '',
    family_member_lname: '',
    family_member_mobile: '',
  });

const handleSearch = (column, value) => {
    setSearchText({ ...searchText, [column]: value });
};

/// For Multiple Delete
const handleCheck = (e) => {
  const { value, checked } = e.target
  
  if (checked) {
    setFamilyMembersIds([...familyMembersIds, value]);
  } else {
    setFamilyMembersIds(() => familyMembersIds.filter((e) => e !== value));
  }
}

  if(familyMemberId){
    //console.log("I am here before sending to edit"+users.family_member_fname);
    return (
      <div>
          <AddFamilyMembers familyMemberId = {familyMemberId} familyMembers = {familyMembers} /> </div>
          )
  }else{
          
            // Get Current Clients
            const indexOfLastFamilyMembers = familyMembersCurrentPage * familyMembersPerPage;
            const indexOfFirstFamilyMembers = indexOfLastFamilyMembers - familyMembersPerPage;
            const currentFamilyMembers = familyMembers.slice(indexOfFirstFamilyMembers, indexOfLastFamilyMembers);

            const sortedData = currentFamilyMembers.slice().sort((a, b) => {
                
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
                  item.family_member_fname.toLowerCase().includes(searchText.family_member_fname.toLowerCase()) &&
                  item.family_member_lname.toString().includes(searchText.family_member_lname) &&
                  item.family_member_mobile.toLowerCase().includes(searchText.family_member_mobile.toLowerCase())
                );
              });




              return (
                <div class="tab-pane fade show active" id="ntarget-1" role="tabpanel" aria-labelledby="ntab-1">
                <p><h4 class="heading-h4">!! Family Members List !!</h4> { familyMembersIds.length > 1 ? <input type="button" value="Delete ALL " onClick={() => deleteMultipleFamilyMembers(familyMembersIds)}></input>  :  ''} <button onClick={handleExportCSV}>Export CSV</button></p>
                <input type="search" name="searchbox" value= { searchFamilyMembers} placeholder='Search Here' onChange={(e) => inputEvent(e)} />

                <div class="table-container">
                    <table id="client-list" class="table table-bordered display">  
                        <thead>
                            <tr>                                                                    
                                <th onClick={() => handleSort('family_member_fname')}>  Name
                                {sortColumn === 'family_member_fname' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('family_member_lname')}>  Email Id
                                {sortColumn === 'family_member_lname' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('family_member_mobile')}> Mobile
                                {sortColumn === 'family_member_mobile' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
                                <th>Action</th>                                                                    
                            </tr>
                            <tr>
                                <td><input
              type="text"
              value={searchText.family_member_fname}
              onChange={(e) => handleSearch('family_member_fname', e.target.value)}
            /></td>
                                <td><input
              type="text"
              value={searchText.family_member_lname}
              onChange={(e) => handleSearch('family_member_lname', e.target.value)}
            /></td>
                                <td> <input
              type="text"
              value={searchText.family_member_mobile}
              onChange={(e) => handleSearch('family_member_mobile', e.target.value)}
            /></td>
                                <td></td>
                            
                            </tr>
                        </thead>  
                    <tbody>                 
                            
                            {filteredData.map((familyMember , index) => {
                              return (<tr>
                                <td>{familyMembers.length}{familyMember.family_member_fname}</td>
                                <td>{familyMember.family_member_lname}</td>
                                <td>{familyMember.family_member_mobile}</td>  
                                <td>
                                  <div class="btn-group">
                                  <span  class="btn btn-success btn-xs" onClick={() => navigate("/familymembers/" + familyMember._id)}><i class="bi bi-pencil"></i></span>
                                  <Link  class="btn btn-danger btn-xs" onClick={() => deleteFamilyMembers(familyMember._id)}><i class="bi bi-trash"></i></Link>
        
                                    <div className="col-sm"> <input type="checkBox" checked={familyMembersIds.includes(familyMember._id)} name={familyMember._id} value={familyMember._id} onClick={(e) => handleCheck(e)}></input></div>
                                  </div>
                                </td> 
                            
                            </tr>)
                            })} 
        
              </tbody>
              </table>
                </div>					
                             <Pagination setCurrentPage={setCurrentPage} currentPage={familyMembersCurrentPage} postsPerPage={familyMembersPerPage} totalPosts={familyMembers.length} paginate={familyMembersPaginate} />
        
        </div>
              )
  }          
}

export default ListFamilyMembers
