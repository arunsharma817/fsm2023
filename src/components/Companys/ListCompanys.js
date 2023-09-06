import React , { useContext , useState , useEffect } from 'react'
import AddCompanys from './AddCompanys.js'
import CompanysContext from '../../context/Companys/CompanysContext.js'
import { useNavigate, useParams , Link } from "react-router-dom";
import Pagination from '../Products/Pagination.js';
import Papa from 'papaparse';

const ListCompanys = () => {
   
  const navigate = useNavigate();
  const params = useParams();
  const companyId = params.id;

  const context = useContext(CompanysContext);
  const { companys , setCompanys ,  deleteCompanys , deleteMultipleCompanys} = context;

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
const [companysCurrentPage, setCompanysCurrentPage] = useState(1);
const [companysPerPage, SetCompanysPerPage] = useState(15);
const [currentPage, setCurrentPage] = useState(1);
const companysPaginate = pageNumber => setCompanysCurrentPage(pageNumber);
const [companysIds, setCompanysIds] = useState([]);

////For Search 
 //// For Search
const [searchCompanys, setSearchCompanys] = useState('');
const [searchOldCompanys, setSearchOldCompanys] = useState("");
useEffect(() => {
    //inputEvent();
  }, [searchCompanys]);
  
const inputEvent = (e) => {
    const data = e.target.value;
    console.log(data);  
    setSearchCompanys(data);
    setSearchOldCompanys(companys);
    if(data == '') {
      console.log("I am here in data blank"+searchCompanys);
      {companys.map((searchCompany , index) => { console.log(searchCompanys.length +' here'+searchCompany.company_fname) } 
     
      )}
      setCompanys([...companys]);
    } else {
      //alert("I am here for search"+data);
      //const filterResult = data.length > 0 ? mainProducts.filter((product) => product.companys_name.toLowerCase().includes(data.toLowerCase())) : setMainProducts(searchCompanys) ;
      
      const filterResult = data.length === 0
      ? null 
      : companys.filter((company) => company.company_fname.toLowerCase().includes(data.toLowerCase()));
  
      setCompanys(filterResult);
    }
  };



/// For Export  CSV 
//const [csvData, setCsvData] = useState('');

  const handleExportCSV = () => {
    // Convert the items to CSV format using papaparse
    const csv = Papa.unparse(companys, {
      header: true,
    });

    // Create a Blob and URL for the CSV data
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    // Create a link and click it to trigger the download
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'companys.csv');
    document.body.appendChild(link);
    link.click();

    // Clean up by removing the link and revoking the URL
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };


////// For Each Column Search 

const [searchText, setSearchText] = useState({
    "company_industry": ' ',
    "company_name": ' ',
    "company_services": ' ',
    "company_products": ' ',
    "company_cmm_level": ' ',
    "company_website": ' ',
    "company_hr_mail": ' ',
    "company_info_mail":' ',
    "company_career_mail": ' ',
    "company_phone_number": ' ',
    "company_mobile_number": ' ',
    "company_wtsap_number": ' ',
    "company_linkedin_url": ' ',
    "company_facebook_url": ' ',
    "company_instgram_url": ' ',
    "company_twitter_url": ' ',
    "company_youtube_url": ' ',
    "company_start_date": ' ',
    "company_director_name": ' ',
    "company_director_email": ' ',
    "company_director_mobile": ' ',
"company_director_phone": ' ',
    "company_director_linkedin": ' ',
    "company_clients": ' ',
    "company_numberof_employees": ' ',
    "company_office_address": ' ',
    "company_branches_countries": ' ',
    "company_branches_cities": ' ',
    "company_technologies": ' ',
    "company_investors": ' ',
    "company_share_price": ' ',
    "company_google_ranking": ' ',
    "company_google_reviews": ' ',
    "company_scope": ' ',
    "company_future_projects": ' ',
    "company_third_parties": ' ',
    "company_founder": ' ',
    "company_ceo": ' ',
    "company_ceo_linkedin": ' ',
    "company_ceo_mobile": ' ',
    "company_business_model": ' ',
    "company_history": ' '
 });

const handleSearch = (column, value) => {
    setSearchText({ ...searchText, [column]: value });
};

/// For Multiple Delete
const handleCheck = (e) => {
  const { value, checked } = e.target
  
  if (checked) {
    setCompanysIds([...companysIds, value]);
  } else {
    setCompanysIds(() => companysIds.filter((e) => e !== value));
  }
}

  if(companyId){
    //console.log("I am here before sending to edit"+users.company_fname);
    return (
      <div>
          <AddCompanys companyId = {companyId} companys = {companys} /> </div>
          )
  }else{
          
            // Get Current Clients
            const indexOfLastCompanys = companysCurrentPage * companysPerPage;
            const indexOfFirstCompanys = indexOfLastCompanys - companysPerPage;
            const currentCompanys = companys.slice(indexOfFirstCompanys, indexOfLastCompanys);

            const sortedData = currentCompanys.slice().sort((a, b) => {
                
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
                <p><h4 class="heading-h4">!! Companys List !!</h4> { companysIds.length > 1 ? <input type="button" value="Delete ALL " onClick={() => deleteMultipleCompanys(companysIds)}></input>  :  ''} <button onClick={handleExportCSV}>Export CSV</button></p>
                <input type="search" name="searchbox" value= { searchCompanys} placeholder='Search Here' onChange={(e) => inputEvent(e)} />

                <div class="table-container">
                    <table id="client-list" class="table table-bordered display">  
                        <thead>
                        <tr>                                                                    
                                <th onClick={() => handleSort('company_industry')}>  Mfg. Name
                                {sortColumn === 'company_industry' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('company_name')}>  Industry 
                                {sortColumn === 'company_name' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('company_services')}> Products
                                {sortColumn === 'company_services' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								
								 <th onClick={() => handleSort('company_products')}>  Mobile
                                {sortColumn === 'company_products' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('company_cmm_level')}>  Alternate Mobile 
                                {sortColumn === 'company_cmm_level' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('company_website')}> Email Id
                                {sortColumn === 'company_website' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								
								<th onClick={() => handleSort('company_hr_mail')}>  Website
                                {sortColumn === 'company_hr_mail' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('company_info_mail')}>  Reg. Address 
                                {sortColumn === 'company_info_mail' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('company_career_mail')}> Zip Code
                                {sortColumn === 'company_career_mail' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								
								 <th onClick={() => handleSort('company_phone_number')}>  City
                                {sortColumn === 'company_phone_number' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('company_mobile_number')}> State 
                                {sortColumn === 'company_mobile_number' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('company_wtsap_number')}> Country
                                {sortColumn === 'company_wtsap_number' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								
								
								<th onClick={() => handleSort('company_linkedin_url')}>  Country Code
                                {sortColumn === 'company_linkedin_url' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('company_facebook_url')}>  Continent 
                                {sortColumn === 'company_facebook_url' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('company_instgram_url')}> Customr Care
                                {sortColumn === 'company_instgram_url' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								
								 <th onClick={() => handleSort('company_twitter_url')}>  QR Code
                                {sortColumn === 'company_twitter_url' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('company_youtube_url')}>  Barcode Number 
                                {sortColumn === 'company_youtube_url' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('company_start_date')}> Foundation Date
                                {sortColumn === 'company_start_date' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								
								<th onClick={() => handleSort('company_director_name')}>  License
                                {sortColumn === 'company_director_name' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('company_director_email')}>  PAN 
                                {sortColumn === 'company_director_email' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('company_director_mobile')}> GST
                                {sortColumn === 'company_director_mobile' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								
								 <th onClick={() => handleSort('company_director_phone')}>  Corp. Certi.
                                {sortColumn === 'company_director_phone' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('company_director_linkedin')}> Gumasta 
                                {sortColumn === 'company_director_linkedin' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('company_clients')}> MOA 
                                {sortColumn === 'company_clients' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>

                                <th onClick={() => handleSort('company_numberof_employees')}> MSME 
                                {sortColumn === 'company_numberof_employees' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								
								 <th onClick={() => handleSort('company_office_address')}>  Act Details
                                {sortColumn === 'company_office_address' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('company_branches_countries')}> Cancelled Cheque 
                                {sortColumn === 'company_branches_countries' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('company_branches_cities')}> Employees Number 
                                {sortColumn === 'company_branches_cities' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								
								
								 <th onClick={() => handleSort('company_technologies')}>  Dir. FName
                                {sortColumn === 'company_technologies' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('company_investors')}> Dir. LName
                                {sortColumn === 'company_investors' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('company_share_price')}> Dir. Email 
                                {sortColumn === 'company_share_price' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								
								 <th onClick={() => handleSort('company_google_ranking')}>  Dir. Mobile
                                {sortColumn === 'company_google_ranking' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('company_google_reviews')}> Dir. LinkedIn
                                {sortColumn === 'company_google_reviews' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('company_scope')}> Company Reviews 
                                {sortColumn === 'company_scope' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								<th onClick={() => handleSort('company_future_projects')}> Dir. LinkedIn
                                {sortColumn === 'company_future_projects' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('company_third_parties')}> Company Reviews 
                                {sortColumn === 'company_third_parties' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								<th onClick={() => handleSort('company_founder')}> Instagram
                                {sortColumn === 'company_founder' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('company_ceo')}> LinkedIn
                                {sortColumn === 'company_ceo' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								<th onClick={() => handleSort('company_ceo_linkedin')}> Youtube 
                                {sortColumn === 'company_ceo_linkedin' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('company_ceo_mobile')}> Countries 
                                {sortColumn === 'company_ceo_mobile' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								<th onClick={() => handleSort('company_business_model')}> Atrributes
                                {sortColumn === 'company_business_model' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('company_history')}> History 
                                {sortColumn === 'company_history' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
                                <th>Action</th>                                                                    
                            </tr>
                            <tr>                                                                    
                                <td><input type="text" value={searchText.company_industry} onChange={(e) => handleSearch('company_industry', e.target.value)}/>  
                                
                                
                                </td>
                                <td><input type="text" value={searchText.company_name} onChange={(e) => handleSearch('company_name', e.target.value)}/>  
                                
                                
                                </td>
                                <td><input type="text" value={searchText.company_services} onChange={(e) => handleSearch('company_services', e.target.value)}/>
                                
                               
                                </td>
								
								 <td><input type="text" value={searchText.company_products} onChange={(e) => handleSearch('company_products', e.target.value)}/> 
                                
                                
                                </td>
                                <td><input type="text" value={searchText.company_cmm_level} onChange={(e) => handleSearch('company_cmm_level', e.target.value)}/>   
                                
                                
                                </td>
                                <td><input type="text" value={searchText.company_website} onChange={(e) => handleSearch('company_website', e.target.value)}/> 
                                
                               
                                </td>
								
								<td><input type="text" value={searchText.company_hr_mail} onChange={(e) => handleSearch('company_hr_mail', e.target.value)}/> 
                                
                                
                                </td>
                                <td><input type="text" value={searchText.company_info_mail} onChange={(e) => handleSearch('company_info_mail', e.target.value)}/>   
                                
                                
                                </td>
                                <td><input type="text" value={searchText.company_career_mail} onChange={(e) => handleSearch('company_career_mail', e.target.value)}/> 
                                
                               
                                </td>
								
								 <td><input type="text" value={searchText.company_phone_number} onChange={(e) => handleSearch('company_phone_number', e.target.value)}/> 
                                
                                
                                </td>
                                <td><input type="text" value={searchText.company_mobile_number} onChange={(e) => handleSearch('company_mobile_number', e.target.value)}/> 
                                
                                
                                </td>
                                <td><input type="text" value={searchText.company_wtsap_number} onChange={(e) => handleSearch('company_wtsap_number', e.target.value)}/>
                                
                               
                                </td>
								
								
								<td><input type="text" value={searchText.company_linkedin_url} onChange={(e) => handleSearch('company_linkedin_url', e.target.value)}/>  
                                
                                
                                </td>
                                <td><input type="text" value={searchText.company_facebook_url} onChange={(e) => handleSearch('company_facebook_url', e.target.value)}/>  
                                
                                
                                </td>
                                <td><input type="text" value={searchText.company_instgram_url} onChange={(e) => handleSearch('company_instgram_url', e.target.value)}/> 
                                
                               
                                </td>
								
								 <td><input type="text" value={searchText.company_twitter_url} onChange={(e) => handleSearch('company_twitter_url', e.target.value)}/>  
                                
                                
                                </td>
                                <td><input type="text" value={searchText.company_youtube_url} onChange={(e) => handleSearch('company_youtube_url', e.target.value)}/>   
                                
                                
                                </td>
                                <td><input type="text" value={searchText.company_start_date} onChange={(e) => handleSearch('company_start_date', e.target.value)}/> 
                                
                               
                                </td>
								
								<td><input type="text" value={searchText.company_director_name} onChange={(e) => handleSearch('company_director_name', e.target.value)}/> 
                                
                                
                                </td>
                                <td><input type="text" value={searchText.company_director_email} onChange={(e) => handleSearch('company_director_email', e.target.value)}/>  
                                
                                
                                </td>
                                <td><input type="text" value={searchText.company_director_mobile} onChange={(e) => handleSearch('company_director_mobile', e.target.value)}/>
                                
                               
                                </td>
								
								 <td><input type="text" value={searchText.company_director_phone} onChange={(e) => handleSearch('company_director_phone', e.target.value)}/>                                  
                                
                                </td>
                                <td><input type="text" value={searchText.company_director_linkedin} onChange={(e) => handleSearch('company_director_linkedin', e.target.value)}/> 
                                
                                
                                </td>
                                <td><input type="text" value={searchText.company_clients} onChange={(e) => handleSearch('company_clients', e.target.value)}/> 
                                
                               
                                </td>
								
                                <td><input type="text" value={searchText.company_numberof_employees} onChange={(e) => handleSearch('company_numberof_employees', e.target.value)}/>  
</td>
								 <td><input type="text" value={searchText.company_office_address} onChange={(e) => handleSearch('company_office_address', e.target.value)}/>  
                                
                                
                                </td>
                                <td><input type="text" value={searchText.company_branches_countries} onChange={(e) => handleSearch('company_branches_countries', e.target.value)}/>  
                                
                                
                                </td>
                                <td><input type="text" value={searchText.company_branches_cities} onChange={(e) => handleSearch('company_branches_cities', e.target.value)}/>  
                                
                               
                                </td>
								
								
								 <td><input type="text" value={searchText.company_technologies} onChange={(e) => handleSearch('company_technologies', e.target.value)}/>  
                                
                                
                                </td>
                                <td><input type="text" value={searchText.company_investors} onChange={(e) => handleSearch('company_investors', e.target.value)}/> 
                                
                                
                                </td>
                                <td><input type="text" value={searchText.company_share_price} onChange={(e) => handleSearch('company_share_price', e.target.value)}/>  
                                
                               
                                </td>
								
								 <td><input type="text" value={searchText.company_google_ranking} onChange={(e) => handleSearch('company_google_ranking', e.target.value)}/>  
                                
                                
                                </td>
                                <td><input type="text" value={searchText.company_google_reviews} onChange={(e) => handleSearch('company_google_reviews', e.target.value)}/> 
                                
                                
                                </td>
                                <td><input type="text" value={searchText.company_scope} onChange={(e) => handleSearch('company_scope', e.target.value)}/>  
                                
                               
                                </td>
								<td><input type="text" value={searchText.company_future_projects} onChange={(e) => handleSearch('company_future_projects', e.target.value)}/> 
                                
                                
                                </td>
                                <td><input type="text" value={searchText.company_third_parties} onChange={(e) => handleSearch('company_third_parties', e.target.value)}/> 
                                
                               
                                </td>
								<td><input type="text" value={searchText.company_founder} onChange={(e) => handleSearch('company_founder', e.target.value)}/>
                                
                                
                                </td>
                                <td><input type="text" value={searchText.company_ceo} onChange={(e) => handleSearch('company_ceo', e.target.value)}/>
                                
                               
                                </td>
								<td><input type="text" value={searchText.company_ceo_linkedin} onChange={(e) => handleSearch('company_ceo_linkedin', e.target.value)}/> 
                                
                                
                                </td>
                                <td><input type="text" value={searchText.company_ceo_mobile} onChange={(e) => handleSearch('company_ceo_mobile', e.target.value)}/> 
                                
                               
                                </td>
								<td><input type="text" value={searchText.company_business_model} onChange={(e) => handleSearch('company_business_model', e.target.value)}/>
                                
                                
                                </td>
                                <td><input type="text" value={searchText.company_history} onChange={(e) => handleSearch('company_history', e.target.value)}/>                      
                               
                                </td>
                                <td>Action</td>                                                                    
                            </tr>
                        </thead>  
                    <tbody>                 
                            
                            {sortedData.map((company , index) => {
                              return (<tr>
                                <td>{companys.length}{company.company_industry}</td>
                                <td>{company.company_name}</td>
                                <td>{company.company_services}</td>  
								<td>{companys.length}{company.company_products}</td>
                                <td>{company.company_cmm_level}</td>
                                <td>{company.company_website}</td> 
								<td>{companys.length}{company.company_hr_mail}</td>
                                <td>{company.company_info_mail}</td>
                                <td>{company.company_career_mail}</td> 
                                <td>{company.company_phone_number}</td>
                                <td>{company.company_mobile_number}</td> 
                                <td>{company.company_wtsap_number}</td>
                                <td>{company.company_linkedin_url}</td> 
								                <td>{companys.length}{company.company_facebook_url}</td>
                                <td>{company.company_instgram_url}</td>
                                <td>{company.company_twitter_url}</td> 
								                <td>{companys.length}{company.company_youtube_url}</td>
                                <td>{company.company_start_date}</td>
                                <td>{company.company_director_name}</td> 
								                <td>{company.company_director_email}</td>
                                <td>{company.company_director_mobile}</td> 
								                <td>{company.company_director_phone}</td>
                                <td>{company.company_director_linkedin}</td> 
								                <td>{company.company_clients}</td>
                                <td>{company.company_numberof_employees}</td> 
								                <td>{company.company_office_address}</td> 
								                <td>{company.company_branches_countries}</td>
                                <td>{company.company_branches_cities}</td> 
								                <td>{company.company_technologies}</td> 
								                <td>{company.company_investors}</td>
                                <td>{company.company_share_price}</td> 
								                <td>{company.company_google_ranking}</td> 
								                <td>{company.company_google_reviews}</td>
                                <td>{company.company_scope}</td> 
								                <td>{company.company_future_projects}</td> 
								                <td>{company.company_third_parties}</td>
                                <td>{company.company_founder}</td> 
								                <td>{company.company_ceo}</td>
                                <td>{company.company_ceo_linkedin}</td> 
								                <td>{company.company_ceo_mobile}</td> 
								                <td>{company.company_business_model}</td>
                                <td>{company.company_history}</td> 
                                <td>
                                  <div class="btn-group">
                                  <span  class="btn btn-success btn-xs" onClick={() => navigate("/companys/" + company._id)}><i class="bi bi-pencil"></i></span>
                                  <Link  class="btn btn-danger btn-xs" onClick={() => deleteCompanys(company._id)}><i class="bi bi-trash"></i></Link>        
                                    <div className="col-sm"> <input type="checkBox" checked={companysIds.includes(company._id)} name={company._id} value={company._id} onClick={(e) => handleCheck(e)}></input></div>
                                  </div>
                                </td> 
                            
                            </tr>)
                            })} 
        
              </tbody>
              </table>
                </div>					
                             <Pagination setCurrentPage={setCurrentPage} currentPage={companysCurrentPage} postsPerPage={companysPerPage} totalPosts={companys.length} paginate={companysPaginate} />
        
        </div>
              )
  }          
}

export default ListCompanys
