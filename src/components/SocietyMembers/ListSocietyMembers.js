import React , { useContext , useState , useEffect } from 'react'
import AddSocietyMembers from './AddSocietyMembers.js'
import SocietyMembersContext from '../../context/societyMembers/SocietyMembersContext.js'
import { useNavigate, useParams , Link } from "react-router-dom";
import Pagination from '../Products/Pagination';
import Papa from 'papaparse';

const ListSocietyMembers = () => {
   
  const navigate = useNavigate();
  const params = useParams();
  const societyMemberId = params.id;

  const context = useContext(SocietyMembersContext);
  const { societyMembers , setSocietyMembers ,  deleteSocietyMembers , deleteMultipleSocietyMembers} = context;

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
const [societyMembersCurrentPage, setSocietyMembersCurrentPage] = useState(1);
const [societyMembersPerPage, SetSocietyMembersPerPage] = useState(15);
const [currentPage, setCurrentPage] = useState(1);
const societyMembersPaginate = pageNumber => setSocietyMembersCurrentPage(pageNumber);
const [societyMembersIds, setSocietyMembersIds] = useState([]);

////For Search 
 //// For Search
const [searchSocietyMembers, setSearchSocietyMembers] = useState('');
const [searchOldSocietyMembers, setSearchOldSocietyMembers] = useState("");
useEffect(() => {
    //inputEvent();
  }, [searchSocietyMembers]);
  
const inputEvent = (e) => {
    const data = e.target.value;
    console.log(data);  
    setSearchSocietyMembers(data);
    setSearchOldSocietyMembers(societyMembers);
    if(data == '') {
      console.log("I am here in data blank"+searchSocietyMembers);
      {societyMembers.map((searchSocietyMember , index) => { console.log(searchSocietyMembers.length +' here'+searchSocietyMember.society_member_fname) } 
     
      )}
      setSocietyMembers([...societyMembers]);
    } else {
      //alert("I am here for search"+data);
      //const filterResult = data.length > 0 ? mainProducts.filter((product) => product.society_members_name.toLowerCase().includes(data.toLowerCase())) : setMainProducts(searchSocietyMembers) ;
      
      const filterResult = data.length === 0
      ? null 
      : societyMembers.filter((societyMember) => societyMember.society_member_fname.toLowerCase().includes(data.toLowerCase()));
  
      setSocietyMembers(filterResult);
    }
  };



/// For Export  CSV 
//const [csvData, setCsvData] = useState('');

  const handleExportCSV = () => {
    // Convert the items to CSV format using papaparse
    const csv = Papa.unparse(societyMembers, {
      header: true,
    });

    // Create a Blob and URL for the CSV data
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    // Create a link and click it to trigger the download
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'societyMembers.csv');
    document.body.appendChild(link);
    link.click();

    // Clean up by removing the link and revoking the URL
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };


////// For Each Column Search 

const [searchText, setSearchText] = useState({
    society_member_fname: '',
    society_member_lname: '',
    society_member_mobile: '',
  });

const handleSearch = (column, value) => {
    setSearchText({ ...searchText, [column]: value });
};

/// For Multiple Delete
const handleCheck = (e) => {
  const { value, checked } = e.target
  
  if (checked) {
    setSocietyMembersIds([...societyMembersIds, value]);
  } else {
    setSocietyMembersIds(() => societyMembersIds.filter((e) => e !== value));
  }
}

  if(societyMemberId){
    //console.log("I am here before sending to edit"+users.society_member_fname);
    return (
      <div>
          <AddSocietyMembers societyMemberId = {societyMemberId} societyMembers = {societyMembers} /> </div>
          )
  }else{
          
            // Get Current Clients
            const indexOfLastSocietyMembers = societyMembersCurrentPage * societyMembersPerPage;
            const indexOfFirstSocietyMembers = indexOfLastSocietyMembers - societyMembersPerPage;
            const currentSocietyMembers = societyMembers.slice(indexOfFirstSocietyMembers, indexOfLastSocietyMembers);

            const sortedData = currentSocietyMembers.slice().sort((a, b) => {
                
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
                  item.society_member_fname.toLowerCase().includes(searchText.society_member_fname.toLowerCase()) &&
                  item.society_member_lname.toString().includes(searchText.society_member_lname) &&
                  item.society_member_mobile.toLowerCase().includes(searchText.society_member_mobile.toLowerCase())
                );
              });




              return (
                <div class="tab-pane fade show active" id="ntarget-1" role="tabpanel" aria-labelledby="ntab-1">
                <p><h4 class="heading-h4">!! Society Members List !!</h4> { societyMembersIds.length > 1 ? <input type="button" value="Delete ALL " onClick={() => deleteMultipleSocietyMembers(societyMembersIds)}></input>  :  ''} <button onClick={handleExportCSV}>Export CSV</button></p>
                <input type="search" name="searchbox" value= { searchSocietyMembers} placeholder='Search Here' onChange={(e) => inputEvent(e)} />

                <div class="table-container">
                    <table id="client-list" class="table table-bordered display">  
                        <thead>
                            <tr>                                                                    
                                <th onClick={() => handleSort('society_member_fname')}>  Name
                                {sortColumn === 'society_member_fname' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('society_member_lname')}>  Email Id
                                {sortColumn === 'society_member_lname' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('society_member_mobile')}> Mobile
                                {sortColumn === 'society_member_mobile' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
                                <th>Action</th>                                                                    
                            </tr>
                            <tr>
                                <td><input
              type="text"
              value={searchText.society_member_fname}
              onChange={(e) => handleSearch('society_member_fname', e.target.value)}
            /></td>
                                <td><input
              type="text"
              value={searchText.society_member_lname}
              onChange={(e) => handleSearch('society_member_lname', e.target.value)}
            /></td>
                                <td> <input
              type="text"
              value={searchText.society_member_mobile}
              onChange={(e) => handleSearch('society_member_mobile', e.target.value)}
            /></td>
                                <td></td>
                            
                            </tr>
                        </thead>  
                    <tbody>                 
                            
                            {filteredData.map((societyMember , index) => {
                              return (<tr>
                                <td>{societyMembers.length}{societyMember.society_member_fname}</td>
                                <td>{societyMember.society_member_lname}</td>
                                <td>{societyMember.society_member_mobile}</td>  
                                <td>
                                  <div class="btn-group">
                                  <span  class="btn btn-success btn-xs" onClick={() => navigate("/societymembers/" + societyMember._id)}><i class="bi bi-pencil"></i></span>
                                  <Link  class="btn btn-danger btn-xs" onClick={() => deleteSocietyMembers(societyMember._id)}><i class="bi bi-trash"></i></Link>
        
                                    <div className="col-sm"> <input type="checkBox" checked={societyMembersIds.includes(societyMember._id)} name={societyMember._id} value={societyMember._id} onClick={(e) => handleCheck(e)}></input></div>
                                  </div>
                                </td> 
                            
                            </tr>)
                            })} 
        
              </tbody>
              </table>
                </div>					
                             <Pagination setCurrentPage={setCurrentPage} currentPage={societyMembersCurrentPage} postsPerPage={societyMembersPerPage} totalPosts={societyMembers.length} paginate={societyMembersPaginate} />
        
        </div>
              )
  }          
}

export default ListSocietyMembers
