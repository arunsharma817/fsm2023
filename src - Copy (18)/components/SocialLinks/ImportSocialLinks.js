import React , { useContext , useState , useEffect} from 'react'
import { useNavigate, useParams } from "react-router-dom";
import Pagination from '../Products/Pagination';
//import { stringify } from 'csv-stringify';
import Papa from 'papaparse';
import axios from 'axios';
import SocialLinksContext from '../../context/SocialLinks/SocialLinksContext.js'


///// For Bulk Import Using CSV file to node js send

  ///// For Import  Second Way

  
const ImportSocialLinks = () => {


    const [selectedFile, setSelectedFile] = useState(null);
    const context = useContext(SocialLinksContext);
    const { setSocialLinks } = context;

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
        complete: (newSocialLinks) => {
  
            // Filter out rows with empty data
            const filteredData = newSocialLinks.data.filter(
              (item) =>
                Object.values(item).filter((value) => value !== '').length > 0
            );
            axios
        .post('http://localhost:5000/api/sociallinks/bulkimport', formData)
        .then((response) => {
          console.log(response.data.message);
          {filteredData.map((importSocialLink , index) => { 
                      setSocialLinks((oldSocialLinks) => {
                        //console.log(results.data);
                        return [...oldSocialLinks, importSocialLink];
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
      Import Social Links    <input type="file" onChange={handleFileChange} />
                                <button onClick={handleImport}>Import CSV</button>
    </div>
  )
}

export default ImportSocialLinks
