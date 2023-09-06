import React , { useContext , useState , useEffect } from 'react'
import AddPratyashis from './AddPratyashis.js'
import PratyashisContext from '../../context/Pratyashis/PratyashisContext.js'
import { useNavigate, useParams , Link } from "react-router-dom";
import Pagination from '../Products/Pagination';
import Papa from 'papaparse';

const ListPratyashis = () => {
   
  const navigate = useNavigate();
  const params = useParams();
  const pratyashiId = params.id;

  const context = useContext(PratyashisContext);
  const { pratyashis , setPratyashis ,  deletePratyashis , deleteMultiplePratyashis} = context;

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
const [pratyashisCurrentPage, setPratyashisCurrentPage] = useState(1);
const [pratyashisPerPage, SetPratyashisPerPage] = useState(15);
const [currentPage, setCurrentPage] = useState(1);
const pratyashisPaginate = pageNumber => setPratyashisCurrentPage(pageNumber);
const [pratyashisIds, setPratyashisIds] = useState([]);

////For Search 
 //// For Search
const [searchPratyashis, setSearchPratyashis] = useState('');
const [searchOldPratyashis, setSearchOldPratyashis] = useState("");
useEffect(() => {
    //inputEvent();
  }, [searchPratyashis]);
  
const inputEvent = (e) => {
    const data = e.target.value;
    console.log(data);  
    setSearchPratyashis(data);
    setSearchOldPratyashis(pratyashis);
    if(data == '') {
      console.log("I am here in data blank"+searchPratyashis);
      {pratyashis.map((searchPratyashi , index) => { console.log(searchPratyashis.length +' here'+searchPratyashi.pratyashi_fname) } 
     
      )}
      setPratyashis([...pratyashis]);
    } else {
      //alert("I am here for search"+data);
      //const filterResult = data.length > 0 ? mainProducts.filter((product) => product.pratyashis_name.toLowerCase().includes(data.toLowerCase())) : setMainProducts(searchPratyashis) ;
      
      const filterResult = data.length === 0
      ? null 
      : pratyashis.filter((pratyashi) => pratyashi.pratyashi_fname.toLowerCase().includes(data.toLowerCase()));
  
      setPratyashis(filterResult);
    }
  };



/// For Export  CSV 
//const [csvData, setCsvData] = useState('');

  const handleExportCSV = () => {
    // Convert the items to CSV format using papaparse
    const csv = Papa.unparse(pratyashis, {
      header: true,
    });

    // Create a Blob and URL for the CSV data
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    // Create a link and click it to trigger the download
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'pratyashis.csv');
    document.body.appendChild(link);
    link.click();

    // Clean up by removing the link and revoking the URL
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };


////// For Each Column Search 

const [searchText, setSearchText] = useState({
    "pratyashi_yuvak_yuvati": ' ',
    "pratyashi_vishesh_parishisht": ' ',
    "pratyashi_adhik_aayu": ' ',
    "pratyashi_talakshuda": ' ',
    "pratyashi_pura_name": ' ',
    "pratyashi_janm_dinank": ' ',
    "pratyashi_janm_ghanta": ' ',
    "pratyashi_janm_minute":' ',
    "pratyashi_janm_ampm": ' ',
    "pratyashi_sthan_rajya": ' ',
    "pratyashi_sthan_zila": ' ',
    "pratyashi_sthan_gaaon_shahar": ' ',
    "pratyashi_gautra_swyam": ' ',
    "pratyashi_gautra_nanihal": ' ',
    "pratyashi_sharirik_uchai": ' ',
    "pratyashi_sharirik_inch": ' ',
    "pratyashi_sharirik_vajan": ' ',
    "pratyashi_sharirik_rang": ' ',
    "pratyashi_jankari_rashi": ' ',
    "pratyashi_jankari_nakshatr": ' ',
    "pratyashi_jankari_naadi": ' ',
"pratyashi_jankari_charan": ' ',
    "pratyashi_manglik": ' ',
    "pratyashi_shani": ' ',
    "pratyashi_patrika_milan": ' ',
    "pratyashi_shekshanik_yogyata": ' ',
    "pratyashi_vyavsay": ' ',
    "pratyashi_masik_aay": ' ',
    "pratyashi_pita_vyavsay": ' ',
    "pratyashi_pita_masik_aay": ' ',
    "pratyashi_pita_naam": ' ',
    "pratyashi_vartaman_pata": ' ',
    "pratyashi_vartaman_rajya": ' ',
    "pratyashi_vartaman_zila": ' ',
    "pratyashi_vartaman_gaaon_shahar": ' ',
    "pratyashi_vartaman_pincode": ' ',
    "pratyashi_sthayi_pata": ' ',
    "pratyashi_sthayi_rajya": ' ',
    "pratyashi_sthayi_zila": ' ',
    "pratyashi_sthayi_gaaon_shahar": ' ',
    "pratyashi_sthayi_pin_code": ' ',
    "pratyashi_photo": ' '
 });

const handleSearch = (column, value) => {
    setSearchText({ ...searchText, [column]: value });
};

/// For Multiple Delete
const handleCheck = (e) => {
  const { value, checked } = e.target
  
  if (checked) {
    setPratyashisIds([...pratyashisIds, value]);
  } else {
    setPratyashisIds(() => pratyashisIds.filter((e) => e !== value));
  }
}

  if(pratyashiId){
    //console.log("I am here before sending to edit"+users.pratyashi_fname);
    return (
      <div>
          <AddPratyashis pratyashiId = {pratyashiId} pratyashis = {pratyashis} /> </div>
          )
  }else{
          
            // Get Current Clients
            const indexOfLastPratyashis = pratyashisCurrentPage * pratyashisPerPage;
            const indexOfFirstPratyashis = indexOfLastPratyashis - pratyashisPerPage;
            const currentPratyashis = pratyashis.slice(indexOfFirstPratyashis, indexOfLastPratyashis);

            const sortedData = currentPratyashis.slice().sort((a, b) => {
                
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
                <p><h4 class="heading-h4">!! Pratyashis List !!</h4> { pratyashisIds.length > 1 ? <input type="button" value="Delete ALL " onClick={() => deleteMultiplePratyashis(pratyashisIds)}></input>  :  ''} <button onClick={handleExportCSV}>Export CSV</button></p>
                <input type="search" name="searchbox" value= { searchPratyashis} placeholder='Search Here' onChange={(e) => inputEvent(e)} />

                <div class="table-container">
                    <table id="client-list" class="table table-bordered display">  
                        <thead>
                        <tr>                                                                    
                                <th onClick={() => handleSort('pratyashi_yuvak_yuvati')}>  Mfg. Name
                                {sortColumn === 'pratyashi_yuvak_yuvati' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('pratyashi_vishesh_parishisht')}>  Industry 
                                {sortColumn === 'pratyashi_vishesh_parishisht' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('pratyashi_adhik_aayu')}> Products
                                {sortColumn === 'pratyashi_adhik_aayu' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								
								 <th onClick={() => handleSort('pratyashi_talakshuda')}>  Mobile
                                {sortColumn === 'pratyashi_talakshuda' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('pratyashi_pura_name')}>  Alternate Mobile 
                                {sortColumn === 'pratyashi_pura_name' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('pratyashi_janm_dinank')}> Email Id
                                {sortColumn === 'pratyashi_janm_dinank' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								
								<th onClick={() => handleSort('pratyashi_janm_ghanta')}>  Website
                                {sortColumn === 'pratyashi_janm_ghanta' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('pratyashi_janm_minute')}>  Reg. Address 
                                {sortColumn === 'pratyashi_janm_minute' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('pratyashi_janm_ampm')}> Zip Code
                                {sortColumn === 'pratyashi_janm_ampm' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								
								 <th onClick={() => handleSort('pratyashi_sthan_rajya')}>  City
                                {sortColumn === 'pratyashi_sthan_rajya' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('pratyashi_sthan_zila')}> State 
                                {sortColumn === 'pratyashi_sthan_zila' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('pratyashi_sthan_gaaon_shahar')}> Country
                                {sortColumn === 'pratyashi_sthan_gaaon_shahar' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								
								
								<th onClick={() => handleSort('pratyashi_gautra_swyam')}>  Country Code
                                {sortColumn === 'pratyashi_gautra_swyam' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('pratyashi_gautra_nanihal')}>  Continent 
                                {sortColumn === 'pratyashi_gautra_nanihal' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('pratyashi_sharirik_uchai')}> Customr Care
                                {sortColumn === 'pratyashi_sharirik_uchai' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								
								 <th onClick={() => handleSort('pratyashi_sharirik_inch')}>  QR Code
                                {sortColumn === 'pratyashi_sharirik_inch' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('pratyashi_sharirik_vajan')}>  Barcode Number 
                                {sortColumn === 'pratyashi_sharirik_vajan' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('pratyashi_sharirik_rang')}> Foundation Date
                                {sortColumn === 'pratyashi_sharirik_rang' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								
								<th onClick={() => handleSort('pratyashi_jankari_rashi')}>  License
                                {sortColumn === 'pratyashi_jankari_rashi' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('pratyashi_jankari_nakshatr')}>  PAN 
                                {sortColumn === 'pratyashi_jankari_nakshatr' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('pratyashi_jankari_naadi')}> GST
                                {sortColumn === 'pratyashi_jankari_naadi' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								
								 <th onClick={() => handleSort('pratyashi_jankari_charan')}>  Corp. Certi.
                                {sortColumn === 'pratyashi_jankari_charan' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('pratyashi_manglik')}> Gumasta 
                                {sortColumn === 'pratyashi_manglik' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('pratyashi_shani')}> MOA 
                                {sortColumn === 'pratyashi_shani' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>

                                <th onClick={() => handleSort('pratyashi_patrika_milan')}> MSME 
                                {sortColumn === 'pratyashi_patrika_milan' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								
								 <th onClick={() => handleSort('pratyashi_shekshanik_yogyata')}>  Act Details
                                {sortColumn === 'pratyashi_shekshanik_yogyata' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('pratyashi_vyavsay')}> Cancelled Cheque 
                                {sortColumn === 'pratyashi_vyavsay' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('pratyashi_masik_aay')}> Employees Number 
                                {sortColumn === 'pratyashi_masik_aay' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								
								
								 <th onClick={() => handleSort('pratyashi_pita_vyavsay')}>  Dir. FName
                                {sortColumn === 'pratyashi_pita_vyavsay' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('pratyashi_pita_masik_aay')}> Dir. LName
                                {sortColumn === 'pratyashi_pita_masik_aay' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('pratyashi_pita_naam')}> Dir. Email 
                                {sortColumn === 'pratyashi_pita_naam' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								
								 <th onClick={() => handleSort('pratyashi_vartaman_pata')}>  Dir. Mobile
                                {sortColumn === 'pratyashi_vartaman_pata' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('pratyashi_vartaman_rajya')}> Dir. LinkedIn
                                {sortColumn === 'pratyashi_vartaman_rajya' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('pratyashi_vartaman_zila')}> Pratyashi Reviews 
                                {sortColumn === 'pratyashi_vartaman_zila' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								<th onClick={() => handleSort('pratyashi_vartaman_gaaon_shahar')}> Dir. LinkedIn
                                {sortColumn === 'pratyashi_vartaman_gaaon_shahar' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('pratyashi_vartaman_pincode')}> Pratyashi Reviews 
                                {sortColumn === 'pratyashi_vartaman_pincode' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								<th onClick={() => handleSort('pratyashi_sthayi_pata')}> Instagram
                                {sortColumn === 'pratyashi_sthayi_pata' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('pratyashi_sthayi_rajya')}> LinkedIn
                                {sortColumn === 'pratyashi_sthayi_rajya' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								<th onClick={() => handleSort('pratyashi_sthayi_zila')}> Youtube 
                                {sortColumn === 'pratyashi_sthayi_zila' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('pratyashi_sthayi_gaaon_shahar')}> Countries 
                                {sortColumn === 'pratyashi_sthayi_gaaon_shahar' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								<th onClick={() => handleSort('pratyashi_sthayi_pin_code')}> Atrributes
                                {sortColumn === 'pratyashi_sthayi_pin_code' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('pratyashi_photo')}> History 
                                {sortColumn === 'pratyashi_photo' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
                                <th>Action</th>                                                                    
                            </tr>
                            <tr>                                                                    
                                <td><input type="text" value={searchText.pratyashi_yuvak_yuvati} onChange={(e) => handleSearch('pratyashi_yuvak_yuvati', e.target.value)}/>  
                                
                                
                                </td>
                                <td><input type="text" value={searchText.pratyashi_vishesh_parishisht} onChange={(e) => handleSearch('pratyashi_vishesh_parishisht', e.target.value)}/>  
                                
                                
                                </td>
                                <td><input type="text" value={searchText.pratyashi_adhik_aayu} onChange={(e) => handleSearch('pratyashi_adhik_aayu', e.target.value)}/>
                                
                               
                                </td>
								
								 <td><input type="text" value={searchText.pratyashi_talakshuda} onChange={(e) => handleSearch('pratyashi_talakshuda', e.target.value)}/> 
                                
                                
                                </td>
                                <td><input type="text" value={searchText.pratyashi_pura_name} onChange={(e) => handleSearch('pratyashi_pura_name', e.target.value)}/>   
                                
                                
                                </td>
                                <td><input type="text" value={searchText.pratyashi_janm_dinank} onChange={(e) => handleSearch('pratyashi_janm_dinank', e.target.value)}/> 
                                
                               
                                </td>
								
								<td><input type="text" value={searchText.pratyashi_janm_ghanta} onChange={(e) => handleSearch('pratyashi_janm_ghanta', e.target.value)}/> 
                                
                                
                                </td>
                                <td><input type="text" value={searchText.pratyashi_janm_minute} onChange={(e) => handleSearch('pratyashi_janm_minute', e.target.value)}/>   
                                
                                
                                </td>
                                <td><input type="text" value={searchText.pratyashi_janm_ampm} onChange={(e) => handleSearch('pratyashi_janm_ampm', e.target.value)}/> 
                                
                               
                                </td>
								
								 <td><input type="text" value={searchText.pratyashi_sthan_rajya} onChange={(e) => handleSearch('pratyashi_sthan_rajya', e.target.value)}/> 
                                
                                
                                </td>
                                <td><input type="text" value={searchText.pratyashi_sthan_zila} onChange={(e) => handleSearch('pratyashi_sthan_zila', e.target.value)}/> 
                                
                                
                                </td>
                                <td><input type="text" value={searchText.pratyashi_sthan_gaaon_shahar} onChange={(e) => handleSearch('pratyashi_sthan_gaaon_shahar', e.target.value)}/>
                                
                               
                                </td>
								
								
								<td><input type="text" value={searchText.pratyashi_gautra_swyam} onChange={(e) => handleSearch('pratyashi_gautra_swyam', e.target.value)}/>  
                                
                                
                                </td>
                                <td><input type="text" value={searchText.pratyashi_gautra_nanihal} onChange={(e) => handleSearch('pratyashi_gautra_nanihal', e.target.value)}/>  
                                
                                
                                </td>
                                <td><input type="text" value={searchText.pratyashi_sharirik_uchai} onChange={(e) => handleSearch('pratyashi_sharirik_uchai', e.target.value)}/> 
                                
                               
                                </td>
								
								 <td><input type="text" value={searchText.pratyashi_sharirik_inch} onChange={(e) => handleSearch('pratyashi_sharirik_inch', e.target.value)}/>  
                                
                                
                                </td>
                                <td><input type="text" value={searchText.pratyashi_sharirik_vajan} onChange={(e) => handleSearch('pratyashi_sharirik_vajan', e.target.value)}/>   
                                
                                
                                </td>
                                <td><input type="text" value={searchText.pratyashi_sharirik_rang} onChange={(e) => handleSearch('pratyashi_sharirik_rang', e.target.value)}/> 
                                
                               
                                </td>
								
								<td><input type="text" value={searchText.pratyashi_jankari_rashi} onChange={(e) => handleSearch('pratyashi_jankari_rashi', e.target.value)}/> 
                                
                                
                                </td>
                                <td><input type="text" value={searchText.pratyashi_jankari_nakshatr} onChange={(e) => handleSearch('pratyashi_jankari_nakshatr', e.target.value)}/>  
                                
                                
                                </td>
                                <td><input type="text" value={searchText.pratyashi_jankari_naadi} onChange={(e) => handleSearch('pratyashi_jankari_naadi', e.target.value)}/>
                                
                               
                                </td>
								
								 <td><input type="text" value={searchText.pratyashi_jankari_charan} onChange={(e) => handleSearch('pratyashi_jankari_charan', e.target.value)}/>                                  
                                
                                </td>
                                <td><input type="text" value={searchText.pratyashi_manglik} onChange={(e) => handleSearch('pratyashi_manglik', e.target.value)}/> 
                                
                                
                                </td>
                                <td><input type="text" value={searchText.pratyashi_shani} onChange={(e) => handleSearch('pratyashi_shani', e.target.value)}/> 
                                
                               
                                </td>
								
                                <td><input type="text" value={searchText.pratyashi_patrika_milan} onChange={(e) => handleSearch('pratyashi_patrika_milan', e.target.value)}/>  
</td>
								 <td><input type="text" value={searchText.pratyashi_shekshanik_yogyata} onChange={(e) => handleSearch('pratyashi_shekshanik_yogyata', e.target.value)}/>  
                                
                                
                                </td>
                                <td><input type="text" value={searchText.pratyashi_vyavsay} onChange={(e) => handleSearch('pratyashi_vyavsay', e.target.value)}/>  
                                
                                
                                </td>
                                <td><input type="text" value={searchText.pratyashi_masik_aay} onChange={(e) => handleSearch('pratyashi_masik_aay', e.target.value)}/>  
                                
                               
                                </td>
								
								
								 <td><input type="text" value={searchText.pratyashi_pita_vyavsay} onChange={(e) => handleSearch('pratyashi_pita_vyavsay', e.target.value)}/>  
                                
                                
                                </td>
                                <td><input type="text" value={searchText.pratyashi_pita_masik_aay} onChange={(e) => handleSearch('pratyashi_pita_masik_aay', e.target.value)}/> 
                                
                                
                                </td>
                                <td><input type="text" value={searchText.pratyashi_pita_naam} onChange={(e) => handleSearch('pratyashi_pita_naam', e.target.value)}/>  
                                
                               
                                </td>
								
								 <td><input type="text" value={searchText.pratyashi_vartaman_pata} onChange={(e) => handleSearch('pratyashi_vartaman_pata', e.target.value)}/>  
                                
                                
                                </td>
                                <td><input type="text" value={searchText.pratyashi_vartaman_rajya} onChange={(e) => handleSearch('pratyashi_vartaman_rajya', e.target.value)}/> 
                                
                                
                                </td>
                                <td><input type="text" value={searchText.pratyashi_vartaman_zila} onChange={(e) => handleSearch('pratyashi_vartaman_zila', e.target.value)}/>  
                                
                               
                                </td>
								<td><input type="text" value={searchText.pratyashi_vartaman_gaaon_shahar} onChange={(e) => handleSearch('pratyashi_vartaman_gaaon_shahar', e.target.value)}/> 
                                
                                
                                </td>
                                <td><input type="text" value={searchText.pratyashi_vartaman_pincode} onChange={(e) => handleSearch('pratyashi_vartaman_pincode', e.target.value)}/> 
                                
                               
                                </td>
								<td><input type="text" value={searchText.pratyashi_sthayi_pata} onChange={(e) => handleSearch('pratyashi_sthayi_pata', e.target.value)}/>
                                
                                
                                </td>
                                <td><input type="text" value={searchText.pratyashi_sthayi_rajya} onChange={(e) => handleSearch('pratyashi_sthayi_rajya', e.target.value)}/>
                                
                               
                                </td>
								<td><input type="text" value={searchText.pratyashi_sthayi_zila} onChange={(e) => handleSearch('pratyashi_sthayi_zila', e.target.value)}/> 
                                
                                
                                </td>
                                <td><input type="text" value={searchText.pratyashi_sthayi_gaaon_shahar} onChange={(e) => handleSearch('pratyashi_sthayi_gaaon_shahar', e.target.value)}/> 
                                
                               
                                </td>
								<td><input type="text" value={searchText.pratyashi_sthayi_pin_code} onChange={(e) => handleSearch('pratyashi_sthayi_pin_code', e.target.value)}/>
                                
                                
                                </td>
                                <td><input type="text" value={searchText.pratyashi_photo} onChange={(e) => handleSearch('pratyashi_photo', e.target.value)}/>                      
                               
                                </td>
                                <td>Action</td>                                                                    
                            </tr>
                        </thead>  
                    <tbody>                 
                            
                            {sortedData.map((pratyashi , index) => {
                              return (<tr>
                                <td>{pratyashis.length}{pratyashi.pratyashi_yuvak_yuvati}</td>
                                <td>{pratyashi.pratyashi_vishesh_parishisht}</td>
                                <td>{pratyashi.pratyashi_adhik_aayu}</td>  
								<td>{pratyashis.length}{pratyashi.pratyashi_talakshuda}</td>
                                <td>{pratyashi.pratyashi_pura_name}</td>
                                <td>{pratyashi.pratyashi_janm_dinank}</td> 
								<td>{pratyashis.length}{pratyashi.pratyashi_janm_ghanta}</td>
                                <td>{pratyashi.pratyashi_janm_minute}</td>
                                <td>{pratyashi.pratyashi_janm_ampm}</td> 
                                <td>{pratyashi.pratyashi_sthan_rajya}</td>
                                <td>{pratyashi.pratyashi_sthan_zila}</td> 
                                <td>{pratyashi.pratyashi_sthan_gaaon_shahar}</td>
                                <td>{pratyashi.pratyashi_gautra_swyam}</td> 
								                <td>{pratyashis.length}{pratyashi.pratyashi_gautra_nanihal}</td>
                                <td>{pratyashi.pratyashi_sharirik_uchai}</td>
                                <td>{pratyashi.pratyashi_sharirik_inch}</td> 
								                <td>{pratyashis.length}{pratyashi.pratyashi_sharirik_vajan}</td>
                                <td>{pratyashi.pratyashi_sharirik_rang}</td>
                                <td>{pratyashi.pratyashi_jankari_rashi}</td> 
								                <td>{pratyashi.pratyashi_jankari_nakshatr}</td>
                                <td>{pratyashi.pratyashi_jankari_naadi}</td> 
								                <td>{pratyashi.pratyashi_jankari_charan}</td>
                                <td>{pratyashi.pratyashi_manglik}</td> 
								                <td>{pratyashi.pratyashi_shani}</td>
                                <td>{pratyashi.pratyashi_patrika_milan}</td> 
								                <td>{pratyashi.pratyashi_shekshanik_yogyata}</td> 
								                <td>{pratyashi.pratyashi_vyavsay}</td>
                                <td>{pratyashi.pratyashi_masik_aay}</td> 
								                <td>{pratyashi.pratyashi_pita_vyavsay}</td> 
								                <td>{pratyashi.pratyashi_pita_masik_aay}</td>
                                <td>{pratyashi.pratyashi_pita_naam}</td> 
								                <td>{pratyashi.pratyashi_vartaman_pata}</td> 
								                <td>{pratyashi.pratyashi_vartaman_rajya}</td>
                                <td>{pratyashi.pratyashi_vartaman_zila}</td> 
								                <td>{pratyashi.pratyashi_vartaman_gaaon_shahar}</td> 
								                <td>{pratyashi.pratyashi_vartaman_pincode}</td>
                                <td>{pratyashi.pratyashi_sthayi_pata}</td> 
								                <td>{pratyashi.pratyashi_sthayi_rajya}</td>
                                <td>{pratyashi.pratyashi_sthayi_zila}</td> 
								                <td>{pratyashi.pratyashi_sthayi_gaaon_shahar}</td> 
								                <td>{pratyashi.pratyashi_sthayi_pin_code}</td>
                                <td>{pratyashi.pratyashi_photo}</td> 
                                <td>
                                  <div class="btn-group">
                                  <span  class="btn btn-success btn-xs" onClick={() => navigate("/pratyashis/" + pratyashi._id)}><i class="bi bi-pencil"></i></span>
                                  <Link  class="btn btn-danger btn-xs" onClick={() => deletePratyashis(pratyashi._id)}><i class="bi bi-trash"></i></Link>        
                                    <div className="col-sm"> <input type="checkBox" checked={pratyashisIds.includes(pratyashi._id)} name={pratyashi._id} value={pratyashi._id} onClick={(e) => handleCheck(e)}></input></div>
                                  </div>
                                </td> 
                            
                            </tr>)
                            })} 
        
              </tbody>
              </table>
                </div>					
                             <Pagination setCurrentPage={setCurrentPage} currentPage={pratyashisCurrentPage} postsPerPage={pratyashisPerPage} totalPosts={pratyashis.length} paginate={pratyashisPaginate} />
        
        </div>
              )
  }          
}

export default ListPratyashis
