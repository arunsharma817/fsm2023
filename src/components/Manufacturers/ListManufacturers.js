import React , { useContext , useState , useEffect } from 'react'
import AddManufacturers from './AddManufacturers.js'
import ManufacturersContext from '../../context/Manufacturers/ManufacturersContext.js'
import { useNavigate, useParams , Link } from "react-router-dom";
import Pagination from '../Products/Pagination';
import Papa from 'papaparse';

const ListManufacturers = () => {
   
  const navigate = useNavigate();
  const params = useParams();
  const manufacturerId = params.id;

  const context = useContext(ManufacturersContext);
  const { manufacturers , setManufacturers ,  deleteManufacturers , deleteMultipleManufacturers} = context;

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
const [manufacturersCurrentPage, setManufacturersCurrentPage] = useState(1);
const [manufacturersPerPage, SetManufacturersPerPage] = useState(15);
const [currentPage, setCurrentPage] = useState(1);
const manufacturersPaginate = pageNumber => setManufacturersCurrentPage(pageNumber);
const [manufacturersIds, setManufacturersIds] = useState([]);

////For Search 
 //// For Search
const [searchManufacturers, setSearchManufacturers] = useState('');
const [searchOldManufacturers, setSearchOldManufacturers] = useState("");
useEffect(() => {
    //inputEvent();
  }, [searchManufacturers]);
  
const inputEvent = (e) => {
    const data = e.target.value;
    console.log(data);  
    setSearchManufacturers(data);
    setSearchOldManufacturers(manufacturers);
    if(data == '') {
      console.log("I am here in data blank"+searchManufacturers);
      {manufacturers.map((searchManufacturer , index) => { console.log(searchManufacturers.length +' here'+searchManufacturer.manufacturer_fname) } 
     
      )}
      setManufacturers([...manufacturers]);
    } else {
      //alert("I am here for search"+data);
      //const filterResult = data.length > 0 ? mainProducts.filter((product) => product.manufacturers_name.toLowerCase().includes(data.toLowerCase())) : setMainProducts(searchManufacturers) ;
      
      const filterResult = data.length === 0
      ? null 
      : manufacturers.filter((manufacturer) => manufacturer.manufacturer_fname.toLowerCase().includes(data.toLowerCase()));
  
      setManufacturers(filterResult);
    }
  };



/// For Export  CSV 
//const [csvData, setCsvData] = useState('');

  const handleExportCSV = () => {
    // Convert the items to CSV format using papaparse
    const csv = Papa.unparse(manufacturers, {
      header: true,
    });

    // Create a Blob and URL for the CSV data
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    // Create a link and click it to trigger the download
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'manufacturers.csv');
    document.body.appendChild(link);
    link.click();

    // Clean up by removing the link and revoking the URL
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };


////// For Each Column Search 

const [searchText, setSearchText] = useState({
    "manufacturer_company_name": ' ',
    "manufacturer_industry": ' ',
    "manufacturer_products": ' ',
    "manufacturer_mobile": ' ',
    "manufacturer_mobile_alternate": ' ',
    "manufacturer_email": ' ',
    "manufacturer_website": ' ',
    "manufacturer_registered_address":' ',
    "manufacturer_zip_code": ' ',
    "manufacturer_city": ' ',
    "manufacturer_state": ' ',
    "manufacturer_country": ' ',
    "manufacturer_country_code": ' ',
    "manufacturer_continent": ' ',
    "manufacturer_customer_care": ' ',
    "manufacturer_qr_code": ' ',
    "manufacturer_barcode_number": ' ',
    "manufacturer_foundation_date": ' ',
    "manufacturer_license_number": ' ',
    "manufacturer_pan_number": ' ',
    "manufacturer_gst_number": ' ',
"manufacturer_corporation_certificate": ' ',
    "manufacturer_gumasta_certificate": ' ',
    "manufacturer_moa_certificate": ' ',
    "manufacturer_msme_certificate": ' ',
    "manufacturer_account_details": ' ',
    "manufacturer_cancelled_cheque": ' ',
    "manufacturer_number_of_employees": ' ',
    "manufacturer_director_fname": ' ',
    "manufacturer_director_lname": ' ',
    "manufacturer_director_email": ' ',
    "manufacturer_director_mobile": ' ',
    "manufacturer_director_linkedin": ' ',
    "manufacturer_customer_reviews": ' ',
    "manufacturer_customer_rating": ' ',
    "manufacturer_facebook_url": ' ',
    "manufacturer_instagram_url": ' ',
    "manufacturer_linkedin_url": ' ',
    "manufacturer_youtube_url": ' ',
    "manufacturer_made_in_countries": ' ',
    "manufacturer_attributes": ' ',
    "manufacturer_brief_history": ' '
 });

const handleSearch = (column, value) => {
    setSearchText({ ...searchText, [column]: value });
};

/// For Multiple Delete
const handleCheck = (e) => {
  const { value, checked } = e.target
  
  if (checked) {
    setManufacturersIds([...manufacturersIds, value]);
  } else {
    setManufacturersIds(() => manufacturersIds.filter((e) => e !== value));
  }
}

  if(manufacturerId){
    //console.log("I am here before sending to edit"+users.manufacturer_fname);
    return (
      <div>
          <AddManufacturers manufacturerId = {manufacturerId} manufacturers = {manufacturers} /> </div>
          )
  }else{
          
            // Get Current Clients
            const indexOfLastManufacturers = manufacturersCurrentPage * manufacturersPerPage;
            const indexOfFirstManufacturers = indexOfLastManufacturers - manufacturersPerPage;
            const currentManufacturers = manufacturers.slice(indexOfFirstManufacturers, indexOfLastManufacturers);

            const sortedData = currentManufacturers.slice().sort((a, b) => {
                
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
                <p><h4 class="heading-h4">!! Manufacturers List !!</h4> { manufacturersIds.length > 1 ? <input type="button" value="Delete ALL " onClick={() => deleteMultipleManufacturers(manufacturersIds)}></input>  :  ''} <button onClick={handleExportCSV}>Export CSV</button></p>
                <input type="search" name="searchbox" value= { searchManufacturers} placeholder='Search Here' onChange={(e) => inputEvent(e)} />

                <div class="table-container">
                    <table id="client-list" class="table table-bordered display">  
                        <thead>
                        <tr>                                                                    
                                <th onClick={() => handleSort('manufacturer_company_name')}>  Mfg. Name
                                {sortColumn === 'manufacturer_company_name' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('manufacturer_industry')}>  Industry 
                                {sortColumn === 'manufacturer_industry' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('manufacturer_products')}> Products
                                {sortColumn === 'manufacturer_products' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								
								 <th onClick={() => handleSort('manufacturer_mobile')}>  Mobile
                                {sortColumn === 'manufacturer_mobile' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('manufacturer_mobile_alternate')}>  Alternate Mobile 
                                {sortColumn === 'manufacturer_mobile_alternate' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('manufacturer_email')}> Email Id
                                {sortColumn === 'manufacturer_email' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								
								<th onClick={() => handleSort('manufacturer_website')}>  Website
                                {sortColumn === 'manufacturer_website' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('manufacturer_registered_address')}>  Reg. Address 
                                {sortColumn === 'manufacturer_registered_address' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('manufacturer_zip_code')}> Zip Code
                                {sortColumn === 'manufacturer_zip_code' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								
								 <th onClick={() => handleSort('manufacturer_city')}>  City
                                {sortColumn === 'manufacturer_city' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('manufacturer_state')}> State 
                                {sortColumn === 'manufacturer_state' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('manufacturer_country')}> Country
                                {sortColumn === 'manufacturer_country' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								
								
								<th onClick={() => handleSort('manufacturer_country_code')}>  Country Code
                                {sortColumn === 'manufacturer_country_code' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('manufacturer_continent')}>  Continent 
                                {sortColumn === 'manufacturer_continent' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('manufacturer_customer_care')}> Customr Care
                                {sortColumn === 'manufacturer_customer_care' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								
								 <th onClick={() => handleSort('manufacturer_qr_code')}>  QR Code
                                {sortColumn === 'manufacturer_qr_code' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('manufacturer_barcode_number')}>  Barcode Number 
                                {sortColumn === 'manufacturer_barcode_number' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('manufacturer_foundation_date')}> Foundation Date
                                {sortColumn === 'manufacturer_foundation_date' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								
								<th onClick={() => handleSort('manufacturer_license_number')}>  License
                                {sortColumn === 'manufacturer_license_number' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('manufacturer_pan_number')}>  PAN 
                                {sortColumn === 'manufacturer_pan_number' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('manufacturer_gst_number')}> GST
                                {sortColumn === 'manufacturer_gst_number' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								
								 <th onClick={() => handleSort('manufacturer_corporation_certificate')}>  Corp. Certi.
                                {sortColumn === 'manufacturer_corporation_certificate' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('manufacturer_gumasta_certificate')}> Gumasta 
                                {sortColumn === 'manufacturer_gumasta_certificate' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('manufacturer_moa_certificate')}> MOA 
                                {sortColumn === 'manufacturer_moa_certificate' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>

                                <th onClick={() => handleSort('manufacturer_msme_certificate')}> MSME 
                                {sortColumn === 'manufacturer_msme_certificate' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								
								 <th onClick={() => handleSort('manufacturer_account_details')}>  Act Details
                                {sortColumn === 'manufacturer_account_details' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('manufacturer_cancelled_cheque')}> Cancelled Cheque 
                                {sortColumn === 'manufacturer_cancelled_cheque' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('manufacturer_number_of_employees')}> Employees Number 
                                {sortColumn === 'manufacturer_number_of_employees' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								
								
								 <th onClick={() => handleSort('manufacturer_director_fname')}>  Dir. FName
                                {sortColumn === 'manufacturer_director_fname' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('manufacturer_director_lname')}> Dir. LName
                                {sortColumn === 'manufacturer_director_lname' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('manufacturer_director_email')}> Dir. Email 
                                {sortColumn === 'manufacturer_director_email' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								
								 <th onClick={() => handleSort('manufacturer_director_mobile')}>  Dir. Mobile
                                {sortColumn === 'manufacturer_director_mobile' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('manufacturer_director_linkedin')}> Dir. LinkedIn
                                {sortColumn === 'manufacturer_director_linkedin' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('manufacturer_customer_reviews')}> Manufacturer Reviews 
                                {sortColumn === 'manufacturer_customer_reviews' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								<th onClick={() => handleSort('manufacturer_customer_rating')}> Dir. LinkedIn
                                {sortColumn === 'manufacturer_customer_rating' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('manufacturer_facebook_url')}> Manufacturer Reviews 
                                {sortColumn === 'manufacturer_facebook_url' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								<th onClick={() => handleSort('manufacturer_instagram_url')}> Instagram
                                {sortColumn === 'manufacturer_instagram_url' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('manufacturer_linkedin_url')}> LinkedIn
                                {sortColumn === 'manufacturer_linkedin_url' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								<th onClick={() => handleSort('manufacturer_youtube_url')}> Youtube 
                                {sortColumn === 'manufacturer_youtube_url' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('manufacturer_made_in_countries')}> Countries 
                                {sortColumn === 'manufacturer_made_in_countries' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								<th onClick={() => handleSort('manufacturer_attributes')}> Atrributes
                                {sortColumn === 'manufacturer_attributes' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('manufacturer_brief_history')}> History 
                                {sortColumn === 'manufacturer_brief_history' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
                                <th>Action</th>                                                                    
                            </tr>
                            <tr>                                                                    
                                <td><input type="text" value={searchText.manufacturer_company_name} onChange={(e) => handleSearch('manufacturer_company_name', e.target.value)}/>  
                                
                                
                                </td>
                                <td><input type="text" value={searchText.manufacturer_industry} onChange={(e) => handleSearch('manufacturer_industry', e.target.value)}/>  
                                
                                
                                </td>
                                <td><input type="text" value={searchText.manufacturer_products} onChange={(e) => handleSearch('manufacturer_products', e.target.value)}/>
                                
                               
                                </td>
								
								 <td><input type="text" value={searchText.manufacturer_mobile} onChange={(e) => handleSearch('manufacturer_mobile', e.target.value)}/> 
                                
                                
                                </td>
                                <td><input type="text" value={searchText.manufacturer_mobile_alternate} onChange={(e) => handleSearch('manufacturer_mobile_alternate', e.target.value)}/>   
                                
                                
                                </td>
                                <td><input type="text" value={searchText.manufacturer_email} onChange={(e) => handleSearch('manufacturer_email', e.target.value)}/> 
                                
                               
                                </td>
								
								<td><input type="text" value={searchText.manufacturer_website} onChange={(e) => handleSearch('manufacturer_website', e.target.value)}/> 
                                
                                
                                </td>
                                <td><input type="text" value={searchText.manufacturer_registered_address} onChange={(e) => handleSearch('manufacturer_registered_address', e.target.value)}/>   
                                
                                
                                </td>
                                <td><input type="text" value={searchText.manufacturer_zip_code} onChange={(e) => handleSearch('manufacturer_zip_code', e.target.value)}/> 
                                
                               
                                </td>
								
								 <td><input type="text" value={searchText.manufacturer_city} onChange={(e) => handleSearch('manufacturer_city', e.target.value)}/> 
                                
                                
                                </td>
                                <td><input type="text" value={searchText.manufacturer_state} onChange={(e) => handleSearch('manufacturer_state', e.target.value)}/> 
                                
                                
                                </td>
                                <td><input type="text" value={searchText.manufacturer_country} onChange={(e) => handleSearch('manufacturer_country', e.target.value)}/>
                                
                               
                                </td>
								
								
								<td><input type="text" value={searchText.manufacturer_country_code} onChange={(e) => handleSearch('manufacturer_country_code', e.target.value)}/>  
                                
                                
                                </td>
                                <td><input type="text" value={searchText.manufacturer_continent} onChange={(e) => handleSearch('manufacturer_continent', e.target.value)}/>  
                                
                                
                                </td>
                                <td><input type="text" value={searchText.manufacturer_customer_care} onChange={(e) => handleSearch('manufacturer_customer_care', e.target.value)}/> 
                                
                               
                                </td>
								
								 <td><input type="text" value={searchText.manufacturer_qr_code} onChange={(e) => handleSearch('manufacturer_qr_code', e.target.value)}/>  
                                
                                
                                </td>
                                <td><input type="text" value={searchText.manufacturer_barcode_number} onChange={(e) => handleSearch('manufacturer_barcode_number', e.target.value)}/>   
                                
                                
                                </td>
                                <td><input type="text" value={searchText.manufacturer_foundation_date} onChange={(e) => handleSearch('manufacturer_foundation_date', e.target.value)}/> 
                                
                               
                                </td>
								
								<td><input type="text" value={searchText.manufacturer_license_number} onChange={(e) => handleSearch('manufacturer_license_number', e.target.value)}/> 
                                
                                
                                </td>
                                <td><input type="text" value={searchText.manufacturer_pan_number} onChange={(e) => handleSearch('manufacturer_pan_number', e.target.value)}/>  
                                
                                
                                </td>
                                <td><input type="text" value={searchText.manufacturer_gst_number} onChange={(e) => handleSearch('manufacturer_gst_number', e.target.value)}/>
                                
                               
                                </td>
								
								 <td><input type="text" value={searchText.manufacturer_corporation_certificate} onChange={(e) => handleSearch('manufacturer_corporation_certificate', e.target.value)}/>                                  
                                
                                </td>
                                <td><input type="text" value={searchText.manufacturer_gumasta_certificate} onChange={(e) => handleSearch('manufacturer_gumasta_certificate', e.target.value)}/> 
                                
                                
                                </td>
                                <td><input type="text" value={searchText.manufacturer_moa_certificate} onChange={(e) => handleSearch('manufacturer_moa_certificate', e.target.value)}/> 
                                
                               
                                </td>
								
                                <td><input type="text" value={searchText.manufacturer_msme_certificate} onChange={(e) => handleSearch('manufacturer_msme_certificate', e.target.value)}/>  
</td>
								 <td><input type="text" value={searchText.manufacturer_account_details} onChange={(e) => handleSearch('manufacturer_account_details', e.target.value)}/>  
                                
                                
                                </td>
                                <td><input type="text" value={searchText.manufacturer_cancelled_cheque} onChange={(e) => handleSearch('manufacturer_cancelled_cheque', e.target.value)}/>  
                                
                                
                                </td>
                                <td><input type="text" value={searchText.manufacturer_number_of_employees} onChange={(e) => handleSearch('manufacturer_number_of_employees', e.target.value)}/>  
                                
                               
                                </td>
								
								
								 <td><input type="text" value={searchText.manufacturer_director_fname} onChange={(e) => handleSearch('manufacturer_director_fname', e.target.value)}/>  
                                
                                
                                </td>
                                <td><input type="text" value={searchText.manufacturer_director_lname} onChange={(e) => handleSearch('manufacturer_director_lname', e.target.value)}/> 
                                
                                
                                </td>
                                <td><input type="text" value={searchText.manufacturer_director_email} onChange={(e) => handleSearch('manufacturer_director_email', e.target.value)}/>  
                                
                               
                                </td>
								
								 <td><input type="text" value={searchText.manufacturer_director_mobile} onChange={(e) => handleSearch('manufacturer_director_mobile', e.target.value)}/>  
                                
                                
                                </td>
                                <td><input type="text" value={searchText.manufacturer_director_linkedin} onChange={(e) => handleSearch('manufacturer_director_linkedin', e.target.value)}/> 
                                
                                
                                </td>
                                <td><input type="text" value={searchText.manufacturer_customer_reviews} onChange={(e) => handleSearch('manufacturer_customer_reviews', e.target.value)}/>  
                                
                               
                                </td>
								<td><input type="text" value={searchText.manufacturer_customer_rating} onChange={(e) => handleSearch('manufacturer_customer_rating', e.target.value)}/> 
                                
                                
                                </td>
                                <td><input type="text" value={searchText.manufacturer_facebook_url} onChange={(e) => handleSearch('manufacturer_facebook_url', e.target.value)}/> 
                                
                               
                                </td>
								<td><input type="text" value={searchText.manufacturer_instagram_url} onChange={(e) => handleSearch('manufacturer_instagram_url', e.target.value)}/>
                                
                                
                                </td>
                                <td><input type="text" value={searchText.manufacturer_linkedin_url} onChange={(e) => handleSearch('manufacturer_linkedin_url', e.target.value)}/>
                                
                               
                                </td>
								<td><input type="text" value={searchText.manufacturer_youtube_url} onChange={(e) => handleSearch('manufacturer_youtube_url', e.target.value)}/> 
                                
                                
                                </td>
                                <td><input type="text" value={searchText.manufacturer_made_in_countries} onChange={(e) => handleSearch('manufacturer_made_in_countries', e.target.value)}/> 
                                
                               
                                </td>
								<td><input type="text" value={searchText.manufacturer_attributes} onChange={(e) => handleSearch('manufacturer_attributes', e.target.value)}/>
                                
                                
                                </td>
                                <td><input type="text" value={searchText.manufacturer_brief_history} onChange={(e) => handleSearch('manufacturer_brief_history', e.target.value)}/>                      
                               
                                </td>
                                <td>Action</td>                                                                    
                            </tr>
                        </thead>  
                    <tbody>                 
                            
                            {sortedData.map((manufacturer , index) => {
                              return (<tr>
                                <td>{manufacturers.length}{manufacturer.manufacturer_company_name}</td>
                                <td>{manufacturer.manufacturer_industry}</td>
                                <td>{manufacturer.manufacturer_products}</td>  
								<td>{manufacturers.length}{manufacturer.manufacturer_mobile}</td>
                                <td>{manufacturer.manufacturer_mobile_alternate}</td>
                                <td>{manufacturer.manufacturer_email}</td> 
								<td>{manufacturers.length}{manufacturer.manufacturer_website}</td>
                                <td>{manufacturer.manufacturer_registered_address}</td>
                                <td>{manufacturer.manufacturer_zip_code}</td> 
                                <td>{manufacturer.manufacturer_city}</td>
                                <td>{manufacturer.manufacturer_state}</td> 
                                <td>{manufacturer.manufacturer_country}</td>
                                <td>{manufacturer.manufacturer_country_code}</td> 
								                <td>{manufacturers.length}{manufacturer.manufacturer_continent}</td>
                                <td>{manufacturer.manufacturer_customer_care}</td>
                                <td>{manufacturer.manufacturer_qr_code}</td> 
								                <td>{manufacturers.length}{manufacturer.manufacturer_barcode_number}</td>
                                <td>{manufacturer.manufacturer_foundation_date}</td>
                                <td>{manufacturer.manufacturer_license_number}</td> 
								                <td>{manufacturer.manufacturer_pan_number}</td>
                                <td>{manufacturer.manufacturer_gst_number}</td> 
								                <td>{manufacturer.manufacturer_corporation_certificate}</td>
                                <td>{manufacturer.manufacturer_gumasta_certificate}</td> 
								                <td>{manufacturer.manufacturer_moa_certificate}</td>
                                <td>{manufacturer.manufacturer_msme_certificate}</td> 
								                <td>{manufacturer.manufacturer_account_details}</td> 
								                <td>{manufacturer.manufacturer_cancelled_cheque}</td>
                                <td>{manufacturer.manufacturer_number_of_employees}</td> 
								                <td>{manufacturer.manufacturer_director_fname}</td> 
								                <td>{manufacturer.manufacturer_director_lname}</td>
                                <td>{manufacturer.manufacturer_director_email}</td> 
								                <td>{manufacturer.manufacturer_director_mobile}</td> 
								                <td>{manufacturer.manufacturer_director_linkedin}</td>
                                <td>{manufacturer.manufacturer_customer_reviews}</td> 
								                <td>{manufacturer.manufacturer_customer_rating}</td> 
								                <td>{manufacturer.manufacturer_facebook_url}</td>
                                <td>{manufacturer.manufacturer_instagram_url}</td> 
								                <td>{manufacturer.manufacturer_linkedin_url}</td>
                                <td>{manufacturer.manufacturer_youtube_url}</td> 
								                <td>{manufacturer.manufacturer_made_in_countries}</td> 
								                <td>{manufacturer.manufacturer_attributes}</td>
                                <td>{manufacturer.manufacturer_brief_history}</td> 
                                <td>
                                  <div class="btn-group">
                                  <span  class="btn btn-success btn-xs" onClick={() => navigate("/manufacturers/" + manufacturer._id)}><i class="bi bi-pencil"></i></span>
                                  <Link  class="btn btn-danger btn-xs" onClick={() => deleteManufacturers(manufacturer._id)}><i class="bi bi-trash"></i></Link>        
                                    <div className="col-sm"> <input type="checkBox" checked={manufacturersIds.includes(manufacturer._id)} name={manufacturer._id} value={manufacturer._id} onClick={(e) => handleCheck(e)}></input></div>
                                  </div>
                                </td> 
                            
                            </tr>)
                            })} 
        
              </tbody>
              </table>
                </div>					
                             <Pagination setCurrentPage={setCurrentPage} currentPage={manufacturersCurrentPage} postsPerPage={manufacturersPerPage} totalPosts={manufacturers.length} paginate={manufacturersPaginate} />
        
        </div>
              )
  }          
}

export default ListManufacturers
