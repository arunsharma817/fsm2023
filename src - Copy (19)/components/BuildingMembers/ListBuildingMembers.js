import React , { useContext , useState , useEffect } from 'react'
import AddBuildingMembers from './AddBuildingMembers.js'
import BuildingMembersContext from '../../context/BuildingMembers/BuildingMembersContext.js'
import { useNavigate, useParams , Link } from "react-router-dom";
import Pagination from '../Products/Pagination';
import Papa from 'papaparse';

const ListBuildingMembers = () => {
   
  const navigate = useNavigate();
  const params = useParams();
  const buildingMemberId = params.id;

  const context = useContext(BuildingMembersContext);
  const { buildingMembers , setBuildingMembers ,  deleteBuildingMembers , deleteMultipleBuildingMembers} = context;

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
const [buildingMembersCurrentPage, setBuildingMembersCurrentPage] = useState(1);
const [buildingMembersPerPage, SetBuildingMembersPerPage] = useState(15);
const [currentPage, setCurrentPage] = useState(1);
const buildingMembersPaginate = pageNumber => setBuildingMembersCurrentPage(pageNumber);
const [buildingMembersIds, setBuildingMembersIds] = useState([]);

////For Search 
 //// For Search
const [searchBuildingMembers, setSearchBuildingMembers] = useState('');
const [searchOldBuildingMembers, setSearchOldBuildingMembers] = useState("");
useEffect(() => {
    //inputEvent();
  }, [searchBuildingMembers]);
  
const inputEvent = (e) => {
    const data = e.target.value;
    console.log(data);  
    setSearchBuildingMembers(data);
    setSearchOldBuildingMembers(buildingMembers);
    if(data == '') {
      console.log("I am here in data blank"+searchBuildingMembers);
      {buildingMembers.map((searchBuildingMember , index) => { console.log(searchBuildingMembers.length +' here'+searchBuildingMember.building_member_fname) } 
     
      )}
      setBuildingMembers([...buildingMembers]);
    } else {
      //alert("I am here for search"+data);
      //const filterResult = data.length > 0 ? mainProducts.filter((product) => product.building_members_name.toLowerCase().includes(data.toLowerCase())) : setMainProducts(searchBuildingMembers) ;
      
      const filterResult = data.length === 0
      ? null 
      : buildingMembers.filter((buildingMember) => buildingMember.building_member_fname.toLowerCase().includes(data.toLowerCase()));
  
      setBuildingMembers(filterResult);
    }
  };



/// For Export  CSV 
//const [csvData, setCsvData] = useState('');

  const handleExportCSV = () => {
    // Convert the items to CSV format using papaparse
    const csv = Papa.unparse(buildingMembers, {
      header: true,
    });

    // Create a Blob and URL for the CSV data
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    // Create a link and click it to trigger the download
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'buildingMembers.csv');
    document.body.appendChild(link);
    link.click();

    // Clean up by removing the link and revoking the URL
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };


////// For Each Column Search 

const [searchText, setSearchText] = useState({
    building_member_fname: '',
    building_member_lname: '',
    building_member_mobile: '',
  });

const handleSearch = (column, value) => {
    setSearchText({ ...searchText, [column]: value });
};

/// For Multiple Delete
const handleCheck = (e) => {
  const { value, checked } = e.target
  
  if (checked) {
    setBuildingMembersIds([...buildingMembersIds, value]);
  } else {
    setBuildingMembersIds(() => buildingMembersIds.filter((e) => e !== value));
  }
}

  if(buildingMemberId){
    //console.log("I am here before sending to edit"+users.building_member_fname);
    return (
      <div>
          <AddBuildingMembers buildingMemberId = {buildingMemberId} buildingMembers = {buildingMembers} /> </div>
          )
  }else{
          
            // Get Current Clients
            const indexOfLastBuildingMembers = buildingMembersCurrentPage * buildingMembersPerPage;
            const indexOfFirstBuildingMembers = indexOfLastBuildingMembers - buildingMembersPerPage;
            const currentBuildingMembers = buildingMembers.slice(indexOfFirstBuildingMembers, indexOfLastBuildingMembers);

            const sortedData = currentBuildingMembers.slice().sort((a, b) => {
                
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
                  item.building_member_fname.toLowerCase().includes(searchText.building_member_fname.toLowerCase()) &&
                  item.building_member_lname.toString().includes(searchText.building_member_lname) &&
                  item.building_member_mobile.toLowerCase().includes(searchText.building_member_mobile.toLowerCase())
                );
              });




              return (
                <div class="tab-pane fade show active" id="ntarget-1" role="tabpanel" aria-labelledby="ntab-1">
                <p><h4 class="heading-h4">!! Building Members List !!</h4> { buildingMembersIds.length > 1 ? <input type="button" value="Delete ALL " onClick={() => deleteMultipleBuildingMembers(buildingMembersIds)}></input>  :  ''} <button onClick={handleExportCSV}>Export CSV</button></p>
                <input type="search" name="searchbox" value= { searchBuildingMembers} placeholder='Search Here' onChange={(e) => inputEvent(e)} />

                <div class="table-container">
                    <table id="client-list" class="table table-bordered display">  
                        <thead>
                            <tr>                                                                    
                                <th onClick={() => handleSort('building_member_fname')}>  Name
                                {sortColumn === 'building_member_fname' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('building_member_lname')}>  Email Id
                                {sortColumn === 'building_member_lname' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('building_member_mobile')}> Mobile
                                {sortColumn === 'building_member_mobile' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
                                <th>Action</th>                                                                    
                            </tr>
                            <tr>
                                <td><input
              type="text"
              value={searchText.building_member_fname}
              onChange={(e) => handleSearch('building_member_fname', e.target.value)}
            /></td>
                                <td><input
              type="text"
              value={searchText.building_member_lname}
              onChange={(e) => handleSearch('building_member_lname', e.target.value)}
            /></td>
                                <td> <input
              type="text"
              value={searchText.building_member_mobile}
              onChange={(e) => handleSearch('building_member_mobile', e.target.value)}
            /></td>
                                <td></td>
                            
                            </tr>
                        </thead>  
                    <tbody>                 
                            
                            {filteredData.map((buildingMember , index) => {
                              return (<tr>
                                <td>{buildingMembers.length}{buildingMember.building_member_fname}</td>
                                <td>{buildingMember.building_member_lname}</td>
                                <td>{buildingMember.building_member_mobile}</td>  
                                <td>
                                  <div class="btn-group">
                                  <span  class="btn btn-success btn-xs" onClick={() => navigate("/buildingmembers/" + buildingMember._id)}><i class="bi bi-pencil"></i></span>
                                  <Link  class="btn btn-danger btn-xs" onClick={() => deleteBuildingMembers(buildingMember._id)}><i class="bi bi-trash"></i></Link>
        
                                    <div className="col-sm"> <input type="checkBox" checked={buildingMembersIds.includes(buildingMember._id)} name={buildingMember._id} value={buildingMember._id} onClick={(e) => handleCheck(e)}></input></div>
                                  </div>
                                </td> 
                            
                            </tr>)
                            })} 
        
              </tbody>
              </table>
                </div>					
                             <Pagination setCurrentPage={setCurrentPage} currentPage={buildingMembersCurrentPage} postsPerPage={buildingMembersPerPage} totalPosts={buildingMembers.length} paginate={buildingMembersPaginate} />
        
        </div>
              )
  }          
}

export default ListBuildingMembers
