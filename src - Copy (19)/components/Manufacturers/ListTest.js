import React , { useContext , useState , useEffect } from 'react'
import AddManufacturers from './AddManufacturers.js'
import ManufacturersContext from '../../context/Manufacturers/ManufacturersContext.js'
import { useNavigate, useParams , Link } from "react-router-dom";
import Pagination from '../Products/Pagination';
import Papa from 'papaparse';

const ListTest = () => {
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


    
            return (
                <div>
                    
                {manufacturers.map((manufacturer , index) => {
                                        return (<p>{manufacturer.manufacturer_company_name}</p>)                              
                                        }
                                    )
                    }
                </div>
            )
    }
}

export default ListTest
