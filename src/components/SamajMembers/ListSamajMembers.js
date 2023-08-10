import React , { useContext , useState , useEffect } from 'react'
import AddSamajMembers from './AddSamajMembers.js'
import SamajMembersContext from '../../context/SamajMembers/SamajMembersContext.js'
import { useNavigate, useParams , Link } from "react-router-dom";
import Pagination from '../Products/Pagination';
import Papa from 'papaparse';

const ListSamajMembers = () => {
   
  const navigate = useNavigate();
  const params = useParams();
  const samajMemberId = params.id;

  const context = useContext(SamajMembersContext);
  const { samajMembers , setSamajMembers ,  deleteSamajMembers , deleteMultipleSamajMembers} = context;

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
const [samajMembersCurrentPage, setSamajMembersCurrentPage] = useState(1);
const [samajMembersPerPage, SetSamajMembersPerPage] = useState(15);
const [currentPage, setCurrentPage] = useState(1);
const samajMembersPaginate = pageNumber => setSamajMembersCurrentPage(pageNumber);
const [samajMembersIds, setSamajMembersIds] = useState([]);

////For Search 
 //// For Search
const [searchSamajMembers, setSearchSamajMembers] = useState('');
const [searchOldSamajMembers, setSearchOldSamajMembers] = useState("");
useEffect(() => {
    //inputEvent();
  }, [searchSamajMembers]);
  
const inputEvent = (e) => {
    const data = e.target.value;
    console.log(data);  
    setSearchSamajMembers(data);
    setSearchOldSamajMembers(samajMembers);
    if(data == '') {
      console.log("I am here in data blank"+searchSamajMembers);
      {samajMembers.map((searchSamajMember , index) => { console.log(searchSamajMembers.length +' here'+searchSamajMember.samaj_member_fname) } 
     
      )}
      setSamajMembers([...samajMembers]);
    } else {
      //alert("I am here for search"+data);
      //const filterResult = data.length > 0 ? mainProducts.filter((product) => product.samaj_members_name.toLowerCase().includes(data.toLowerCase())) : setMainProducts(searchSamajMembers) ;
      
      const filterResult = data.length === 0
      ? null 
      : samajMembers.filter((samajMember) => samajMember.samaj_member_fname.toLowerCase().includes(data.toLowerCase()));
  
      setSamajMembers(filterResult);
    }
  };



/// For Export  CSV 
//const [csvData, setCsvData] = useState('');

  const handleExportCSV = () => {
    // Convert the items to CSV format using papaparse
    const csv = Papa.unparse(samajMembers, {
      header: true,
    });

    // Create a Blob and URL for the CSV data
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    // Create a link and click it to trigger the download
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'samajMembers.csv');
    document.body.appendChild(link);
    link.click();

    // Clean up by removing the link and revoking the URL
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };


////// For Each Column Search 

const [searchText, setSearchText] = useState({
    samaj_member_fname: '',
    samaj_member_lname: '',
    samaj_member_mobile: '',
  });

const handleSearch = (column, value) => {
    setSearchText({ ...searchText, [column]: value });
};

/// For Multiple Delete
const handleCheck = (e) => {
  const { value, checked } = e.target
  
  if (checked) {
    setSamajMembersIds([...samajMembersIds, value]);
  } else {
    setSamajMembersIds(() => samajMembersIds.filter((e) => e !== value));
  }
}

  if(samajMemberId){
    //console.log("I am here before sending to edit"+users.samaj_member_fname);
    return (
      <div>
          <AddSamajMembers samajMemberId = {samajMemberId} samajMembers = {samajMembers} /> </div>
          )
  }else{
          
            // Get Current Clients
            const indexOfLastSamajMembers = samajMembersCurrentPage * samajMembersPerPage;
            const indexOfFirstSamajMembers = indexOfLastSamajMembers - samajMembersPerPage;
            const currentSamajMembers = samajMembers.slice(indexOfFirstSamajMembers, indexOfLastSamajMembers);

            const sortedData = currentSamajMembers.slice().sort((a, b) => {
                
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
                  item.samaj_member_fname.toLowerCase().includes(searchText.samaj_member_fname.toLowerCase()) &&
                  item.samaj_member_lname.toString().includes(searchText.samaj_member_lname) &&
                  item.samaj_member_mobile.toLowerCase().includes(searchText.samaj_member_mobile.toLowerCase())
                );
              });




              return (
                <div class="tab-pane fade show active" id="ntarget-1" role="tabpanel" aria-labelledby="ntab-1">
                <p><h4 class="heading-h4">!! Samaj Members List !!</h4> { samajMembersIds.length > 1 ? <input type="button" value="Delete ALL " onClick={() => deleteMultipleSamajMembers(samajMembersIds)}></input>  :  ''} <button onClick={handleExportCSV}>Export CSV</button></p>
                <input type="search" name="searchbox" value= { searchSamajMembers} placeholder='Search Here' onChange={(e) => inputEvent(e)} />

                <div class="table-container">
                    <table id="client-list" class="table table-bordered display">  
                        <thead>
                            <tr>                                                                    
                                <th onClick={() => handleSort('samaj_member_fname')}>  Name
                                {sortColumn === 'samaj_member_fname' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('samaj_member_lname')}>  Email Id
                                {sortColumn === 'samaj_member_lname' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('samaj_member_mobile')}> Mobile
                                {sortColumn === 'samaj_member_mobile' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
                                <th>Action</th>                                                                    
                            </tr>
                            <tr>
                                <td><input
              type="text"
              value={searchText.samaj_member_fname}
              onChange={(e) => handleSearch('samaj_member_fname', e.target.value)}
            /></td>
                                <td><input
              type="text"
              value={searchText.samaj_member_lname}
              onChange={(e) => handleSearch('samaj_member_lname', e.target.value)}
            /></td>
                                <td> <input
              type="text"
              value={searchText.samaj_member_mobile}
              onChange={(e) => handleSearch('samaj_member_mobile', e.target.value)}
            /></td>
                                <td></td>
                            
                            </tr>
                        </thead>  
                    <tbody>                 
                            
                            {filteredData.map((samajMember , index) => {
                              return (<tr>
                                <td>{samajMembers.length}{samajMember.samaj_member_fname}</td>
                                <td>{samajMember.samaj_member_lname}</td>
                                <td>{samajMember.samaj_member_mobile}</td>  
                                <td>
                                  <div class="btn-group">
                                  <span  class="btn btn-success btn-xs" onClick={() => navigate("/samajmembers/" + samajMember._id)}><i class="bi bi-pencil"></i></span>
                                  <Link  class="btn btn-danger btn-xs" onClick={() => deleteSamajMembers(samajMember._id)}><i class="bi bi-trash"></i></Link>
        
                                    <div className="col-sm"> <input type="checkBox" checked={samajMembersIds.includes(samajMember._id)} name={samajMember._id} value={samajMember._id} onClick={(e) => handleCheck(e)}></input></div>
                                  </div>
                                </td> 
                            
                            </tr>)
                            })} 
        
              </tbody>
              </table>
                </div>					
                             <Pagination setCurrentPage={setCurrentPage} currentPage={samajMembersCurrentPage} postsPerPage={samajMembersPerPage} totalPosts={samajMembers.length} paginate={samajMembersPaginate} />
        
        </div>
              )
  }          
}

export default ListSamajMembers
