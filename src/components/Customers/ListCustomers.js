import React , { useContext , useState , useEffect } from 'react'
import AddCustomers from './AddCustomers.js'
import CustomersContext from '../../context/Customers/CustomersContext.js'
import { useNavigate, useParams , Link } from "react-router-dom";
import Pagination from '../Products/Pagination';
import Papa from 'papaparse';

const ListCustomers = () => {
   
  const navigate = useNavigate();
  const params = useParams();
  const customerId = params.id;

  const context = useContext(CustomersContext);
  const { customers , setCustomers ,  deleteCustomers , deleteMultipleCustomers} = context;

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
const [customersCurrentPage, setCustomersCurrentPage] = useState(1);
const [customersPerPage, SetCustomersPerPage] = useState(15);
const [currentPage, setCurrentPage] = useState(1);
const customersPaginate = pageNumber => setCustomersCurrentPage(pageNumber);
const [customersIds, setCustomersIds] = useState([]);

////For Search 
 //// For Search
const [searchCustomers, setSearchCustomers] = useState('');
const [searchOldCustomers, setSearchOldCustomers] = useState("");
useEffect(() => {
    //inputEvent();
  }, [searchCustomers]);
  
const inputEvent = (e) => {
    const data = e.target.value;
    console.log(data);  
    setSearchCustomers(data);
    setSearchOldCustomers(customers);
    if(data == '') {
      console.log("I am here in data blank"+searchCustomers);
      {customers.map((searchCustomer , index) => { console.log(searchCustomers.length +' here'+searchCustomer.customer_fname) } 
     
      )}
      setCustomers([...customers]);
    } else {
      //alert("I am here for search"+data);
      //const filterResult = data.length > 0 ? mainProducts.filter((product) => product.customers_name.toLowerCase().includes(data.toLowerCase())) : setMainProducts(searchCustomers) ;
      
      const filterResult = data.length === 0
      ? null 
      : customers.filter((customer) => customer.customer_fname.toLowerCase().includes(data.toLowerCase()));
  
      setCustomers(filterResult);
    }
  };



/// For Export  CSV 
//const [csvData, setCsvData] = useState('');

  const handleExportCSV = () => {
    // Convert the items to CSV format using papaparse
    const csv = Papa.unparse(customers, {
      header: true,
    });

    // Create a Blob and URL for the CSV data
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    // Create a link and click it to trigger the download
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'customers.csv');
    document.body.appendChild(link);
    link.click();

    // Clean up by removing the link and revoking the URL
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };


////// For Each Column Search 

const [searchText, setSearchText] = useState({
    "customer_company_name": ' ',
    "customer_industry": ' ',
    "customer_products": ' ',
    "customer_mobile": ' ',
    "customer_mobile_alternate": ' ',
    "customer_email": ' ',
    "customer_website": ' ',
    "customer_registered_address":' ',
    "customer_zip_code": ' ',
    "customer_city": ' ',
    "customer_state": ' ',
    "customer_country": ' ',
    "customer_country_code": ' ',
    "customer_continent": ' ',
    "customer_customer_care": ' ',
    "customer_qr_code": ' ',
    "customer_barcode_number": ' ',
    "customer_foundation_date": ' ',
    "customer_license_number": ' ',
    "customer_pan_number": ' ',
    "customer_gst_number": ' ',
"customer_corporation_certificate": ' ',
    "customer_gumasta_certificate": ' ',
    "customer_moa_certificate": ' ',
    "customer_msme_certificate": ' ',
    "customer_account_details": ' ',
    "customer_cancelled_cheque": ' ',
    "customer_number_of_employees": ' ',
    "customer_director_fname": ' ',
    "customer_director_lname": ' ',
    "customer_director_email": ' ',
    "customer_director_mobile": ' ',
    "customer_director_linkedin": ' ',
    "customer_customer_reviews": ' ',
    "customer_customer_rating": ' ',
    "customer_facebook_url": ' ',
    "customer_instagram_url": ' ',
    "customer_linkedin_url": ' ',
    "customer_youtube_url": ' ',
    "customer_made_in_countries": ' ',
    "customer_attributes": ' ',
    "customer_brief_history": ' '
 });

const handleSearch = (column, value) => {
    setSearchText({ ...searchText, [column]: value });
};

/// For Multiple Delete
const handleCheck = (e) => {
  const { value, checked } = e.target
  
  if (checked) {
    setCustomersIds([...customersIds, value]);
  } else {
    setCustomersIds(() => customersIds.filter((e) => e !== value));
  }
}

  if(customerId){
    //console.log("I am here before sending to edit"+users.customer_fname);
    return (
      <div>
          <AddCustomers customerId = {customerId} customers = {customers} /> </div>
          )
  }else{
          
            // Get Current Clients
            const indexOfLastCustomers = customersCurrentPage * customersPerPage;
            const indexOfFirstCustomers = indexOfLastCustomers - customersPerPage;
            const currentCustomers = customers.slice(indexOfFirstCustomers, indexOfLastCustomers);

            const sortedData = currentCustomers.slice().sort((a, b) => {
                
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
                <p><h4 class="heading-h4">!! Customers List !!</h4> { customersIds.length > 1 ? <input type="button" value="Delete ALL " onClick={() => deleteMultipleCustomers(customersIds)}></input>  :  ''} <button onClick={handleExportCSV}>Export CSV</button></p>
                <input type="search" name="searchbox" value= { searchCustomers} placeholder='Search Here' onChange={(e) => inputEvent(e)} />

                <div class="table-container">
                    <table id="client-list" class="table table-bordered display">  
                        <thead>
                        <tr>                                                                    
                                <th onClick={() => handleSort('customer_company_name')}>  Mfg. Name
                                {sortColumn === 'customer_company_name' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('customer_industry')}>  Industry 
                                {sortColumn === 'customer_industry' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('customer_products')}> Products
                                {sortColumn === 'customer_products' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								
								 <th onClick={() => handleSort('customer_mobile')}>  Mobile
                                {sortColumn === 'customer_mobile' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('customer_mobile_alternate')}>  Alternate Mobile 
                                {sortColumn === 'customer_mobile_alternate' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('customer_email')}> Email Id
                                {sortColumn === 'customer_email' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								
								<th onClick={() => handleSort('customer_website')}>  Website
                                {sortColumn === 'customer_website' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('customer_registered_address')}>  Reg. Address 
                                {sortColumn === 'customer_registered_address' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('customer_zip_code')}> Zip Code
                                {sortColumn === 'customer_zip_code' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								
								 <th onClick={() => handleSort('customer_city')}>  City
                                {sortColumn === 'customer_city' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('customer_state')}> State 
                                {sortColumn === 'customer_state' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('customer_country')}> Country
                                {sortColumn === 'customer_country' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								
								
								<th onClick={() => handleSort('customer_country_code')}>  Country Code
                                {sortColumn === 'customer_country_code' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('customer_continent')}>  Continent 
                                {sortColumn === 'customer_continent' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('customer_customer_care')}> Customr Care
                                {sortColumn === 'customer_customer_care' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								
								 <th onClick={() => handleSort('customer_qr_code')}>  QR Code
                                {sortColumn === 'customer_qr_code' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('customer_barcode_number')}>  Barcode Number 
                                {sortColumn === 'customer_barcode_number' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('customer_foundation_date')}> Foundation Date
                                {sortColumn === 'customer_foundation_date' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								
								<th onClick={() => handleSort('customer_license_number')}>  License
                                {sortColumn === 'customer_license_number' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('customer_pan_number')}>  PAN 
                                {sortColumn === 'customer_pan_number' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('customer_gst_number')}> GST
                                {sortColumn === 'customer_gst_number' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								
								 <th onClick={() => handleSort('customer_corporation_certificate')}>  Corp. Certi.
                                {sortColumn === 'customer_corporation_certificate' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('customer_gumasta_certificate')}> Gumasta 
                                {sortColumn === 'customer_gumasta_certificate' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('customer_moa_certificate')}> MOA 
                                {sortColumn === 'customer_moa_certificate' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>

                                <th onClick={() => handleSort('customer_msme_certificate')}> MSME 
                                {sortColumn === 'customer_msme_certificate' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								
								 <th onClick={() => handleSort('customer_account_details')}>  Act Details
                                {sortColumn === 'customer_account_details' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('customer_cancelled_cheque')}> Cancelled Cheque 
                                {sortColumn === 'customer_cancelled_cheque' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('customer_number_of_employees')}> Employees Number 
                                {sortColumn === 'customer_number_of_employees' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								
								
								 <th onClick={() => handleSort('customer_director_fname')}>  Dir. FName
                                {sortColumn === 'customer_director_fname' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('customer_director_lname')}> Dir. LName
                                {sortColumn === 'customer_director_lname' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('customer_director_email')}> Dir. Email 
                                {sortColumn === 'customer_director_email' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								
								 <th onClick={() => handleSort('customer_director_mobile')}>  Dir. Mobile
                                {sortColumn === 'customer_director_mobile' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('customer_director_linkedin')}> Dir. LinkedIn
                                {sortColumn === 'customer_director_linkedin' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('customer_customer_reviews')}> Customer Reviews 
                                {sortColumn === 'customer_customer_reviews' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								<th onClick={() => handleSort('customer_customer_rating')}> Dir. LinkedIn
                                {sortColumn === 'customer_customer_rating' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('customer_facebook_url')}> Customer Reviews 
                                {sortColumn === 'customer_facebook_url' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								<th onClick={() => handleSort('customer_instagram_url')}> Instagram
                                {sortColumn === 'customer_instagram_url' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('customer_linkedin_url')}> LinkedIn
                                {sortColumn === 'customer_linkedin_url' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								<th onClick={() => handleSort('customer_youtube_url')}> Youtube 
                                {sortColumn === 'customer_youtube_url' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('customer_made_in_countries')}> Countries 
                                {sortColumn === 'customer_made_in_countries' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								<th onClick={() => handleSort('customer_attributes')}> Atrributes
                                {sortColumn === 'customer_attributes' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('customer_brief_history')}> History 
                                {sortColumn === 'customer_brief_history' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
                                <th>Action</th>                                                                    
                            </tr>
                            <tr>                                                                    
                                <td><input type="text" value={searchText.customer_company_name} onChange={(e) => handleSearch('customer_company_name', e.target.value)}/>  
                                
                                
                                </td>
                                <td><input type="text" value={searchText.customer_industry} onChange={(e) => handleSearch('customer_industry', e.target.value)}/>  
                                
                                
                                </td>
                                <td><input type="text" value={searchText.customer_products} onChange={(e) => handleSearch('customer_products', e.target.value)}/>
                                
                               
                                </td>
								
								 <td><input type="text" value={searchText.customer_mobile} onChange={(e) => handleSearch('customer_mobile', e.target.value)}/> 
                                
                                
                                </td>
                                <td><input type="text" value={searchText.customer_mobile_alternate} onChange={(e) => handleSearch('customer_mobile_alternate', e.target.value)}/>   
                                
                                
                                </td>
                                <td><input type="text" value={searchText.customer_email} onChange={(e) => handleSearch('customer_email', e.target.value)}/> 
                                
                               
                                </td>
								
								<td><input type="text" value={searchText.customer_website} onChange={(e) => handleSearch('customer_website', e.target.value)}/> 
                                
                                
                                </td>
                                <td><input type="text" value={searchText.customer_registered_address} onChange={(e) => handleSearch('customer_registered_address', e.target.value)}/>   
                                
                                
                                </td>
                                <td><input type="text" value={searchText.customer_zip_code} onChange={(e) => handleSearch('customer_zip_code', e.target.value)}/> 
                                
                               
                                </td>
								
								 <td><input type="text" value={searchText.customer_city} onChange={(e) => handleSearch('customer_city', e.target.value)}/> 
                                
                                
                                </td>
                                <td><input type="text" value={searchText.customer_state} onChange={(e) => handleSearch('customer_state', e.target.value)}/> 
                                
                                
                                </td>
                                <td><input type="text" value={searchText.customer_country} onChange={(e) => handleSearch('customer_country', e.target.value)}/>
                                
                               
                                </td>
								
								
								<td><input type="text" value={searchText.customer_country_code} onChange={(e) => handleSearch('customer_country_code', e.target.value)}/>  
                                
                                
                                </td>
                                <td><input type="text" value={searchText.customer_continent} onChange={(e) => handleSearch('customer_continent', e.target.value)}/>  
                                
                                
                                </td>
                                <td><input type="text" value={searchText.customer_customer_care} onChange={(e) => handleSearch('customer_customer_care', e.target.value)}/> 
                                
                               
                                </td>
								
								 <td><input type="text" value={searchText.customer_qr_code} onChange={(e) => handleSearch('customer_qr_code', e.target.value)}/>  
                                
                                
                                </td>
                                <td><input type="text" value={searchText.customer_barcode_number} onChange={(e) => handleSearch('customer_barcode_number', e.target.value)}/>   
                                
                                
                                </td>
                                <td><input type="text" value={searchText.customer_foundation_date} onChange={(e) => handleSearch('customer_foundation_date', e.target.value)}/> 
                                
                               
                                </td>
								
								<td><input type="text" value={searchText.customer_license_number} onChange={(e) => handleSearch('customer_license_number', e.target.value)}/> 
                                
                                
                                </td>
                                <td><input type="text" value={searchText.customer_pan_number} onChange={(e) => handleSearch('customer_pan_number', e.target.value)}/>  
                                
                                
                                </td>
                                <td><input type="text" value={searchText.customer_gst_number} onChange={(e) => handleSearch('customer_gst_number', e.target.value)}/>
                                
                               
                                </td>
								
								 <td><input type="text" value={searchText.customer_corporation_certificate} onChange={(e) => handleSearch('customer_corporation_certificate', e.target.value)}/>                                  
                                
                                </td>
                                <td><input type="text" value={searchText.customer_gumasta_certificate} onChange={(e) => handleSearch('customer_gumasta_certificate', e.target.value)}/> 
                                
                                
                                </td>
                                <td><input type="text" value={searchText.customer_moa_certificate} onChange={(e) => handleSearch('customer_moa_certificate', e.target.value)}/> 
                                
                               
                                </td>
								
                                <td><input type="text" value={searchText.customer_msme_certificate} onChange={(e) => handleSearch('customer_msme_certificate', e.target.value)}/>  
</td>
								 <td><input type="text" value={searchText.customer_account_details} onChange={(e) => handleSearch('customer_account_details', e.target.value)}/>  
                                
                                
                                </td>
                                <td><input type="text" value={searchText.customer_cancelled_cheque} onChange={(e) => handleSearch('customer_cancelled_cheque', e.target.value)}/>  
                                
                                
                                </td>
                                <td><input type="text" value={searchText.customer_number_of_employees} onChange={(e) => handleSearch('customer_number_of_employees', e.target.value)}/>  
                                
                               
                                </td>
								
								
								 <td><input type="text" value={searchText.customer_director_fname} onChange={(e) => handleSearch('customer_director_fname', e.target.value)}/>  
                                
                                
                                </td>
                                <td><input type="text" value={searchText.customer_director_lname} onChange={(e) => handleSearch('customer_director_lname', e.target.value)}/> 
                                
                                
                                </td>
                                <td><input type="text" value={searchText.customer_director_email} onChange={(e) => handleSearch('customer_director_email', e.target.value)}/>  
                                
                               
                                </td>
								
								 <td><input type="text" value={searchText.customer_director_mobile} onChange={(e) => handleSearch('customer_director_mobile', e.target.value)}/>  
                                
                                
                                </td>
                                <td><input type="text" value={searchText.customer_director_linkedin} onChange={(e) => handleSearch('customer_director_linkedin', e.target.value)}/> 
                                
                                
                                </td>
                                <td><input type="text" value={searchText.customer_customer_reviews} onChange={(e) => handleSearch('customer_customer_reviews', e.target.value)}/>  
                                
                               
                                </td>
								<td><input type="text" value={searchText.customer_customer_rating} onChange={(e) => handleSearch('customer_customer_rating', e.target.value)}/> 
                                
                                
                                </td>
                                <td><input type="text" value={searchText.customer_facebook_url} onChange={(e) => handleSearch('customer_facebook_url', e.target.value)}/> 
                                
                               
                                </td>
								<td><input type="text" value={searchText.customer_instagram_url} onChange={(e) => handleSearch('customer_instagram_url', e.target.value)}/>
                                
                                
                                </td>
                                <td><input type="text" value={searchText.customer_linkedin_url} onChange={(e) => handleSearch('customer_linkedin_url', e.target.value)}/>
                                
                               
                                </td>
								<td><input type="text" value={searchText.customer_youtube_url} onChange={(e) => handleSearch('customer_youtube_url', e.target.value)}/> 
                                
                                
                                </td>
                                <td><input type="text" value={searchText.customer_made_in_countries} onChange={(e) => handleSearch('customer_made_in_countries', e.target.value)}/> 
                                
                               
                                </td>
								<td><input type="text" value={searchText.customer_attributes} onChange={(e) => handleSearch('customer_attributes', e.target.value)}/>
                                
                                
                                </td>
                                <td><input type="text" value={searchText.customer_brief_history} onChange={(e) => handleSearch('customer_brief_history', e.target.value)}/>                      
                               
                                </td>
                                <td>Action</td>                                                                    
                            </tr>
                        </thead>  
                    <tbody>                 
                            
                            {sortedData.map((customer , index) => {
                              return (<tr>
                                <td>{customers.length}{customer.customer_company_name}</td>
                                <td>{customer.customer_industry}</td>
                                <td>{customer.customer_products}</td>  
								<td>{customers.length}{customer.customer_mobile}</td>
                                <td>{customer.customer_mobile_alternate}</td>
                                <td>{customer.customer_email}</td> 
								<td>{customers.length}{customer.customer_website}</td>
                                <td>{customer.customer_registered_address}</td>
                                <td>{customer.customer_zip_code}</td> 
                                <td>{customer.customer_city}</td>
                                <td>{customer.customer_state}</td> 
                                <td>{customer.customer_country}</td>
                                <td>{customer.customer_country_code}</td> 
								                <td>{customers.length}{customer.customer_continent}</td>
                                <td>{customer.customer_customer_care}</td>
                                <td>{customer.customer_qr_code}</td> 
								                <td>{customers.length}{customer.customer_barcode_number}</td>
                                <td>{customer.customer_foundation_date}</td>
                                <td>{customer.customer_license_number}</td> 
								                <td>{customer.customer_pan_number}</td>
                                <td>{customer.customer_gst_number}</td> 
								                <td>{customer.customer_corporation_certificate}</td>
                                <td>{customer.customer_gumasta_certificate}</td> 
								                <td>{customer.customer_moa_certificate}</td>
                                <td>{customer.customer_msme_certificate}</td> 
								                <td>{customer.customer_account_details}</td> 
								                <td>{customer.customer_cancelled_cheque}</td>
                                <td>{customer.customer_number_of_employees}</td> 
								                <td>{customer.customer_director_fname}</td> 
								                <td>{customer.customer_director_lname}</td>
                                <td>{customer.customer_director_email}</td> 
								                <td>{customer.customer_director_mobile}</td> 
								                <td>{customer.customer_director_linkedin}</td>
                                <td>{customer.customer_customer_reviews}</td> 
								                <td>{customer.customer_customer_rating}</td> 
								                <td>{customer.customer_facebook_url}</td>
                                <td>{customer.customer_instagram_url}</td> 
								                <td>{customer.customer_linkedin_url}</td>
                                <td>{customer.customer_youtube_url}</td> 
								                <td>{customer.customer_made_in_countries}</td> 
								                <td>{customer.customer_attributes}</td>
                                <td>{customer.customer_brief_history}</td> 
                                <td>
                                  <div class="btn-group">
                                  <span  class="btn btn-success btn-xs" onClick={() => navigate("/customers/" + customer._id)}><i class="bi bi-pencil"></i></span>
                                  <Link  class="btn btn-danger btn-xs" onClick={() => deleteCustomers(customer._id)}><i class="bi bi-trash"></i></Link>        
                                    <div className="col-sm"> <input type="checkBox" checked={customersIds.includes(customer._id)} name={customer._id} value={customer._id} onClick={(e) => handleCheck(e)}></input></div>
                                  </div>
                                </td> 
                            
                            </tr>)
                            })} 
        
              </tbody>
              </table>
                </div>					
                             <Pagination setCurrentPage={setCurrentPage} currentPage={customersCurrentPage} postsPerPage={customersPerPage} totalPosts={customers.length} paginate={customersPaginate} />
        
        </div>
              )
  }          
}

export default ListCustomers
