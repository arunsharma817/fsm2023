import React , { useContext , useState , useEffect} from 'react'
import { useNavigate, useParams } from "react-router-dom";
import Pagination from '../Products/Pagination';
//import { stringify } from 'csv-stringify';
import Papa from 'papaparse';
import axios from 'axios';
import ManufacturersContext from '../../context/Manufacturers/ManufacturersContext.js'


///// For Bulk Import Using CSV file to node js send

  ///// For Import  Second Way

  
const ImportManufacturers = () => {


    const [selectedFile, setSelectedFile] = useState(null);
    const context = useContext(ManufacturersContext);
    const { setManufacturers } = context;

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
        complete: (newManufacturers) => {
  
            // Filter out rows with empty data
            const filteredData = newManufacturers.data.filter(
              (item) =>
                Object.values(item).filter((value) => value !== '').length > 0
            );
            axios
        .post('http://localhost:5000/api/manufacturers/bulkimport', formData)
        .then((response) => {
          console.log(response.data.message);
          {filteredData.map((importManufacturer , index) => { 
                      setManufacturers((oldManufacturers) => {
                        //console.log(results.data);
                        return [...oldManufacturers, importManufacturer];
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
      Import Manufacturers    <input type="file" onChange={handleFileChange} />
                                <button onClick={handleImport}>Import CSV</button>
    </div>
  )
}

export default ImportManufacturers
