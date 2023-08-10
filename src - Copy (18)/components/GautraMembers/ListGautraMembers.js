import React , { useContext , useState , useEffect } from 'react'
import AddGautraMembers from './AddGautraMembers.js'
import GautraMembersContext from '../../context/gautraMembers/GautraMembersContext.js'
import { useNavigate, useParams , Link } from "react-router-dom";
import Pagination from '../Products/Pagination';
import Papa from 'papaparse';

const ListGautraMembers = () => {
   
  const navigate = useNavigate();
  const params = useParams();
  const gautraMemberId = params.id;

  const context = useContext(GautraMembersContext);
  const { gautraMembers , setGautraMembers ,  deleteGautraMembers , deleteMultipleGautraMembers} = context;

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
const [gautraMembersCurrentPage, setGautraMembersCurrentPage] = useState(1);
const [gautraMembersPerPage, SetGautraMembersPerPage] = useState(15);
const [currentPage, setCurrentPage] = useState(1);
const gautraMembersPaginate = pageNumber => setGautraMembersCurrentPage(pageNumber);
const [gautraMembersIds, setGautraMembersIds] = useState([]);

////For Search 
 //// For Search
const [searchGautraMembers, setSearchGautraMembers] = useState('');
const [searchOldGautraMembers, setSearchOldGautraMembers] = useState("");
useEffect(() => {
    //inputEvent();
  }, [searchGautraMembers]);
  
const inputEvent = (e) => {
    const data = e.target.value;
    console.log(data);  
    setSearchGautraMembers(data);
    setSearchOldGautraMembers(gautraMembers);
    if(data == '') {
      console.log("I am here in data blank"+searchGautraMembers);
      {gautraMembers.map((searchGautraMember , index) => { console.log(searchGautraMembers.length +' here'+searchGautraMember.gautra_member_fname) } 
     
      )}
      setGautraMembers([...gautraMembers]);
    } else {
      //alert("I am here for search"+data);
      //const filterResult = data.length > 0 ? mainProducts.filter((product) => product.gautra_members_name.toLowerCase().includes(data.toLowerCase())) : setMainProducts(searchGautraMembers) ;
      
      const filterResult = data.length === 0
      ? null 
      : gautraMembers.filter((gautraMember) => gautraMember.gautra_member_fname.toLowerCase().includes(data.toLowerCase()));
  
      setGautraMembers(filterResult);
    }
  };



/// For Export  CSV 
//const [csvData, setCsvData] = useState('');

  const handleExportCSV = () => {
    // Convert the items to CSV format using papaparse
    const csv = Papa.unparse(gautraMembers, {
      header: true,
    });

    // Create a Blob and URL for the CSV data
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    // Create a link and click it to trigger the download
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'gautraMembers.csv');
    document.body.appendChild(link);
    link.click();

    // Clean up by removing the link and revoking the URL
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };


////// For Each Column Search 

const [searchText, setSearchText] = useState({
    gautra_member_fname: '',
    gautra_member_lname: '',
    gautra_member_mobile: '',
  });

const handleSearch = (column, value) => {
    setSearchText({ ...searchText, [column]: value });
};

/// For Multiple Delete
const handleCheck = (e) => {
  const { value, checked } = e.target
  
  if (checked) {
    setGautraMembersIds([...gautraMembersIds, value]);
  } else {
    setGautraMembersIds(() => gautraMembersIds.filter((e) => e !== value));
  }
}

  if(gautraMemberId){
    //console.log("I am here before sending to edit"+users.gautra_member_fname);
    return (
      <div>
          <AddGautraMembers gautraMemberId = {gautraMemberId} gautraMembers = {gautraMembers} /> </div>
          )
  }else{
          
            // Get Current Clients
            const indexOfLastGautraMembers = gautraMembersCurrentPage * gautraMembersPerPage;
            const indexOfFirstGautraMembers = indexOfLastGautraMembers - gautraMembersPerPage;
            const currentGautraMembers = gautraMembers.slice(indexOfFirstGautraMembers, indexOfLastGautraMembers);

            const sortedData = currentGautraMembers.slice().sort((a, b) => {
                
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
                  item.gautra_member_fname.toLowerCase().includes(searchText.gautra_member_fname.toLowerCase()) &&
                  item.gautra_member_lname.toString().includes(searchText.gautra_member_lname) &&
                  item.gautra_member_mobile.toLowerCase().includes(searchText.gautra_member_mobile.toLowerCase())
                );
              });




              return (
                <div class="tab-pane fade show active" id="ntarget-1" role="tabpanel" aria-labelledby="ntab-1">
                <p><h4 class="heading-h4">!! Gautra Members List !!</h4> { gautraMembersIds.length > 1 ? <input type="button" value="Delete ALL " onClick={() => deleteMultipleGautraMembers(gautraMembersIds)}></input>  :  ''} <button onClick={handleExportCSV}>Export CSV</button></p>
                <input type="search" name="searchbox" value= { searchGautraMembers} placeholder='Search Here' onChange={(e) => inputEvent(e)} />

                <div class="table-container">
                    <table id="client-list" class="table table-bordered display">  
                        <thead>
                            <tr>                                                                    
                                <th onClick={() => handleSort('gautra_member_fname')}>  Name
                                {sortColumn === 'gautra_member_fname' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('gautra_member_lname')}>  Email Id
                                {sortColumn === 'gautra_member_lname' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('gautra_member_mobile')}> Mobile
                                {sortColumn === 'gautra_member_mobile' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
                                <th>Action</th>                                                                    
                            </tr>
                            <tr>
                                <td><input
              type="text"
              value={searchText.gautra_member_fname}
              onChange={(e) => handleSearch('gautra_member_fname', e.target.value)}
            /></td>
                                <td><input
              type="text"
              value={searchText.gautra_member_lname}
              onChange={(e) => handleSearch('gautra_member_lname', e.target.value)}
            /></td>
                                <td> <input
              type="text"
              value={searchText.gautra_member_mobile}
              onChange={(e) => handleSearch('gautra_member_mobile', e.target.value)}
            /></td>
                                <td></td>
                            
                            </tr>
                        </thead>  
                    <tbody>                 
                            
                            {filteredData.map((gautraMember , index) => {
                              return (<tr>
                                <td>{gautraMembers.length}{gautraMember.gautra_member_fname}</td>
                                <td>{gautraMember.gautra_member_lname}</td>
                                <td>{gautraMember.gautra_member_mobile}</td>  
                                <td>
                                  <div class="btn-group">
                                  <span  class="btn btn-success btn-xs" onClick={() => navigate("/gautramembers/" + gautraMember._id)}><i class="bi bi-pencil"></i></span>
                                  <Link  class="btn btn-danger btn-xs" onClick={() => deleteGautraMembers(gautraMember._id)}><i class="bi bi-trash"></i></Link>
        
                                    <div className="col-sm"> <input type="checkBox" checked={gautraMembersIds.includes(gautraMember._id)} name={gautraMember._id} value={gautraMember._id} onClick={(e) => handleCheck(e)}></input></div>
                                  </div>
                                </td> 
                            
                            </tr>)
                            })} 
        
              </tbody>
              </table>
                </div>					
                             <Pagination setCurrentPage={setCurrentPage} currentPage={gautraMembersCurrentPage} postsPerPage={gautraMembersPerPage} totalPosts={gautraMembers.length} paginate={gautraMembersPaginate} />
        
        </div>
              )
  }          
}

export default ListGautraMembers
