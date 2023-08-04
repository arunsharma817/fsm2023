import React , { useContext , useState , useEffect} from 'react'
import AddMainProductsForm from './AddMainProductsForm.js'
import mainProductsContext from '../../context/MainProducts/mainProductsContext.js'
import { useNavigate, useParams } from "react-router-dom";
import Pagination from '../Products/Pagination';
//import { stringify } from 'csv-stringify';
import Papa from 'papaparse';
import axios from 'axios';

const MainProducts = () => {
   
  const navigate = useNavigate();
  const params = useParams();
  const mainProductId = params.id;
  const ownerToken = localStorage.getItem('token');

  const context = useContext(mainProductsContext);
  const { mainProducts , mainProductsIds , setMainProductsIds ,  setMainProducts ,  deleteMainProducts , deleteMultipleMainProducts} = context;

///// Paginationn by Products 

const [searchApiData, setSearchApiData] = useState([]);
const [mainProductsCurrentPage, setMainProductsCurrentPage] = useState(1);
const [mainProductsPerPage, setMainProductsPerPage] = useState(100);
const [currentPage, setCurrentPage] = useState(1);
const mainProductsPaginate = pageNumber => setMainProductsCurrentPage(pageNumber);


// For Multiple Checkboxes

 //// For Search
 const [searchMainProducts, setSearchMainProducts] = useState('');
 const [searchOldProducts, setSearchOldProducts] = useState("");

 useEffect(() => {
  //inputEvent();
}, [searchMainProducts]);



/// For CSV 
  //const [csvData, setCsvData] = useState('');

  const handleExportCSV = () => {
    // Convert the items to CSV format using papaparse
    const csv = Papa.unparse(mainProducts, {
      header: true,
    });

    // Create a Blob and URL for the CSV data
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    // Create a link and click it to trigger the download
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'products.csv');
    document.body.appendChild(link);
    link.click();

    // Clean up by removing the link and revoking the URL
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

////// For Import  First Way

const handleImportCSV = (e) => {
  const file = e.target.files[0];
  if (file) {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {

          // Filter out rows with empty data
          const filteredData = results.data.filter(
            (item) =>
              Object.values(item).filter((value) => value !== '').length > 0
          );       

////////////////

          axios.post('http://localhost:5000/api/mainproducts/import/', filteredData, {
            headers: {
              'owner-token': ownerToken,
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          }).then(resp => {
                  {filteredData.map((importProduct , index) => { 
                    setMainProducts((oldMainProducts) => {
                      //console.log(results.data);
                      return [...oldMainProducts, importProduct];
                    })
                })}
          }).catch(error => {
            console.error('There was an error!', error);
          });

//////////////////
      },
      error: (error) => {
        console.error('Error parsing CSV:', error);
      },
    });
  }
};



///// For Bulk Import Using CSV file to node js send

  ///// For Import  Second Way

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };
 
 ////// For Import  First Way

const handleImport = () => {
  const file = selectedFile;
  const formData = new FormData();
  formData.append('csvFile', file);    
	  
  if(file) {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {

          // Filter out rows with empty data
          const filteredData = results.data.filter(
            (item) =>
              Object.values(item).filter((value) => value !== '').length > 0
          );       

////////////////

          axios
      .post('http://localhost:5000/api/mainproducts/bulkimport', formData)
      .then((response) => {
        console.log(response.data.message);
		{filteredData.map((importProduct , index) => { 
                    setMainProducts((oldMainProducts) => {
                      //console.log(results.data);
                      return [...oldMainProducts, importProduct];
                    })
                })}
      })
      .catch((error) => {
        console.error('Error importing data:', error);
      });

//////////////////
      },
      error: (error) => {
        console.error('Error parsing CSV:', error);
      },
    });
  }
};


 const handleCheck = (e) => {
 const { value, checked } = e.target
  
 if(checked) {
    setMainProductsIds([...mainProductsIds, value]);
 } else {
    setMainProductsIds(() => mainProductsIds.filter((e) => e !== value));
 }
}

const inputEvent = (e) => {
  const data = e.target.value;
  console.log(data);  
  setSearchMainProducts(data);
  setSearchOldProducts(mainProducts);
  if(data == '') {
    console.log("I am here in data blank"+searchOldProducts);
    {searchOldProducts.map((searchProduct , index) => { console.log(searchOldProducts.length +' here'+searchProduct.main_products_name) } 
   
    )}
    setMainProducts([...mainProducts]);
  } else {
    //alert("I am here for search"+data);
    //const filterResult = data.length > 0 ? mainProducts.filter((product) => product.main_products_name.toLowerCase().includes(data.toLowerCase())) : setMainProducts(searchOldProducts) ;
    
    const filterResult = data.length === 0
    ? null 
    : mainProducts.filter((product) => product.main_products_name.toLowerCase().includes(data.toLowerCase()));

    setMainProducts(filterResult);
  }
};



  if(mainProductId){
    console.log("I am here before sending to edit"+mainProductId);
    return (
      <div>
          <AddMainProductsForm mainProductId = {mainProductId} mainProducts= {mainProducts} /> </div>
          )
  }else{
          
            // Get Current Clients
            const indexOfMainProducts = mainProductsCurrentPage * mainProductsPerPage;
            const indexOfFirstMainProducts = indexOfMainProducts - mainProductsPerPage;
            const currentMainProducts = mainProducts.slice(indexOfFirstMainProducts, indexOfMainProducts);

              return (
                <div>         
                  <input type="search" name="searchbox" value= { searchMainProducts} placeholder='Search Here' onChange={(e) => inputEvent(e)} />
                  <button onClick={handleExportCSV}>Export CSV</button>
                  Import Products<input     type="file"    accept=".csv"   onChange={handleImportCSV}   />
                    <div className ="row my-3">
                            <h2>Products List { mainProductsIds.length > 1 ? <input type="button" value="Delete ALL " onClick={() => deleteMultipleMainProducts()}></input>  :  ''} </h2>
                            
                            <div className="container">
                    {currentMainProducts.map((mainProduct , index) => {
                      return (<div className="row align-items-center">
                        <div className="col-sm">{mainProducts.length}{mainProduct.main_products_name}</div>
                        <div className="col-sm">{mainProduct.main_products_description}</div>
                        <div className="col-sm">{mainProduct.main_products_capacity}</div>  

                      <div className="col-sm">
                        <input type="button" id={index} value="Del" onClick={() => deleteMainProducts(mainProduct._id)} /> 
                        <input type="checkBox" checked={mainProductsIds.includes(mainProduct._id)} name={mainProduct._id} value={mainProduct._id} onClick={(e) => handleCheck(e)}></input>
                      </div>
                      <div className="col-sm"><input type="button" id={mainProduct._id} value="Edit" onClick={() => navigate("/mainproducts/" + mainProduct._id)} /></div>  
                        
                    
                    </div>)
                    })}
                  </div>
                    </div>
                    <Pagination setCurrentPage={setCurrentPage} currentPage={mainProductsCurrentPage} postsPerPage={mainProductsPerPage} totalPosts={mainProducts.length} paginate={mainProductsPaginate} />
                    <input type="file" onChange={handleFileChange} />
                    <button onClick={handleImport}>Import CSV</button>
                   
                </div>
              )
  }          
}

export default MainProducts
