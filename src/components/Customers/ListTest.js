import React , { useContext , useState , useEffect } from 'react'
import AddCustomers from './AddCustomers.js'
import CustomersContext from '../../context/Customers/CustomersContext.js'
import { useNavigate, useParams , Link } from "react-router-dom";
import Pagination from '../Products/Pagination';
import Papa from 'papaparse';

const ListTest = () => {
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


    
            return (
                <div>
                    
                {customers.map((customer , index) => {
                                        return (<p>{customer.customer_company_name}</p>)                              
                                        }
                                    )
                    }
                </div>
            )
    }
}

export default ListTest
