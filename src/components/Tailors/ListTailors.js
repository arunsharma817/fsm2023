import React , { useContext , useState , useEffect } from 'react'
import AddTailors from './AddTailors.js'
import TailorsContext from '../../context/Tailors/TailorsContext.js'
import { useNavigate, useParams , Link } from "react-router-dom";
import Pagination from '../Products/Pagination';
import Papa from 'papaparse';

const ListTailors = () => {
   
  const navigate = useNavigate();
  const params = useParams();
  const tailorId = params.id;

  const context = useContext(TailorsContext);
  const { tailors , setTailors ,  deleteTailors , deleteMultipleTailors} = context;

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
const [tailorsCurrentPage, setTailorsCurrentPage] = useState(1);
const [tailorsPerPage, SetTailorsPerPage] = useState(15);
const [currentPage, setCurrentPage] = useState(1);
const tailorsPaginate = pageNumber => setTailorsCurrentPage(pageNumber);
const [tailorsIds, setTailorsIds] = useState([]);

////For Search 
 //// For Search
const [searchTailors, setSearchTailors] = useState('');
const [searchOldTailors, setSearchOldTailors] = useState("");
useEffect(() => {
    //inputEvent();
  }, [searchTailors]);
  
const inputEvent = (e) => {
    const data = e.target.value;
    console.log(data);  
    setSearchTailors(data);
    setSearchOldTailors(tailors);
    if(data == '') {
      console.log("I am here in data blank"+searchTailors);
      {tailors.map((searchTailor , index) => { console.log(searchTailors.length +' here'+searchTailor.tailor_lname) } 
     
      )}
      setTailors([...tailors]);
    } else {
      //alert("I am here for search"+data);
      //const filterResult = data.length > 0 ? mainProducts.filter((product) => product.tailors_name.toLowerCase().includes(data.toLowerCase())) : setMainProducts(searchTailors) ;
      
      const filterResult = data.length === 0
      ? null 
      : tailors.filter((tailor) => tailor.tailor_lname.toLowerCase().includes(data.toLowerCase()));
  
      setTailors(filterResult);
    }
  };



/// For Export  CSV 
//const [csvData, setCsvData] = useState('');

  const handleExportCSV = () => {
    // Convert the items to CSV format using papaparse
    const csv = Papa.unparse(tailors, {
      header: true,
    });

    // Create a Blob and URL for the CSV data
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    // Create a link and click it to trigger the download
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'tailors.csv');
    document.body.appendChild(link);
    link.click();

    // Clean up by removing the link and revoking the URL
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };


////// For Each Column Search 

const [searchText, setSearchText] = useState({
    "tailor_name": ' ',
    "tailor_lname": ' ',
    "tailor_father_name": ' ',
    "tailor_mother_name": ' ',
    "tailor_age": ' ',
    "tailor_grade": ' ',
    "tailor_section": ' ',
    "tailor_official_email":' ',
    "tailor_official_mobile": ' ',
    "tailor_personal_mobile": ' ',
    "tailor_blood_group": ' ',
    "tailor_dob": ' ',
    "tailor_address": ' ',
    "tailor_city": ' ',
    "tailor_state": ' ',
    "tailor_country": ' ',
    "tailor_continent": ' ',
    "tailor_experience": ' ',
    "tailor_rating": ' ',
    "tailor_reviews": ' ',
    "tailor_income": ' ',
"tailor_investment": ' ',
    "tailor_shop": ' ',
    "tailor_services": ' ',
    "tailor_male_female": ' ',
    "tailor_gst": ' ',
    "tailor_course": ' ',
    "tailor_branches": ' ',
    "tailor_material": ' ',
    "tailor_readymade": ' ',
    "tailor_contract": ' ',
    "tailor_fee": ' ',
    "tailor_mentor": ' ',
    "tailor_delivery": ' ',
    "tailor_overseas": ' ',
    "tailor_domestic": ' ',
    "tailor_expenses": ' ',
    "tailor_vehicle": ' ',
    "tailor_shop_time": ' ',
    "tailor_shop_days": ' ',
    "tailor_awards": ' ',
    "tailor_designing_skills": ' '
 });

const handleSearch = (column, value) => {
    setSearchText({ ...searchText, [column]: value });
};

/// For Multiple Delete
const handleCheck = (e) => {
  const { value, checked } = e.target
  
  if (checked) {
    setTailorsIds([...tailorsIds, value]);
  } else {
    setTailorsIds(() => tailorsIds.filter((e) => e !== value));
  }
}

  if(tailorId){
    //console.log("I am here before sending to edit"+users.tailor_lname);
    return (
      <div>
          <AddTailors tailorId = {tailorId} tailors = {tailors} /> </div>
          )
  }else{
          
            // Get Current Clients
            const indexOfLastTailors = tailorsCurrentPage * tailorsPerPage;
            const indexOfFirstTailors = indexOfLastTailors - tailorsPerPage;
            const currentTailors = tailors.slice(indexOfFirstTailors, indexOfLastTailors);

            const sortedData = currentTailors.slice().sort((a, b) => {
                
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
                <p><h4 class="heading-h4">!! Tailors List !!</h4> { tailorsIds.length > 1 ? <input type="button" value="Delete ALL " onClick={() => deleteMultipleTailors(tailorsIds)}></input>  :  ''} <button onClick={handleExportCSV}>Export CSV</button></p>
                <input type="search" name="searchbox" value= { searchTailors} placeholder='Search Here' onChange={(e) => inputEvent(e)} />

                <div class="table-container">
                    <table id="client-list" class="table table-bordered display">  
                        <thead>
                        <tr>                                                                    
                                <th onClick={() => handleSort('tailor_name')}>  Mfg. Name
                                {sortColumn === 'tailor_name' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('tailor_lname')}>  Industry 
                                {sortColumn === 'tailor_lname' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('tailor_father_name')}> Products
                                {sortColumn === 'tailor_father_name' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								
								 <th onClick={() => handleSort('tailor_mother_name')}>  Mobile
                                {sortColumn === 'tailor_mother_name' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('tailor_age')}>  Alternate Mobile 
                                {sortColumn === 'tailor_age' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('tailor_grade')}> Email Id
                                {sortColumn === 'tailor_grade' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								
								<th onClick={() => handleSort('tailor_section')}>  Website
                                {sortColumn === 'tailor_section' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('tailor_official_email')}>  Reg. Address 
                                {sortColumn === 'tailor_official_email' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('tailor_official_mobile')}> Zip Code
                                {sortColumn === 'tailor_official_mobile' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								
								 <th onClick={() => handleSort('tailor_personal_mobile')}>  City
                                {sortColumn === 'tailor_personal_mobile' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('tailor_blood_group')}> State 
                                {sortColumn === 'tailor_blood_group' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('tailor_dob')}> Country
                                {sortColumn === 'tailor_dob' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								
								
								<th onClick={() => handleSort('tailor_address')}>  Country Code
                                {sortColumn === 'tailor_address' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('tailor_city')}>  Continent 
                                {sortColumn === 'tailor_city' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('tailor_state')}> Customr Care
                                {sortColumn === 'tailor_state' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								
								 <th onClick={() => handleSort('tailor_country')}>  QR Code
                                {sortColumn === 'tailor_country' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('tailor_continent')}>  Barcode Number 
                                {sortColumn === 'tailor_continent' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('tailor_experience')}> Foundation Date
                                {sortColumn === 'tailor_experience' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								
								<th onClick={() => handleSort('tailor_rating')}>  License
                                {sortColumn === 'tailor_rating' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('tailor_reviews')}>  PAN 
                                {sortColumn === 'tailor_reviews' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('tailor_income')}> GST
                                {sortColumn === 'tailor_income' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								
								 <th onClick={() => handleSort('tailor_investment')}>  Corp. Certi.
                                {sortColumn === 'tailor_investment' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('tailor_shop')}> Gumasta 
                                {sortColumn === 'tailor_shop' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('tailor_services')}> MOA 
                                {sortColumn === 'tailor_services' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>

                                <th onClick={() => handleSort('tailor_male_female')}> MSME 
                                {sortColumn === 'tailor_male_female' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								
								 <th onClick={() => handleSort('tailor_gst')}>  Act Details
                                {sortColumn === 'tailor_gst' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('tailor_course')}> Cancelled Cheque 
                                {sortColumn === 'tailor_course' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('tailor_branches')}> Employees Number 
                                {sortColumn === 'tailor_branches' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								
								
								 <th onClick={() => handleSort('tailor_material')}>  Dir. FName
                                {sortColumn === 'tailor_material' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('tailor_readymade')}> Dir. LName
                                {sortColumn === 'tailor_readymade' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('tailor_contract')}> Dir. Email 
                                {sortColumn === 'tailor_contract' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								
								 <th onClick={() => handleSort('tailor_fee')}>  Dir. Mobile
                                {sortColumn === 'tailor_fee' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('tailor_mentor')}> Dir. LinkedIn
                                {sortColumn === 'tailor_mentor' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('tailor_delivery')}> Tailor Reviews 
                                {sortColumn === 'tailor_delivery' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								<th onClick={() => handleSort('tailor_overseas')}> Dir. LinkedIn
                                {sortColumn === 'tailor_overseas' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('tailor_domestic')}> Tailor Reviews 
                                {sortColumn === 'tailor_domestic' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								<th onClick={() => handleSort('tailor_expenses')}> Instagram
                                {sortColumn === 'tailor_expenses' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('tailor_vehicle')}> LinkedIn
                                {sortColumn === 'tailor_vehicle' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								<th onClick={() => handleSort('tailor_shop_time')}> Youtube 
                                {sortColumn === 'tailor_shop_time' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('tailor_shop_days')}> Countries 
                                {sortColumn === 'tailor_shop_days' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								<th onClick={() => handleSort('tailor_awards')}> Atrributes
                                {sortColumn === 'tailor_awards' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('tailor_designing_skills')}> History 
                                {sortColumn === 'tailor_designing_skills' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
                                <th>Action</th>                                                                    
                            </tr>
                            <tr>                                                                    
                                <td><input type="text" value={searchText.tailor_name} onChange={(e) => handleSearch('tailor_name', e.target.value)}/>  
                                
                                
                                </td>
                                <td><input type="text" value={searchText.tailor_lname} onChange={(e) => handleSearch('tailor_lname', e.target.value)}/>  
                                
                                
                                </td>
                                <td><input type="text" value={searchText.tailor_father_name} onChange={(e) => handleSearch('tailor_father_name', e.target.value)}/>
                                
                               
                                </td>
								
								 <td><input type="text" value={searchText.tailor_mother_name} onChange={(e) => handleSearch('tailor_mother_name', e.target.value)}/> 
                                
                                
                                </td>
                                <td><input type="text" value={searchText.tailor_age} onChange={(e) => handleSearch('tailor_age', e.target.value)}/>   
                                
                                
                                </td>
                                <td><input type="text" value={searchText.tailor_grade} onChange={(e) => handleSearch('tailor_grade', e.target.value)}/> 
                                
                               
                                </td>
								
								<td><input type="text" value={searchText.tailor_section} onChange={(e) => handleSearch('tailor_section', e.target.value)}/> 
                                
                                
                                </td>
                                <td><input type="text" value={searchText.tailor_official_email} onChange={(e) => handleSearch('tailor_official_email', e.target.value)}/>   
                                
                                
                                </td>
                                <td><input type="text" value={searchText.tailor_official_mobile} onChange={(e) => handleSearch('tailor_official_mobile', e.target.value)}/> 
                                
                               
                                </td>
								
								 <td><input type="text" value={searchText.tailor_personal_mobile} onChange={(e) => handleSearch('tailor_personal_mobile', e.target.value)}/> 
                                
                                
                                </td>
                                <td><input type="text" value={searchText.tailor_blood_group} onChange={(e) => handleSearch('tailor_blood_group', e.target.value)}/> 
                                
                                
                                </td>
                                <td><input type="text" value={searchText.tailor_dob} onChange={(e) => handleSearch('tailor_dob', e.target.value)}/>
                                
                               
                                </td>
								
								
								<td><input type="text" value={searchText.tailor_address} onChange={(e) => handleSearch('tailor_address', e.target.value)}/>  
                                
                                
                                </td>
                                <td><input type="text" value={searchText.tailor_city} onChange={(e) => handleSearch('tailor_city', e.target.value)}/>  
                                
                                
                                </td>
                                <td><input type="text" value={searchText.tailor_state} onChange={(e) => handleSearch('tailor_state', e.target.value)}/> 
                                
                               
                                </td>
								
								 <td><input type="text" value={searchText.tailor_country} onChange={(e) => handleSearch('tailor_country', e.target.value)}/>  
                                
                                
                                </td>
                                <td><input type="text" value={searchText.tailor_continent} onChange={(e) => handleSearch('tailor_continent', e.target.value)}/>   
                                
                                
                                </td>
                                <td><input type="text" value={searchText.tailor_experience} onChange={(e) => handleSearch('tailor_experience', e.target.value)}/> 
                                
                               
                                </td>
								
								<td><input type="text" value={searchText.tailor_rating} onChange={(e) => handleSearch('tailor_rating', e.target.value)}/> 
                                
                                
                                </td>
                                <td><input type="text" value={searchText.tailor_reviews} onChange={(e) => handleSearch('tailor_reviews', e.target.value)}/>  
                                
                                
                                </td>
                                <td><input type="text" value={searchText.tailor_income} onChange={(e) => handleSearch('tailor_income', e.target.value)}/>
                                
                               
                                </td>
								
								 <td><input type="text" value={searchText.tailor_investment} onChange={(e) => handleSearch('tailor_investment', e.target.value)}/>                                  
                                
                                </td>
                                <td><input type="text" value={searchText.tailor_shop} onChange={(e) => handleSearch('tailor_shop', e.target.value)}/> 
                                
                                
                                </td>
                                <td><input type="text" value={searchText.tailor_services} onChange={(e) => handleSearch('tailor_services', e.target.value)}/> 
                                
                               
                                </td>
								
                                <td><input type="text" value={searchText.tailor_male_female} onChange={(e) => handleSearch('tailor_male_female', e.target.value)}/>  
</td>
								 <td><input type="text" value={searchText.tailor_gst} onChange={(e) => handleSearch('tailor_gst', e.target.value)}/>  
                                
                                
                                </td>
                                <td><input type="text" value={searchText.tailor_course} onChange={(e) => handleSearch('tailor_course', e.target.value)}/>  
                                
                                
                                </td>
                                <td><input type="text" value={searchText.tailor_branches} onChange={(e) => handleSearch('tailor_branches', e.target.value)}/>  
                                
                               
                                </td>
								
								
								 <td><input type="text" value={searchText.tailor_material} onChange={(e) => handleSearch('tailor_material', e.target.value)}/>  
                                
                                
                                </td>
                                <td><input type="text" value={searchText.tailor_readymade} onChange={(e) => handleSearch('tailor_readymade', e.target.value)}/> 
                                
                                
                                </td>
                                <td><input type="text" value={searchText.tailor_contract} onChange={(e) => handleSearch('tailor_contract', e.target.value)}/>  
                                
                               
                                </td>
								
								 <td><input type="text" value={searchText.tailor_fee} onChange={(e) => handleSearch('tailor_fee', e.target.value)}/>  
                                
                                
                                </td>
                                <td><input type="text" value={searchText.tailor_mentor} onChange={(e) => handleSearch('tailor_mentor', e.target.value)}/> 
                                
                                
                                </td>
                                <td><input type="text" value={searchText.tailor_delivery} onChange={(e) => handleSearch('tailor_delivery', e.target.value)}/>  
                                
                               
                                </td>
								<td><input type="text" value={searchText.tailor_overseas} onChange={(e) => handleSearch('tailor_overseas', e.target.value)}/> 
                                
                                
                                </td>
                                <td><input type="text" value={searchText.tailor_domestic} onChange={(e) => handleSearch('tailor_domestic', e.target.value)}/> 
                                
                               
                                </td>
								<td><input type="text" value={searchText.tailor_expenses} onChange={(e) => handleSearch('tailor_expenses', e.target.value)}/>
                                
                                
                                </td>
                                <td><input type="text" value={searchText.tailor_vehicle} onChange={(e) => handleSearch('tailor_vehicle', e.target.value)}/>
                                
                               
                                </td>
								<td><input type="text" value={searchText.tailor_shop_time} onChange={(e) => handleSearch('tailor_shop_time', e.target.value)}/> 
                                
                                
                                </td>
                                <td><input type="text" value={searchText.tailor_shop_days} onChange={(e) => handleSearch('tailor_shop_days', e.target.value)}/> 
                                
                               
                                </td>
								<td><input type="text" value={searchText.tailor_awards} onChange={(e) => handleSearch('tailor_awards', e.target.value)}/>
                                
                                
                                </td>
                                <td><input type="text" value={searchText.tailor_designing_skills} onChange={(e) => handleSearch('tailor_designing_skills', e.target.value)}/>                      
                               
                                </td>
                                <td>Action</td>                                                                    
                            </tr>
                        </thead>  
                    <tbody>                 
                            
                            {sortedData.map((tailor , index) => {
                              return (<tr>
                                <td>{tailors.length}{tailor.tailor_name}</td>
                                <td>{tailor.tailor_lname}</td>
                                <td>{tailor.tailor_father_name}</td>  
								<td>{tailors.length}{tailor.tailor_mother_name}</td>
                                <td>{tailor.tailor_age}</td>
                                <td>{tailor.tailor_grade}</td> 
								<td>{tailors.length}{tailor.tailor_section}</td>
                                <td>{tailor.tailor_official_email}</td>
                                <td>{tailor.tailor_official_mobile}</td> 
                                <td>{tailor.tailor_personal_mobile}</td>
                                <td>{tailor.tailor_blood_group}</td> 
                                <td>{tailor.tailor_dob}</td>
                                <td>{tailor.tailor_address}</td> 
								                <td>{tailors.length}{tailor.tailor_city}</td>
                                <td>{tailor.tailor_state}</td>
                                <td>{tailor.tailor_country}</td> 
								                <td>{tailors.length}{tailor.tailor_continent}</td>
                                <td>{tailor.tailor_experience}</td>
                                <td>{tailor.tailor_rating}</td> 
								                <td>{tailor.tailor_reviews}</td>
                                <td>{tailor.tailor_income}</td> 
								                <td>{tailor.tailor_investment}</td>
                                <td>{tailor.tailor_shop}</td> 
								                <td>{tailor.tailor_services}</td>
                                <td>{tailor.tailor_male_female}</td> 
								                <td>{tailor.tailor_gst}</td> 
								                <td>{tailor.tailor_course}</td>
                                <td>{tailor.tailor_branches}</td> 
								                <td>{tailor.tailor_material}</td> 
								                <td>{tailor.tailor_readymade}</td>
                                <td>{tailor.tailor_contract}</td> 
								                <td>{tailor.tailor_fee}</td> 
								                <td>{tailor.tailor_mentor}</td>
                                <td>{tailor.tailor_delivery}</td> 
								                <td>{tailor.tailor_overseas}</td> 
								                <td>{tailor.tailor_domestic}</td>
                                <td>{tailor.tailor_expenses}</td> 
								                <td>{tailor.tailor_vehicle}</td>
                                <td>{tailor.tailor_shop_time}</td> 
								                <td>{tailor.tailor_shop_days}</td> 
								                <td>{tailor.tailor_awards}</td>
                                <td>{tailor.tailor_designing_skills}</td> 
                                <td>
                                  <div class="btn-group">
                                  <span  class="btn btn-success btn-xs" onClick={() => navigate("/tailors/" + tailor._id)}><i class="bi bi-pencil"></i></span>
                                  <Link  class="btn btn-danger btn-xs" onClick={() => deleteTailors(tailor._id)}><i class="bi bi-trash"></i></Link>        
                                    <div className="col-sm"> <input type="checkBox" checked={tailorsIds.includes(tailor._id)} name={tailor._id} value={tailor._id} onClick={(e) => handleCheck(e)}></input></div>
                                  </div>
                                </td> 
                            
                            </tr>)
                            })} 
        
              </tbody>
              </table>
                </div>					
                             <Pagination setCurrentPage={setCurrentPage} currentPage={tailorsCurrentPage} postsPerPage={tailorsPerPage} totalPosts={tailors.length} paginate={tailorsPaginate} />
        
        </div>
              )
  }          
}

export default ListTailors
