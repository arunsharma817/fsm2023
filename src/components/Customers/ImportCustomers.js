import React , { useContext , useState , useEffect} from 'react'
import { useNavigate, useParams } from "react-router-dom";
import Pagination from '../Products/Pagination';
//import { stringify } from 'csv-stringify';
import Papa from 'papaparse';
import axios from 'axios';
import CustomersContext from '../../context/Customers/CustomersContext.js'


///// For Bulk Import Using CSV file to node js send

  ///// For Import  Second Way

  
const ImportCustomers = () => {


    const [selectedFile, setSelectedFile] = useState(null);
    const context = useContext(CustomersContext);
    const { setCustomers } = context;

    const handleFileChange = (e) => {
      setSelectedFile(e.target.files[0]);
    };
   
  
  const handleImport = () => {
    const file = selectedFile;
    const formData = new FormData();
    formData.append('csvFile', file);    
        
    if(file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (newCustomers) => {
  
            // Filter out rows with empty data
            const filteredData = newCustomers.data.filter(
              (item) =>
                Object.values(item).filter((value) => value !== '').length > 0
            );
            axios
        .post('http://localhost:5000/api/customers/bulkimport', formData)
        .then((response) => {
          console.log(response.data.message);
          {filteredData.map((importCustomer , index) => { 
                      setCustomers((oldCustomers) => {
                        //console.log(results.data);
                        return [...oldCustomers, importCustomer];
                      })
                  })}
        })
        .catch((error) => {
          console.error('Error importing data:', error);
        });
        },
        error: (error) => {
          console.error('Error parsing CSV:', error);
        },
      });
    }
  };






  return (
    <div>
      Import Customers    <input type="file" onChange={handleFileChange} />
                                <button onClick={handleImport}>Import CSV</button>
    </div>
  )
}

export default ImportCustomers
