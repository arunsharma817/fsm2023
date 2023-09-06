import React , { useContext , useState , useEffect} from 'react'
import { useNavigate, useParams } from "react-router-dom";
import Pagination from '../Products/Pagination';
//import { stringify } from 'csv-stringify';
import Papa from 'papaparse';
import axios from 'axios';
import CompanysContext from '../../context/Companys/CompanysContext.js'


///// For Bulk Import Using CSV file to node js send

  ///// For Import  Second Way

  
const ImportCompanys = () => {


    const [selectedFile, setSelectedFile] = useState(null);
    const context = useContext(CompanysContext);
    const { setCompanys } = context;

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
        complete: (newCompanys) => {
  
            // Filter out rows with empty data
            const filteredData = newCompanys.data.filter(
              (item) =>
                Object.values(item).filter((value) => value !== '').length > 0
            );
            axios
        .post('http://localhost:5000/api/companys/bulkimport', formData)
        .then((response) => {
          console.log(response.data.message);
          {filteredData.map((importCompany , index) => { 
                      setCompanys((oldCompanys) => {
                        //console.log(results.data);
                        return [...oldCompanys, importCompany];
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
      Import Companys    <input type="file" onChange={handleFileChange} />
                                <button onClick={handleImport}>Import CSV</button>
    </div>
  )
}

export default ImportCompanys
