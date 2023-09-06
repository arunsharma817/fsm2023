import React , { useContext , useState , useEffect } from 'react'
import AddContractors from './AddContractors.js'
import ContractorsContext from '../../context/Contractors/ContractorsContext.js'
import { useNavigate, useParams , Link } from "react-router-dom";
import Pagination from '../Products/Pagination';
import Papa from 'papaparse';

const ListContractors = () => {
   
  const navigate = useNavigate();
  const params = useParams();
  const contractorId = params.id;

  const context = useContext(ContractorsContext);
  const { contractors , setContractors ,  deleteContractors , deleteMultipleContractors} = context;

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
const [contractorsCurrentPage, setContractorsCurrentPage] = useState(1);
const [contractorsPerPage, SetContractorsPerPage] = useState(15);
const [currentPage, setCurrentPage] = useState(1);
const contractorsPaginate = pageNumber => setContractorsCurrentPage(pageNumber);
const [contractorsIds, setContractorsIds] = useState([]);

////For Search 
 //// For Search
const [searchContractors, setSearchContractors] = useState('');
const [searchOldContractors, setSearchOldContractors] = useState("");
useEffect(() => {
    //inputEvent();
  }, [searchContractors]);
  
const inputEvent = (e) => {
    const data = e.target.value;
    console.log(data);  
    setSearchContractors(data);
    setSearchOldContractors(contractors);
    if(data == '') {
      console.log("I am here in data blank"+searchContractors);
      {contractors.map((searchContractor , index) => { console.log(searchContractors.length +' here'+searchContractor.contractor_fname) } 
     
      )}
      setContractors([...contractors]);
    } else {
      //alert("I am here for search"+data);
      //const filterResult = data.length > 0 ? mainProducts.filter((product) => product.contractors_name.toLowerCase().includes(data.toLowerCase())) : setMainProducts(searchContractors) ;
      
      const filterResult = data.length === 0
      ? null 
      : contractors.filter((contractor) => contractor.contractor_fname.toLowerCase().includes(data.toLowerCase()));
  
      setContractors(filterResult);
    }
  };



/// For Export  CSV 
//const [csvData, setCsvData] = useState('');

  const handleExportCSV = () => {
    // Convert the items to CSV format using papaparse
    const csv = Papa.unparse(contractors, {
      header: true,
    });

    // Create a Blob and URL for the CSV data
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    // Create a link and click it to trigger the download
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'contractors.csv');
    document.body.appendChild(link);
    link.click();

    // Clean up by removing the link and revoking the URL
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };


////// For Each Column Search 

const [searchText, setSearchText] = useState({
    "contractor_industry": ' ',
    "contractor_fname": ' ',
    "contractor_lname": ' ',
    "contractor_products": ' ',
    "contractor_experience": ' ',
    "contractor_website": ' ',
    "contractor_hr_mail": ' ',
    "contractor_info_mail":' ',
    "contractor_career_mail": ' ',
    "contractor_phone_number": ' ',
    "contractor_mobile_number": ' ',
    "contractor_wtsap_number": ' ',
    "contractor_linkedin_url": ' ',
    "contractor_facebook_url": ' ',
    "contractor_instgram_url": ' ',
    "contractor_twitter_url": ' ',
    "contractor_youtube_url": ' ',
    "contractor_start_date": ' ',
    "contractor_mentor_name": ' ',
    "contractor_mentor_email": ' ',
    "contractor_mentor_mobile": ' ',
"contractor_mentor_phone": ' ',
    "contractor_mentor_linkedin": ' ',
    "contractor_clients": ' ',
    "contractor_team_size": ' ',
    "contractor_office_address": ' ',
    "contractor_branches_countries": ' ',
    "contractor_branches_cities": ' ',
    "contractor_technologies": ' ',
    "contractor_investors": ' ',
    "contractor_share_price": ' ',
    "contractor_google_ranking": ' ',
    "contractor_google_reviews": ' ',
    "contractor_scope": ' ',
    "contractor_future_projects": ' ',
    "contractor_third_parties": ' ',
    "contractor_founder": ' ',
    "contractor_ceo": ' ',
    "contractor_ceo_linkedin": ' ',
    "contractor_ceo_mobile": ' ',
    "contractor_business_model": ' ',
    "contractor_history": ' '
 });

const handleSearch = (column, value) => {
    setSearchText({ ...searchText, [column]: value });
};

/// For Multiple Delete
const handleCheck = (e) => {
  const { value, checked } = e.target
  
  if (checked) {
    setContractorsIds([...contractorsIds, value]);
  } else {
    setContractorsIds(() => contractorsIds.filter((e) => e !== value));
  }
}

  if(contractorId){
    //console.log("I am here before sending to edit"+users.contractor_fname);
    return (
      <div>
          <AddContractors contractorId = {contractorId} contractors = {contractors} /> </div>
          )
  }else{
          
            // Get Current Clients
            const indexOfLastContractors = contractorsCurrentPage * contractorsPerPage;
            const indexOfFirstContractors = indexOfLastContractors - contractorsPerPage;
            const currentContractors = contractors.slice(indexOfFirstContractors, indexOfLastContractors);

            const sortedData = currentContractors.slice().sort((a, b) => {
                
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


       




              return (
                <div class="tab-pane fade show active" id="ntarget-1" role="tabpanel" aria-labelledby="ntab-1">
                <p><h4 class="heading-h4">!! Contractors List !!</h4> { contractorsIds.length > 1 ? <input type="button" value="Delete ALL " onClick={() => deleteMultipleContractors(contractorsIds)}></input>  :  ''} <button onClick={handleExportCSV}>Export CSV</button></p>
                <input type="search" name="searchbox" value= { searchContractors} placeholder='Search Here' onChange={(e) => inputEvent(e)} />

                <div class="table-container">
                    <table id="client-list" class="table table-bordered display">  
                        <thead>
                        <tr>                                                                    
                                <th onClick={() => handleSort('contractor_industry')}>  Mfg. Name
                                {sortColumn === 'contractor_industry' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('contractor_fname')}>  Industry 
                                {sortColumn === 'contractor_fname' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('contractor_lname')}> Products
                                {sortColumn === 'contractor_lname' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								
								 <th onClick={() => handleSort('contractor_products')}>  Mobile
                                {sortColumn === 'contractor_products' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('contractor_experience')}>  Alternate Mobile 
                                {sortColumn === 'contractor_experience' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('contractor_website')}> Email Id
                                {sortColumn === 'contractor_website' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								
								<th onClick={() => handleSort('contractor_hr_mail')}>  Website
                                {sortColumn === 'contractor_hr_mail' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('contractor_info_mail')}>  Reg. Address 
                                {sortColumn === 'contractor_info_mail' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('contractor_career_mail')}> Zip Code
                                {sortColumn === 'contractor_career_mail' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								
								 <th onClick={() => handleSort('contractor_phone_number')}>  City
                                {sortColumn === 'contractor_phone_number' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('contractor_mobile_number')}> State 
                                {sortColumn === 'contractor_mobile_number' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('contractor_wtsap_number')}> Country
                                {sortColumn === 'contractor_wtsap_number' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								
								
								<th onClick={() => handleSort('contractor_linkedin_url')}>  Country Code
                                {sortColumn === 'contractor_linkedin_url' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('contractor_facebook_url')}>  Continent 
                                {sortColumn === 'contractor_facebook_url' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('contractor_instgram_url')}> Customr Care
                                {sortColumn === 'contractor_instgram_url' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								
								 <th onClick={() => handleSort('contractor_twitter_url')}>  QR Code
                                {sortColumn === 'contractor_twitter_url' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('contractor_youtube_url')}>  Barcode Number 
                                {sortColumn === 'contractor_youtube_url' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('contractor_start_date')}> Foundation Date
                                {sortColumn === 'contractor_start_date' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								
								<th onClick={() => handleSort('contractor_mentor_name')}>  License
                                {sortColumn === 'contractor_mentor_name' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('contractor_mentor_email')}>  PAN 
                                {sortColumn === 'contractor_mentor_email' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('contractor_mentor_mobile')}> GST
                                {sortColumn === 'contractor_mentor_mobile' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								
								 <th onClick={() => handleSort('contractor_mentor_phone')}>  Corp. Certi.
                                {sortColumn === 'contractor_mentor_phone' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('contractor_mentor_linkedin')}> Gumasta 
                                {sortColumn === 'contractor_mentor_linkedin' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('contractor_clients')}> MOA 
                                {sortColumn === 'contractor_clients' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>

                                <th onClick={() => handleSort('contractor_team_size')}> MSME 
                                {sortColumn === 'contractor_team_size' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								
								 <th onClick={() => handleSort('contractor_office_address')}>  Act Details
                                {sortColumn === 'contractor_office_address' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('contractor_branches_countries')}> Cancelled Cheque 
                                {sortColumn === 'contractor_branches_countries' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('contractor_branches_cities')}> Employees Number 
                                {sortColumn === 'contractor_branches_cities' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								
								
								 <th onClick={() => handleSort('contractor_technologies')}>  Dir. FName
                                {sortColumn === 'contractor_technologies' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('contractor_investors')}> Dir. LName
                                {sortColumn === 'contractor_investors' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('contractor_share_price')}> Dir. Email 
                                {sortColumn === 'contractor_share_price' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								
								 <th onClick={() => handleSort('contractor_google_ranking')}>  Dir. Mobile
                                {sortColumn === 'contractor_google_ranking' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('contractor_google_reviews')}> Dir. LinkedIn
                                {sortColumn === 'contractor_google_reviews' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('contractor_scope')}> Contractor Reviews 
                                {sortColumn === 'contractor_scope' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								<th onClick={() => handleSort('contractor_future_projects')}> Dir. LinkedIn
                                {sortColumn === 'contractor_future_projects' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('contractor_third_parties')}> Contractor Reviews 
                                {sortColumn === 'contractor_third_parties' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								<th onClick={() => handleSort('contractor_founder')}> Instagram
                                {sortColumn === 'contractor_founder' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('contractor_ceo')}> LinkedIn
                                {sortColumn === 'contractor_ceo' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								<th onClick={() => handleSort('contractor_ceo_linkedin')}> Youtube 
                                {sortColumn === 'contractor_ceo_linkedin' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('contractor_ceo_mobile')}> Countries 
                                {sortColumn === 'contractor_ceo_mobile' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								<th onClick={() => handleSort('contractor_business_model')}> Atrributes
                                {sortColumn === 'contractor_business_model' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('contractor_history')}> History 
                                {sortColumn === 'contractor_history' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
                                <th>Action</th>                                                                    
                            </tr>
                            <tr>                                                                    
                                <td><input type="text" value={searchText.contractor_industry} onChange={(e) => handleSearch('contractor_industry', e.target.value)}/>  
                                
                                
                                </td>
                                <td><input type="text" value={searchText.contractor_fname} onChange={(e) => handleSearch('contractor_fname', e.target.value)}/>  
                                
                                
                                </td>
                                <td><input type="text" value={searchText.contractor_lname} onChange={(e) => handleSearch('contractor_lname', e.target.value)}/>
                                
                               
                                </td>
								
								 <td><input type="text" value={searchText.contractor_products} onChange={(e) => handleSearch('contractor_products', e.target.value)}/> 
                                
                                
                                </td>
                                <td><input type="text" value={searchText.contractor_experience} onChange={(e) => handleSearch('contractor_experience', e.target.value)}/>   
                                
                                
                                </td>
                                <td><input type="text" value={searchText.contractor_website} onChange={(e) => handleSearch('contractor_website', e.target.value)}/> 
                                
                               
                                </td>
								
								<td><input type="text" value={searchText.contractor_hr_mail} onChange={(e) => handleSearch('contractor_hr_mail', e.target.value)}/> 
                                
                                
                                </td>
                                <td><input type="text" value={searchText.contractor_info_mail} onChange={(e) => handleSearch('contractor_info_mail', e.target.value)}/>   
                                
                                
                                </td>
                                <td><input type="text" value={searchText.contractor_career_mail} onChange={(e) => handleSearch('contractor_career_mail', e.target.value)}/> 
                                
                               
                                </td>
								
								 <td><input type="text" value={searchText.contractor_phone_number} onChange={(e) => handleSearch('contractor_phone_number', e.target.value)}/> 
                                
                                
                                </td>
                                <td><input type="text" value={searchText.contractor_mobile_number} onChange={(e) => handleSearch('contractor_mobile_number', e.target.value)}/> 
                                
                                
                                </td>
                                <td><input type="text" value={searchText.contractor_wtsap_number} onChange={(e) => handleSearch('contractor_wtsap_number', e.target.value)}/>
                                
                               
                                </td>
								
								
								<td><input type="text" value={searchText.contractor_linkedin_url} onChange={(e) => handleSearch('contractor_linkedin_url', e.target.value)}/>  
                                
                                
                                </td>
                                <td><input type="text" value={searchText.contractor_facebook_url} onChange={(e) => handleSearch('contractor_facebook_url', e.target.value)}/>  
                                
                                
                                </td>
                                <td><input type="text" value={searchText.contractor_instgram_url} onChange={(e) => handleSearch('contractor_instgram_url', e.target.value)}/> 
                                
                               
                                </td>
								
								 <td><input type="text" value={searchText.contractor_twitter_url} onChange={(e) => handleSearch('contractor_twitter_url', e.target.value)}/>  
                                
                                
                                </td>
                                <td><input type="text" value={searchText.contractor_youtube_url} onChange={(e) => handleSearch('contractor_youtube_url', e.target.value)}/>   
                                
                                
                                </td>
                                <td><input type="text" value={searchText.contractor_start_date} onChange={(e) => handleSearch('contractor_start_date', e.target.value)}/> 
                                
                               
                                </td>
								
								<td><input type="text" value={searchText.contractor_mentor_name} onChange={(e) => handleSearch('contractor_mentor_name', e.target.value)}/> 
                                
                                
                                </td>
                                <td><input type="text" value={searchText.contractor_mentor_email} onChange={(e) => handleSearch('contractor_mentor_email', e.target.value)}/>  
                                
                                
                                </td>
                                <td><input type="text" value={searchText.contractor_mentor_mobile} onChange={(e) => handleSearch('contractor_mentor_mobile', e.target.value)}/>
                                
                               
                                </td>
								
								 <td><input type="text" value={searchText.contractor_mentor_phone} onChange={(e) => handleSearch('contractor_mentor_phone', e.target.value)}/>                                  
                                
                                </td>
                                <td><input type="text" value={searchText.contractor_mentor_linkedin} onChange={(e) => handleSearch('contractor_mentor_linkedin', e.target.value)}/> 
                                
                                
                                </td>
                                <td><input type="text" value={searchText.contractor_clients} onChange={(e) => handleSearch('contractor_clients', e.target.value)}/> 
                                
                               
                                </td>
								
                                <td><input type="text" value={searchText.contractor_team_size} onChange={(e) => handleSearch('contractor_team_size', e.target.value)}/>  
</td>
								 <td><input type="text" value={searchText.contractor_office_address} onChange={(e) => handleSearch('contractor_office_address', e.target.value)}/>  
                                
                                
                                </td>
                                <td><input type="text" value={searchText.contractor_branches_countries} onChange={(e) => handleSearch('contractor_branches_countries', e.target.value)}/>  
                                
                                
                                </td>
                                <td><input type="text" value={searchText.contractor_branches_cities} onChange={(e) => handleSearch('contractor_branches_cities', e.target.value)}/>  
                                
                               
                                </td>
								
								
								 <td><input type="text" value={searchText.contractor_technologies} onChange={(e) => handleSearch('contractor_technologies', e.target.value)}/>  
                                
                                
                                </td>
                                <td><input type="text" value={searchText.contractor_investors} onChange={(e) => handleSearch('contractor_investors', e.target.value)}/> 
                                
                                
                                </td>
                                <td><input type="text" value={searchText.contractor_share_price} onChange={(e) => handleSearch('contractor_share_price', e.target.value)}/>  
                                
                               
                                </td>
								
								 <td><input type="text" value={searchText.contractor_google_ranking} onChange={(e) => handleSearch('contractor_google_ranking', e.target.value)}/>  
                                
                                
                                </td>
                                <td><input type="text" value={searchText.contractor_google_reviews} onChange={(e) => handleSearch('contractor_google_reviews', e.target.value)}/> 
                                
                                
                                </td>
                                <td><input type="text" value={searchText.contractor_scope} onChange={(e) => handleSearch('contractor_scope', e.target.value)}/>  
                                
                               
                                </td>
								<td><input type="text" value={searchText.contractor_future_projects} onChange={(e) => handleSearch('contractor_future_projects', e.target.value)}/> 
                                
                                
                                </td>
                                <td><input type="text" value={searchText.contractor_third_parties} onChange={(e) => handleSearch('contractor_third_parties', e.target.value)}/> 
                                
                               
                                </td>
								<td><input type="text" value={searchText.contractor_founder} onChange={(e) => handleSearch('contractor_founder', e.target.value)}/>
                                
                                
                                </td>
                                <td><input type="text" value={searchText.contractor_ceo} onChange={(e) => handleSearch('contractor_ceo', e.target.value)}/>
                                
                               
                                </td>
								<td><input type="text" value={searchText.contractor_ceo_linkedin} onChange={(e) => handleSearch('contractor_ceo_linkedin', e.target.value)}/> 
                                
                                
                                </td>
                                <td><input type="text" value={searchText.contractor_ceo_mobile} onChange={(e) => handleSearch('contractor_ceo_mobile', e.target.value)}/> 
                                
                               
                                </td>
								<td><input type="text" value={searchText.contractor_business_model} onChange={(e) => handleSearch('contractor_business_model', e.target.value)}/>
                                
                                
                                </td>
                                <td><input type="text" value={searchText.contractor_history} onChange={(e) => handleSearch('contractor_history', e.target.value)}/>                      
                               
                                </td>
                                <td>Action</td>                                                                    
                            </tr>
                        </thead>  
                    <tbody>                 
                            
                            {sortedData.map((contractor , index) => {
                              return (<tr>
                                <td>{contractors.length}{contractor.contractor_industry}</td>
                                <td>{contractor.contractor_fname}</td>
                                <td>{contractor.contractor_lname}</td>  
								<td>{contractors.length}{contractor.contractor_products}</td>
                                <td>{contractor.contractor_experience}</td>
                                <td>{contractor.contractor_website}</td> 
								<td>{contractors.length}{contractor.contractor_hr_mail}</td>
                                <td>{contractor.contractor_info_mail}</td>
                                <td>{contractor.contractor_career_mail}</td> 
                                <td>{contractor.contractor_phone_number}</td>
                                <td>{contractor.contractor_mobile_number}</td> 
                                <td>{contractor.contractor_wtsap_number}</td>
                                <td>{contractor.contractor_linkedin_url}</td> 
								                <td>{contractors.length}{contractor.contractor_facebook_url}</td>
                                <td>{contractor.contractor_instgram_url}</td>
                                <td>{contractor.contractor_twitter_url}</td> 
								                <td>{contractors.length}{contractor.contractor_youtube_url}</td>
                                <td>{contractor.contractor_start_date}</td>
                                <td>{contractor.contractor_mentor_name}</td> 
								                <td>{contractor.contractor_mentor_email}</td>
                                <td>{contractor.contractor_mentor_mobile}</td> 
								                <td>{contractor.contractor_mentor_phone}</td>
                                <td>{contractor.contractor_mentor_linkedin}</td> 
								                <td>{contractor.contractor_clients}</td>
                                <td>{contractor.contractor_team_size}</td> 
								                <td>{contractor.contractor_office_address}</td> 
								                <td>{contractor.contractor_branches_countries}</td>
                                <td>{contractor.contractor_branches_cities}</td> 
								                <td>{contractor.contractor_technologies}</td> 
								                <td>{contractor.contractor_investors}</td>
                                <td>{contractor.contractor_share_price}</td> 
								                <td>{contractor.contractor_google_ranking}</td> 
								                <td>{contractor.contractor_google_reviews}</td>
                                <td>{contractor.contractor_scope}</td> 
								                <td>{contractor.contractor_future_projects}</td> 
								                <td>{contractor.contractor_third_parties}</td>
                                <td>{contractor.contractor_founder}</td> 
								                <td>{contractor.contractor_ceo}</td>
                                <td>{contractor.contractor_ceo_linkedin}</td> 
								                <td>{contractor.contractor_ceo_mobile}</td> 
								                <td>{contractor.contractor_business_model}</td>
                                <td>{contractor.contractor_history}</td> 
                                <td>
                                  <div class="btn-group">
                                  <span  class="btn btn-success btn-xs" onClick={() => navigate("/contractors/" + contractor._id)}><i class="bi bi-pencil"></i></span>
                                  <Link  class="btn btn-danger btn-xs" onClick={() => deleteContractors(contractor._id)}><i class="bi bi-trash"></i></Link>        
                                    <div className="col-sm"> <input type="checkBox" checked={contractorsIds.includes(contractor._id)} name={contractor._id} value={contractor._id} onClick={(e) => handleCheck(e)}></input></div>
                                  </div>
                                </td> 
                            
                            </tr>)
                            })} 
        
              </tbody>
              </table>
                </div>					
                             <Pagination setCurrentPage={setCurrentPage} currentPage={contractorsCurrentPage} postsPerPage={contractorsPerPage} totalPosts={contractors.length} paginate={contractorsPaginate} />
        
        </div>
              )
  }          
}

export default ListContractors
